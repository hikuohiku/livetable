'use client';
import { signOut } from 'next-auth/react';

interface ProfileCardProps {
  onSignOutClick: React.MouseEventHandler<HTMLButtonElement>;
}

const ProfileCard = ({ onSignOutClick }: ProfileCardProps) => {
  return (
    <div className='liveCard flex justify-center items-center gap-2 rounded-lg m-2 p-1 w-72'>
      <button onClick={onSignOutClick}>Sign Out</button>
    </div>
  );
};

const ProfileCardContainer = () => {
  const onSignOutClick = () => {
    signOut();
  };
  return <ProfileCard onSignOutClick={onSignOutClick} />;
};

export default ProfileCardContainer;
