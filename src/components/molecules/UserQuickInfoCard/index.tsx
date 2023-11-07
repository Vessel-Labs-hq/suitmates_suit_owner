import Avatar from "@/components/atoms/Avatar";
import { cn, getMaintenanceRequestPriorityType } from "@/utils";
import { Label } from "@the_human_cipher/components-library";

interface UserQuickInfoCardProps {
  user: {
    first_name: string;
    email: string;
    last_name: string;
    avatar: string;
  };
  suite: string;
  label: RequestPriority;
}

const UserQuickInfoCard = ({ suite, user, label }: UserQuickInfoCardProps) => (
  <div className="flex items-center gap-2 max-sm:w-full">
    <Avatar name={cn(user.first_name, user.last_name)} src={user.avatar} />

    <div className="max-sm:w-full">
      <div className="flex items-center gap-2">
        <p className="max-sm:text-sm">{suite}</p>
        <Label
          label={label}
          type={getMaintenanceRequestPriorityType(label)}
          className="max-sm:tex-[7px] px-3 text-[10px] capitalize max-md:px-2 max-md:py-0.5 md:text-xs"
          small
          dots
        />
      </div>
      <div className="mt-2 flex items-center gap-1 text-[10px] font-light leading-none md:mt-1">
        <span className="capitalize">
          {user.first_name} {user.last_name}
        </span>{" "}
        <div className="h-1 w-1 rounded-full bg-current"></div> <span>{user.email}</span>
      </div>
    </div>
  </div>
);

export default UserQuickInfoCard;
