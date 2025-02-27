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
          "flex items-center gap-1 px-2 sm:px-3 h-9", 
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
        <div className="container mx-auto px-2 sm:px-4">
          <div className="flex h-12 sm:h-14 items-center">
            <nav className="flex flex-1 items-center space-x-0.5 sm:space-x-2 text-sm font-medium">
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
              size="sm" 
              onClick={toggleLanguage}
              className="ml-2 h-8 px-2 sm:px-3"
            >
              <Globe2Icon className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline-block">{language.toUpperCase()}</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-12">
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