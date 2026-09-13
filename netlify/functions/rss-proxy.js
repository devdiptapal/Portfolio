exports.handler = async () => {
  try {
    const response = await fetch('https://dpal.substack.com/feed');
    if (!response.ok) throw new Error(`Upstream ${response.status}`);
    const xml = await response.text();
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=1800',
      },
      body: xml,
    };
  } catch (err) {
    return {
      statusCode: 502,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
