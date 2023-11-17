import { cn } from "@/utils";
import { ThreeDotsLoader } from "./Loader";
import { BsCheck2All } from "react-icons/bs";

const ChatText = (props: IChatMessage) => {
  const { message, contact, isSender, status } = props;

  const assertStatus = () => {
    switch (status) {
      case "sending":
        return (
          <div className="mt-0.5">
            <span className="sr-only">sending...</span>
            <ThreeDotsLoader className="w-9" />
          </div>
        );
      case "delivered":
        return (
          <div className="flex items-center gap-1">
            <BsCheck2All size={18} />
            <span className="text-[10px] leading-none">Sent</span>
          </div>
        );
    }
  };

  return (
    <article className={cn("max-w-xs text-sm md:text-base", isSender && "ml-auto")}>
      {contact && (
        <h4 className={cn("hidden text-sm font-medium", isSender && "hidden text-right")}>
          {isSender ? "You" : contact}
        </h4>
      )}
      <div
        className={cn(
          "rounded-xl bg-tertiary-background px-4 py-3 leading-relaxed text-tertiary-content",
          isSender && "bg-primary text-white"
        )}
      >
        {message}
      </div>
      {isSender && status && (
        <div className="ml-auto mt-1 flex w-fit pr-2 text-primary">{assertStatus()}</div>
      )}
    </article>
  );
};

export default ChatText;
