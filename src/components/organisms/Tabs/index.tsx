import { cn } from "@/utils";
import * as Primitives from "@radix-ui/react-tabs";

/**
 * Anatomy of tabs
 * ```tsx
 * <Tabs>
 *   <Tabs.Header tablist={["active", "inactive"]} />
 *   <Tabs.Content value="active"/>
 *   <Tabs.Content value="inactive"/>
 * <Tabs/>
 * ```
 */
const Tabs = ({ className, ...props }: Primitives.TabsProps) => (
  <Primitives.Root className={cn(className)} {...props} />
);

interface TabHeaderProps extends Omit<Primitives.TabsListProps, "children"> {
  triggerProps?: Omit<Primitives.TabsTriggerProps, "children">;
  tablist: string[];
}
const Header = (props: TabHeaderProps) => {
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

const Content = (props: Primitives.TabsContentProps) => {
  return <Primitives.Content {...props} />;
};

Tabs.Header = Header;
Tabs.Content = Content;

export default Tabs;
