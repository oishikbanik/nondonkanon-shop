import * as React from "react";
import { cn } from "@/lib/utils";

export function AdminSidebar({ className, children }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("w-64 h-screen bg-white border-r", className)}>
      {children}
    </div>
  );
}

export function AdminSidebarHeader({ className, children }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("p-4 border-b", className)}>
      {children}
    </div>
  );
}

export function AdminSidebarContent({ className, children }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("p-4", className)}>
      {children}
    </div>
  );
}

export function AdminSidebarNav({ className, children }: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav className={cn("space-y-1", className)}>
      {children}
    </nav>
  );
}

export function AdminSidebarLink({ 
  className, 
  children, 
  active = false,
  href,
  ...props 
}: React.HTMLAttributes<HTMLDivElement> & { 
  active?: boolean;
  href?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer",
        active 
          ? "bg-rose-50 text-rose-600" 
          : "text-gray-700 hover:bg-gray-50 hover:text-gray-900",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
