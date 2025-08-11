export default function handler(req, res) {
  const body = req.body;

  console.log('M-Pesa Callback Received:', JSON.stringify(body));

  // You can store transaction details or trigger frontend updates here

  res.status(200).json({ ResultCode: 0, ResultDesc: 'Callback received successfully' });
}
