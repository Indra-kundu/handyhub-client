'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Loader2, MessageSquare } from 'lucide-react';

interface ChatMessage {
    role: 'user' | 'model';
    text: string;
}

export default function ChatAssistantPage() {
    const [input, setInput] = useState('');
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to the latest message
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [chatHistory, loading]);

    const handleSendMessage = async () => {
        if (!input.trim() || loading) return;

        const userMessage = input.trim();
        setInput('');

        const newHistory: ChatMessage[] = [
            ...chatHistory,
            {
                role: 'user',
                text: userMessage,
            },
        ];

        setChatHistory(newHistory);
        setLoading(true);

        try {
            const formattedHistory = newHistory
                .filter((msg) => msg.role === 'user' || msg.role === 'model')
                .map((msg) => ({
                    role: msg.role,
                    parts: [{ text: msg.text }],
                }));

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/ai/chat`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        history: formattedHistory,
                        message: userMessage,
                    }),
                }
            );

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || `Server Error (${res.status})`);
            }

            setChatHistory([
                ...newHistory,
                {
                    role: 'model',
                    text: data.reply || "I'm sorry, I couldn't process that response.",
                },
            ]);
        } catch (err: any) {
            console.error(err);

            setChatHistory([
                ...newHistory,
                {
                    role: 'model',
                    text: err.message || 'Failed to establish connection with the server.',
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-10 px-4 sm:px-6">
            <div className="max-w-3xl mx-auto h-[750px] flex flex-col rounded-2xl border border-slate-100 bg-white shadow-2xl overflow-hidden">

                {/* Header */}
                <div className="bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between shadow-sm">
                    <div className="flex items-center space-x-3">
                        <div className="p-2.5 bg-blue-600 rounded-xl text-white shadow-md">
                            <Bot className="w-6 h-6" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                HandyHub AI Assistant
                                <Sparkles className="w-4 h-4 text-blue-500 animate-pulse" />
                            </h1>
                            <p className="text-xs font-medium text-slate-500">
                                Ask anything related to HandyHub services and support.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Chat Messages Body */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50">
                    {chatHistory.length === 0 && (
                        <div className="h-full flex flex-col items-center justify-center text-center px-4">
                            <div className="p-4 bg-blue-100/60 rounded-full text-blue-600 mb-3">
                                <MessageSquare className="w-8 h-8" />
                            </div>
                            <h3 className="text-lg font-semibold text-slate-800 mb-1">
                                Welcome to HandyHub Support!
                            </h3>
                            <p className="text-sm text-slate-500 max-w-sm">
                                How can I help you today? Ask about bookings, service details, or platform guidelines.
                            </p>
                        </div>
                    )}

                    {chatHistory.map((msg, index) => (
                        <div
                            key={index}
                            className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                                }`}
                        >
                            <div
                                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-xs shadow-sm ${msg.role === 'user' ? 'bg-blue-600' : 'bg-slate-700'
                                    }`}
                            >
                                {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                            </div>

                            <div
                                className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap shadow-sm ${msg.role === 'user'
                                        ? 'bg-blue-600 text-white rounded-tr-none'
                                        : 'bg-white border border-slate-100 text-slate-800 rounded-tl-none'
                                    }`}
                            >
                                {msg.text}
                            </div>
                        </div>
                    ))}

                    {loading && (
                        <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-700 text-white flex items-center justify-center shadow-sm">
                                <Bot className="w-4 h-4" />
                            </div>
                            <div className="bg-white border border-slate-100 text-slate-500 rounded-2xl rounded-tl-none px-4 py-3 text-sm shadow-sm flex items-center space-x-2">
                                <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                                <span className="italic font-medium">AI is thinking...</span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Footer */}
                <div className="bg-white border-t border-slate-100 p-4 flex items-center gap-3">
                    <input
                        type="text"
                        value={input}
                        placeholder="Type your question here..."
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSendMessage();
                            }
                        }}
                        className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-800 placeholder-slate-400 shadow-sm transition-all"
                    />

                    <button
                        onClick={handleSendMessage}
                        disabled={loading || !input.trim()}
                        className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
                    >
                        <Send className="w-4 h-4" />
                    </button>
                </div>

            </div>
        </div>
    );
}