import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
dotenv.config();

let ai = null;
if (process.env.GEMINI_API_KEY) {
  ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
}

/**
 * Calls Gemini with the provided prompt and system instructions.
 * If GEMINI_API_KEY is missing, returns deterministic mock outputs for the Lahore demo.
 */
async function callGemini(prompt, systemInstruction = 'You are a helpful assistant.') {
  if (!ai) {
    console.log('No GEMINI_API_KEY found, using mock deterministic output.');
    
    // Deterministic mock outputs for the Lahore demo scenario
    if (systemInstruction.includes('Input Agent')) {
      return "Data Summary: Orders in Lahore dropped by 25% this month. Delivery complaints have increased, leading to falling customer satisfaction.";
    }
    if (systemInstruction.includes('Insight Agent')) {
      return "Lahore is facing a combined demand decline and delivery experience issue. The 25% order drop is strongly linked to rising delivery complaints.";
    }
    if (systemInstruction.includes('Impact Agent')) {
      return "This creates a high revenue and retention risk. If unresolved, customer churn and negative word-of-mouth may increase.";
    }
    if (systemInstruction.includes('Action Agent')) {
      return "Launch a Lahore recovery discount campaign.\nAssign the operations team to audit delivery complaints.\nSend a retention message to affected customers.";
    }
    if (systemInstruction.includes('Simulation Agent')) {
      return "Campaign draft created: Lahore Recovery Offer.\nHigh-priority Ops ticket AST-991 assigned.\nCustomer notification drafted for affected Lahore users.";
    }
    
    return "Generic Mock Output for Demo.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.2, // low temp for analytical tasks
      }
    });
    return response.text;
  } catch (error) {
    console.error('Error calling Gemini:', error);
    throw new Error('LLM Provider Error');
  }
}

export { callGemini };
