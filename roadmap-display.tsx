import { Link, useLocation } from "wouter";
import { Moon, Sun, Map, List, BarChart3, LogIn, LogOut, UserCircle2, BookOpen, TrendingUp } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { Show, useUser, useClerk } from "@clerk/react";

const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [location] = useLocation();
  const { user } = useUser();
  const { signOut } = useClerk();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg tracking-tight text-primary">
            <Map className="w-6 h-6" />
            <span>Pathfinder</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/" className={`transition-colors hover:text-primary ${location === '/' ? 'text-primary' : 'text-muted-foreground'}`}>
              Generator
            </Link>
            <Link href="/saved" className={`transition-colors hover:text-primary ${location === '/saved' ? 'text-primary' : 'text-muted-foreground'}`}>
              Saved Roadmaps
            </Link>
            <Link href="/stats" className={`transition-colors hover:text-primary ${location === '/stats' ? 'text-primary' : 'text-muted-foreground'}`}>
              Stats
            </Link>
            <Link href="/blog" className={`transition-colors hover:text-primary ${location.startsWith('/blog') ? 'text-primary' : 'text-muted-foreground'}`}>
              Blog
            </Link>
            <Link href="/trending" className={`transition-colors hover:text-primary ${location.startsWith('/trending') ? 'text-primary' : 'text-muted-foreground'}`}>
              Trending
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            aria-label="Toggle theme"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>

          <Show when="signed-out">
            <div className="hidden md:flex items-center gap-2">
              <Link href="/sign-in">
                <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground hover:text-foreground">
                  <LogIn className="w-4 h-4" />
                  Sign In
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button size="sm" className="gap-1.5">
                  Get Started
                </Button>
              </Link>
            </div>
          </Show>

          <Show when="signed-in">
            <div className="hidden md:flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/50 border border-border/50">
                {user?.imageUrl ? (
                  <img src={user.imageUrl} alt={user.firstName ?? "User"} className="w-6 h-6 rounded-full object-cover" />
                ) : (
                  <UserCircle2 className="w-5 h-5 text-muted-foreground" />
                )}
                <span className="text-sm font-medium text-foreground max-w-[120px] truncate">
                  {user?.firstName ?? user?.emailAddresses?.[0]?.emailAddress?.split("@")[0] ?? "User"}
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="gap-1.5 text-muted-foreground hover:text-foreground"
                onClick={() => signOut({ redirectUrl: basePath || "/" })}
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </Button>
            </div>
          </Show>

          <div className="flex md:hidden items-center gap-1">
            <Link href="/"><Button variant="ghost" size="icon" className={location === '/' ? 'text-primary' : 'text-muted-foreground'}><Map className="h-5 w-5" /></Button></Link>
            <Link href="/saved"><Button variant="ghost" size="icon" className={location === '/saved' ? 'text-primary' : 'text-muted-foreground'}><List className="h-5 w-5" /></Button></Link>
            <Link href="/stats"><Button variant="ghost" size="icon" className={location === '/stats' ? 'text-primary' : 'text-muted-foreground'}><BarChart3 className="h-5 w-5" /></Button></Link>
            <Link href="/blog"><Button variant="ghost" size="icon" className={location.startsWith('/blog') ? 'text-primary' : 'text-muted-foreground'}><BookOpen className="h-5 w-5" /></Button></Link>
            <Link href="/trending"><Button variant="ghost" size="icon" className={location.startsWith('/trending') ? 'text-primary' : 'text-muted-foreground'}><TrendingUp className="h-5 w-5" /></Button></Link>
            <Show when="signed-out">
              <Link href="/sign-in"><Button variant="ghost" size="icon" className="text-muted-foreground"><LogIn className="h-5 w-5" /></Button></Link>
            </Show>
            <Show when="signed-in">
              <Button variant="ghost" size="icon" className="text-muted-foreground" onClick={() => signOut({ redirectUrl: basePath || "/" })}>
                <LogOut className="h-5 w-5" />
              </Button>
            </Show>
          </div>
        </div>
      </div>
    </header>
  );
}
