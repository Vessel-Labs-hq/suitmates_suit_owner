import { Modal } from "@the_human_cipher/components-library";
import { ChatFeed, SendAResponseForm } from "../ChatBox";

interface ChatBoxModal {
  onClose(): void;
  chats: IChats[];
  onSubmit(chat: IChats[]): void;
  requestId: SN;
}

const ChatBoxModal = ({ chats, onClose, onSubmit, requestId }: ChatBoxModal) => {
  return (
    <Modal open onOpenChange={onClose}>
      <Modal.Body
        enableBottomSheet
        className="h-[500px] space-y-0 md:max-w-[450px] md:overflow-y-hidden"
        overlayStyles="bg-opacity-50"
      >
        <Modal.Title title="View Comments" />
        <Modal.Content>
          {({ ref }) => (
            <div>
              <div>
                <ChatFeed chats={chats} />
              </div>
              <div className="absolute bottom-0 left-0 right-0 w-full border-t border-t-black/10 bg-white px-8 py-3">
                <SendAResponseForm
                  chats={chats}
                  requestId={requestId}
                  onSubmit={(data) => {
                    onSubmit(data);

                    /**
                     * https://stackoverflow.com/questions/43854653/how-to-force-a-chatbox-div-to-stay-displaying-the-bottom-as-new-messages-appear
                     */
                    if (ref) {
                      setTimeout(() => {
                        if (ref.current) {
                          const { scrollHeight } = ref.current;
                          ref.current.scrollTop = scrollHeight + 10;
                        }
                      }, 100);
                    }
                  }}
                />
              </div>
            </div>
          )}
        </Modal.Content>
      </Modal.Body>
    </Modal>
  );
};

export default ChatBoxModal;
