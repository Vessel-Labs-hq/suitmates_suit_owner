import { cn } from "@/utils";
import * as Primitives from "@radix-ui/react-tabs";

type Extension = string[] | readonly string[];

const Tabs = ({ className, ...props }: Primitives.TabsProps) => (
  <Primitives.Root className={cn(className)} {...props} />
);

interface TabHeaderProps<T extends Extension>
  extends Omit<Primitives.TabsListProps, "children"> {
  triggerProps?: Omit<Primitives.TabsTriggerProps, "children">;
  tablist: T;
}

const Header = <T extends Extension>(props: TabHeaderProps<T>) => {
  const { tablist, triggerProps, className, ...prop } = props;

  const { className: triggerClass, ...triggerProp } = triggerProps ?? {};

  return (
    <Primitives.List
      className={cn(
        "hide-scrollbar flex items-start justify-start overflow-x-auto overflow-y-hidden border-b border-gray pb-1 text-sm",
        className
      )}
      {...prop}
    >
      {tablist.map((tab) => (
        <Primitives.Trigger
          {...triggerProp}
          className={cn(
            "relative px-4 py-3 outline-none",
            "before:absolute before:bottom-0 before:left-0 before:h-1 before:w-full before:translate-y-1 data-[state='active']:before:bg-primary",
            "data-[state='active']:border-b-primary data-[state='active']:font-medium data-[state='active']:text-primaryDark",
            triggerClass
          )}
          value={tab}
          key={tab}
        >
          {tab}
        </Primitives.Trigger>
      ))}
    </Primitives.List>
  );
};

interface TabContentProps<T extends Extension> extends Primitives.TabsContentProps {
  value: T[number];
}

const Content = <T extends Extension>({ className, ...props }: TabContentProps<T>) => {
  return <Primitives.Content {...props} className={cn("mt-4", className)} />;
};

Tabs.Content = Content;

Tabs.Header = Header;

export default Tabs;
