import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { HomeIcon, MapPinIcon, CalendarIcon, MailIcon } from "lucide-react";

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  isActive: boolean;
}

function NavItem({ href, icon, children, isActive }: NavItemProps) {
  return (
    <Link href={href}>
      <a className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-md transition-colors",
        isActive ? "bg-primary text-primary-foreground" : "hover:bg-accent"
      )}>
        {icon}
        <span>{children}</span>
      </a>
    </Link>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <NavItem href="/" icon={<HomeIcon className="h-4 w-4" />} isActive={location === "/"}>
              Home
            </NavItem>
            <NavItem href="/venues" icon={<MapPinIcon className="h-4 w-4" />} isActive={location.startsWith("/venues")}>
              Venues
            </NavItem>
            <NavItem href="/events" icon={<CalendarIcon className="h-4 w-4" />} isActive={location === "/events"}>
              Events
            </NavItem>
            <NavItem href="/contact" icon={<MailIcon className="h-4 w-4" />} isActive={location === "/contact"}>
              Contact
            </NavItem>
          </nav>
        </div>
      </header>

      <main className="flex-1 container py-6">
        {children}
      </main>

      <footer className="border-t py-6 bg-muted">
        <div className="container text-center text-sm text-muted-foreground">
          © 2024 Shimokitazawa Live Houses. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
