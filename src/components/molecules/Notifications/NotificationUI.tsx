import { Label, LabelProps } from "@the_human_cipher/components-library";
import { cn } from "@/utils";
import Avatar from "@/components/atoms/Avatar";

type AvatarProps = ComponentProps<typeof Avatar>;

type RowAvatarProps = Omit<AvatarProps, "className"> & {
  avatarStyle?: string;
};

interface NotificationContentProps {
  children: string | React.ReactNode;
  title: string;
  avatarProps: RowAvatarProps;
  style?: {
    titleStyle?: string;
    contentStyle?: string;
    wrapperStyle?: string;
  };
}

const NotificationContent = (props: NotificationContentProps) => {
  const { avatarProps, children, title, style = {} } = props;
  const { contentStyle, titleStyle, wrapperStyle } = style;

  return (
    <div className={cn("flex items-center gap-2", wrapperStyle)}>
      <Avatar
        size={34}
        src={
          avatarProps.src ??
          "https://suite-mate.s3.eu-north-1.amazonaws.com/weirdcat.jpeg"
        }
        {...avatarProps}
      />
      <div className={cn("text-xs font-medium text-borderNegative", contentStyle)}>
        <h4 className={cn("mb-0.5 text-base  font-bold text-suite-dark", titleStyle)}>
          {title}
        </h4>
        {typeof children === "string" ? <p>{children}</p> : children}
      </div>
    </div>
  );
};

type LabelNotAllowed = "label" | "icon" | "figureClassName" | "iconSize";

type NotificationLabelProps = Omit<LabelProps, LabelNotAllowed> & {
  children: string;
};
const NotificationLabel = (props: NotificationLabelProps) => {
  const { children, className, ...rest } = props;

  return (
    <Label
      dots
      small
      {...rest}
      className={cn("text-xs md:text-xs", className)}
      label={children}
    />
  );
};

const NotificationUI = ({ children, className }: IProps) => {
  return (
    <div className={cn("flex items-center justify-between gap-4", className)}>
      {children}
    </div>
  );
};

NotificationUI.Content = NotificationContent;
NotificationUI.Label = NotificationLabel;

export default NotificationUI;
