import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Send, Bot, User } from "lucide-react";

interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  message: string;
  timestamp: string;
  confidence?: number;
}

interface QuickQuery {
  id: string;
  label: string;
  query: string;
  category: string;
}

const MargdarshakAssistant = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      type: "assistant",
      message: "Hello! I'm Margdarshak, your AI railway assistant. I can help you with train timings, delay predictions, weather impact analysis, and operational queries. How can I assist you today?",
      timestamp: "09:00 AM",
      confidence: 100
    }
  ]);
  
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const quickQueries: QuickQuery[] = [
    {
      id: "1",
      label: "Train Status - 12001",
      query: "What's the current status of Shatabdi Express 12001?",
      category: "Status"
    },
    {
      id: "2",
      label: "Weather Delay Prediction",
      query: "Will trains be delayed due to weather conditions today?",
      category: "Weather"
    },
    {
      id: "3",
      label: "Platform Availability",
      query: "Which platforms are available at Mumbai Central right now?",
      category: "Infrastructure"
    },
    {
      id: "4",
      label: "Route Optimization",
      query: "Suggest optimal route for Delhi to Mumbai corridor",
      category: "Optimization"
    },
    {
      id: "5",
      label: "Track Conflicts",
      query: "Are there any track conflicts in the next 2 hours?",
      category: "Operations"
    },
    {
      id: "6",
      label: "Passenger Load Analysis",
      query: "Show passenger load analysis for peak hours",
      category: "Analytics"
    }
  ];

  const handleSendMessage = (messageText?: string) => {
    const textToSend = messageText || inputMessage.trim();
    if (!textToSend) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      message: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateResponse(textToSend);
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        message: aiResponse.message,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        confidence: aiResponse.confidence
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateResponse = (query: string): { message: string; confidence: number } => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('12001') || lowerQuery.includes('shatabdi')) {
      return {
        message: "Shatabdi Express 12001 (New Delhi - Bhopal) is currently on time. It departed from New Delhi at 06:00 AM and is expected to arrive at Bhopal Junction at 14:30. Current location: Approaching Gwalior Junction. No delays expected due to favorable weather conditions.",
        confidence: 95
      };
    }
    
    if (lowerQuery.includes('weather') || lowerQuery.includes('delay')) {
      return {
        message: "Weather analysis shows moderate impact on 3 routes today. Mumbai-Pune corridor experiencing light rainfall with 10-15 minute delays expected. Delhi-Chandigarh route has fog conditions causing 5-10 minute delays. Overall system punctuality remains at 92%. I recommend monitoring real-time updates.",
        confidence: 88
      };
    }
    
    if (lowerQuery.includes('platform') || lowerQuery.includes('mumbai central')) {
      return {
        message: "Mumbai Central Station status: Platforms 1, 3, 5, 7, 9 are currently available. Platform 2 occupied by Rajdhani Express until 10:45 AM. Platform 4 under maintenance until 2:00 PM. Platform 6 reserved for incoming Vande Bharat Express at 11:30 AM.",
        confidence: 92
      };
    }
    
    if (lowerQuery.includes('route') || lowerQuery.includes('optimization') || lowerQuery.includes('delhi to mumbai')) {
      return {
        message: "For Delhi-Mumbai corridor, optimal routing analysis suggests: Primary route via Mathura-Agra-Gwalior-Bhopal shows 89% on-time performance. Alternative route via Jhansi-Bina reduces journey time by 45 minutes but has 15% chance of congestion at Jhansi junction during peak hours (2-4 PM).",
        confidence: 91
      };
    }
    
    if (lowerQuery.includes('conflict') || lowerQuery.includes('track')) {
      return {
        message: "Track conflict analysis for next 2 hours: 2 potential conflicts detected. Junction JN-247 (Mathura) at 11:15 AM - Shatabdi Express vs. goods train conflict resolved by granting precedence to passenger service. Junction JN-156 (Bhopal) at 12:30 PM - minimal 3-minute delay expected.",
        confidence: 94
      };
    }

    if (lowerQuery.includes('passenger') || lowerQuery.includes('load')) {
      return {
        message: "Peak hour passenger load analysis (8-10 AM & 6-8 PM): Mumbai-Delhi routes at 94% capacity. Chennai-Bangalore at 87% capacity. Delhi-Kolkata at 76% capacity. Recommend additional services on Mumbai-Delhi corridor. Current average passenger satisfaction: 4.2/5.0.",
        confidence: 89
      };
    }
    
    return {
      message: "I understand your query about railway operations. Based on current system data, I can provide detailed analysis on train schedules, weather impacts, route optimization, and operational decisions. Could you please specify which aspect you'd like me to focus on? I can help with real-time status, predictions, or recommendations.",
      confidence: 85
    };
  };

  const handleQuickQuery = (query: string) => {
    handleSendMessage(query);
  };

  return (
    <div className="w-full bg-background">
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-2">Margdarshak AI Assistant</h1>
          <p className="text-muted-foreground">Intelligent railway operations assistant for real-time queries and decision support</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Quick Queries */}
          <div className="lg:col-span-1">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg">Quick Queries</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {quickQueries.map((query) => (
                  <Button
                    key={query.id}
                    variant="outline"
                    size="sm"
                    className="w-full justify-start text-left h-auto p-3"
                    onClick={() => handleQuickQuery(query.query)}
                  >
                    <div>
                      <div className="font-medium text-sm">{query.label}</div>
                      <Badge variant="secondary" className="mt-1 text-xs">
                        {query.category}
                      </Badge>
                    </div>
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <Card className="shadow-card h-96">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-railway-primary" />
                  Chat with Margdarshak
                </CardTitle>
              </CardHeader>
              <CardContent className="h-80 flex flex-col">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-3xl px-4 py-3 rounded-lg ${
                          message.type === 'user'
                            ? 'bg-railway-primary text-railway-primary-foreground'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          {message.type === 'assistant' ? (
                            <Bot className="h-4 w-4 mt-0.5 flex-shrink-0" />
                          ) : (
                            <User className="h-4 w-4 mt-0.5 flex-shrink-0" />
                          )}
                          <div className="flex-1">
                            <p className="text-sm">{message.message}</p>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-xs opacity-70">{message.timestamp}</span>
                              {message.confidence && (
                                <Badge variant="secondary" className="text-xs">
                                  {message.confidence}% confidence
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-muted text-muted-foreground px-4 py-3 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Bot className="h-4 w-4" />
                          <div className="flex gap-1">
                            <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Input */}
                <div className="flex gap-2">
                  <Input
                    placeholder="Ask about train status, weather impacts, delays..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button 
                    onClick={() => handleSendMessage()}
                    disabled={!inputMessage.trim() || isTyping}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MargdarshakAssistant;