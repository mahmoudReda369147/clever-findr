import { useState } from "react";
import { Eye, EyeOff, Sparkles, Mail, Lock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Auth = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-[var(--gradient-hero)] opacity-20" />
        <div className="relative z-10 flex flex-col items-center justify-center p-12 text-center">
          <div className="mb-8 animate-float">
            <div className="h-24 w-24 rounded-3xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-2xl">
              <Sparkles className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4 gradient-text">
            Welcome to ShopAI
          </h1>
          <p className="text-xl text-muted-foreground max-w-md">
            Your intelligent shopping companion. Compare prices, discover deals, and shop smarter with AI.
          </p>
          <div className="mt-12 grid grid-cols-3 gap-8 max-w-lg">
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text mb-1">50K+</div>
              <div className="text-sm text-muted-foreground">Products Tracked</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text mb-1">10K+</div>
              <div className="text-sm text-muted-foreground">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text mb-1">$2M+</div>
              <div className="text-sm text-muted-foreground">Saved</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Auth Forms */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <Card className="w-full max-w-md glass border-2">
          <CardHeader className="space-y-1 px-4 sm:px-6">
            <CardTitle className="text-xl sm:text-2xl font-bold text-center">Get Started</CardTitle>
            <CardDescription className="text-center text-sm sm:text-base">
              Create an account or sign in to continue
            </CardDescription>
          </CardHeader>
          <CardContent className="px-4 sm:px-6">
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4 sm:mb-6">
                <TabsTrigger value="signin" className="text-sm sm:text-base">Sign In</TabsTrigger>
                <TabsTrigger value="signup" className="text-sm sm:text-base">Sign Up</TabsTrigger>
              </TabsList>

              {/* Sign In Tab */}
              <TabsContent value="signin" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="pl-10 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
                <Button className="w-full hover-glow">
                  Sign In
                </Button>
                <div className="text-center">
                  <Button variant="link" size="sm">
                    Forgot password?
                  </Button>
                </div>
              </TabsContent>

              {/* Sign Up Tab */}
              <TabsContent value="signup" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="you@example.com"
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signup-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="pl-10 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
                <Button className="w-full hover-glow">
                  Create Account
                </Button>
              </TabsContent>
            </Tabs>

            {/* Social Login */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4 hover-glow">
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Continue with Google
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <p className="text-xs text-center text-muted-foreground">
              By continuing, you agree to our{" "}
              <Button variant="link" size="sm" className="p-0 h-auto">
                Terms of Service
              </Button>{" "}
              and{" "}
              <Button variant="link" size="sm" className="p-0 h-auto">
                Privacy Policy
              </Button>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
