exports.handler = async function(event) {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { assignmentName, instructions, performanceLevel } = JSON.parse(event.body);

    const levelMap = {
      'excellent': 'Excellent — the student performed exceptionally well',
      'satisfactory': 'Satisfactory — the student met the basic requirements',
      'needs-improvement': 'Needs Improvement — the student struggled with key concepts'
    };

    const prompt = `You are a CNS (Computer Networking & Security) instructor writing feedback for a student assignment.

Assignment Name: ${assignmentName}
Assignment Instructions:
${instructions}

Performance Level: ${levelMap[performanceLevel]}

Write 3-5 sentences of professional, constructive instructor feedback for a student who performed at the "${performanceLevel}" level on this assignment.
- Address the student directly using "you"
- Be specific to the assignment content
- If Excellent: highlight what they likely did well and encourage continued excellence
- If Satisfactory: acknowledge what was done well and suggest 1-2 areas to improve
- If Needs Improvement: be constructive and kind, explain what needs work and how to improve
- Keep it concise and ready to paste into Canvas SpeedGrader`;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        messages: [{ role: 'user', content: prompt }]
      })
    });

    const data = await response.json();
    const feedback = data.content?.[0]?.text || 'Could not generate feedback.';

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ feedback })
    };

  } catch(e) {
    console.error(e);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to generate feedback' })
    };
  }
};