const GOOGLE_AUTH_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://entertainment-reviews-api.onrender.com/api/auth/google-auth'
    : 'http://localhost:5001/api/auth/google-auth';

export default function GoogleOAuthButton({ style }) {
  const handleLogin = () => {
    window.location.href = GOOGLE_AUTH_URL;
  };

  return (
    <button
      type="button"
      onClick={handleLogin}
      style={{
        background: '#fff',
        color: '#444',
        border: '2px solid gold',
        borderRadius: 8,
        padding: '10px 0',
        fontSize: '1.1rem',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        width: '100%',
        fontWeight: 'bold',
        justifyContent: 'center',
        boxShadow: '0 0 8px 0 rgba(255, 215, 0, 0.3)',
        transition: 'box-shadow 0.2s, border-color 0.2s',
        ...style,
      }}
      onMouseOver={e => {
        e.currentTarget.style.boxShadow = '0 0 16px 4px gold';
        e.currentTarget.style.borderColor = '#FFD700';
      }}
      onMouseOut={e => {
        e.currentTarget.style.boxShadow = '0 0 8px 0 rgba(255, 215, 0, 0.3)';
        e.currentTarget.style.borderColor = 'gold';
      }}
    >
      <img
        src="https://developers.google.com/identity/images/g-logo.png"
        alt="Google"
        style={{ width: 20, height: 20 }}
      />
      Sign in with Google
    </button>
  );
}