import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: "AIzaSyDloIbXrKuJ70M5M3p4yF6r3IEx3EWipvw" });

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    if (message.action === "analyzePage") {
        console.log("Ai call......");
        let url = message.url;
        let pageText = message.pageText;
        const schema = {
            "description": "AI response schema for phishing detection",
            "type": "object",
            "properties": {
            "isPhishing": {
                "type": "boolean",
                "description": "Indicates whether the analyzed website is a phishing site"
            },
            "reason": {
                "type": "string",
                "description": "Brief explanation for the classification"
            },
            "evidence": {
                "type": "array",
                "description": "List of evidence supporting the classification",
                "items": {
                "type": "string"
                }
            },
            "severity": {
                "type": "string",
                "description": "Severity level of the phishing attempt (e.g., low, medium, high)",
                "enum": ["low", "medium", "high"]
            }
            },
            "required": ["isPhishing", "reason", "evidence", "severity"]
        };
        const prompt = `You're an anti-phishing AI. Analyze the following: URL: ${url} Text: ${pageText.slice(0, 2000)}. Detect if this page is phishing. i need output in this format only ${schema}`;
    
        try {
            const response = await ai.models.generateContent({
                model: "gemini-2.0-flash",
                contents: [{ role: "user", parts: [{ text: prompt }] }],
            });
            console.log("response ---- : ",response);
        } catch (error) {
            console.error('Error:- ', error);
        }
    }
});