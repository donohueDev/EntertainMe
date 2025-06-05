import React, { forwardRef, useEffect, useImperativeHandle } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

const RECAPTCHA_SITE_KEY = '6LcKDlYrAAAAAJnM0YoBwTVazLmXp5x54THSXY12';

const RecaptchaComponent = forwardRef((props, ref) => {
  const recaptchaRef = React.useRef();

  useImperativeHandle(ref, () => ({
    executeAsync: () => recaptchaRef.current?.executeAsync(),
    reset: () => recaptchaRef.current?.reset()
  }));

  // Add reCAPTCHA token refresh timer
  useEffect(() => {
    // Refresh reCAPTCHA token every 110 seconds (tokens expire after 2 minutes)
    const refreshInterval = setInterval(() => {
      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
        recaptchaRef.current.executeAsync();
      }
    }, 110000);

    return () => clearInterval(refreshInterval);
  }, []);

  return (
    <ReCAPTCHA
      ref={recaptchaRef}
      sitekey={RECAPTCHA_SITE_KEY}
      size="invisible"
      {...props}
    />
  );
});

RecaptchaComponent.displayName = 'RecaptchaComponent';

export default RecaptchaComponent;