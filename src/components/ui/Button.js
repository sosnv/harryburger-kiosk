// src/components/ui/Button.js
import React from "react";
import clsx from "clsx";

// Używamy React.forwardRef, aby umożliwić przekazanie `ref` do komponentu
const Button = React.forwardRef(
  ({ className, variant = "default", size = "medium", ...props }, ref) => {
    // Podstawowe style przycisku
    const baseStyles =
      "inline-flex items-center justify-center rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors";

    // Style wariantów przycisku
    const variantStyles = {
      default: "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500",
      outline:
        "border border-gray-300 text-gray-700 hover:bg-gray-100 focus:ring-gray-500",
      ghost: "text-gray-700 hover:bg-gray-100 focus:ring-gray-500",
    };

    // Style rozmiarów przycisku
    const sizeStyles = {
      small: "px-2.5 py-1.5 text-xs",
      medium: "px-4 py-2 text-sm",
      large: "px-6 py-3 text-base",
    };

    return (
      // Przypisujemy `ref` do elementu <button>
      <button
        className={clsx(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        ref={ref}
        {...props}
      >
        {props.children}
      </button>
    );
  }
);

export default Button;
