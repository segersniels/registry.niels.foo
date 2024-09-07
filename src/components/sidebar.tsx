"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

function Category({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col space-y-2">{children}</div>;
}

function CategoryTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="font-bold text-lg tracking-tight">{children}</h2>;
}

function CategoryItem({
  children,
  href,
  className,
  ...props
}: React.ComponentProps<typeof Link>) {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={cn(
        "text-muted-foreground text-sm",
        {
          "font-medium text-foreground": pathname === href,
        },
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
}

export default function Sidebar() {
  return (
    <aside className="flex flex-col w-48 p-6 space-y-4">
      <Category>
        <CategoryTitle>General</CategoryTitle>
        <CategoryItem href="/introduction">Introduction</CategoryItem>
      </Category>

      <Category>
        <CategoryTitle>Components</CategoryTitle>
        <CategoryItem href="/chat">Chat</CategoryItem>
        <CategoryItem href="/markdown">Markdown</CategoryItem>
      </Category>
    </aside>
  );
}
