import * as React from "react";
import { cn } from "./lib/Utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        {...props}
        className={cn(
          // ✅ replaced background and text classes with dark-friendly ones
          "flex h-10 w-full rounded-md border border-gray-700 bg-gray-900 text-white placeholder-gray-500 px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-red-500 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
