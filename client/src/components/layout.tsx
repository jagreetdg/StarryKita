import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { HomeIcon, GlassWater, MusicIcon, CalendarIcon, MailIcon, Globe2Icon } from "lucide-react";
import { useTranslations } from "@/lib/translations/context";

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  text: string;
  isActive: boolean;
}

function NavItem({ href, icon, text, isActive }: NavItemProps) {
  return (
    <Link href={href}>
      <Button 
        variant="ghost" 
        className={cn(
          "flex items-center gap-2",
          isActive && "bg-primary text-primary-foreground hover:bg-primary/90"
        )}
      >
        {icon}
        <span className={cn(
          "hidden", 
          isActive ? "block" : "sm:block" 
        )}>{text}</span>
      </Button>
    </Link>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const { language, setLanguage, t } = useTranslations();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'jp' : 'en');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="fixed top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
        <div className="container flex items-center h-16 mx-auto px-4">
          <nav className="flex-1 flex items-center space-x-1">
            <NavItem 
              href="/" 
              icon={<HomeIcon className="h-4 w-4" />} 
              text={t('nav', 'home')}
              isActive={location === "/"} 
            />
            <NavItem 
              href="/bars" 
              icon={<GlassWater className="h-4 w-4" />} 
              text={t('nav', 'bars')}
              isActive={location.startsWith("/bars")} 
            />
            <NavItem 
              href="/live" 
              icon={<MusicIcon className="h-4 w-4" />} 
              text={t('nav', 'live')}
              isActive={location.startsWith("/live")} 
            />
            <NavItem 
              href="/events" 
              icon={<CalendarIcon className="h-4 w-4" />} 
              text={t('nav', 'events')}
              isActive={location === "/events"} 
            />
            <NavItem 
              href="/contact" 
              icon={<MailIcon className="h-4 w-4" />} 
              text={t('nav', 'contact')}
              isActive={location === "/contact"} 
            />
          </nav>
          <Button 
            variant="outline"
            size="icon"
            onClick={toggleLanguage}
            className="w-8 h-8"
          >
            <Globe2Icon className="h-4 w-4" />
            <span className="sr-only">{language.toUpperCase()}</span>
          </Button>
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