import nodemailer, { SendMailOptions, Transporter, SentMessageInfo } from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

interface EmailOptions extends Omit<SendMailOptions, 'from'> {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string | string[];
}

export const sendEmail = async (options: EmailOptions): Promise<boolean> => {
  // Check if required environment variables are set
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    console.error('Email configuration missing. Please set EMAIL_USER and EMAIL_PASSWORD in your .env file');
    return false;
  }

  const transporter: Transporter<SentMessageInfo> = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 465,
    secure: true, // use SSL
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    },
    pool: true, // Use pooled connections
    maxConnections: 1, // Limit concurrent connections
    rateDelta: 1000, // Minimum time between messages in ms
    rateLimit: 14, // Max messages per rateDelta
  });

  const messageId = `entertianme-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  
  const mailOptions: SendMailOptions = {
    from: process.env.EMAIL_FROM || 'noreply@entertainme.com',
    ...options,
    headers: {
      'List-Unsubscribe': '<https://entertainme.pro/unsubscribe>', // Even though we don't need it for transactional emails
      'Feedback-ID': messageId,
      'X-Entity-Ref-ID': messageId,
      'X-Priority': '1',
      'X-MSMail-Priority': 'High',
      'Importance': 'high',
      'Precedence': 'bulk',
      'X-Auto-Response-Suppress': 'OOF, AutoReply',
      'X-Report-Abuse': 'Please report abuse here: https://entertainme.pro/report-abuse'
    }
  };

  try {
    console.log('Attempting to send email to:', options.to);
    const info = await transporter.sendMail(mailOptions);
    if (info && typeof info === 'object' && 'messageId' in info) {
      console.log('Email sent successfully:', info.messageId);
    } else {
      console.log('Email sent successfully');
    }
    return true;
  } catch (error) {
    console.error('Error sending email:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      to: options.to,
      subject: options.subject,
      host: 'smtp.zoho.com',
      user: process.env.EMAIL_USER // Don't log the password!
    });
    return false;
  }
};