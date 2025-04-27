import { Button } from "@/components/ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { MailIcon } from "lucide-react";
import Loading from "@/components/common/Loading";
import { useState } from "react";
import logo from "@/assets/logo_white.svg";

const VerifyEmailPage = () => {
  const navigate = useNavigate();
  const { loginWithRedirect, logout } = useAuth0();

  const [isResending, setIsResending] = useState(false);

  const handleEmailResend = () => {
    setIsResending(true);
    loginWithRedirect({
      appState: { returnTo: window.location.pathname },
      authorizationParams: {
        prompt: 'none',
        screen_hint: 'signup',
      },
    }).finally(() => {
      setIsResending(false);
    });
  }

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  }

  if (isResending) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col items-center justify-center h-[92dvh]">
      <div className="flex flex-col items-center justify-center mx-auto my-auto">
        <div className="w-[100px] h-[100px] mb-5">
          <img src={logo} alt="Models competitive arena"/>
        </div>
        <div className="flex flex-col items-center justify-center bg-foreground max-w-[400px] min-w-[300px] rounded-lg px-4 py-2 text-secondary">
          <div className="flex flex-col items-center text-center my-4">
            <MailIcon className="h-24 w-24 text-[#646cff]"/>
            <h2 className="text-[20px] font-semibold mt-2">Verify Email</h2>
            <p className="text-[14px]">An email has been sent to you. Please verify your email before continuing.</p>
          </div>
          <Button
            className="bg-[#646cff] text-primary transition-shadow px-6 text-[16px] hover:bg-[#646cff] hover:shadow-[1px_1px_15px_rgba(101,77,196,0.5)]"
            onClick={() => navigate('/')}
          >
            Continue
          </Button>
          <div className="flex flex-col items-center justify-center mt-6">
            <p className="text-[12px]">
              Didn't get an email?&nbsp;
              <span
                className="underline transition-all hover:cursor-pointer hover:text-[#646cff] hover:no-underline"
                onClick={handleEmailResend}
              >Resend</span>
            </p>
            <p className="text-[12px]">Wrong email?&nbsp;
              <span
                className="underline transition-all hover:cursor-pointer hover:text-[#646cff] hover:no-underline"
                onClick={handleLogout}
              >Sign out</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerifyEmailPage;