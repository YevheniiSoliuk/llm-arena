import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const VerifyEmailPage = () => {
  const navigate = useNavigate();
  const { loginWithRedirect, logout } = useAuth0();

  return (
    <div>
      <h1>2LMA.</h1>
      <div>
        <h2>Verify Email</h2>
        <p>An email has been sent to you. Please verify your email before continuing.</p>
      </div>
      <div>
        <button onClick={() => navigate('/')}>
          Continue
        </button>
        <p>Didn't get an email? <span onClick={() => loginWithRedirect()}>Resend</span></p>
      </div>
      <p>Wrong email? <span onClick={() =>
        logout({
          logoutParams: {
            returnTo: window.location.origin,
          },
        })
      }>Sign out</span></p>
    </div>
  );
}

export default VerifyEmailPage;