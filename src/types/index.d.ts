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
