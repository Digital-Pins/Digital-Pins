import type { ReactNode, HTMLAttributes } from "react";

export function Card(
  props: HTMLAttributes<HTMLDivElement> & { children?: ReactNode }
) {
  const { className = "", children, ...rest } = props;
  return (
    <div
      className={className}
      {...rest}
    >
      {children}
    </div>
  );
}

export function CardContent(
  props: HTMLAttributes<HTMLDivElement> & { children?: ReactNode }
) {
  const { className = "", children, ...rest } = props;
  return (
    <div className={className} {...rest}>
      {children}
    </div>
  );
}
