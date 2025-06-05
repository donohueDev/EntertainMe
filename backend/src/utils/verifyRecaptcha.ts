import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY;

if (!TURNSTILE_SECRET_KEY) {
  throw new Error('TURNSTILE_SECRET_KEY is not defined in environment variables');
}

interface TurnstileResponse {
  success: boolean;
  challenge_ts?: string;
  hostname?: string;
  "error-codes"?: string[];
}

export const verifyTurnstile = async (token: string): Promise<boolean> => {
  try {
    if (!token) {
      console.warn('No Turnstile token provided');
      return false;
    }

    const response = await axios.post<TurnstileResponse>(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      new URLSearchParams({
        secret: TURNSTILE_SECRET_KEY!,
        response: token,
      }).toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    if (!response.data.success) {
      console.warn('Turnstile verification failed:', response.data["error-codes"]);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error verifying Turnstile:', error);
    return false;
  }
};
