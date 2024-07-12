const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors');
require('dotenv').config();

const { handleSkillGapAnalysis } = require('./skillGapModule');
const { handleMockInterview } = require('./mockInterviewModule');
const { handleResumeReview } = require('./resumeReview');
const { generateLearningPlan } = require('./learningPlanGenerator');

const app = express();
const port = 3001;

const upload = multer({ dest: 'uploads/' });

app.use(bodyParser.json());
app.use(cors());

app.post('/skillbot', async (req, res) => {
    const { input, context } = req.body;

    try { 
        const result = await handleSkillGapAnalysis(input, context);
        res.json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.post('/learning', async (req, res) => {
    const { skill, dailyHours, months } = req.body;
    const userInput = `I want to learn ${skill}, I can dedicate ${dailyHours} every day, and I want to learn this skill in ${months} months. Generate a personalized learning plan for me.`
    try {
        console.log('Received request:', req.body);
        const response = await generateLearningPlan(userInput);
        console.log('Generated learning plan:', response);
        res.json({ plan: response });
    } catch (error) {
        console.error('Error generating learning plan:', error);
        res.status(500).json({ error: error.message });
    }
});

app.post('/interview', async (req, res) => {
    const userInput = req.body.userInput;
    try {
        const response = await handleMockInterview(userInput);
        res.json({ response });
    } catch (error) {
        console.error('Error handling mock interview:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/review-resume', upload.single('resume'), async (req, res) => {
    try {
      const filePath = req.file.path;
      const mimeType = req.file.mimetype;
      const reviewText = await handleResumeReview(filePath, mimeType);
      res.status(200).send({ review: reviewText });
    } catch (error) {
      res.status(500).send({ error: 'An error occurred while reviewing the resume.' });
    }
  });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});