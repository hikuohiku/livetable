import ProfileCard from '@/components/ProfileCard';
import UserIcon from '@/components/UserIcon';
import { GoogleUser } from '@/types/entities/user';
import { varelaRound } from '@/utils/font';

interface HeaderProps {
  user?: GoogleUser | null;
}

const Header = ({ user }: HeaderProps) => {
  return (
    <header className='z-[10] fixed flex justify-between items-center inset-0 h-16'>
      <h1 className={`${varelaRound.className} block text-2xl text-logo mx-6`}>livetable</h1>
      <UserIcon user={user} />
      <ProfileCard />
    </header>
  );
};

export default Header;
