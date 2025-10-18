import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Star, Heart, ExternalLink, SlidersHorizontal, Grid3x3, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  source: "Amazon" | "eBay" | "Walmart" | "AliExpress";
  inStock: boolean;
}

const Results = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "products";
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("relevance");
  const [priceWeight, setPriceWeight] = useState([50]);
  const [ratingWeight, setRatingWeight] = useState([50]);

  // Mock data
  const products: Product[] = [
    {
      id: "1",
      title: "Premium Wireless Headphones with Active Noise Cancellation",
      price: 299.99,
      originalPrice: 399.99,
      rating: 4.7,
      reviews: 2834,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
      source: "Amazon",
      inStock: true,
    },
    {
      id: "2",
      title: "Professional Gaming Headset RGB LED",
      price: 79.99,
      rating: 4.5,
      reviews: 1523,
      image: "https://images.unsplash.com/photo-1599669454699-248893623440?w=500&h=500&fit=crop",
      source: "eBay",
      inStock: true,
    },
    {
      id: "3",
      title: "Studio Quality Bluetooth Headphones",
      price: 199.99,
      originalPrice: 249.99,
      rating: 4.8,
      reviews: 956,
      image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop",
      source: "Walmart",
      inStock: false,
    },
    {
      id: "4",
      title: "Compact Wireless Earbuds with Charging Case",
      price: 49.99,
      rating: 4.3,
      reviews: 3421,
      image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=500&h=500&fit=crop",
      source: "AliExpress",
      inStock: true,
    },
  ];

  const getSourceColor = (source: Product["source"]) => {
    const colors = {
      Amazon: "bg-orange-500",
      eBay: "bg-blue-500",
      Walmart: "bg-blue-600",
      AliExpress: "bg-red-500",
    };
    return colors[source];
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">
          Search results for <span className="gradient-text">"{query}"</span>
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Found {products.length} products across multiple stores
        </p>
      </div>

      {/* Filters and Controls */}
      <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center justify-between">
        <div className="flex gap-2 items-center flex-wrap w-full sm:w-auto">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                <SlidersHorizontal className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filter Results</SheetTitle>
                <SheetDescription>
                  Adjust weights to prioritize what matters most to you
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Price Weight: {priceWeight[0]}%
                  </label>
                  <Slider
                    value={priceWeight}
                    onValueChange={setPriceWeight}
                    max={100}
                    step={1}
                    className="mb-2"
                  />
                  <p className="text-xs text-muted-foreground">
                    Higher value prioritizes lower prices
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Rating Weight: {ratingWeight[0]}%
                  </label>
                  <Slider
                    value={ratingWeight}
                    onValueChange={setRatingWeight}
                    max={100}
                    step={1}
                    className="mb-2"
                  />
                  <p className="text-xs text-muted-foreground">
                    Higher value prioritizes better ratings
                  </p>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[140px] sm:w-[180px] text-xs sm:text-sm h-9">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Relevance</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="reviews">Most Reviews</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-1 ml-auto sm:ml-0">
          <Button
            variant={viewMode === "grid" ? "default" : "ghost"}
            size="icon"
            onClick={() => setViewMode("grid")}
            className="h-9 w-9"
          >
            <Grid3x3 className="h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "ghost"}
            size="icon"
            onClick={() => setViewMode("list")}
            className="h-9 w-9"
          >
            <List className="h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
        </div>
      </div>

      {/* Products Grid */}
      <div
        className={
          viewMode === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
            : "space-y-4"
        }
      >
        {products.map((product, index) => (
          <Card
            key={product.id}
            className="group glass hover-glow transition-all hover:-translate-y-1 overflow-hidden"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardContent className="p-0">
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {product.originalPrice && (
                  <Badge className="absolute top-2 left-2 bg-destructive text-xs">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </Badge>
                )}
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Badge variant="secondary">Out of Stock</Badge>
                  </div>
                )}
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 sm:h-10 sm:w-10"
                >
                  <Heart className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </div>
              <div className="p-3 sm:p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className={`${getSourceColor(product.source)} text-white text-xs`}>
                    {product.source}
                  </Badge>
                </div>
                <h3 className="text-sm sm:text-base font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {product.title}
                </h3>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm sm:text-base font-medium">{product.rating}</span>
                  </div>
                  <span className="text-xs sm:text-sm text-muted-foreground">
                    ({product.reviews.toLocaleString()})
                  </span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl sm:text-2xl font-bold">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-xs sm:text-sm text-muted-foreground line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-3 sm:p-4 pt-0 flex gap-2">
              <Button className="flex-1 hover-glow text-xs sm:text-sm h-9 sm:h-10" disabled={!product.inStock}>
                <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                Buy Now
              </Button>
              <Button variant="outline" size="icon" className="h-9 w-9 sm:h-10 sm:w-10">
                <Heart className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Results;
