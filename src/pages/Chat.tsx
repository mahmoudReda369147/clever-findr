import { useState, useEffect } from "react";
import { Send, Mic, Sparkles, MoreVertical, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useChats, useMessages, useSendMessage } from "@/lib/api";
import { isAuthenticated } from "@/lib/auth";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface Message {
  _id: string;
  chatId: string;
  role: "user" | "assistant";
  content: string;
  __v: number;
}

interface ChatData {
  _id: string;
  userId: string;
  title: string;
  __v: number;
}

const Chat = () => {
  const navigate = useNavigate();
  const { chatId } = useParams();
  const { toast } = useToast();
  const [inputMessage, setInputMessage] = useState("");
  const [optimisticMessages, setOptimisticMessages] = useState<any[]>([]);
  const [isAiResponding, setIsAiResponding] = useState(false);
  
  // Fixed last message for all chats
  const fixedLastMessage = "Looking for the best deals";

  // Check if user is authenticated
  if (!isAuthenticated()) {
    toast({
      title: "Authentication required",
      description: "Please sign in to view your chats",
      variant: "destructive",
    });
    navigate("/auth");
  }
  
  // Use React Query hooks to fetch data
  const { 
    data: chatsData, 
    isLoading: isLoadingChats 
  } = useChats();
  
  const { 
    data: messagesData, 
    isLoading: isLoadingMessages 
  } = useMessages(chatId);
  
  // Extract data from query results
  const chats = chatsData?.success ? chatsData.data : [];
  const messages = messagesData?.success ? messagesData.data : [];

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Create optimistic user message
    const optimisticUserMessage = {
      id: `temp-${Date.now()}`,
      content: inputMessage,
      role: "user",
      timestamp: new Date().toISOString(),
    };

    // Create optimistic AI loading message
    const optimisticAIMessage = {
      id: `temp-ai-${Date.now()}`,
      content: "",
      role: "assistant",
      timestamp: new Date().toISOString(),
      isLoading: true,
    };

    // Add optimistic messages to state
    setOptimisticMessages([optimisticUserMessage, optimisticAIMessage]);
    setIsAiResponding(true);
    
    // Store message to clear input field
    const messageToSend = inputMessage;
    setInputMessage("");
    
    // Use the mutation hook to send the message
    sendMessageMutation.mutate({
      content: messageToSend,
      chatId,
      title: chatId ? undefined : "New Conversation"
    });
  };

  // Use the sendMessage mutation hook
  const sendMessageMutation = useSendMessage();

  // Use useEffect to handle mutation success and error
  useEffect(() => {
    if (sendMessageMutation.isSuccess && sendMessageMutation.data) {
      // Clear optimistic messages when real response arrives
      setOptimisticMessages([]);
      setIsAiResponding(false);
      
      // If this was a new chat, update the URL with the new chatId
      if (!chatId && sendMessageMutation.data.data?.chatId) {
        navigate(`/chat/${sendMessageMutation.data.data.chatId}`);
      }
    }
    
    if (sendMessageMutation.isError) {
      toast({
        title: "Error",
        description: sendMessageMutation.error?.message || "Failed to send message. Please try again.",
        variant: "destructive",
      });
      setOptimisticMessages([]);
      setIsAiResponding(false);
    }
  }, [sendMessageMutation.isSuccess, sendMessageMutation.isError, sendMessageMutation.data, toast]);

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
            {isLoadingChats ? (
              <div className="text-center p-4 text-muted-foreground">Loading chats...</div>
            ) : chats.length === 0 ? (
              <div className="text-center p-4 text-muted-foreground">No conversations yet</div>
            ) : (
              chats.map((chat) => (
                <button
                  key={chat._id}
                  className="w-full text-left p-3 rounded-xl hover:bg-muted/50 transition-colors group"
                  onClick={() => navigate(`/chat/${chat._id}`)}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate group-hover:text-primary transition-colors">
                        {chat.title}
                      </h3>
                      <p className="text-sm text-muted-foreground truncate">
                        {chat.lastMessage}
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
                    {new Date(chat.updatedAt).toLocaleDateString()}
                  </span>
                </button>
              ))
            )}
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
          <Button variant="outline" size="sm" className="flex-shrink-0 text-xs sm:text-sm" onClick={() => navigate("/chat")}>
            <span className="hidden sm:inline">New Chat</span>
            <span className="sm:hidden">New</span>
          </Button>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-2 sm:p-4">
          <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
            {isLoadingMessages && optimisticMessages.length === 0 ? (
              <div className="text-center p-4 text-muted-foreground">Loading messages...</div>
            ) : messages.length === 0 && optimisticMessages.length === 0 ? (
              <div className="text-center p-4 text-muted-foreground">
                {chatId ? "No messages in this chat yet" : "Select a chat to view messages"}
              </div>
            ) : (
              <>
                {/* Real messages from API */}
                {messages.map((message, index) => (
                  <>
                    <div
                      key={`${message._id}-main`}
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
                        <p className="whitespace-pre-wrap text-sm sm:text-base">
                          {message.role === "assistant" ? message.content.message : message.content}
                        </p>
                        <span className="text-xs opacity-70 mt-1 block">
                          {message?.createdAt?.toLocaleTimeString()}
                        </span>
                      </div>
                      {message.role === "user" && (
                        <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                          <span className="text-xs sm:text-sm font-medium">You</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Product link message */}
                    {message.role === "assistant" && message.content.product && (
                      <div
                        key={`${message._id}-product`}
                        className="flex gap-2 sm:gap-3 animate-fade-in justify-start mt-2"
                      >
                        <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                          <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                        </div>
                        <div className="max-w-[85%] sm:max-w-[70%] rounded-xl sm:rounded-2xl px-3 py-2 sm:px-4 sm:py-3 glass text-primary font-medium hover:underline cursor-pointer" onClick={() => navigate(`/results/${message.content.messageId || message._id}`)}>
                          <div className="whitespace-pre-wrap text-sm sm:text-base">
                            Let's check the items for{" "} {message.content.product}
                            
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                ))}
                
                {/* Optimistic messages (shown while API call is in progress) */}
                {optimisticMessages.map((message) => (
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
                      {message.isLoading ? (
                        <div className="flex items-center space-x-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <p>AI is thinking...</p>
                        </div>
                      ) : (
                        <p className="whitespace-pre-wrap text-sm sm:text-base">{message.content}</p>
                      )}
                      <span className="text-xs opacity-70 mt-1 block">
                        {/* {new Date(message.timestamp).toLocaleTimeString()} */}
                      </span>
                    </div>
                    {message.role === "user" && (
                      <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                        <span className="text-xs sm:text-sm font-medium">You</span>
                      </div>
                    )}
                  </div>
                ))}
              </>
            )}
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
