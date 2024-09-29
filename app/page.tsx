import Header from '@/components/Header';
import LoginButton from '@/components/LoginButton';
import LiveTable from '@/components/LiveTable';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';
import userRepository, { googleUserRepository } from '@/services/repositories/userRepository';

export default async function Page() {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  const user = email ? await userRepository.findByEmail(email) : null;
  const googleUser = user && (await googleUserRepository.find(user));
  return (
    <>
      <Header user={googleUser} />
      <div className='relative flex flex-wrap justify-end top-16 mx-4'>
        {!session && <LoginButton />}
        <LiveTable />
      </div>
    </>
  );
}
