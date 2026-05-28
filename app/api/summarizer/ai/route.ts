import React from 'react'
import { InferenceClient } from '@huggingface/inference'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const prompt: string | null = searchParams.get("input")
    const hugs = new InferenceClient(process.env.HUGGINGFACE_GENERATE)

    const chatCompletionQuery = await hugs.chatCompletion({
        model: "deepseek-ai/DeepSeek-R1:fastest",
        messages: [
            {
                role: "user",
                content: prompt!
            }
        ],
        provider: "auto",
        max_tokens: 400
    })

    const responses = chatCompletionQuery.choices[0].message.content


    return NextResponse.json({
        success: true,
        message: responses
    })

}
