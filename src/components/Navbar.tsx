import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, ShoppingBag, Heart, Bell, Settings, Moon, Sun, User } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const location = useLocation();
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 glass">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <Sparkles className="h-6 w-6 text-primary group-hover:animate-glow transition-all" />
              <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="text-xl font-bold gradient-text">ShopAI</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            <Link to="/">
              <Button
                variant="ghost"
                size="sm"
                className={`transition-all ${
                  isActive("/") ? "bg-primary/10 text-primary" : ""
                }`}
              >
                <ShoppingBag className="h-4 w-4 mr-2" />
                Search
              </Button>
            </Link>
            <Link to="/chat">
              <Button
                variant="ghost"
                size="sm"
                className={`transition-all ${
                  isActive("/chat") ? "bg-primary/10 text-primary" : ""
                }`}
              >
                <Sparkles className="h-4 w-4 mr-2" />
                AI Chat
              </Button>
            </Link>
            <Link to="/favorites">
              <Button
                variant="ghost"
                size="sm"
                className={`transition-all ${
                  isActive("/favorites") ? "bg-primary/10 text-primary" : ""
                }`}
              >
                <Heart className="h-4 w-4 mr-2" />
                Favorites
              </Button>
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-destructive rounded-full animate-pulse" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="hover-glow"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            <Link to="/settings">
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
            </Link>

            <Link to="/auth">
              <Button variant="default" size="sm" className="hover-glow">
                <User className="h-4 w-4 mr-2" />
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
