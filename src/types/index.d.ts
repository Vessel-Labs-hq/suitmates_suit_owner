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

type ComponentProps<
  T extends keyof JSX.IntrinsicElements | JSXElementConstructor<any>,
> = React.ComponentProps<T>;

/**
 * use to loosen the type restrictions on a particular type
 * basically trick the compiler to allow other types to be passed
 *
 * `Type` the type to be loosened
 * `By` the type to be allowed, normally a primitive or another type
 *
 * @example
 * ```tsx
 * type NewName = Loosen<"age" | "name"| "days"> // would allow strings to be passed
 * ```
 */
type Loosen<Type, By = string> = Type | ({} & By);
