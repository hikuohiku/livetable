import Header from '@/components/Header';
import LoginButton from '@/components/LoginButton';
import LiveTable from '@/components/LiveTable';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';

export default async function Page() {
  const session = await getServerSession(authOptions);
  return (
    <>
      <Header />
      <div className='relative flex flex-wrap justify-end top-16 mx-4'>
        {!session && <LoginButton />}
        <LiveTable />
      </div>
    </>
  );
}
