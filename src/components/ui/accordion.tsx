import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDownIcon } from "lucide-react"
import { cn } from "@/lib/utils"

const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn(
      "mt-px overflow-hidden first:mt-0 first:rounded-t last:rounded-b",
      className
    )}
    {...props}
  />
))
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex cursor-pointer">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "group flex h-[45px] flex-1 cursor-pointer items-center justify-between bg-mauve1 px-5 text-[20px] leading-none text-secondary shadow-[0_1px_0] shadow-mauve6 outline-none hover:bg-mauve2 focus:outline-none",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDownIcon
        className="text-violet10 transition-transform duration-300 ease-[cubic-bezier(0.87,_0,_0.13,_1)] group-data-[state=open]:rotate-180"
        aria-hidden
      />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden bg-mauve2 text-[16px] text-mauve11 -translate-y-2 last:rounded-b-lg border-transparent border-x-[1px] border-b-[1px] hover:border-[#646cff] hover:border-x-[1px] hover:border-b-[1px] focus:outline-none data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown"
    {...props}
  >
    <div className={cn("px-5 py-[15px]", className)}>{children}</div>
  </AccordionPrimitive.Content>
))

AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
