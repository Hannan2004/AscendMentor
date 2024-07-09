const express = require('express');
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');
const { handleSkillGapAnalysis } = require('./skillGapModule');
const { handleLearningPlan } = require('./dynamicLearning');
const { startMockInterview } = require('./mockInterviewModule');
const cors = require('cors');
const fs = require('fs');
require('dotenv').config();

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

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
    const { message } = req.body;

    try {
        const result = await handleLearningPlan(message);
        res.json({ reply: result.response });
    } catch (error) {
        console.error("Error handling learning plan:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.post('/mock-interview', upload.single('resume'), async (req, res) => {
  const { jobPosition } = req.body;
  const { path: resumePath } = req.file;

  try {
      const result = await startMockInterview(resumePath, jobPosition);
      res.json(result);
  } catch (error) {
      console.error('Error starting mock interview:', error);
      res.status(500).send('Internal Server Error');
  } finally {
      // Clean up uploaded file after use (optional)
      fs.unlinkSync(resumePath);
  }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});