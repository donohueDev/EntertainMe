import request from 'supertest';
import { PrismaClient } from '@prisma/client';
import app from '../src/test_server';
import { sendEmail } from '../src/utils/sendEmail';
// Jest types are available globally in test environment

// Mock sendEmail utility
jest.mock('../src/utils/sendEmail', () => ({
  sendEmail: jest.fn().mockResolvedValue(true)
}));

// Mock verifyRecaptcha utility to always return true in tests
jest.mock('../src/utils/verifyRecaptcha', () => ({
  verifyRecaptcha: jest.fn().mockResolvedValue(true)
}));

const prisma = new PrismaClient();

describe('Email Verification Tests', () => {
  let testUser = {
    email: 'test@example.com',
    username: 'testuser',
    password: 'TestPassword123!',
    recaptchaToken: 'valid-token' // Mock token
  };

  // Clean up test data before and after tests
  beforeAll(async () => {
    await prisma.user.deleteMany({
      where: {
        OR: [
          { email: testUser.email },
          { username: testUser.username }
        ]
      }
    });
  });

  afterAll(async () => {
    await prisma.user.deleteMany({
      where: {
        OR: [
          { email: testUser.email },
          { username: testUser.username }
        ]
      }
    });
    await prisma.$disconnect();
  });

  describe('Registration with Email Verification', () => {
    it('should create unverified user and send verification email', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send(testUser);

      expect(response.status).toBe(201);
      expect(response.body.message).toContain('check your email');
      expect(sendEmail).toHaveBeenCalled();

      // Verify user exists and is unverified
      const user = await prisma.user.findUnique({
        where: { email: testUser.email }
      });
      expect(user).toBeTruthy();
      expect(user?.email_verified).toBe(false);
      expect(user?.verification_token).toBeTruthy();
    });

    it('should not allow login before email verification', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          username: testUser.username,
          password: testUser.password,
          recaptchaToken: 'valid-token'
        });

      expect(response.status).toBe(403);
      expect(response.body.requiresVerification).toBe(true);
    });
  });

  describe('Email Verification Process', () => {
    let verificationToken: string;

    beforeAll(async () => {
      // Get the verification token
      const user = await prisma.user.findUnique({
        where: { email: testUser.email }
      });
      verificationToken = user?.verification_token || '';
    });

    it('should verify email with valid token', async () => {
      const response = await request(app)
        .post('/api/auth/verify-email')
        .send({ token: verificationToken });

      expect(response.status).toBe(200);
      expect(response.body.message).toContain('verified successfully');

      // Verify user is now verified
      const user = await prisma.user.findUnique({
        where: { email: testUser.email }
      });
      expect(user?.email_verified).toBe(true);
      expect(user?.verification_token).toBeNull();
    });

    it('should reject invalid verification token', async () => {
      const response = await request(app)
        .post('/api/auth/verify-email')
        .send({ token: 'invalid-token' });

      expect(response.status).toBe(400);
      expect(response.body.message).toContain('Invalid or expired verification token');
    });

    it('should allow login after email verification', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          username: testUser.username,
          password: testUser.password,
          recaptchaToken: 'valid-token'
        });

      expect(response.status).toBe(200);
      expect(response.body.token).toBeTruthy();
      expect(response.body.user.username).toBe(testUser.username);
    });
  });

  describe('Resend Verification', () => {
    let newTestUser = {
      email: 'newtest@example.com',
      username: 'newtestuser',
      password: 'TestPassword123!',
      recaptchaToken: 'valid-token'
    };

    beforeAll(async () => {
      // Create a new unverified user
      await request(app)
        .post('/api/auth/register')
        .send(newTestUser);
      
      // Clear the mock calls from registration
      (sendEmail as jest.Mock).mockClear();
    });

    it('should resend verification email', async () => {
      const response = await request(app)
        .post('/api/auth/resend-verification')
        .send({ email: newTestUser.email });

      expect(response.status).toBe(200);
      expect(response.body.message).toContain('sent if account exists');
      expect(sendEmail).toHaveBeenCalled();

      // Verify new token was generated
      const user = await prisma.user.findUnique({
        where: { email: newTestUser.email }
      });
      expect(user?.verification_token).toBeTruthy();
    });

    it('should not resend verification for verified email', async () => {
      // First verify the email
      const user = await prisma.user.findUnique({
        where: { email: newTestUser.email }
      });
      await prisma.user.update({
        where: { id: user!.id },
        data: { email_verified: true }
      });

      const response = await request(app)
        .post('/api/auth/resend-verification')
        .send({ email: newTestUser.email });

      expect(response.status).toBe(400);
      expect(response.body.message).toContain('already verified');
    });
  });
});