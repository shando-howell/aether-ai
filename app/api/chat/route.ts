import { getConvexClient } from "@/lib/convex";
import { ChatRequestBody } from "@/lib/types";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { api } from "@/convex/_generated/api";
import { 
    StreamMessage, 
    SSE_DATA_PREFIX,
    SSE_LINE_DELIMITER,
    StreamMessageType
} from "@/lib/types";
import { 
    AIMessage, HumanMessage, ToolMessage 
} from "@langchain/core/messages";
import { Stream } from "stream";
import { submitQuery } from "@/lib/langgraph";

function sendSSEMessage(
    writer: WritableStreamDefaultWriter<Uint8Array>,
    data: StreamMessage
) {
    const encoder = new TextEncoder();
    return writer.write(
        encoder.encode(
            `${SSE_DATA_PREFIX}${JSON.stringify(data)}${SSE_LINE_DELIMITER}`
        )
    );
}

export async function POST(req: Request) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return new Response("Unauthorized", {status: 401});
        }

        const body = (await req.json()) as ChatRequestBody
        const { messages, newMessage, chatId } = body;

        const convex = getConvexClient();

        // Create stream with larger queue strategy for better performance
        const stream = new TransformStream({}, { highWaterMark: 1024 });
        const writer = stream.writable.getWriter();

        const response = new Response(stream.readable, {
            headers: {
                "Content-Type": "text/event-stream",
                Connection: "keep-alive",
                "X-Accel-Buffering": "no",
            },
        });

        const startStream = async () => {
            try {
                // Stream will be implemented here
                // Send initial connection established message
                await sendSSEMessage(writer, { type: StreamMessageType.Connected });

                // Save user message to DB (Review when Convex is running)
                // await convex.mutation(
                //     api.messages.send, {
                //         chatId,
                //         content: newMessage
                //     }
                // );
                
                // Format messages for LangChain
                const langChainMessages = [
                    ...messages.map((msg) => msg.role === "user" 
                        ? new HumanMessage(msg.content)
                        : new AIMessage(msg.content)
                    ),
                    new HumanMessage(newMessage)
                ];

                // Start streaming events
                try {
                    const eventStream = await submitQuery(langChainMessages, chatId);

                    for await (const event of eventStream) {
                        if (event.event === "on_chat_model_stream") {
                            // Retrieve token from event object
                            const token = event.data.chunk;

                            if (token) {
                                // Retrieve text from AIMessageChunk
                                const text = token.content.at(0)?.["text"]

                                if (text) {
                                    await sendSSEMessage(writer, {
                                        type: StreamMessageType.Token,
                                        token: text
                                    })
                                }
                            }
                        } else if (event.event === "on_tool_start") {
                            await sendSSEMessage(writer, {
                                type: StreamMessageType.ToolStart,
                                tool: event.name || "unknown",
                                input: event.data.input
                            })
                        } else if (event.event === "on_tool_end") {
                            const toolMessage = new ToolMessage(event.data.output);

                            await sendSSEMessage(writer, {
                                type: StreamMessageType.ToolEnd,
                                tool: toolMessage.lc_kwargs.name || "unknown",
                                output: event.data.output
                            })
                        }
                    }

                    // Send completion message without storing the response
                    await sendSSEMessage(writer, {type: StreamMessageType.Done})
                } catch (streamError) {
                    console.error("Error in streaming events:", streamError);
                    await sendSSEMessage(writer, {
                        type: StreamMessageType.Error,
                        error: streamError instanceof Error 
                            ? streamError.message : "Error in processing stream."
                    })
                }
            } catch (error) {
                console.error("Error in stream:", error);
                await sendSSEMessage(writer, {
                    type: StreamMessageType.Error,
                    error: error instanceof Error 
                        ? error.message : "Unknown error."
                })
            }
        }
    } catch {

    }
}