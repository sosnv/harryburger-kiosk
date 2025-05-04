import React from "react";
import clsx from "clsx";

export const Card = ({ className, ...props }) => (
  <div
    className={clsx(
      "bg-[#1a1a1a] text-gray-100 rounded-lg shadow-md overflow-hidden",
      className
    )}
    {...props}
  />
);

export const CardHeader = ({ className, ...props }) => (
  <div className={clsx("p-4 border-b border-gray-700", className)} {...props} />
);

export const CardTitle = ({ className, ...props }) => (
  <h3 className={clsx("text-lg font-medium", className)} {...props} />
);

export const CardContent = ({ className, ...props }) => (
  <div className={clsx("p-4", className)} {...props} />
);

export const CardFooter = ({ className, ...props }) => (
  <div className={clsx("p-4 border-t border-gray-700", className)} {...props} />
);
