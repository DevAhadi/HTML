import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { checkoutRequestID } = req.body;

  // 🔐 Hardcoded credentials
  const consumerKey = 'WjPKI4eiIGhGiUD3NDejRixBVVBPvHAtxxwIVRvx5BcJBhSD';
  const consumerSecret = 'yfYdUa9tawMwMS4tLqGjFBTbnt2pmi6GFWlRwIpcYGSIW27BIAEiosrA1i93eHhc';
  const shortcode = '3088682';
  const passkey = 'd7bVpIAs3QblZy8+Fxmd8pCSRHVC16JIYRNs5hsnZEfNKmF5YSzv4t4YSO305dvG6fNJ/kHvC1I4qMG7/O54zDbyEO3VcSXSncPiXZ4xSNzf1dh44Xc2N9nuPxT1Eq5ojQlTPi448Atr3wxsoN7hkX7PCB0IfRY+YYwoJq6aHlR5YBovNdTUtZGU18/sYqbeseGRmb/noey5rG/0HonWPu6E8RQl2QALbmsYXjSPEgLB8QTZXcKQYjQUKmiaKLL81qtqjcSLBv5ZV6G2PIOaadOk7/goF4l4PXu7sdVjhcNYVFp26nxXqlvTPzJpaGAYH9/CoSq8uVNiXaGAHQHNrg==';
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

    // 🔍 Query transaction status
    const queryRes = await axios.post(
      'https://api.safaricom.co.ke/mpesa/transactionstatus/v1/query',
      {
        Initiator: 'testapi', // Replace with your initiator name
        SecurityCredential: password,
        CommandID: 'TransactionStatusQuery',
        TransactionID: checkoutRequestID,
        PartyA: shortcode,
        IdentifierType: '4', // 4 = Till Number
        ResultURL: 'https://ahadi-aviator.vercel.app/api/callback',
        QueueTimeOutURL: 'https://ahadi-aviator.vercel.app/api/callback',
        Remarks: 'Verify payment'
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );

    res.status(200).json({ status: 'Query Sent', data: queryRes.data });
  } catch (error) {
    console.error('Verification Error:', error.response?.data || error.message);
    res.status(500).json({ status: 'Error', message: 'Verification Failed' });
  }
    }
