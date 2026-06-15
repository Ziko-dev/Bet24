export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }

  const q = {...req.query};
  const endpoint = q.endpoint;
  delete q.endpoint;
  const params = new URLSearchParams(q).toString();
  const url = `https://v3.football.api-sports.io/${endpoint}${params ? '?'+params : ''}`;

  try {
    const r = await fetch(url, {
      headers: { 'x-apisports-key': 'a7653a8d25msh386445ae2ed7381p1cd57fjsn35435810825d' }
    });
    const data = await r.json();
    res.status(200).json(data);
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
}
