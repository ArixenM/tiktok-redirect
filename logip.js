// api/logip.js
export default function handler(req, res) {
  if (req.method === 'POST') {
    const ip = req.body.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    console.log('Logged IP address:', ip); // visible in Vercel logs
    res.status(200).send('OK');
  } else if (req.method === 'GET') {
    res.status(200).send('Server is running');
  } else {
    res.status(405).send('Method Not Allowed');
  }
}
