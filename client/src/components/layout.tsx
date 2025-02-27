import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { HomeIcon, MapPinIcon, CalendarIcon, MailIcon, Globe2Icon } from "lucide-react";
import { useState } from "react";

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  isActive: boolean;
}

function NavItem({ href, icon, children, isActive }: NavItemProps) {
  return (
    <Link href={href}>
      <Button 
        variant="ghost" 
        className={cn(
          "flex items-center gap-2",
          "sm:px-3", 
          isActive && "bg-primary text-primary-foreground hover:bg-primary/90"
        )}
      >
        {icon}
        <span className={cn(
          "hidden", 
          isActive ? "block" : "sm:block" 
        )}>{children}</span>
      </Button>
    </Link>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [language, setLanguage] = useState<'en' | 'jp'>('en');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'jp' : 'en');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="fixed top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <nav className="flex items-center space-x-1 sm:space-x-4 text-sm font-medium">
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
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={toggleLanguage}
                className="ml-2 sm:ml-4"
              >
                <Globe2Icon className="h-4 w-4" />
                <span className="hidden sm:inline-block ml-2">{language.toUpperCase()}</span>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        {children}
      </main>

      <footer className="border-t py-6 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-muted-foreground">
          © 2024 Shimokitazawa Live Houses. All rights reserved.
        </div>
      </footer>
    </div>
  );
}