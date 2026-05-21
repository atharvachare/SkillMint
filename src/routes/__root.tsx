import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import { AuthProvider } from "@/lib/auth";
import appCss from "../styles.css?url";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;


function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "SkillMint — Gasless NFT Achievement Badges" },
      { name: "description", content: "Mint personalized NFT achievement badges without ETH. Built on Base Sepolia with UGF." },
      { name: "author", content: "SkillMint" },
      { property: "og:title", content: "SkillMint — Gasless NFT Achievement Badges" },
      { property: "og:description", content: "Mint personalized blockchain badges without holding ETH using UGF." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.getItem('setting_theme') === 'dark' || (!('setting_theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <AuthProvider 
      publishableKey={PUBLISHABLE_KEY} 
      appearance={{ 
        variables: { 
          colorPrimary: '#00f0ff', 
          colorBackground: '#111111', 
          colorText: '#ffffff', 
          colorTextSecondary: '#a1a1aa',
          colorInputBackground: '#1a1a1a',
          colorInputText: '#ffffff',
          colorDanger: '#ef4444'
        },
        elements: {
          card: "border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.9)] bg-[#0a0a0a]",
          headerTitle: "!text-white font-display font-bold",
          headerSubtitle: "!text-white/60",
          socialButtonsBlockButton: "border border-transparent bg-white hover:bg-white/90 transition-all shadow-md",
          socialButtonsBlockButtonText: "!text-black font-bold",
          dividerLine: "bg-white/20",
          dividerText: "!text-white/60 font-medium",
          formButtonPrimary: "bg-neon-cyan !text-black hover:bg-neon-cyan/90 font-bold shadow-[0_0_20px_rgba(0,240,255,0.3)]",
          formFieldInput: "border-white/20 bg-white/5 !text-white focus:border-neon-cyan",
          formFieldLabel: "!text-white/80 font-medium",
          userButtonPopoverCard: "border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.9)] bg-[#111111] rounded-2xl",
          userButtonPopoverActionButton: "hover:bg-white/10 !text-white transition-colors",
          userButtonPopoverActionButtonText: "!text-white font-semibold",
          userButtonPopoverActionButtonIconBox: "!text-white",
          userButtonPopoverActionButtonIcon: "!text-white",
          userPreviewMainIdentifier: "!text-white font-bold",
          userPreviewSecondaryIdentifier: "!text-white/60",
          userButtonPopoverActionButton__manageAccount: "hover:bg-white/10",
          userButtonPopoverActionButton__signOut: "hover:bg-red-500/10 mt-1 !text-red-400",
          userButtonPopoverActionButtonText__signOut: "!text-red-400 font-bold",
          userButtonPopoverActionButtonIconBox__signOut: "!text-red-400",
          userButtonPopoverActionButtonIcon__signOut: "!text-red-400",
        }
      }}
    >
      <QueryClientProvider client={queryClient}>
        <Outlet />
      </QueryClientProvider>
    </AuthProvider>
  );
}
