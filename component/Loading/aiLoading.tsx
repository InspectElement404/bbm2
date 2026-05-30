import React from "react"

export default function AiLoad() {
    return (
        <div className="flex min-h-[300px] flex-col items-center justify-center gap-4">
            {/* Rotating Spinner */}
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-blue-500" />

            {/* Loading Text */}
            <div className="text-center">
                <h1 className="text-lg font-semibold text-slate-800">
                    Generating AI Insights
                </h1>

                <p className="animate-pulse text-sm text-slate-500">
                    Please wait while AI prepares the summary...
                </p>
            </div>
        </div>
    )
}