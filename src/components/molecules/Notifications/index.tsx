import { cn } from "@/utils";
import * as Popover from "@radix-ui/react-popover";
import NotificationUI from "./NotificationUI";
import { IconSlot } from "@/assets/icons";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

interface NotificationsProps {
  notifications: DbNotification[];
  hasNewNotifications?: boolean;
}
const Notifications = (props: NotificationsProps) => {
  const { notifications, hasNewNotifications } = props;

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button className="flex h-10 w-10 items-center justify-center rounded-full bg-gray md:h-[50px] md:w-[50px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
          >
            <g clipPath="url(#clip0_1693_4954)">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M17.0657 21.5669C17.0659 22.1245 16.8553 22.6617 16.4761 23.0706C16.0969 23.4795 15.5771 23.73 15.021 23.7719L14.8552 23.7774H12.6447C12.087 23.7776 11.5498 23.5669 11.1409 23.1877C10.732 22.8085 10.4815 22.2888 10.4397 21.7326L10.4342 21.5669H17.0657ZM13.7499 2.77734C15.756 2.77731 17.6836 3.55644 19.1262 4.95038C20.5688 6.34432 21.4136 8.24408 21.4824 10.2489L21.4868 10.5142V14.6744L23.5006 18.702C23.5885 18.8777 23.6325 19.0722 23.6288 19.2686C23.6251 19.4651 23.5739 19.6577 23.4794 19.83C23.385 20.0023 23.2502 20.1492 23.0867 20.258C22.9231 20.3669 22.7355 20.4344 22.5401 20.455L22.413 20.4616H5.08688C4.89032 20.4616 4.69668 20.414 4.52255 20.3229C4.34842 20.2317 4.199 20.0997 4.08707 19.9381C3.97515 19.7765 3.90408 19.5902 3.87993 19.3951C3.85579 19.2001 3.8793 19.0021 3.94846 18.8181L3.9993 18.702L6.01309 14.6744V10.5142C6.01309 8.46226 6.82822 6.49436 8.27916 5.04342C9.73011 3.59247 11.698 2.77734 13.7499 2.77734ZM13.7499 4.98787C12.3259 4.98796 10.9568 5.53779 9.92819 6.52271C8.89961 7.50763 8.29095 8.85161 8.22915 10.2744L8.22362 10.5142V14.6744C8.22363 14.9485 8.17266 15.2203 8.07331 15.4757L7.99041 15.6636L6.69725 18.2511H20.8038L19.5106 15.6625C19.3879 15.4175 19.3118 15.1517 19.2862 14.8789L19.2763 14.6744V10.5142C19.2763 9.04853 18.694 7.64289 17.6577 6.6065C16.6213 5.57011 15.2156 4.98787 13.7499 4.98787Z"
                fill="#333333"
              />
              {hasNewNotifications && (
                <circle cx="20.3814" cy="6.36823" r="4.97369" fill="#FF3434" />
              )}
            </g>
            <defs>
              <clipPath id="clip0_1693_4954">
                <rect
                  width="26.5264"
                  height="26.5264"
                  fill="white"
                  transform="translate(0.486572 0.56543)"
                />
              </clipPath>
            </defs>
          </svg>
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          sideOffset={10}
          collisionPadding={30}
          className={cn(
            "data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=top]:animate-slideDownAndFade",
            "data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade",
            "w-[300px] rounded-xl border border-black border-opacity-[0.05] bg-light-gray p-4",
            "overflow-y-auto shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] outline-none xs:w-[360px]",
            "max-h-[400px] overflow-x-hidden",
            notifications.length < 1 && "h-[400px]"
          )}
        >
          {notifications.length > 0 ? (
            <ul className="space-y-6">
              {notifications.map(({ created_at, id, text, service }, idx) => (
                <li key={id} className="w-full">
                  <NotificationUI className="w-full">
                    <NotificationUI.Content
                      title={text}
                      style={{
                        titleStyle: "text-sm",
                        wrapperStyle: "w-full overflow-hidden [&>img]:hidden",
                      }}
                      avatarProps={{ name: "Suite 14c" }}
                    >
                      <div className="mt-1 flex items-center gap-1">
                        <span>{dayjs().to(dayjs(created_at))}</span>
                        <span className="text-suite-dark">•</span>
                        <span className="capitalize text-suite-dark">
                          {service.replaceAll("-", " ")}
                        </span>
                      </div>
                    </NotificationUI.Content>
                  </NotificationUI>
                </li>
              ))}
            </ul>
          ) : (
            <div className="grid h-full place-content-center text-center">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-gray/50 text-black/50">
                <IconSlot icon="Inbox" size={32} />
              </div>
              <p className="mt-2 text-sm">No New Notifications</p>
            </div>
          )}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default Notifications;
