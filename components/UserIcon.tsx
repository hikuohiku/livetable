import Image from 'next/image';
import { SVGProps } from 'react';

import { GoogleUser } from '@/types/entities/user';

interface UserIconProps {
  user?: GoogleUser | null;
}

const UserIcon = ({ user }: UserIconProps) => {
  return (
    <div className='w-10 h-10 glass rounded-full m-4'>
      {user?.thumbnail ? (
        <Image src={user.thumbnail} alt='User Icon' width={96} height={96} className='rounded-full border-glass' />
      ) : (
        <IcBaselinePerson width={40} height={40} />
      )}
    </div>
  );
};

const IcBaselinePerson = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24' {...props}>
      <path
        fill='currentColor'
        d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4s-4 1.79-4 4s1.79 4 4 4m0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4'
      ></path>
    </svg>
  );
};

export default UserIcon;
