interface SEOobject {
  readonly title: string;
  readonly description: string;
  readonly image: string;
  readonly twitterCard: string;
  readonly noindex: boolean;
  readonly ogType: TemplateType;
}
type TemplateType = "website" | "article";

interface IChildren {
  children: React.ReactNode;
}

interface IClass {
  className?: string;
}

interface IProps {
  children: React.ReactNode;
  className?: string;
}

type ComponentProps<T extends keyof JSX.IntrinsicElements | JSXElementConstructor<any>> =
  React.ComponentProps<T>;

/**
 * use to loosen the type restrictions on a particular type
 * basically trick the compiler to allow other types to be passed
 *
 * `Type` the type to be loosened
 *
 * @example
 * ```tsx
 * type NewName = Loosen<"age" | "name"| "days"> // would allow strings to be passed
 * ```
 */
type LoosenString<Type> = Type | ({} & string);

type FindAndSeparate<Values, Pattern> = Values extends `${Pattern}${infer A}`
  ? `${Capitalize<Pattern>} ${Capitalize<A>}`
  : Values;

interface APIResponse<TData> {
  success: boolean;
  data: Readonly<TData>;
  message: string;
}

interface IChatMessage {
  message: string;
  contact?: string;
  isSender?: boolean;
  status?: "sending" | "delivered";
}

interface IChats extends IChatMessage {
  id: number | string;
}

type SN = string | number;

type SelectData<Type = string> = {
  label: Type;
  value: Type;
};

type TMaintenanceRequestPriority = "critical" | "trivial" | "medium";

type RequestPriority =
  | TMaintenanceRequestPriority
  | Capitalize<TMaintenanceRequestPriority>;

type MaintenanceRequestStatus = "IN_PROGRESS" | "PENDING" | "COMPLETED";

interface DbNotification {
  id: number;
  text: string;
  user_id: number;
  opened: boolean;
  service: string;
  serviceId: number;
  created_at: string;
  updated_at: string;
}
