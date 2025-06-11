import TimeTip from "@/components/TimeTip";

interface SplitterProps {
  time: Date;
}

function Splitter({ time }: SplitterProps) {
  return (
    <div className="relative flex items-center w-full">
      <div className="absolute left-0 -translate-x-full mt-[3px]">
        <TimeTip time={time} />
      </div>
      <div className="splitter flex-1 mx-2 my-2" />
    </div>
  );
}

export default Splitter;
