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
