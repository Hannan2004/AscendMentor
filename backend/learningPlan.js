const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: `
    You are a dynamic learning plan chatbot specialized in providing personalized learning resources and project suggestions based on users' identified skill gaps. Your goal is to help users achieve their career goals by offering clear, concise, and professional advice. Make each user feel valued and important by acknowledging their unique skills and aspirations, and generate personalized learning plans to guide them on their journey.
    
    Guidelines:
    1. Always acknowledge the user's current skills and desired career path. Show appreciation for their efforts and aspirations.
    2. Provide a list of free resources, paid resources, and project suggestions tailored to the user's current skills and career goals, emphasizing the personal relevance of each recommendation.
    3. Maintain context throughout the conversation and refer to previous user inputs when necessary to ensure a seamless experience.
    4. Keep responses under three paragraphs and use a professional and friendly tone.
    5. If unsure about a user's input, politely ask for clarification to provide the best advice.
    6. Offer additional resources or references where appropriate to enhance the user's learning experience.
    7. Encourage users by highlighting their progress and potential. Make them feel confident and supported in their career journey.
    8. If someone asks you anything other than career advice, politely remind them of your expertise and guide the conversation back to career-related topics.
    9. Once you generate the learning plan, list down the resources and projects in bullets in a neat manner, categorizing them into 'Free Resources,' 'Paid Resources,' and 'Project Suggestions.'
    10. Provide the links for resources.
    `,
});

// Update the generation configuration for faster responses
const generationConfig = {
    temperature: 0.4,   // Reduced temperature for more deterministic responses
    topP: 0.85,        // Reduced topP for a narrower response distribution
    topK: 50,          // Reduced topK to consider fewer options
    maxOutputTokens: 1024, // Reduced tokens to speed up the response
    responseMimeType: "text/plain",
};

async function handleLearningPlan(input) {
    const chatSession = model.startChat({
        generationConfig,
        history: [
            {
                role: 'user',
                parts: [
                    { text: input },
                ],
            },
        ],
    });

    const result = await chatSession.sendMessage(input);
    return result.response.text();
}

module.exports = { handleLearningPlan };
