import { Button } from "@the_human_cipher/components-library";
import Link from "next/link";

const LineStyle = "h-[1px] w-full bg-suite-dark";

interface AddTenantUIProps {
  onClick(): void;
  url: string;
}

const AddTenantUI = ({ onClick, url }: AddTenantUIProps) => (
  <div className="w-full space-y-6 max-md:text-sm">
    <Button onClick={onClick}>Invite</Button>
    <div className="mx-auto flex max-w-[70%] items-center gap-1 text-center">
      <div className={LineStyle} />
      <span>or</span>
      <div className={LineStyle} />
    </div>
    <Button asChild className="border border-primary bg-transparent text-primary">
      <Link className="flex items-center justify-center" href={url}>
        Add Manually
      </Link>
    </Button>
  </div>
);

export default AddTenantUI;
