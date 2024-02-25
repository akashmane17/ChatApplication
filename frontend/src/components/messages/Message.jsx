import profile from "../../assets/profile.svg";
const Message = () => {
  return (
    <div className={`chat chat-end`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS chat bubble component" src={profile} />
        </div>
      </div>
      <div className={`chat-bubble text-white bg-blue-500 pb-2`}>Hii</div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        12:31
      </div>
    </div>
  );
};

export default Message;
