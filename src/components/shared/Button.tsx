"use client";

import { Button as HeroButton, ButtonProps as HeroButtonProps } from "@heroui/react";
import React from "react";
import Link from "next/link";

export interface ButtonProps extends HeroButtonProps {
  as?: any;
  href?: string;
  isLoading?: boolean;
  disableRipple?: boolean;
  variant?: "danger" | "danger-soft" | "ghost" | "outline" | "primary" | "secondary" | "tertiary";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, href, ...props }, ref) => {
    const baseClassName = `font-semibold transition-transform active:scale-95 ${className || ""}`;
    
    if (href) {
      const linkProps = { href, as: Link } as any;
      return (
        <HeroButton
          ref={ref as any}
          variant={variant}
          className={baseClassName}
          {...props}
          {...linkProps}
        />
      );
    }

    return (
      <HeroButton
        ref={ref}
        variant={variant}
        className={baseClassName}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
