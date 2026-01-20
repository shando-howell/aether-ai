"use client"

import { Id, Doc } from "@/convex/_generated/dataModel";
import { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { api } from "@/convex/_generated/api";

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

    // Handle DOM reference side-effect
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({behavior: "smooth"})
    }, [messages, setMessages]);
}