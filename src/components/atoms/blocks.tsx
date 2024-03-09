import { cn } from "@/utils";

export const TableRow = ({ children, className }: IProps) => {
  return (
    <div className={cn("grid grid-cols-4 gap-2 p-2 py-3 text-center", className)}>
      {children}
    </div>
  );
};
