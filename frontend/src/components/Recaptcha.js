import React, { forwardRef, useImperativeHandle, useState } from 'react';
import Turnstile from 'react-turnstile';

const TURNSTILE_SITE_KEY = '0x4AAAAAABgK38f_-bJahc-Q';

const TurnstileComponent = forwardRef((props, ref) => {
  const [currentToken, setCurrentToken] = useState(null);

  const handleSuccess = (token) => {
    setCurrentToken(token);
  };

  const handleError = () => {
    setCurrentToken(null);
  };

  const handleExpire = () => {
    setCurrentToken(null);
  };

  useImperativeHandle(ref, () => ({
    executeAsync: async () => {
      // If we have a current token, return it
      if (currentToken) {
        return currentToken;
      }
      
      // Wait for token generation (should be quick since Turnstile auto-completes)
      return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(new Error('Verification challenge timed out. Please try again.'));
        }, 8000);
        
        const checkForToken = () => {
          if (currentToken) {
            clearTimeout(timeout);
            resolve(currentToken);
          } else {
            setTimeout(checkForToken, 100);
          }
        };
        
        checkForToken();
      });
    },
    
    ready: true
  }), [currentToken]);

  return (
    <div style={{ margin: '16px 0', display: 'flex', justifyContent: 'center' }}>
      <Turnstile
        sitekey={TURNSTILE_SITE_KEY}
        size="normal"
        theme="dark"
        refreshExpired="auto"
        retry="auto"
        onSuccess={handleSuccess}
        onError={handleError}
        onExpire={handleExpire}
        {...props}
      />
    </div>
  );
});

TurnstileComponent.displayName = 'TurnstileComponent';

export default TurnstileComponent;