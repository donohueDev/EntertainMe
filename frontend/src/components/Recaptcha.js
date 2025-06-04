import React, { forwardRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

const RECAPTCHA_SITE_KEY = '6LcKDlYrAAAAAJnM0YoBwTVazLmXp5x54THSXY12';

const RecaptchaComponent = forwardRef((props, ref) => {
  return (
    <ReCAPTCHA
      ref={ref}
      sitekey={RECAPTCHA_SITE_KEY}
      size="invisible"
      {...props}
    />
  );
});

RecaptchaComponent.displayName = 'RecaptchaComponent';

export default RecaptchaComponent;