export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }

  const { path = 'fixtures/snapshot', ...rest } = req.query;
  const params = new URLSearchParams(rest).toString();
  const url = `https://txline-dev.txodds.com/api/${path}${params ? '?' + params : ''}`;

  try {
    const r = await fetch(url, {
      headers: {
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3ODY0OTQ3NDgsInJvbGUiOiJndWVzdCIsInNlc3Npb25JZCI6IjFhOTYyMmU2LTE0MzYtNGRiNi1iMzNiLWU4Y2M2MTJkMDZjMiIsIm1heWJlQ2xpZW50SXAiOiIxOC42OC41Mi4xMTUifQ.GD3HexFsMqfHgkXkLgh2KYJSJXDCGyGGjT1pVqgfG3OR09CP6efYOFj7cmIMeU9i10D2pqnvVM2s7JGP7rnjeg',
        'X-Api-Token': 'txoracle_api_194e79f90cf449cc91b7a74cc8662ec9'
      }
    });
    const data = await r.json();
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
