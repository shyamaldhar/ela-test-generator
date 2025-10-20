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
    const { type } = body;

    if (!process.env.ANTHROPIC_API_KEY) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'API key not configured' })
      };
    }

    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY
    });

    let prompt = '';
    if (type === 'story') {
      prompt = 'Create a short story for 7th-8th grade with clear plot elements. Return as JSON with: title, text, exposition, conflict, risingAction, climax, fallingAction, resolution';
    } else if (type === 'poem') {
      prompt = 'Create a poem for 7th-8th grade. Return as JSON with: title, author, text, theme, mood, tone, structure';
    } else {
      prompt = 'Create 12 vocabulary words for 7th-8th grade. Return as JSON array with: word, definition, synonyms, antonyms, sentence, prefix, context';
    }

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2000,
      messages: [{ role: 'user', content: prompt }]
    });

    const text = message.content[0].text.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
    const data = JSON.parse(text);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, data })
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
