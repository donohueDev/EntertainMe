import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;

if (!RECAPTCHA_SECRET_KEY) {
  throw new Error('RECAPTCHA_SECRET_KEY is not defined in environment variables');
}

interface RecaptchaResponse {
  success: boolean;
  challenge_ts?: string;
  hostname?: string;
  'error-codes'?: string[];
}

export const verifyRecaptcha = async (token: string): Promise<boolean> => {
  try {
    if (!token) {
      console.warn('No reCAPTCHA token provided');
      return false;
    }

    const response = await axios.post<RecaptchaResponse>(
      'https://www.google.com/recaptcha/api/siteverify',
      new URLSearchParams({
        secret: RECAPTCHA_SECRET_KEY,
        response: token,
      }).toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    if (!response.data.success) {
      console.warn('reCAPTCHA verification failed:', response.data['error-codes']);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error verifying reCAPTCHA:', error);
    return false;
  }
};
