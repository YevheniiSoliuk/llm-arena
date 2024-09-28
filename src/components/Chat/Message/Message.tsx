type MessageProps = {
  content: string;
};

const Message = ({ content }: MessageProps) => {
  return (
    <div className='my-2 max-w-[70%] rounded-xl bg-background px-3 py-2 text-primary'>
      <p>{content}</p>
    </div>
  );
};

export default Message;
