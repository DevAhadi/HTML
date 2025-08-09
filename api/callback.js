export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const callbackData = req.body;
  const resultCode = callbackData?.Body?.stkCallback?.ResultCode;

  if (resultCode === 0) {
    console.log('✅ Payment confirmed');
    // You can log or store transaction here
  } else {
    console.log('❌ Payment failed or cancelled');
  }

  res.status(200).json({ message: 'Callback received' });
}