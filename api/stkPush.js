import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { phone } = req.body;

  // ✅ Hardcoded credentials and config
  const consumerKey = 'WjPKI4eiIGhGiUD3NDejRixBVVBPvHAtxxwIVRvx5BcJBhSD';
  const consumerSecret = 'yfYdUa9tawMwMS4tLqGjFBTbnt2pmi6GFWlRwIpcYGSIW27BIAEiosrA1i93eHhc';
  const passkey = 'd7bVpIAs3QblZy8+Fxmd8pCSRHVC16JIYRNs5hsnZEfNKmF5YSzv4t4YSO305dvG6fNJ/kHvC1I4qMG7/O54zDbyEO3VcSXSncPiXZ4xSNzf1dh44Xc2N9nuPxT1Eq5ojQlTPi448Atr3wxsoN7hkX7PCB0IfRY+YYwoJq6aHlR5YBovNdTUtZGU18/sYqbeseGRmb/noey5rG/0HonWPu6E8RQl2QALbmsYXjSPEgLB8QTZXcKQYjQUKmiaKLL81qtqjcSLBv5ZV6G2PIOaadOk7/goF4l4PXu7sdVjhcNYVFp26nxXqlvTPzJpaGAYH9/CoSq8uVNiXaGAHQHNrg==';
  const shortcode = '3088682'; // Till number
  const amount = 350;
  const callbackURL = 'https://ahadi-aviator.vercel.app/api/callback';

  const timestamp = new Date().toISOString().replace(/[-T:.Z]/g, '').slice(0, 14);
  const password = Buffer.from(shortcode + passkey + timestamp).toString('base64');

  try {
    // 🔐 Get access token
    const tokenRes = await axios.get(
      'https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
      {
        auth: {
          username: consumerKey,
          password: consumerSecret
        }
      }
    );

    const accessToken = tokenRes.data.access_token;

    // 📲 Send STK Push
    const stkRes = await axios.post(
      'https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
      {
        BusinessShortCode: shortcode,
        Password: password,
        Timestamp: timestamp,
        TransactionType: 'CustomerBuyGoodsOnline',
        Amount: amount,
        PartyA: phone,
        PartyB: shortcode,
        PhoneNumber: phone,
        CallBackURL: callbackURL,
        AccountReference: 'AVIATOR',
        TransactionDesc: 'Access Key Purchase'
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );

    res.status(200).json({ ResponseCode: '0', Message: 'STK Push Sent' });
  } catch (error) {
    console.error('STK Push Error:', error.response?.data || error.message);
    res.status(500).json({ ResponseCode: '1', Message: 'STK Push Failed' });
  }
        }      ResponseCode: response.data.ResponseCode,
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
