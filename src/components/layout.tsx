import { cn } from "@/lib/utils";

export function Layout({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("w-full space-y-4", className)}>{children}</div>;
}

export function LayoutTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h1
      className={cn(
        "w-fit bg-gradient-to-r from-rose-100 to-teal-100 px-3 py-2 text-4xl font-bold tracking-tight sm:text-5xl dark:text-secondary",
        className
      )}
    >
      {children}
    </h1>
  );
}

export function LayoutContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex w-full flex-col space-y-8", className)}>
      {children}
    </div>
  );
}

export function LayoutDescription({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("prose prose-neutral dark:prose-invert", className)}>
      {children}
    </p>
  );
}

export function LayoutSection({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex w-full flex-col space-y-4", className)}>
      {children}
    </div>
  );
}

export function LayoutSectionTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2 className={cn("text-2xl font-bold tracking-tight", className)}>
      {children}
    </h2>
  );
}
