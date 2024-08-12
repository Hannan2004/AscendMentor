const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Google Generative AI with your API key
const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

// Configure the generative model with specific instructions
const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
    systemInstruction: `You are a personalized learning plan generator.
User will provide the following inputs:
1. Skill they want to learn
2. Number of hours they can dedicate each day
3. Number of months they wish to invest in learning that skill

Based on the user's inputs, generate a personalized learning plan that includes:
1. A complete roadmap with detailed milestones
2. Suggested resources categorized into paid and free options
3. Project ideas for hands-on experience

Ensure the plan is comprehensive, actionable, and tailored to the user’s specific needs.`,
});

// Configuration for the AI model's text generation
const generationConfig = {
    temperature: 1, // Adjusts the creativity of the responses
    topP: 0.95, // Controls the cumulative probability for token sampling
    topK: 64, // Limits the sampling to the top K tokens
    maxOutputTokens: 1024, // Maximum length of the generated text
    responseMimeType: 'text/plain', // Format of the generated response
};

// Function to generate a learning plan based on user input
const generateLearningPlan = async (input) => {
    try {
        // Start a chat session with the AI model
        const chatSession = model.startChat({
            generationConfig,
            history: [
                {
                    role: 'user',
                    parts: [{ text: input }],
                },
            ],
        });

        // Send the input to the model and get the response
        const result = await chatSession.sendMessage(input);
        console.log('API response:', result);
        
        // Clean up the response to remove unnecessary quotation marks
        let generatedText = result.response.text();
        generatedText = generatedText.replace(/^"|"$/g, ''); // Remove leading and trailing quotes

        // Return the cleaned-up learning plan
        return generatedText;
    } catch (error) {
        // Handle any errors that occur during the generation process
        console.error('Error in generateLearningPlan:', error);
        throw new Error('Failed to generate learning plan');
    }
};

// Export the function for use in other parts of your application
module.exports = { generateLearningPlan };
