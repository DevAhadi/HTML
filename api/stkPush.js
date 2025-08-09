import axios from 'axios';
import moment from 'moment';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { phone, amount } = req.body;

  try {
    const token = await getAccessToken();
    const timestamp = moment().format('YYYYMMDDHHmmss');
    const password = Buffer.from(
      process.env.MPESA_SHORTCODE + process.env.MPESA_PASSKEY + timestamp
    ).toString('base64');

    const payload = {
      BusinessShortCode: process.env.MPESA_SHORTCODE, // Your Till number
      Password: password,
      Timestamp: timestamp,
      TransactionType: 'CustomerBuyGoodsOnline', // For Buy Goods Till
      Amount: amount,
      PartyA: phone, // Customer phone number
      PartyB: process.env.MPESA_SHORTCODE, // Your Till number
      PhoneNumber: phone,
      CallBackURL: process.env.MPESA_CALLBACK_URL,
      AccountReference: 'AHADITECH',
      TransactionDesc: 'Access Key Purchase'
    };

    const response = await axios.post(
      'https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
      payload,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    res.status(200).json({
      ResponseCode: response.data.ResponseCode,
      message: 'STK Push sent successfully'
    });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: 'STK Push failed' });
  }
}

async function getAccessToken() {
  const auth = Buffer.from(`${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`).toString('base64');
  const res = await axios.get(
    'https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
    { headers: { Authorization: `Basic ${auth}` } }
  );
  return res.data.access_token;
}