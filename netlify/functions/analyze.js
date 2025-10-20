// Netlify Serverless Function for Answer Analysis
const Anthropic = require('@anthropic-ai/sdk');

exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  // Handle preflight
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
    const { studentAnswers, testContent } = JSON.parse(event.body);

    if (!studentAnswers || !testContent) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing required data' })
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

Analyze ALL answers and provide comprehensive feedback. Return ONLY valid JSON (no markdown):

{
  "totalScore": number (out of 70),
  "letterGrade": "A/B/C/D/F",
  "sectionScores": {
    "plotElements": {"score": number, "total": 30, "feedback": "string"},
    "poetry": {"score": number, "total": 30, "feedback": "string"},
    "vocabulary": {"score": number, "total": 40, "feedback": "string"}
  },
  "questionFeedback": [
    {
      "questionNumber": number,
      "isCorrect": boolean,
      "studentAnswer": "string",
      "correctAnswer": "string",
      "feedback": "detailed explanation",
      "contextClues": "what to look for",
      "improvement": "how to improve"
    }
  ],
  "overallFeedback": {
    "strengths": ["array of strengths"],
    "areasForGrowth": ["array of areas"],
    "studyTips": ["array of tips"],
    "encouragement": "positive message"
  }
}`;

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4000,
      messages: [{ role: 'user', content: prompt }]
    });

    const responseText = message.content[0].text
      .replace(/```json\s*/g, '')
      .replace(/```\s*/g, '')
      .trim();

    let analysis;
    try {
      analysis = JSON.parse(responseText);
    } catch (parseError) {
      console.error('Parse error:', parseError);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Failed to parse analysis' })
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        analysis,
        usage: {
          input_tokens: message.usage.input_tokens,
          output_tokens: message.usage.output_tokens
        }
      })
    };

  } catch (error) {
    console.error('Analysis error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Failed to analyze answers',
        details: error.message 
      })
    };
  }
};
