import getAccessKey from '../utils/accessKey.js';

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { key } = req.body;
  const validKey = getAccessKey();

  if (key === validKey) {
    return res.status(200).json({ valid: true });
  } else {
    return res.status(401).json({ valid: false });
  }
}