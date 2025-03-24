import { CSSProperties } from "react";
import { RingLoader } from "react-spinners";

type LoadingProps = {
  styles?: CSSProperties;
};

const Loading = ({ styles }: LoadingProps) => {
  return (
    <div className='flex min-h-dvh w-full items-center justify-center' style={styles}>
      <RingLoader size={100} color='#fafafa' />
    </div>
  );
};

export default Loading;
