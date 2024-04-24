import { ReactNode } from 'react';

function CardContainer({ children }: { children: ReactNode }) {
  return <div className='flex flex-wrap justify-start ml-12 min-w-[304px] flex-1'>{children}</div>;
}

export default CardContainer;
