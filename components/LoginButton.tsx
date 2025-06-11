"use client";
import { signIn } from "next-auth/react";
import Google from "@mui/icons-material/Google";

interface LoginButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const LoginButton = ({ onClick }: LoginButtonProps) => {
  return (
    <div className="flex justify-center items-center w-full py-8">
      <button
        onClick={onClick}
        className="glass flex justify-center items-center gap-3 rounded-lg px-6 py-3 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <Google fontSize="medium" />
        Google でログイン
      </button>
    </div>
  );
};

const LoginButtonContainer = () => {
  const onClick = () => {
    signIn("google");
  };
  return <LoginButton onClick={onClick} />;
};

export default LoginButtonContainer;
