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
            } catch {
                
            }
        }
    } catch {

    }
}