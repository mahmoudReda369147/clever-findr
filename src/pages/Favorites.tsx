import { Star, Trash2, ExternalLink, TrendingDown, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface FavoriteProduct {
  id: string;
  title: string;
  currentPrice: number;
  previousPrice: number;
  rating: number;
  reviews: number;
  image: string;
  source: string;
  lastUpdated: Date;
}

const Favorites = () => {
  const favorites: FavoriteProduct[] = [
    {
      id: "1",
      title: "Premium Wireless Headphones with Active Noise Cancellation",
      currentPrice: 279.99,
      previousPrice: 299.99,
      rating: 4.7,
      reviews: 2834,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
      source: "Amazon",
      lastUpdated: new Date(Date.now() - 3600000),
    },
    {
      id: "2",
      title: "Studio Quality Bluetooth Headphones",
      currentPrice: 199.99,
      previousPrice: 189.99,
      rating: 4.8,
      reviews: 956,
      image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop",
      source: "Walmart",
      lastUpdated: new Date(Date.now() - 7200000),
    },
  ];

  const getPriceChange = (current: number, previous: number) => {
    const change = ((current - previous) / previous) * 100;
    return {
      percentage: Math.abs(change).toFixed(1),
      isIncrease: change > 0,
    };
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Your <span className="gradient-text">Favorites</span>
        </h1>
        <p className="text-muted-foreground">
          {favorites.length} saved {favorites.length === 1 ? "product" : "products"}
        </p>
      </div>

      {favorites.length === 0 ? (
        <Card className="glass text-center p-12">
          <div className="max-w-md mx-auto">
            <div className="h-24 w-24 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-4">
              <Star className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold mb-2">No favorites yet</h3>
            <p className="text-muted-foreground mb-4">
              Start adding products to your favorites to track prices and never miss a deal!
            </p>
            <Button>Browse Products</Button>
          </div>
        </Card>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((product, index) => {
            const priceChange = getPriceChange(product.currentPrice, product.previousPrice);
            return (
              <Card
                key={product.id}
                className="group glass hover-glow transition-all hover:-translate-y-1 overflow-hidden animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-0">
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge
                        variant={priceChange.isIncrease ? "destructive" : "default"}
                        className="gap-1"
                      >
                        {priceChange.isIncrease ? (
                          <TrendingUp className="h-3 w-3" />
                        ) : (
                          <TrendingDown className="h-3 w-3" />
                        )}
                        {priceChange.percentage}%
                      </Badge>
                    </div>
                  </div>
                  <div className="p-4">
                    <Badge className="mb-2">{product.source}</Badge>
                    <h3 className="font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {product.title}
                    </h3>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{product.rating}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        ({product.reviews.toLocaleString()})
                      </span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold">${product.currentPrice}</span>
                        <span className="text-sm text-muted-foreground line-through">
                          ${product.previousPrice}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Updated {new Date(product.lastUpdated).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex gap-2">
                  <Button className="flex-1 hover-glow">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Buy Now
                  </Button>
                  <Button variant="outline" size="icon" className="hover:bg-destructive hover:text-destructive-foreground">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Favorites;
