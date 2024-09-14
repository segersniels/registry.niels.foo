import fs from "fs";
import path from "path";

export interface Schema {
  name: string;
  type: "registry:ui" | "registry:hook";
  registryDependencies: string[];
  dependencies: string[];
  devDependencies: string[];
  tailwind: {
    config?: Record<string, object>;
  };
  cssVars: {
    light: Record<string, string>;
    dark: Record<string, string>;
  };
  files: Array<{
    path: string;
    content: string;
    type: "registry:ui" | "registry:hook";
  }>;
}

type ComponentDefinition = Pick<Schema, "name"> &
  Partial<
    Pick<
      Schema,
      | "type"
      | "dependencies"
      | "devDependencies"
      | "registryDependencies"
      | "cssVars"
      | "tailwind"
    >
  > & {
    name: string;
    path: string;
  };

// Define the components and their dependencies that should be registered
const components: ComponentDefinition[] = [
  {
    name: "chat",
    path: path.join(__dirname, "../src/components/ui/chat.tsx"),
    registryDependencies: ["button", "input"],
    dependencies: ["lucide-react"],
    cssVars: {
      light: {
        chat: "221.2 83.2% 53.3%",
        "chat-foreground": "210 40% 98%",
      },
      dark: {
        chat: "217.2 91.2% 59.8%",
        "chat-foreground": "210 40% 98%",
      },
    },
    tailwind: {
      config: {
        theme: {
          extend: {
            colors: {
              chat: {
                DEFAULT: "hsl(var(--chat))",
                foreground: "hsl(var(--chat-foreground))",
              },
            },
          },
        },
      },
    },
  },
  {
    name: "markdown",
    path: path.join(__dirname, "../src/components/ui/markdown.tsx"),
    dependencies: ["react-markdown", "remark-gfm"],
    devDependencies: ["@tailwindcss/typography"],
    tailwind: {
      config: {
        plugins: ['require("@tailwindcss/typography")'],
      },
    },
  },
  {
    name: "code",
    path: path.join(__dirname, "../src/components/ui/code.tsx"),
    registryDependencies: ["button"],
    dependencies: ["react-syntax-highlighter", "next-themes"],
    devDependencies: ["@types/react-syntax-highlighter"],
  },
  {
    name: "use-local-forage",
    type: "registry:hook",
    path: path.join(__dirname, "../src/hooks/use-local-forage.ts"),
    dependencies: ["localforage"],
  },
  {
    name: "use-server-action",
    type: "registry:hook",
    path: path.join(__dirname, "../src/hooks/use-server-action.ts"),
  },
  {
    name: "use-server-action-swr",
    type: "registry:hook",
    path: path.join(__dirname, "../src/hooks/use-server-action-swr.ts"),
    dependencies: ["localforage"],
  },
];

// Create the registry directory if it doesn't exist
const registry = path.join(__dirname, "../public");
if (!fs.existsSync(registry)) {
  fs.mkdirSync(registry);
}

// Create the registry files
for (const component of components) {
  const content = fs.readFileSync(component.path, "utf8");

  const schema = {
    name: component.name,
    type: component.type || "registry:ui",
    registryDependencies: component.registryDependencies || [],
    dependencies: component.dependencies || [],
    devDependencies: component.devDependencies || [],
    tailwind: component.tailwind || {},
    cssVars: component.cssVars || {
      light: {},
      dark: {},
    },
    files: [
      {
        path: `${component.name}.tsx`,
        content,
        type: component.type || "registry:ui",
      },
    ],
  } satisfies Schema;

  fs.writeFileSync(
    path.join(registry, `${component.name}.json`),
    JSON.stringify(schema, null, 2)
  );
}
