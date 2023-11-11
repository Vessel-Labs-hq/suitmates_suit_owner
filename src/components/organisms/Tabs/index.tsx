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
    <Primitives.List className={cn(className)} {...prop}>
      {tablist.map((tab) => (
        <Primitives.Trigger
          {...triggerProp}
          className={cn(triggerClass)}
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

const Content = <T extends Extension>(props: TabContentProps<T>) => {
  return <Primitives.Content {...props} />;
};

Tabs.Content = Content;

Tabs.Header = Header;

export default Tabs;
