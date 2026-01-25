import { ChatAnthropic } from "@langchain/anthropic";
import { ToolNode } from "@langchain/langgraph/prebuilt";
import wxflows from "@wxflows/sdk/langchain";
import { SYSTEM_MESSAGE } from "@/constants/systemMessage";
import {
    ChatPromptTemplate, MessagesPlaceholder
} from "@langchain/core/prompts";
import {
    SystemMessage,
    trimMessages,
    AIMessage,
    BaseMessage,
    HumanMessage
} from "@langchain/core/messages";
import {
    MessagesAnnotation,
    START,
    StateGraph,
    END,
    MemorySaver
} from "@langchain/langgraph";

const trimmer = trimMessages({
    maxTokens: 10,
    strategy: "last",
    tokenCounter: (msgs) => msgs.length,
    includeSystem: true,
    allowPartial: false,
    startOn: "human",
});

// Connect to wxFlows
const toolClient = new wxflows({
    endpoint: process.env.WXFLOWS_ENDPOINT || "",
    apikey: process.env.WXFLOWS_API_KEY,
});

// Retrieve the tools
const tools = await toolClient.lcTools;
const toolNode = new ToolNode(tools);

const initializeModel = () => {
    const model = new ChatAnthropic({
        modelName: "claude-sonnet-4",
        anthropicApiKey: process.env.ANTHROPIC_API_KEY,
        temperature: 0.7,
        maxTokens: 4096,
        streaming: true,

        // prompt caching using anthropic api
        clientOptions: {
            defaultHeaders: {
                "anthropic-beta": "prompt-caching-2024",
            },
        },
    }).bindTools(tools)

    return model;
};

// Implement the conditional edge for the state graph
function conditionalEdge(state: typeof MessagesAnnotation.State) {
    const messages = state.messages;
    const lastMessage = messages[messages.length - 1] as AIMessage

    // If the LLM makes a tool call, then we route to the "tools" node
    if (lastMessage.tool_calls?.length) {
        return "tools";
    }

    // If the last message is a tool message, route to the agent
    if (lastMessage.content && lastMessage._getType() === "tool") {
        return "agent";
    }

    // Otherwise, we stop (reply to the user)
    return END;
}

// Implement workflow
const createWorkflow = () => {
    const model = initializeModel();

    const stateGraph = new StateGraph(MessagesAnnotation).addNode(
        "agent", async (state) => {
            // Create the system message content
            const systemContent = SYSTEM_MESSAGE;

            // Create the prompt template with system message and messages placeholder
            const promptTemplate = ChatPromptTemplate.fromMessages([
                new SystemMessage(systemContent, {
                    cache_control: {type: "ephemeral"},
                }),
                new MessagesPlaceholder("messages"),
            ]);

            // Trim the messages to manage conversation history
            const trimmedMessages = await trimmer.invoke(state.messages);

            // Format the prompt with the current messages
            const prompt = await promptTemplate.invoke({ messages: trimmedMessages });

            // Get response from the model
            const response = await model.invoke(prompt);

            return {messages: [response]};
        }
    )
    .addEdge(START, "agent")
    .addNode("tools", toolNode)
    .addConditionalEdges("agent", conditionalEdge)
    .addEdge("tools", "agent");

    return stateGraph;
};