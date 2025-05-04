// src/components/ui/ScrollArea.js
import React from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";

const ScrollArea = ({ className, children, ...props }) => {
  return (
    <ScrollAreaPrimitive.Root className={className} {...props}>
      <ScrollAreaPrimitive.Viewport>{children}</ScrollAreaPrimitive.Viewport>
      <ScrollAreaPrimitive.Scrollbar
        orientation="vertical"
        className="flex select-none touch-none p-0.5 bg-gray-200"
      >
        <ScrollAreaPrimitive.Thumb className="flex-1 bg-gray-400 rounded-full" />
      </ScrollAreaPrimitive.Scrollbar>
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  );
};

export default ScrollArea;
