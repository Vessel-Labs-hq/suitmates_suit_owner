import ChatText from "@/components/atoms/ChatText";
import { TextArea } from "@/components/atoms/TextArea";
import { createStringSchema } from "@/utils/schema/helpers";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@the_human_cipher/components-library";
import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import z from "zod";

const SendAResponseSchema = z.object({
  message: createStringSchema("Message"),
});

type Inputs = z.infer<typeof SendAResponseSchema>;

interface ChatFeedProps {
  chats: IChatMessage[];
}
export const ChatFeed = ({ chats }: ChatFeedProps) => {
  return (
    <div className="space-y-5">
      {chats.map((ele, idx) => (
        <ChatText {...ele} key={idx} />
      ))}
    </div>
  );
};

interface FormResponseProps {
  onSubmit(chat: IChats[]): void;
  chats: IChats[];
}
export const SendAResponseForm = ({ chats, onSubmit }: FormResponseProps) => {
  const { handleSubmit, formState, register, reset } = useForm<Inputs>({
    resolver: zodResolver(SendAResponseSchema),
  });

  const onFormSubmit: SubmitHandler<Inputs> = async ({ message }) => {
    const idx: number | string = ((chats[chats.length - 1]?.idx ?? 0) as number) + 1;

    const chat: IChats = {
      idx,
      status: "sending",
      message,
      isSender: true,
    };

    onSubmit([...chats, chat]);
    reset();
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (formState.submitCount) {
      timeoutId = setTimeout(() => {
        const deliveredChat: IChats[] = chats.map((ele, idx) => {
          if (idx === chats.length - 1) {
            return { ...ele, status: "delivered" };
          }

          if (ele.status) {
            return { ...ele, status: undefined };
          }

          return ele;
        });

        onSubmit(deliveredChat);
      }, 500);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [formState.submitCount]);

  return (
    <form className="w-full" onSubmit={handleSubmit(onFormSubmit)}>
      <div className="flex items-start gap-2 text-sm">
        <TextArea
          placeholder="Please enter a response"
          wrapperClass="w-full rounded-md"
          className="h-[52px]"
          {...register("message")}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(onFormSubmit)();
            }
          }}
        />
        <Button
          className="flex max-w-[120px] items-center justify-center rounded-md disabled:bg-opacity-70 sm:h-[52px]"
          type={formState.isValid ? "submit" : "button"}
          disabled={!formState.isValid}
          loading={formState.isSubmitting}
        >
          Respond
        </Button>
      </div>
    </form>
  );
};