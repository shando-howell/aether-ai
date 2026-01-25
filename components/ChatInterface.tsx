"use client"

import { Id, Doc } from "@/convex/_generated/dataModel";
import { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { api } from "@/convex/_generated/api";
import { ChatRequestBody } from "@/lib/types";
import { createSSEParser } from "@/lib/createSSEParser";

interface ChatInterfaceProps {
    chatId: Id<"chats">,
    initialMessages: Doc<"messages">[]
}

const ChatInterface = ({chatId, initialMessages}: ChatInterfaceProps) => {
    const [messages, setMessages] = useState<Doc<"messages">[]>(initialMessages);
    const [input, setInput] = useState("");
    const [streamedResponse, setStreamedResponse] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [currentTool, setCurrentTool] = useState<{name: string, input: unknown} | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Format tool output
    const formatToolOutput = (output: unknown): string => {
        if (typeof output === "string") {
            return output;
        }
        return JSON.stringify(output, null, 2);
    }

    // Format terminal output
    const formatTerminalOutput = (
        tool: string,
        input: unknown,
        output: unknown
    ) => {
        const terminalHTML = `
            <div>${tool}</div>
            <pre>${formatToolOutput(input)}</pre>
            <pre>${formatToolOutput(output)}</pre>
        `;
        return `${terminalHTML}`;
    }

    // Process stream helper
    const processStream = async (
        reader: ReadableStreamDefaultReader<Uint8Array>,
        onChunk: (chunk: string) => Promise<void>
    ) => {
        try {
            while (true) {
                const {done, value} = await reader.read();
                if (done) break;
                await onChunk(new TextDecoder().decode(value));
            }
        } finally {
            reader.releaseLock();
        }
    }

    // Handle DOM reference side-effect
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({behavior: "smooth"})
    }, [messages, setMessages]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Trim user input
        const trimmedInput = input.trim();
        if (!trimmedInput) return;

        // Reset user state for new message
        setInput("");
        setStreamedResponse("");
        setCurrentTool(null);
        setIsLoading(true);

        // Show user message for better UX
        const optimisticUserMessage: Doc<"messages"> = {
            _id: `temp_${Date.now()}`,
            chatId,
            role: "user",
            content: trimmedInput,
            createdAt: Date.now()
        } as Doc<"messages">;

        // Track full response for adding to the DB
        let fullResponse = "";

        // Start streaming
        try {
            const requestBody: ChatRequestBody = {
                messages: messages.map((msg) => ({
                    role: msg.role,
                    content: msg.content
                })),
                newMessage: trimmedInput,
                chatId
            }

            // Initialize SSE connection
            const response = await fetch("/api/chat/stream", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                throw new Error(await response.text());
            }

            if (!response.body) {
                throw new Error("No res body available.")
            }

            // Handle the stream
            // Create SSE parser and stream reader
            const parser = createSSEParser();
            const reader = response.body.getReader();

            await processStream(reader, async (chunk) => {
                // Parse messages from chunk
                const messages = parser.parse(chunk);

                // Handle messages based on type
                for (const message of messages) {
                    switch (message.type) {
                        
                    }
                }
            })
        } catch {

        }
    }
}