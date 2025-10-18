import { useState } from "react";
import { Search, Mic, Sparkles, TrendingUp, ShoppingCart, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/results?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const trendingSearches = [
    "iPhone 15 Pro",
    "Gaming Laptop",
    "Wireless Earbuds",
    "Smart Watch",
    "4K Monitor",
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-32">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-[var(--gradient-hero)] opacity-10 blur-3xl" />
        
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            {/* Main Heading */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 animate-fade-in">
              <Sparkles className="h-4 w-4 text-primary animate-pulse" />
              <span className="text-sm font-medium text-primary">AI-Powered Shopping</span>
            </div>

            <h1 className="mb-6 text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight animate-fade-in-up">
              Find the{" "}
              <span className="gradient-text">Best Deals</span>
              <br />
              with AI Magic
            </h1>

            <p className="mb-8 sm:mb-12 text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in-up px-4">
              Compare prices, ratings, and reviews across multiple stores instantly. 
              Let our AI assistant help you make smarter shopping decisions.
            </p>

            {/* Search Bar */}
            <div className="mb-6 sm:mb-8 animate-scale-in px-4">
              <div className="relative max-w-2xl mx-auto">
                <div className="glass rounded-xl sm:rounded-2xl p-1.5 sm:p-2 hover-glow">
                  <div className="flex gap-1.5 sm:gap-2">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                      <Input
                        type="text"
                        placeholder="Search for any product..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="h-12 sm:h-14 pl-10 sm:pl-12 pr-3 sm:pr-4 text-base sm:text-lg border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                      />
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-12 w-12 sm:h-14 sm:w-14 rounded-xl hover:bg-accent/50 hidden sm:flex"
                    >
                      <Mic className="h-4 w-4 sm:h-5 sm:w-5" />
                    </Button>
                    <Button
                      onClick={handleSearch}
                      size="lg"
                      className="h-12 sm:h-14 px-4 sm:px-8 rounded-xl hover-glow text-sm sm:text-base"
                    >
                      <Search className="h-4 w-4 sm:hidden" />
                      <span className="hidden sm:inline">Search</span>
                    </Button>
                  </div>
                </div>

                {/* Trending Searches */}
                <div className="mt-4 flex flex-wrap gap-2 justify-center">
                  <span className="text-sm text-muted-foreground">Trending:</span>
                  {trendingSearches.map((term) => (
                    <button
                      key={term}
                      onClick={() => {
                        setSearchQuery(term);
                        navigate(`/results?q=${encodeURIComponent(term)}`);
                      }}
                      className="text-sm px-3 py-1 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center animate-fade-in-up px-4">
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/chat")}
                className="group hover-glow w-full sm:w-auto"
              >
                <Sparkles className="mr-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:animate-glow" />
                Try AI Chat
              </Button>
              <Button
                size="lg"
                variant="ghost"
                className="gap-2 w-full sm:w-auto"
              >
                <svg className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
                </svg>
                Open Telegram Bot
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 lg:py-20 border-t border-border/50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 sm:mb-12">
            Why Choose <span className="gradient-text">ShopAI</span>?
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {/* Feature 1 */}
            <div className="glass rounded-xl sm:rounded-2xl p-6 sm:p-8 hover-glow transition-all hover:-translate-y-1">
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3 sm:mb-4">
                <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2">Smart Comparison</h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                Compare prices, ratings, and reviews across Amazon, eBay, Google Shopping, and more.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="glass rounded-xl sm:rounded-2xl p-6 sm:p-8 hover-glow transition-all hover:-translate-y-1">
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-3 sm:mb-4">
                <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-secondary" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2">AI Assistant</h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                Chat with our AI to find exactly what you need with personalized recommendations.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="glass rounded-xl sm:rounded-2xl p-6 sm:p-8 hover-glow transition-all hover:-translate-y-1 sm:col-span-2 lg:col-span-1">
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-accent/10 flex items-center justify-center mb-3 sm:mb-4">
                <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-accent" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2">Real-time Updates</h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                Track price changes and get instant alerts when your favorite items go on sale.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
