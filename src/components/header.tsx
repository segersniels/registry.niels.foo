"use client";

import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useTheme } from "next-themes";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { MobileSidebar } from "./sidebar";

function ThemeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function Header() {
  return (
    <nav className="w-full flex items-center justify-between p-4">
      <div className="flex space-x-2">
        <Link href="/" className="text-2xl font-bold tracking-tight">
          registry
        </Link>

        <div className="flex items-center space-x-1 text-xs text-muted-foreground">
          <span>by</span>
          <Link
            href="https://github.com/segersniels"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-foreground transition-colors"
          >
            segersniels
          </Link>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <ThemeToggle />
        <MobileSidebar />
      </div>
    </nav>
  );
}
