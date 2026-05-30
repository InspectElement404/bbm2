"use client"

import { useState } from "react"
import SampleGrid from "./SampleGrid"
import AI from "./AI"

export type RegProps = {
    regData: string
    setRegdata: React.Dispatch<
        React.SetStateAction<string>
    >
}

export type PressedProps = {
    tuldok: boolean
    setTuldok: React.Dispatch<
        React.SetStateAction<boolean>
    >
}

export type aiProps = {
    aiMsg: string
    setAI: React.Dispatch<
        React.SetStateAction<string>
    >
}

export type LoadProps = {
    loading: boolean
    setLoading: React.Dispatch<
        React.SetStateAction<boolean>
    >
}

export type PromptProps = {
    myprompt: string,
    setMyprompt: React.Dispatch<React.SetStateAction<string>>
}

export type AISuperProps = {
    Reg: RegProps
    Pressed: PressedProps
    AIprps: aiProps
    Loadprops: LoadProps
    ProProps: PromptProps
}

export type GridSuperProps = {
    Reg: RegProps
    Pressed: PressedProps
    Loadprops: LoadProps
    ProProps: PromptProps
}

function Face() {
    const [region, setRegion] =
        useState("")

    const [pressed, setPressed] =
        useState(false)

    const [aiMessage, setAI] =
        useState("")

    const [loading, setLoading] =
        useState(false)

    const [currPrompt, setCurrPrompt] = useState("");

    return (
        <div className="min-h-screen bg-slate-100 p-6">
            <div className="mx-auto flex max-w-[1600px] flex-col gap-6 lg:flex-row">
                {/* Left Side - Grid */}
                <section className="flex-1 rounded-3xl bg-white shadow-sm ring-1 ring-slate-200 overflow-hidden">
                    <SampleGrid
                        Reg={{
                            regData: region,
                            setRegdata: setRegion,
                        }}
                        Pressed={{
                            tuldok: pressed,
                            setTuldok: setPressed,
                        }}
                        Loadprops={{
                            loading,
                            setLoading,
                        }}
                        ProProps={{
                            myprompt: currPrompt,
                            setMyprompt: setCurrPrompt
                        }}
                    />
                </section>

                {/* Right Side - AI Panel */}
                <aside className="w-full lg:w-[380px] xl:w-[420px]">
                    <div className="sticky top-6 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                        <div className="mb-5 border-b border-slate-200 pb-4 flex items-center justify-center flex-col">
                            <h2 className="text-xl font-semibold text-slate-900">
                                AI Regional Insights
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                Quick facts and
                                summarized intelligence
                                about the selected
                                region.
                            </p>
                        </div>

                        <AI
                            Reg={{
                                regData: region,
                                setRegdata: setRegion,
                            }}
                            Pressed={{
                                tuldok: pressed,
                                setTuldok: setPressed,
                            }}
                            AIprps={{
                                aiMsg: aiMessage,
                                setAI,
                            }}
                            Loadprops={{
                                loading,
                                setLoading,
                            }}
                            ProProps={{
                                myprompt: currPrompt,
                                setMyprompt: setCurrPrompt
                            }}
                        />
                    </div>
                </aside>
            </div>
        </div>
    )
}

export default Face