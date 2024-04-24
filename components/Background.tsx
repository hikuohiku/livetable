import backgroundImage from '@/public/layered-waves-haikei.svg';
import Image from 'next/image';

function Background() {
  return (
    <div
      className='z-[-1] fixed top-0 left-0 w-full h-[100lvh] bg-gradient-to-br
    from-[#ffeded] bgstyle'
    >
      {/* <Image src={backgroundImage} alt='' fill quality={100} className='object-cover' /> */}
    </div>
  );
}

export default Background;
