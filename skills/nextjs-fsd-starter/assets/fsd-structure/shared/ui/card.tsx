import { ComponentProps } from "react";

import { cn } from "../lib/cn";

const CardRoot = ({ className, ...props }: ComponentProps<"div">) => (
  <div
    className={cn(
      "bg-card text-card-foreground rounded-lg border shadow-sm",
      className
    )}
    {...props}
  />
);

const CardHeader = ({ className, ...props }: ComponentProps<"div">) => (
  <div className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
);

const CardTitle = ({ className, ...props }: ComponentProps<"h3">) => (
  <h3
    className={cn("leading-none font-semibold tracking-tight", className)}
    {...props}
  />
);

const CardDescription = ({ className, ...props }: ComponentProps<"p">) => (
  <p className={cn("text-muted-foreground text-sm", className)} {...props} />
);

const CardContent = ({ className, ...props }: ComponentProps<"div">) => (
  <div className={cn("p-6 pt-0", className)} {...props} />
);

const CardFooter = ({ className, ...props }: ComponentProps<"div">) => (
  <div className={cn("flex items-center p-6 pt-0", className)} {...props} />
);

const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Footer: CardFooter,
  Title: CardTitle,
  Description: CardDescription,
  Content: CardContent,
});

export default Card;
