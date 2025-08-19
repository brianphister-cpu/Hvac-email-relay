const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { to, subject, text, csvContent, secret } = req.body;

  if (secret !== process.env.SHARED_SECRET) {
    return res.status(403).json({ error: 'Forbidden: bad secret' });
  }

  try {
    const msg = {
      to,
      from: process.env.FROM_EMAIL,
      subject,
      text,
      attachments: [
        {
          content: Buffer.from(csvContent).toString("base64"),
          filename: "hvac_history.csv",
          type: "text/csv",
          disposition: "attachment",
        },
      ],
    };
    await sgMail.send(msg);
    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
