const Anthropic = require('@anthropic-ai/sdk');

exports.handler = async function(event, context) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const body = JSON.parse(event.body);
    const { studentAnswers, testContent } = body;
    
    if (!process.env.ANTHROPIC_API_KEY) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'API key not configured' })
      };
    }

    if (!studentAnswers || !testContent) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing studentAnswers or testContent' })
      };
    }

    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY
    });

    const prompt = `You are an experienced 7th-8th grade ELA teacher analyzing a student's test answers.

TEST CONTENT:
${JSON.stringify(testContent, null, 2)}

STUDENT ANSWERS:
${JSON.stringify(studentAnswers, null, 2)}

Analyze ALL answers and provide comprehensive feedback. Return ONLY valid JSON in this EXACT format (no markdown, no code blocks):

{
  "totalScore": 45,
  "letterGrade": "B",
  "sectionScores": {
    "plotElements": {
      "score": 15,
      "total": 30,
      "feedback": "Good understanding of plot structure."
    },
    "poetry": {
      "score": 18,
      "total": 30,
      "feedback": "Strong analysis of theme and mood."
    },
    "vocabulary": {
      "score": 12,
      "total": 40,
      "feedback": "Solid grasp of word meanings."
    }
  },
  "questionFeedback": [
    {
      "questionNumber": 1,
      "isCorrect": true,
      "studentAnswer": "A",
      "correctAnswer": "A",
      "feedback": "Correct!",
      "contextClues": "Look for background information.",
      "improvement": "Keep it up."
    }
  ],
  "overallFeedback": {
    "strengths": ["Strong comprehension", "Good vocabulary"],
    "areasForGrowth": ["Practice literary devices"],
    "studyTips": ["Read twice before answering"],
    "encouragement": "Great effort!"
  }
}`;

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4000,
      messages: [{ role: 'user', content: prompt }]
    });

    let text = message.content[0].text
      .replace(/```json\s*/g, '')
      .replace(/```\s*/g, '')
      .trim();

    let analysis;
    try {
      analysis = JSON.parse(text);
      
      // Ensure all required fields exist
      if (!analysis.sectionScores) analysis.sectionScores = {};
      if (!analysis.sectionScores.plotElements) {
        analysis.sectionScores.plotElements = { score: 0, total: 30, feedback: "No data" };
      }
      if (!analysis.sectionScores.poetry) {
        analysis.sectionScores.poetry = { score: 0, total: 30, feedback: "No data" };
      }
      if (!analysis.sectionScores.vocabulary) {
        analysis.sectionScores.vocabulary = { score: 0, total: 40, feedback: "No data" };
      }
      
    } catch (parseError) {
      console.error('Parse error:', parseError);
      
      // Return default structure
      analysis = {
        totalScore: 0,
        letterGrade: "N/A",
        sectionScores: {
          plotElements: { score: 0, total: 30, feedback: "Analysis error" },
          poetry: { score: 0, total: 30, feedback: "Analysis error" },
          vocabulary: { score: 0, total: 40, feedback: "Analysis error" }
        },
        questionFeedback: [],
        overallFeedback: {
          strengths: ["Unable to analyze"],
          areasForGrowth: ["Try again"],
          studyTips: ["Contact teacher"],
          encouragement: "Keep practicing!"
        }
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, analysis })
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message })
    };
  }
};
