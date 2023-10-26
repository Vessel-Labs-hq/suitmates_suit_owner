import DashboardLayout from "@/components/layouts/DashboardLayout";
import { ChatFeed, SendAResponseForm } from "@/components/organisms/ChatBox";
import Modal from "@/components/organisms/Modal";
import { assertQuery } from "@/utils/functions/helpers";
import { Button, IconBox, Label } from "@the_human_cipher/components-library";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

interface ContentLabelProps {
  title: string;
  value: string;
}
const ContentLabel = ({ title, value }: ContentLabelProps) => (
  <div className="w-fit space-y-1 text-sm">
    <p className="text-sm font-medium text-black">{title}</p>
    <div className="w-fit rounded-md bg-light-gray p-4 leading-none">
      <span>{value}</span>
    </div>
  </div>
);

function MaintenanceRequestPage() {
  const router = useRouter();

  const [chats, setChats] = useState<IChats[]>([
    {
      message:
        "Unfortunately, this plumbing repair in progress is causing more problems. The technician seems unsure, and the situation appears to be getting messier.",
      contact: "Dave Mariam",
      idx: 1,
    },
  ]);

  const { requestId, view_comments } = router.query;
  const handleModalClose = () => router.push({ query: { requestId } });

  return (
    <DashboardLayout>
      <section className="max-w-[900px] space-y-8">
        <div className="flex gap-4">
          <Link className="flex gap-1" href="/maintenance-request">
            <IconBox icon="ArrowNarrowLeft" size={24} />
            <span>Maintenance Request</span>
          </Link>
        </div>
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-medium md:text-3xl">Plumbing</h2>
            <div className="mt-2 text-sm">10 Jan 2023 | 2:25pm</div>

            <p className="mt-6 font-light md:text-lg">
              Persistent, slow-draining sink clogged with hair and debris, causing backups.
              Persistent, slow-draining sink clogged with hair and debris, causing backups.
              Persistent, slow-draining sink clogged with hair and debris.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-medium">Resolution Details </h3>
            <div className="mt-4 flex gap-8">
              <ContentLabel title="Repair Date" value="08/21/2024" />
              <ContentLabel title="Repair Time" value="03:00pm" />
            </div>
          </div>
          <div>
            <h3 className="font-medium">Status</h3>
            <div className="mt-4 flex items-center gap-4">
              <Label
                label="In Progress"
                icon="Flag03"
                type="warning"
                className="px-4 max-md:gap-1 max-md:text-sm md:px-5"
                figureClassName="max-md:max-h-4 max-md:max-w-4"
              />
              <Button
                variant="dark"
                className="flex w-fit gap-1 px-2 max-md:text-xs md:gap-2 md:px-4"
                asChild
              >
                <Link
                  href={{
                    pathname: "/maintenance-request/[requestId]/",
                    query: { view_comments: true, requestId },
                  }}
                >
                  <IconBox size={24} icon="MessageCheckCircle" className="max-md:hidden" />
                  <IconBox size={18} icon="MessageCheckCircle" className="md:hidden" />
                  See Comments
                  <span></span>
                </Link>
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2 sm:gap-4">
            {[3, 1, 2, 5].map((n) => (
              <div
                key={n}
                style={{
                  backgroundImage: `url("https://picsum.photos/id/${n * 10}/400/300")`,
                }}
                className="h-20 w-full rounded bg-cover sm:h-40 sm:rounded-md"
              />
            ))}
          </div>
        </div>
      </section>

      {assertQuery(view_comments) && (
        <Modal open onOpenChange={handleModalClose}>
          <Modal.Body
            enableBottomSheet
            className="h-[500px] space-y-0 md:max-w-[450px] md:overflow-y-hidden"
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
                      onSubmit={(data) => {
                        setChats(data);

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
      )}
    </DashboardLayout>
  );
}

export default MaintenanceRequestPage;
