export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }

  const { path = 'fixtures/snapshot', ...rest } = req.query;
  const params = new URLSearchParams(rest).toString();
  const url = `https://txline-dev.txodds.com/api/${path}${params ? '?' + params : ''}`;

  const JWT   = process.env.TXODDS_JWT;
  const TOKEN = process.env.TXODDS_TOKEN;

  try {
    const r = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${JWT}`,
        'X-Api-Token': TOKEN
      }
    });
    const data = await r.json();
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
