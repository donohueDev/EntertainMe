export const createVerificationEmailTemplate = (username: string, verificationToken: string, frontendUrl: string) => {
  const verificationLink = `${frontendUrl}/auth/verify-email?token=${verificationToken}`;
  
  return {
    subject: 'Verify Your Email - EntertainMe',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Welcome to EntertainMe!</h2>
        <p>Hi ${username},</p>
        <p>Thank you for registering! Please verify your email address by clicking the button below:</p>
        <div style="text-align: center; margin: 20px 0;">
          <a href="${verificationLink}" 
             style="background-color: #051426; color: white; padding: 12px 24px; 
                    text-decoration: none; border-radius: 4px; border: 1px solid goldenrod;">
            Verify Your Email
          </a>
        </div>
        <p>Or copy and paste this link in your browser:</p>
        <p>${verificationLink}</p>
        <p>This verification link will expire in 24 hours.</p>
        <p>If you didn't create an account, you can safely ignore this email.</p>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="color: #666; font-size: 12px;">This is an automated message. Please do not reply to this email. For support, please visit our website.</p>
      </div>
    `,
    text: `
      Welcome to EntertainMe!
      
      Hi ${username},
      
      Thank you for registering! Please verify your email address by clicking the link below:
      
      ${verificationLink}
      
      This verification link will expire in 24 hours.
      
      If you didn't create an account, you can safely ignore this email.
      
      -------------------------------------------------------
      This is an automated message. Please do not reply to this email. For support, please visit our website.
    `
  };
};


export const createPasswordResetEmailTemplate = (username: string, resetToken: string, frontendUrl: string) => {
  const resetLink = `${frontendUrl}/auth/reset-password?token=${resetToken}`;
  
  return {
    subject: 'Reset Your Password - EntertainMe',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Reset Your Password</h2>
        <p>Hi ${username},</p>
        <p>You requested a password reset. Please click the button below to reset your password:</p>
        <div style="text-align: center; margin: 20px 0;">
          <a href="${resetLink}" 
             style="background-color: #051426; color: white; padding: 12px 24px; 
                    text-decoration: none; border-radius: 4px; border: 1px solid goldenrod;">
            Reset Your Password
          </a>
        </div>
        <p>Or copy and paste this link in your browser:</p>
        <p>${resetLink}</p>
        <p>This reset link will expire in 1 hour.</p>
        <p>If you didn't request a password reset, you can safely ignore this email.</p>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="color: #666; font-size: 12px;">This is an automated message. Please do not reply to this email. For support, please visit our website.</p>
      </div>
    `,
    text: `
      Reset Your Password

      Hi ${username},

      You requested a password reset. Please click the link below to reset your password:

      ${resetLink}

      This reset link will expire in 1 hour.

      If you didn't request a password reset, you can safely ignore this email.

      -------------------------------------------------------
      This is an automated message. Please do not reply to this email. For support, please visit our website.
    `
  };
};
