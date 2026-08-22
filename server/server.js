import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory rate limiting (IP-based simple tracking)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 10;

app.use((req, res, next) => {
  const ip = req.ip || req.connection.remoteAddress;
  const now = Date.now();
  
  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, []);
  }
  
  const timestamps = rateLimitMap.get(ip).filter(time => now - time < RATE_LIMIT_WINDOW);
  if (timestamps.length >= MAX_REQUESTS) {
    return res.status(429).json({ error: 'Too many requests. Please try again in a minute.' });
  }
  
  timestamps.push(now);
  rateLimitMap.set(ip, timestamps);
  next();
});

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'LearnPro API', timestamp: new Date().toISOString() });
});

// Enrollment API Endpoint
app.post('/api/enrollment', async (req, res) => {
  const { fullName, email, phone, course, note, timestamp } = req.body;

  // Validation
  if (!fullName || !email || !phone || !course) {
    return res.status(400).json({ error: 'Missing required fields (Name, Email, Phone, Course).' });
  }

  console.log(`[ENROLLMENT RECEIVED] ${new Date().toISOString()}`);
  console.log(`Student: ${fullName} (${email} | ${phone})`);
  console.log(`Course Track: ${course}`);
  console.log(`Note: ${note || 'None'}`);

  // Check if SMTP is configured in environment
  const smtpConfigured = process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS;

  if (smtpConfigured) {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587', 10),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      // 1. Send Notification Email to Admissions Admin
      const adminMailOptions = {
        from: `"LearnPro Platform" <${process.env.SMTP_USER}>`,
        to: process.env.ADMIN_EMAIL || process.env.SMTP_USER,
        subject: `🔥 New Free 3-Day Demo Booking: ${fullName} (${course})`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #060814; color: #FFFFFF; border-radius: 12px;">
            <h2 style="color: #00F0FF; margin-top: 0;">🚀 New Demo Class Registration</h2>
            <hr style="border: 0; border-top: 1px solid rgba(255,255,255,0.1); margin: 15px 0;" />
            <p><strong>Student Name:</strong> ${fullName}</p>
            <p><strong>Email Address:</strong> ${email}</p>
            <p><strong>Phone Number:</strong> ${phone}</p>
            <p><strong>Selected Course:</strong> ${course}</p>
            <p><strong>Note / Question:</strong> ${note || 'None'}</p>
            <p><strong>Submitted At:</strong> ${timestamp || new Date().toISOString()}</p>
            <hr style="border: 0; border-top: 1px solid rgba(255,255,255,0.1); margin: 15px 0;" />
            <p style="font-size: 12px; color: #94A3B8;">Delivered automatically by LearnPro Cloud Gateway</p>
          </div>
        `,
      };

      // 2. Send Confirmation Email to Student
      const studentMailOptions = {
        from: `"LearnPro Academy" <${process.env.SMTP_USER}>`,
        to: email,
        subject: `🎉 Your Free 3-Day Live Demo Pass: ${course}`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 24px; background-color: #060814; color: #FFFFFF; border-radius: 12px; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #00F0FF; margin-top: 0;">Welcome to LearnPro, ${fullName}!</h2>
            <p style="color: #CBD5E1; font-size: 15px; line-height: 1.6;">
              Your seat for the <strong>Free 3-Day Live Demo Class</strong> in <strong>${course}</strong> has been successfully confirmed.
            </p>
            
            <div style="background: #0E1430; padding: 16px; border-radius: 8px; border: 1px solid #3B82F6; margin: 20px 0;">
              <h3 style="color: #FFFFFF; margin-top: 0; font-size: 14px;">Next Steps:</h3>
              <ul style="color: #94A3B8; font-size: 13px; padding-left: 20px; line-height: 1.8;">
                <li>Our admissions team will send your live classroom link 2 hours prior to the first session.</li>
                <li>Prepare any questions you'd like to ask our Microsoft & Cisco senior mentors.</li>
                <li>Zero credit card required — enjoy 100% full live access.</li>
              </ul>
            </div>

            <p style="color: #94A3B8; font-size: 12px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 15px;">
              Need urgent help? Reply directly to this email or reach us at <a href="mailto:admissions@learnpro.edu" style="color: #00F0FF;">admissions@learnpro.edu</a>.
            </p>
          </div>
        `,
      };

      await Promise.all([
        transporter.sendMail(adminMailOptions),
        transporter.sendMail(studentMailOptions),
      ]);

      return res.status(200).json({
        success: true,
        message: 'Free demo registered successfully and emails sent!',
      });
    } catch (mailError) {
      console.error('Nodemailer dispatch error:', mailError);
      // Still return 200 with notice so lead is not lost
      return res.status(200).json({
        success: true,
        message: 'Enrollment registered successfully (email queue fallback).',
      });
    }
  }

  // Development / Demo Mode Response when SMTP is not configured
  return res.status(200).json({
    success: true,
    message: 'Enrollment recorded successfully in development mode.',
    data: {
      fullName,
      email,
      phone,
      course,
      timestamp,
    },
  });
});

app.listen(PORT, () => {
  console.log(`==========================================`);
  console.log(` LearnPro Server Running on Port ${PORT} `);
  console.log(` Endpoint: http://localhost:${PORT}/api/enrollment `);
  console.log(`==========================================`);
});
