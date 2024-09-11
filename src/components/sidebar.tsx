"use client";

import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

import { Button } from "./ui/button";

const components = [
  { href: "/chat", label: "Chat" },
  { href: "/markdown", label: "Markdown" },
  { href: "/code", label: "Code" },
];

const hooks = [{ href: "/use-local-forage", label: "useLocalForage" }];

export function MobileSidebar() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="sm:hidden">
          <MenuIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>General</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href="/" className="w-full">
            Introduction
          </Link>
        </DropdownMenuItem>
        <DropdownMenuLabel>Components</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {components.map(({ href, label }) => (
          <DropdownMenuItem key={href}>
            <Link href={href} className="w-full">
              {label}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

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

export function DesktopSidebar() {
  return (
    <aside className="flex-col w-48 p-6 space-y-4 hidden sm:flex">
      <Category>
        <CategoryTitle>General</CategoryTitle>
        <CategoryItem href="/">Introduction</CategoryItem>
      </Category>

      <Category>
        <CategoryTitle>Components</CategoryTitle>
        {components.map(({ href, label }) => (
          <CategoryItem key={label} href={href}>
            {label}
          </CategoryItem>
        ))}
      </Category>

      <Category>
        <CategoryTitle>Hooks</CategoryTitle>
        {hooks.map(({ href, label }) => (
          <CategoryItem key={label} href={href}>
            {label}
          </CategoryItem>
        ))}
      </Category>
    </aside>
  );
}
