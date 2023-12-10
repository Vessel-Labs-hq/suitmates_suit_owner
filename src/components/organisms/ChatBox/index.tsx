import ChatText from "@/components/atoms/ChatText";
import { TextArea } from "@/components/atoms/TextArea";
import maintenanceApi from "@/utils/apis/maintenance";
import Alert from "@/utils/base/alerts";
import { createStringSchema } from "@/utils/schema/helpers";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@the_human_cipher/components-library";
import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useQueryClient } from "react-query";
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
      {chats.length > 0 ? (
        chats.map((ele, idx) => <ChatText {...ele} key={idx} />)
      ) : (
        <div className="grid h-[270px] w-full place-items-center text-black/50">
          <div className="grid place-items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-20 w-20 opacity-20"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
              />
            </svg>
            <h4 className="text-sm font-bold">Start a conversation</h4>
            <p className="mt-2 max-w-[26ch] text-center text-xs">
              Send a message to begin this conversation
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

interface FormResponseProps {
  onSubmit(chat: IChats[]): void;
  chats: IChats[];
  requestId: SN;
}
export const SendAResponseForm = ({ chats, onSubmit, requestId }: FormResponseProps) => {
  const { handleSubmit, formState, register, reset } = useForm<Inputs>({
    resolver: zodResolver(SendAResponseSchema),
  });

  const queryClient = useQueryClient();

  const onFormSubmit: SubmitHandler<Inputs> = async ({ message }) => {
    const idx: number | string = ((chats[chats.length - 1]?.id ?? 0) as number) + 1;

    const chat: IChats = {
      id: idx,
      status: "sending",
      message,
      isSender: true,
    };

    try {
      onSubmit([...chats, chat]);
      reset();
      await maintenanceApi.createComment({ requestId, text: message });
      queryClient.invalidateQueries({ queryKey: ["get-all-maintenance"] });
    } catch (error) {
      Alert.error(error);
    }
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
