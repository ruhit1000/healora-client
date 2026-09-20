import { Card as HeroCard, CardProps as HeroCardProps, CardContent, CardHeader, CardFooter } from "@heroui/react";
import React from "react";

export interface CardProps extends HeroCardProps {
  children: React.ReactNode;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <HeroCard
        ref={ref}
        className={`rounded-healora shadow-sm border border-slate-100 bg-white ${className || ""}`}
        {...props}
      >
        {children}
      </HeroCard>
    );
  }
);

Card.displayName = "Card";

export { CardContent as CardBody, CardHeader, CardFooter };
