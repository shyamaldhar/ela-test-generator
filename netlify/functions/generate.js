// Netlify Serverless Function for ELA Test Generator
const Anthropic = require('@anthropic-ai/sdk');

exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { type } = JSON.parse(event.body);

    // Validate type parameter
    if (!['story', 'poem', 'vocabulary'].includes(type)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid type parameter' })
      };
    }

    // Initialize Anthropic client
    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY
    });

    // Generate prompts based on type
    let prompt = '';
    
    if (type === 'story') {
      prompt = `Create an original short story (300-400 words) appropriate for 7th-8th grade students. The story should:
- Have a clear protagonist facing a meaningful conflict
- Include all plot elements: exposition, conflict, rising action, climax, falling action, and resolution
- Teach a valuable life lesson
- Be engaging and relatable to middle school students
- Use age-appropriate vocabulary and themes

Return ONLY a JSON object in this exact format (no markdown, no backticks):
{
  "title": "Story Title",
  "text": "Full story text with paragraphs separated by \\n\\n",
  "exposition": "Brief description of exposition",
  "conflict": "Brief description of main conflict",
  "risingAction": "Brief description of rising action",
  "climax": "Brief description of climax",
  "fallingAction": "Brief description of falling action",
  "resolution": "Brief description of resolution"
}`;
    } else if (type === 'poem') {
      prompt = `Create an original poem (8-12 lines) appropriate for 7th-8th grade students. The poem should:
- Have a clear theme suitable for analysis
- Use literary devices (metaphor, simile, etc.)
- Have a consistent structure and rhythm
- Be meaningful and thought-provoking
- Be appropriate for middle school students

Return ONLY a JSON object in this exact format:
{
  "title": "Poem Title",
  "author": "Original (for this test)",
  "text": "Full poem text with line breaks as \\n",
  "theme": "Main theme of the poem",
  "mood": "Overall mood",
  "tone": "Tone of the poem",
  "structure": "Description of structure and rhyme scheme"
}`;
    } else if (type === 'vocabulary') {
      prompt = `Create 12 unique vocabulary words appropriate for 7th-8th grade students. Each word should:
- Be challenging but learnable
- Have clear educational value
- Include varied word types (adjectives, verbs, nouns)
- Be useful in academic and real-world contexts

Return ONLY a JSON array of 12 objects in this exact format:
[
  {
    "word": "vocabulary word",
    "definition": "clear definition",
    "synonyms": ["syn1", "syn2", "syn3"],
    "antonyms": ["ant1", "ant2", "ant3"],
    "sentence": "Example sentence with _______ as blank",
    "prefix": "prefix info or None",
    "context": "Another context sentence with _______ as blank"
  }
]`;
    }

    // Call Claude API
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: type === 'vocabulary' ? 3000 : 2000,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    });

    // Extract and clean response
    const responseText = message.content[0].text;
    const cleanedText = responseText
      .replace(/```json\s*/g, '')
      .replace(/```\s*/g, '')
      .trim();

    // Parse JSON
    let parsedData;
    try {
      parsedData = JSON.parse(cleanedText);
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      console.error('Response text:', cleanedText);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          error: 'Failed to parse AI response',
          details: parseError.message 
        })
      };
    }

    // Return success
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        data: parsedData,
        usage: {
          input_tokens: message.usage.input_tokens,
          output_tokens: message.usage.output_tokens
        }
      })
    };

  } catch (error) {
    console.error('API Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Failed to generate content',
        details: error.message 
      })
    };
  }
};
