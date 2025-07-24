import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity,
  AlertCircle,
  AlertTriangle,
  ArrowUp,
  Bot,
  BookOpen,
  CheckCircle,
  Clock,
  Code,
  Cpu,
  Database,
  Download,
  FileText,
  Filter,
  Gauge,
  HardDrive,
  HelpCircle,
  MessageSquare,
  Plus,
  Search,
  Server,
  Settings,
  Shield,
  Sparkles,
  Upload,
  User,
  Users,
  Wifi,
  Zap,
  ShoppingCart,
  Store,
  PieChart,
  Receipt,
  CalendarClock,
  Bell,
  Package,
  Tag,
  BarChart2,
  CreditCard,
  LayoutGrid,
  ShoppingBag,
  Truck,
  Percent,
  Wallet,
  ClipboardList,
  Loader2
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

// Mock data sources
const dataSources = [
  { name: "POS System", icon: <ShoppingCart className="h-4 w-4" />, connected: true },
  { name: "Inventory", icon: <Package className="h-4 w-4" />, connected: true },
  { name: "E-commerce", icon: <LayoutGrid className="h-4 w-4" />, connected: true },
  { name: "CRM", icon: <Users className="h-4 w-4" />, connected: true },
  { name: "Supply Chain", icon: <Truck className="h-4 w-4" />, connected: false },
  { name: "Customer Feedback", icon: <MessageSquare className="h-4 w-4" />, connected: true }
];

// Mock messages
const initialMessages = [
  {
    id: 1,
    sender: 'ai',
    content: 'Hello Retail Manager! I\'m your Retail Digital Twin. I\'ve been analyzing today\'s store performance. Would you like an overview?',
    timestamp: new Date(),
    type: 'greeting'
  },
  {
    id: 2,
    sender: 'ai',
    content: 'Alert: Stock levels for 5 popular items are below threshold. Would you like me to generate a restock order?',
    timestamp: new Date(),
    type: 'alert',
    urgent: true
  },
  {
    id: 3,
    sender: 'ai',
    content: 'Here\'s today\'s snapshot:\n- $28,450 in sales (82% of projection)\n- 342 transactions\n- Average basket size: $83.19\n- Top selling category: Electronics (32% of sales)\n- Conversion rate: 38%\n- Customer satisfaction: 4.7/5',
    timestamp: new Date(),
    type: 'summary'
  }
];

export default function AgenticAI() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [activeDataSource, setActiveDataSource] = useState(null);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Simulate proactive AI messages
  useEffect(() => {
    const proactiveTimer = setTimeout(() => {
      const newAlert = {
        id: messages.length + 1,
        sender: 'ai',
        content: 'Alert: The checkout line has reached 8 customers at Register 3 during peak hours. Would you like to open another register or send assistance?',
        timestamp: new Date(),
        type: 'alert',
        urgent: true
      };
      setMessages(prev => [...prev, newAlert]);
    }, 30000); // Every 30 seconds check for new alerts

    return () => clearTimeout(proactiveTimer);
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      sender: 'user',
      content: input,
      timestamp: new Date(),
      type: 'query'
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setIsTyping(true);

    // Simulate AI processing
    setTimeout(() => {
      let aiResponse;
      
      if (input.toLowerCase().includes('sales') || input.toLowerCase().includes('revenue')) {
        // Simulate data gathering process
        setActiveDataSource('POS System');
        setTimeout(() => {
          setActiveDataSource('E-commerce');
          setTimeout(() => {
            setActiveDataSource(null);
            aiResponse = {
              id: messages.length + 2,
              sender: 'ai',
              content: `Sales analysis complete:\n\n- Total revenue: $31,280 (89% of projection)\n- Physical vs Online: 68% / 32%\n- Highest margin items: Accessories (58% margin)\n- Slowest moving: Winter Collection (only 12 units sold)\n- Suggested action: Run promotion on slow-moving items`,
              timestamp: new Date(),
              type: 'analysis',
              sources: ['POS System', 'E-commerce'],
              analysisTime: '1.5s'
            };
            setMessages(prev => [...prev, aiResponse]);
            setIsLoading(false);
            setIsTyping(false);
          }, 1500);
        }, 1500);
      } else if (input.toLowerCase().includes('inventory') || input.toLowerCase().includes('stock')) {
        setActiveDataSource('Inventory');
        setTimeout(() => {
          setActiveDataSource('POS System');
          setTimeout(() => {
            setActiveDataSource(null);
            aiResponse = {
              id: messages.length + 2,
              sender: 'ai',
              content: `Inventory status:\n\n- Critical items: Wireless Earbuds (3 days left), Smart Watches (2 days)\n- Overstocked: Summer Dresses (42 days supply)\n- Shrinkage rate: 1.8% (mostly small electronics)\n- Suggested order: 50 Wireless Earbuds, 30 Smart Watches, 15 Laptops\n\nShall I place the order with our suppliers?`,
              timestamp: new Date(),
              type: 'analysis',
              sources: ['Inventory', 'POS System'],
              analysisTime: '2.3s'
            };
            setMessages(prev => [...prev, aiResponse]);
            setIsLoading(false);
            setIsTyping(false);
          }, 1500);
        }, 1500);
      } else if (input.toLowerCase().includes('customer') || input.toLowerCase().includes('feedback')) {
        setActiveDataSource('Customer Feedback');
        setTimeout(() => {
          setActiveDataSource('CRM');
          setTimeout(() => {
            setActiveDataSource(null);
            aiResponse = {
              id: messages.length + 2,
              sender: 'ai',
              content: `Customer sentiment analysis:\n\n- Satisfaction: 4.7/5 (94% positive)\n- Common compliments: Staff helpfulness, product selection\n- Frequent complaints: Checkout wait times (18 mentions), returns process (9)\n- Loyalty program: 42% of sales from members\n- Suggested action: Implement express checkout for loyalty members`,
              timestamp: new Date(),
              type: 'analysis',
              sources: ['Customer Feedback', 'CRM'],
              analysisTime: '3.1s'
            };
            setMessages(prev => [...prev, aiResponse]);
            setIsLoading(false);
            setIsTyping(false);
          }, 1500);
        }, 1500);
      } else if (input.toLowerCase().includes('staff') || input.toLowerCase().includes('employee')) {
        setActiveDataSource('POS System');
        setTimeout(() => {
          setActiveDataSource('CRM');
          setTimeout(() => {
            setActiveDataSource(null);
            aiResponse = {
              id: messages.length + 2,
              sender: 'ai',
              content: `Staff performance overview:\n\n- Top performer: Sarah (avg. $320/hr sales)\n- Conversion rates range: 32%-48%\n- 2 staff members approaching overtime\n- Training needed: 3 associates on new POS features\n- Next shift: 4 associates scheduled for evening peak\n\nWould you like to adjust schedules or assign training?`,
              timestamp: new Date(),
              type: 'analysis',
              sources: ['POS System', 'CRM'],
              analysisTime: '2.8s'
            };
            setMessages(prev => [...prev, aiResponse]);
            setIsLoading(false);
            setIsTyping(false);
          }, 1500);
        }, 1500);
      } else {
        // Default response
        aiResponse = {
          id: messages.length + 2,
          sender: 'ai',
          content: `I've analyzed your query. Here's what I can share:\n\n- Store traffic is 12% above daily average\n- 5 VIP customers in loyalty program visiting today\n- Staffing levels optimal for current traffic\n- Next delivery expected in 2 hours\n\nHow else can I assist with your retail operations today?`,
          timestamp: new Date(),
          type: 'response'
        };
        setMessages(prev => [...prev, aiResponse]);
        setIsLoading(false);
        setIsTyping(false);
      }
    }, 1000);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="relative rounded-3xl overflow-hidden 
      bg-gradient-to-br from-blue-900/20 to-purple-900/20
      dark:from-gray-900/90 dark:to-gray-800/90
      border border-white/20 dark:border-gray-700/50
      p-6 h-full flex flex-col">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Avatar className="bg-gradient-to-r from-blue-500 to-purple-500">
            <AvatarFallback className="bg-transparent">
              <ShoppingBag className="h-6 w-6" />
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-300 
              to-purple-300 bg-clip-text text-transparent">
              Retail Digital Twin
            </h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Wifi className="h-3 w-3 text-green-500" />
                <span>Connected</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Cpu className="h-3 w-3 text-blue-500" />
                <span>Retail Intelligence Mode</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Sparkles className="h-4 w-4" />
            Actions
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Data Sources Status */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Server className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Connected Retail Systems</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {dataSources.map((source, index) => (
            <Badge 
              key={index} 
              variant={source.connected ? 'default' : 'outline'}
              className="gap-2"
            >
              {source.icon}
              {source.name}
              {source.connected ? (
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
              ) : (
                <div className="h-2 w-2 rounded-full bg-gray-500"></div>
              )}
            </Badge>
          ))}
        </div>
      </div>

      {/* Chat Container */}
      <Card className="flex-1 backdrop-blur-lg bg-white/5 overflow-hidden mb-4">
        <ScrollArea className="h-full p-4">
          <div className="space-y-6">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`flex ${message.sender === 'ai' ? 'justify-start' : 'justify-end'}`}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`max-w-[85%] rounded-2xl p-4 ${
                    message.sender === 'ai' 
                      ? 'bg-white/5 border border-white/10 rounded-tl-none'
                      : 'bg-blue-500/10 border border-blue-500/20 rounded-tr-none'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    {message.sender === 'ai' ? (
                      <ShoppingBag className="h-4 w-4 text-blue-400" />
                    ) : (
                      <User className="h-4 w-4 text-purple-400" />
                    )}
                    <span className="text-xs text-muted-foreground">
                      {formatTime(message.timestamp)}
                    </span>
                    {message.urgent && (
                      <Badge variant="destructive" className="ml-auto">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        Urgent
                      </Badge>
                    )}
                  </div>
                  
                  {message.type === 'summary' || message.type === 'analysis' ? (
                    <div className="whitespace-pre-line">
                      {message.content.split('\n').map((line, i) => (
                        <p key={i} className="mb-2">{line}</p>
                      ))}
                      {message.sources && (
                        <div className="mt-3 pt-2 border-t border-white/10">
                          <div className="text-xs text-muted-foreground mb-1">
                            Analyzed data from:
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {message.sources.map((source, i) => (
                              <Badge key={i} variant="outline" className="text-xs gap-1">
                                {dataSources.find(ds => ds.name === source)?.icon}
                                {source}
                              </Badge>
                            ))}
                            <Badge variant="outline" className="text-xs">
                              <Clock className="h-3 w-3 mr-1" />
                              {message.analysisTime}
                            </Badge>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="whitespace-pre-line">
                      {message.content}
                    </div>
                  )}
                </motion.div>
              </div>
            ))}
            
            {/* Loading indicator when AI is typing */}
            <AnimatePresence>
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex justify-start"
                >
                  <div className="max-w-[85%] rounded-2xl p-4 bg-white/5 border border-white/10 rounded-tl-none">
                    <div className="flex items-center gap-2 mb-2">
                      <ShoppingBag className="h-4 w-4 text-blue-400" />
                      <span className="text-xs text-muted-foreground">
                        {formatTime(new Date())}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin text-blue-400" />
                      <span>Analyzing retail data...</span>
                    </div>
                    {activeDataSource && (
                      <div className="mt-2 text-xs text-muted-foreground flex items-center gap-2">
                        <ArrowUp className="h-3 w-3 animate-bounce" />
                        Connecting to {activeDataSource}...
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </Card>

      {/* Input Area */}
      <form onSubmit={handleSendMessage} className="relative">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about sales, inventory, staff, customers, promotions..."
          className="pr-12 backdrop-blur-lg bg-white/5 border-white/20"
          disabled={isLoading}
        />
        <Button 
          type="submit" 
          size="icon" 
          className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
          disabled={isLoading || !input.trim()}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </Button>
      </form>

      {/* Quick Action Buttons */}
      <div className="mt-4 flex flex-wrap gap-2">
        <Button variant="outline" size="sm" className="gap-2">
          <BarChart2 className="h-4 w-4" />
          Sales Report
        </Button>
        <Button variant="outline" size="sm" className="gap-2">
          <AlertCircle className="h-4 w-4" />
          View Alerts
        </Button>
        <Button variant="outline" size="sm" className="gap-2">
          <Package className="h-4 w-4" />
          Inventory Check
        </Button>
        <Button variant="outline" size="sm" className="gap-2">
          <Tag className="h-4 w-4" />
          Create Promotion
        </Button>
        <Button variant="outline" size="sm" className="gap-2">
          <Users className="h-4 w-4" />
          Staff Schedule
        </Button>
      </div>

      {/* Background Effects */}
      <div className="absolute inset-0 -z-10 opacity-20 pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 bg-blue-400 rounded-full"
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function Send(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}