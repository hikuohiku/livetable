import { varelaRound } from '@/utils/font';
import UserIcon from '@/components/UserIcon';
import ProfileCard from '@/components/ProfileCard';

function Header() {
  return (
    <header className='z-[10] fixed flex justify-between items-center inset-0 h-16'>
      <h1 className={`${varelaRound.className} block text-2xl text-logo mx-6`}>livetable</h1>
      <UserIcon />
      <ProfileCard />
    </header>
  );
}

export default Header;
