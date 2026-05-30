import React from 'react'
import { InferenceClient } from '@huggingface/inference'
import { OpenRouter } from '@openrouter/sdk'
import { NextResponse } from 'next/server'
import OpenAI from 'openai'
import { projectOnExit } from 'next/dist/build/swc/generated-native'
import { stream } from '@openrouter/sdk/lib/matchers.js'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const prompt: string | null = searchParams.get("input")
    console.log(`Prompters: ${prompt}`)
    //  const hugs = new InferenceClient(process.env.HUGGINGFACE_GENERATE)

    const OLLAMA_HOST_IP = '100.108.219.61'
    const MODEL_NAME = 'gemma4'


    /* const chatCompletionQuery = await hugs.chatCompletion({
        model: "deepseek-ai/DeepSeek-R1:fastest",
        messages: [
            {
                role: "user",
                content: prompt!
            }
        ],
        provider: "auto",
        max_tokens: 400
    }) */

    const response = await fetch(`http://${OLLAMA_HOST_IP}:11434/api/generate`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: MODEL_NAME,
            prompt: prompt,
            stream: false
        })
    })

    const data = await response.json()



    // const responses = response.choices[0]?.message?.content


    return NextResponse.json({
        success: true,
        message: data.response
    })

}
