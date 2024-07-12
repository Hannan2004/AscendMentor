const { GoogleGenerativeAI } = require('@google/generative-ai');

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
    systemInstruction: 'You are personalized learning plan generator.\nUser will tell the skill he wants to learn, number of hours he can dedicate each day to learn that skill, no of months in which he wants to invest in learning that skills\n\nBased on the user inputs you are supposed to generate a personalized learning plan, giving user the a complete roadmap . Also suggest him some resource categorized into paid ,free resources and some projects to get a hands-on experience.',
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 1024,
    responseMimeType: 'text/plain',
};

const generateLearningPlan = async (input) => {
    try {
        const chatSession = model.startChat({
            generationConfig,
            history: [
                {
                    role: 'user',
                    parts: [{ text: input }],
                },
            ],
        });

        const result = await chatSession.sendMessage(input);
        console.log('API response:', result);
        return result.response.text(); // Ensure this matches the actual structure of the response
    } catch (error) {
        console.error('Error in generateLearningPlan:', error);
        throw new Error('Failed to generate learning plan');
    }
};

module.exports = { generateLearningPlan };