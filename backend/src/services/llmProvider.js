import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
dotenv.config();

const aiPrimary = process.env.GEMINI_API_KEY ? new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY }) : null;
const aiSecondary = process.env.GEMINI_API_KEY_SECONDARY ? new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY_SECONDARY }) : null;

async function callOpenAICompatible(url, apiKey, model, prompt, systemInstruction) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: model,
            messages: [
                { role: 'system', content: systemInstruction },
                { role: 'user', content: prompt }
            ],
            temperature: 0.2
        })
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.choices[0].message.content;
}

/**
 * Calls LLM with the provided prompt and system instructions using a 5-tier fallback.
 */
async function callLLM(prompt, systemInstruction = 'You are a helpful assistant.') {
    // Priority 1: Primary Gemini Key
    if (aiPrimary) {
        try {
            console.log("Attempting Priority 1: Primary Gemini Key");
            const response = await aiPrimary.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
                config: {
                    systemInstruction: systemInstruction,
                    temperature: 0.2,
                    responseMimeType: "application/json"
                }
            });
            return { text: response.text, provider: 'gemini_primary' };
        } catch (error) {
            console.error('Priority 1 failed:', error.message);
        }
    }

    // Priority 2: Secondary Gemini Key
    if (aiSecondary) {
        try {
            console.log("Attempting Priority 2: Secondary Gemini Key");
            const response = await aiSecondary.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
                config: {
                    systemInstruction: systemInstruction,
                    temperature: 0.2,
                    responseMimeType: "application/json"
                }
            });
            return { text: response.text, provider: 'gemini_secondary' };
        } catch (error) {
            console.error('Priority 2 failed:', error.message);
        }
    }

    // Priority 3: Groq
    if (process.env.GROQ_API_KEY) {
        try {
            console.log("Attempting Priority 3: Groq (gemma2-9b-it)");
            const text = await callOpenAICompatible(
                'https://api.groq.com/openai/v1/chat/completions',
                process.env.GROQ_API_KEY,
                'gemma2-9b-it',
                prompt,
                systemInstruction
            );
            return { text, provider: 'groq' };
        } catch (error) {
            console.error('Priority 3 failed:', error.message);
        }
    }

    // Priority 4: OpenRouter
    if (process.env.OPENROUTER_API_KEY) {
        try {
            console.log("Attempting Priority 4: OpenRouter (google/gemini-2.5-flash)");
            const text = await callOpenAICompatible(
                'https://openrouter.ai/api/v1/chat/completions',
                process.env.OPENROUTER_API_KEY,
                'google/gemini-2.5-flash',
                prompt,
                systemInstruction
            );
            return { text, provider: 'openrouter' };
        } catch (error) {
            console.error('Priority 4 failed for google/gemini-2.5-flash:', error.message);
            try {
                console.log("Attempting Priority 4 fallback: OpenRouter (openrouter/free)");
                const text = await callOpenAICompatible(
                    'https://openrouter.ai/api/v1/chat/completions',
                    process.env.OPENROUTER_API_KEY,
                    'openrouter/free',
                    prompt,
                    systemInstruction
                );
                return { text, provider: 'openrouter' };
            } catch (errorFallback) {
                console.error('Priority 4 fallback failed:', errorFallback.message);
            }
        }
    }

    // Priority 5: Deterministic fallback
    console.log("All providers failed. Falling back to deterministic tier 5.");
    return null; 
}

export { callLLM };
