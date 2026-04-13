exports.handler = async function(event) {
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

    const prompt = `You are a CNS (Computer Networking & Security) instructor writing feedback for a student assignment.\n\nAssignment Name: ${assignmentName}\nAssignment Instructions:\n${instructions}\n\nPerformance Level: ${levelMap[performanceLevel]}\n\nWrite 3-5 sentences of professional, constructive instructor feedback for a student who performed at the "${performanceLevel}" level on this assignment.\n- Address the student directly using "you"\n- Be specific to the assignment content\n- If Excellent: highlight what they likely did well and encourage continued excellence\n- If Satisfactory: acknowledge what was done well and suggest 1-2 areas to improve\n- If Needs Improvement: be constructive and kind, explain what needs work and how to improve\n- Keep it concise and ready to paste into Canvas SpeedGrader`;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 1000,
        messages: [{ role: 'user', content: prompt }]
      })
    });

    const data = await response.json();
    console.log('Anthropic response status:', response.status);
    console.log('Anthropic response body:', JSON.stringify(data));

    const feedback = data.content?.[0]?.text;
    if (!feedback) {
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ feedback: 'API error: ' + (data.error?.message || JSON.stringify(data)) })
      };
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ feedback })
    };

  } catch(e) {
    console.error('Function error:', e.message);
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ feedback: 'Error: ' + e.message })
    };
  }
};