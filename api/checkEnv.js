export default function handler(req, res) {
  res.status(200).json({
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY ? "set" : "missing",
    FROM_EMAIL: process.env.FROM_EMAIL || "missing",
    SHARED_SECRET: process.env.SHARED_SECRET ? "set" : "missing",
  });
}
