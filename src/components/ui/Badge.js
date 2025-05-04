// src/components/ui/Badge.js
import React from "react";
import clsx from "clsx";

const Badge = ({ className, variant = "default", ...props }) => {
  const baseStyles =
    "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium";

  const variantStyles = {
    default: "bg-blue-100 text-blue-800",
    secondary: "bg-green-100 text-green-800",
    danger: "bg-red-100 text-red-800",
  };

  return (
    <span
      className={clsx(baseStyles, variantStyles[variant], className)}
      {...props}
    />
  );
};

export default Badge;
