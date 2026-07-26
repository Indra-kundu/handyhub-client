'use client';

import { useState } from 'react';
import { Sparkles, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function RecommendationPage() {
    const [problem, setProblem] = useState('');
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleRecommend = async () => {
        if (!problem.trim() || loading) return;

        setLoading(true);
        setError('');
        setResult('');

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/ai/recommend`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userProblem: problem })
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || `Server Error (${res.status})`);
            }

            if (data.success) {
                setResult(data.recommendation);
            } else {
                setError('Something went wrong. Please try again.');
            }
        } catch (err: any) {
            console.error(err);
            setError(err.message || 'Failed to establish connection with the server.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">

                {/* Header Section */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center p-3 bg-blue-600 rounded-2xl shadow-md text-white mb-4">
                        <Sparkles className="w-8 h-8 animate-pulse" />
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                        Smart Service Recommendation Engine
                    </h1>
                    <p className="mt-3 text-base text-slate-600 max-w-xl mx-auto">
                        Describe your issue, and our AI will search our database to find the absolute best matching service for you.
                    </p>
                </div>

                {/* Main Card */}
                <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden p-6 sm:p-8">
                    <label
                        htmlFor="problem-input"
                        className="block text-sm font-semibold text-slate-700 mb-2"
                    >
                        What problem are you facing?
                    </label>

                    <textarea
                        id="problem-input"
                        value={problem}
                        onChange={(e) => setProblem(e.target.value)}
                        placeholder="e.g., My AC needs emergency repair and gas refilling..."
                        rows={4}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-800 placeholder-slate-400 transition-all resize-none shadow-sm"
                    />

                    <div className="mt-5 flex justify-end">
                        <button
                            onClick={handleRecommend}
                            disabled={loading || !problem.trim()}
                            className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                    Analyzing Services...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="w-5 h-5 mr-2" />
                                    Find Smart Service
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Error Banner */}
                {error && (
                    <div className="mt-6 p-4 rounded-xl bg-red-50 border border-red-200 flex items-center space-x-3 text-red-700 shadow-sm animate-fade-in">
                        <AlertCircle className="w-6 h-6 flex-shrink-0 text-red-500" />
                        <p className="text-sm font-medium">{error}</p>
                    </div>
                )}

                {/* Result Display Box */}
                {result && (
                    <div className="mt-8 bg-white rounded-2xl shadow-xl border border-slate-100 p-6 sm:p-8 animate-fade-in">
                        <div className="flex items-center space-x-3 mb-4 pb-3 border-b border-slate-100">
                            <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600">
                                <CheckCircle2 className="w-6 h-6" />
                            </div>
                            <h2 className="text-xl font-bold text-slate-900">
                                AI Expert Advice & Recommendation
                            </h2>
                        </div>
                        <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed whitespace-pre-wrap bg-slate-50 p-5 rounded-xl border border-slate-100">
                            {result}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}