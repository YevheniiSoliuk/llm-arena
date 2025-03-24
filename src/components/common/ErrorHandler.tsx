import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate, useLocation } from 'react-router-dom';

const AuthErrorHandler = () => {
  const { error } = useAuth0();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check URL parameters for Auth0 errors
    const queryParams = new URLSearchParams(location.search);
    const errorParam = queryParams.get('error');
    const errorDescription = queryParams.get('error_description');

    if (errorParam || error) {
      // Handle the error
      console.error("Authentication error:", errorParam || error);
      console.error("Error description:", errorDescription || error?.message);

      localStorage.setItem('auth_error', JSON.stringify({
        type: errorParam || error?.name,
        description: errorDescription || error?.message,
        time: new Date().toISOString()
      }));

      navigate('/verify-email');
    }
  }, []);

  return null;
}

export default AuthErrorHandler;