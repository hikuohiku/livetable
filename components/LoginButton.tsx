'use client';
import { signIn } from 'next-auth/react';

type LoginButtonProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

const LoginButton = ({ onClick }: LoginButtonProps) => {
  return (
    <button onClick={onClick} className='liveCard flex justify-center items-center gap-2 rounded-lg m-2 p-1 w-72'>
      Google でログイン
    </button>
  );
};

const LoginButtonContainer = () => {
  const onClick = () => {
    signIn('google');
  };
  return <LoginButton onClick={onClick} />;
};

export default LoginButtonContainer;
