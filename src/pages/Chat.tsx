import { useState } from "react";
import { Send, Mic, Sparkles, MoreVertical, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface Conversation {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hello! I'm your AI shopping assistant. How can I help you find the best deals today?",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: "1",
      title: "Gaming Laptop Search",
      lastMessage: "Looking for a laptop under $1500",
      timestamp: new Date(Date.now() - 86400000),
    },
    {
      id: "2",
      title: "Wireless Earbuds",
      lastMessage: "Best ANC earbuds comparison",
      timestamp: new Date(Date.now() - 172800000),
    },
  ]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInputMessage("");

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I'm searching for the best options for you. Based on current deals, I found several great products...",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Sidebar - Conversation History */}
      <div className="hidden lg:block w-64 xl:w-80 border-r border-border/50 glass">
        <div className="p-4 border-b border-border/50">
          <h2 className="font-bold text-lg flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Conversations
          </h2>
        </div>
        <ScrollArea className="h-[calc(100vh-8rem)]">
          <div className="p-4 space-y-2">
            {conversations.map((conv) => (
              <button
                key={conv.id}
                className="w-full text-left p-3 rounded-xl hover:bg-muted/50 transition-colors group"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium truncate group-hover:text-primary transition-colors">
                      {conv.title}
                    </h3>
                    <p className="text-sm text-muted-foreground truncate">
                      {conv.lastMessage}
                    </p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 opacity-0 group-hover:opacity-100"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <span className="text-xs text-muted-foreground">
                  {conv.timestamp.toLocaleDateString()}
                </span>
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-3 sm:p-4 border-b border-border/50 glass flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
              <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
            </div>
            <div className="min-w-0">
              <h2 className="font-bold text-sm sm:text-base truncate">AI Shopping Assistant</h2>
              <p className="text-xs sm:text-sm text-muted-foreground">Online • Ready to help</p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="flex-shrink-0 text-xs sm:text-sm">
            <span className="hidden sm:inline">New Chat</span>
            <span className="sm:hidden">New</span>
          </Button>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-2 sm:p-4">
          <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-2 sm:gap-3 animate-fade-in ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.role === "assistant" && (
                  <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                    <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[85%] sm:max-w-[70%] rounded-xl sm:rounded-2xl px-3 py-2 sm:px-4 sm:py-3 ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "glass"
                  }`}
                >
                  <p className="whitespace-pre-wrap text-sm sm:text-base">{message.content}</p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                {message.role === "user" && (
                  <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                    <span className="text-xs sm:text-sm font-medium">You</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="p-2 sm:p-4 border-t border-border/50 glass">
          <div className="max-w-4xl mx-auto">
            <div className="flex gap-1.5 sm:gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl flex-shrink-0 hidden sm:flex"
              >
                <Mic className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
              <div className="flex-1 glass rounded-xl">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything..."
                  className="h-10 sm:h-12 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-sm sm:text-base"
                />
              </div>
              <Button
                onClick={handleSendMessage}
                size="icon"
                className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl hover-glow flex-shrink-0"
              >
                <Send className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
