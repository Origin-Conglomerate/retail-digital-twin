import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  PieChart,
  Pie,
  Legend,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';
import {
  ShoppingBag,
  Store,
  Clock,
  TrendingUp,
  Zap,
  MessageSquare,
  User,
  Users,
  BarChart2,
  Filter,
  Search,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  AlertCircle,
  Bookmark,
  ClipboardList,
  Rocket,
  ShoppingCart,
  Star,
  Package,
  Tag,
  Percent,
  CreditCard,
  Smartphone,
  MapPin,
  Gift,
  Shield,
  Truck,
  LayoutGrid,
  Palette,
  Wallet,
  Bell
} from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for retail insights
const retailData = {
  predictiveAnalytics: [
    {
      customerId: "R10045",
      name: "Alex Johnson",
      visitFrequency: "weekly",
      lifetimeValue: 3250,
      preferences: ["Electronics", "Premium brands", "Online purchases"],
      predictedChurnRisk: 22,
      reasons: ["Last visit 4 weeks ago", "Competitor coupon used", "Decreased basket size"],
      recommendedActions: ["Personalized offer", "Loyalty bonus", "New product notification"]
    },
    {
      customerId: "R10072",
      name: "Maria Garcia",
      visitFrequency: "bi-weekly",
      lifetimeValue: 1850,
      preferences: ["Home goods", "Seasonal items", "In-store pickup"],
      predictedChurnRisk: 18,
      reasons: ["Regular but decreasing frequency", "Prefers competitor for certain categories"],
      recommendedActions: ["Targeted category promotion", "Exclusive in-store event invite"]
    },
    {
      customerId: "R10089",
      name: "Jamal Williams",
      visitFrequency: "daily",
      lifetimeValue: 8200,
      preferences: ["Gadgets", "Limited editions", "Same-day delivery"],
      predictedChurnRisk: 8,
      reasons: ["Highly engaged premium customer"],
      recommendedActions: ["VIP early access", "Concierge service", "Exclusive previews"]
    }
  ],
  productRecommendations: [
    {
      product: "Wireless Earbuds Pro",
      performance: 94,
      popularityTrend: "up",
      profitMargin: 48,
      stockLevel: 42,
      recommendations: [
        "Feature as hero product",
        "Bundle with phone cases",
        "Create endcap display"
      ]
    },
    {
      product: "Organic Cotton Sheets",
      performance: 78,
      popularityTrend: "steady",
      profitMargin: 52,
      stockLevel: 112,
      recommendations: [
        "Promote with bedroom furniture",
        "Highlight sustainability",
        "Offer monogramming option"
      ]
    },
    {
      product: "Fitness Tracker V3",
      performance: 35,
      popularityTrend: "down",
      profitMargin: 28,
      stockLevel: 87,
      recommendations: [
        "Discount to clear inventory",
        "Bundle with health products",
        "Reposition as gift item"
      ]
    }
  ],
  storeOperations: {
    sections: {
      electronics: 82,
      home: 65,
      apparel: 58,
      groceries: 72
    },
    optimalUtilization: {
      electronics: 85,
      home: 75,
      apparel: 70,
      groceries: 80
    },
    footTraffic: {
      weekday: 4200,
      weekend: 6800,
      peakHours: "2-5pm"
    }
  },
  automationReports: [
    {
      type: "daily",
      generated: "1 hour ago",
      recipients: ["Store Manager", "Inventory Lead"],
      highlights: ["Peak hours identified", "3 products low stock", "Staffing adjustments made"]
    },
    {
      type: "weekly",
      generated: "2 days ago",
      recipients: ["Regional Manager", "Marketing"],
      highlights: ["Customer satisfaction 92%", "Top performing products", "Shrinkage reduction 8%"]
    }
  ],
  nlpQueries: [
    {
      query: "Show busiest times last week",
      response: "Peak times: Saturday 2-5pm (82% capacity), Sunday 1-4pm (78% capacity)"
    },
    {
      query: "What's the most profitable product category?",
      response: "Most profitable category: Electronics (52% margin), followed by Home Goods (48% margin)"
    }
  ],
  performanceRadarData: [
    {
      metric: "Checkout Speed",
      current: 82,
      target: 90
    },
    {
      metric: "Product Availability",
      current: 85,
      target: 95
    },
    {
      metric: "Store Cleanliness",
      current: 94,
      target: 95
    },
    {
      metric: "Staff Helpfulness",
      current: 88,
      target: 90
    },
    {
      metric: "Digital Integration",
      current: 76,
      target: 85
    }
  ],
  salesData: [
    { name: 'Mon', sales: 12500, online: 4200 },
    { name: 'Tue', sales: 11800, online: 3800 },
    { name: 'Wed', sales: 13500, online: 4500 },
    { name: 'Thu', sales: 14200, online: 5200 },
    { name: 'Fri', sales: 18800, online: 6800 },
    { name: 'Sat', sales: 23200, online: 7200 },
    { name: 'Sun', sales: 19800, online: 7800 }
  ],
  categorySales: [
    { name: 'Electronics', value: 32 },
    { name: 'Home Goods', value: 28 },
    { name: 'Apparel', value: 22 },
    { name: 'Groceries', value: 18 }
  ],
  inventoryData: [
    { name: 'Overstock', value: 15 },
    { name: 'Optimal', value: 68 },
    { name: 'Low Stock', value: 12 },
    { name: 'Out of Stock', value: 5 }
  ],
  customerJourney: [
    { step: 'Enter Store', value: 100 },
    { step: 'Browse', value: 82 },
    { step: 'Add to Cart', value: 58 },
    { step: 'Checkout', value: 49 },
    { step: 'Purchase', value: 45 }
  ]
};

const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b'];
const CATEGORY_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const INVENTORY_COLORS = ['#FFBB28', '#00C49F', '#FF8042', '#FF0000'];

export default function AIAnalytics() {
  const [activeTab, setActiveTab] = useState('predictive');
  const [expandedCustomer, setExpandedCustomer] = useState(null);
  const [query, setQuery] = useState('');
  const [queryHistory, setQueryHistory] = useState([]);

  const handleQuerySubmit = () => {
    if (!query.trim()) return;
    
    // Simulate AI response
    const newEntry = {
      query,
      response: `AI response to "${query}". Sample data: Based on retail analysis, we recommend...`,
      timestamp: new Date().toLocaleTimeString()
    };
    
    setQueryHistory([newEntry, ...queryHistory]);
    setQuery('');
  };

  return (
    <div className="relative rounded-3xl overflow-hidden 
      bg-gradient-to-br from-blue-900/20 to-purple-900/20
      dark:from-gray-900/90 dark:to-gray-800/90
      border border-white/20 dark:border-gray-700/50
      p-6 space-y-8">

      {/* Header with animated retail icon */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 10, -10, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: 'reverse'
            }}
          >
            <ShoppingBag className="h-10 w-10 text-blue-400" />
          </motion.div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 
              to-purple-400 bg-clip-text text-transparent">
              Retail AI Cortex
            </h1>
            <p className="text-muted-foreground">
              Predictive analytics & intelligent automation for your retail digital twin
            </p>
          </div>
        </div>
        <Badge className="bg-blue-500/10 text-blue-500 px-4 py-1.5">
          <Zap className="h-4 w-4 mr-2" />
          Real-time Mode
        </Badge>
      </div>

      {/* Main tabs navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5 bg-white/5 backdrop-blur-lg">
          <TabsTrigger value="predictive" className="flex gap-2">
            <AlertCircle className="h-4 w-4" />
            Predictive
          </TabsTrigger>
          <TabsTrigger value="products" className="flex gap-2">
            <Tag className="h-4 w-4" />
            Products
          </TabsTrigger>
          <TabsTrigger value="operations" className="flex gap-2">
            <Store className="h-4 w-4" />
            Operations
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex gap-2">
            <ClipboardList className="h-4 w-4" />
            Automation
          </TabsTrigger>
          <TabsTrigger value="ask" className="flex gap-2">
            <MessageSquare className="h-4 w-4" />
            Ask AI
          </TabsTrigger>
        </TabsList>

        {/* Predictive Analytics Tab */}
        <TabsContent value="predictive" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 p-6 backdrop-blur-lg bg-white/5">
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-purple-400" />
                Customer Churn Prediction
              </h3>
              
              <div className="space-y-4">
                {retailData.predictiveAnalytics.map((customer, index) => (
                  <Card key={index} className={`p-4 ${
                    customer.predictedChurnRisk > 20 
                      ? 'bg-red-500/10 border-red-500/30'
                      : customer.predictedChurnRisk > 10
                      ? 'bg-yellow-500/10 border-yellow-500/30'
                      : 'bg-green-500/10 border-green-500/30'
                  }`}>
                    <div 
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => setExpandedCustomer(expandedCustomer === index ? null : index)}
                    >
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>{customer.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{customer.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {customer.visitFrequency} visitor • ${customer.lifetimeValue} LTV
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-24">
                          <Progress 
                            value={customer.predictedChurnRisk} 
                            className={`h-2 ${
                              customer.predictedChurnRisk > 20 
                                ? 'bg-red-500' 
                                : customer.predictedChurnRisk > 10
                                ? 'bg-yellow-500'
                                : 'bg-green-500'
                            }`} 
                          />
                          <div className="text-xs text-right mt-1">
                            {customer.predictedChurnRisk}% churn risk
                          </div>
                        </div>
                        {expandedCustomer === index ? (
                          <ChevronUp className="h-5 w-5" />
                        ) : (
                          <ChevronDown className="h-5 w-5" />
                        )}
                      </div>
                    </div>
                    
                    {expandedCustomer === index && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 space-y-3"
                      >
                        <div>
                          <h4 className="text-sm font-medium mb-1">Preferences:</h4>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {customer.preferences.map((pref, i) => (
                              <Badge key={i} variant="outline" className="flex items-center gap-1">
                                {pref === 'Electronics' && <Smartphone className="h-3 w-3" />}
                                {pref === 'Premium brands' && <Star className="h-3 w-3" />}
                                {pref === 'Online purchases' && <CreditCard className="h-3 w-3" />}
                                {pref === 'Home goods' && <LayoutGrid className="h-3 w-3" />}
                                {pref === 'Seasonal items' && <Palette className="h-3 w-3" />}
                                {pref === 'In-store pickup' && <MapPin className="h-3 w-3" />}
                                {pref === 'Gadgets' && <Package className="h-3 w-3" />}
                                {pref === 'Limited editions' && <Gift className="h-3 w-3" />}
                                {pref === 'Same-day delivery' && <Truck className="h-3 w-3" />}
                                {pref}
                              </Badge>
                            ))}
                          </div>
                          <h4 className="text-sm font-medium mb-1">Risk Factors:</h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {customer.reasons.map((reason, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span>•</span>
                                <span>{reason}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium mb-1">AI Recommendations:</h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {customer.recommendedActions.map((action, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span>•</span>
                                <span>{action}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <Button variant="outline" size="sm" className="mt-2">
                          Create Retention Plan
                        </Button>
                      </motion.div>
                    )}
                  </Card>
                ))}
              </div>
            </Card>
            
            <div className="space-y-6">
              <Card className="p-6 backdrop-blur-lg bg-white/5">
                <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                  <Star className="h-5 w-5 text-blue-400" />
                  Customer Experience
                </h3>
                
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={retailData.performanceRadarData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="metric" />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} />
                      <Radar 
                        name="Current" 
                        dataKey="current" 
                        stroke="#3b82f6" 
                        fill="#3b82f6" 
                        fillOpacity={0.4} 
                      />
                      <Radar 
                        name="Target" 
                        dataKey="target" 
                        stroke="#8b5cf6" 
                        fill="#8b5cf6" 
                        fillOpacity={0.4} 
                      />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-4 text-sm text-muted-foreground">
                  <p>
                    Radar chart shows current vs target performance metrics.
                    Gaps indicate areas needing improvement.
                  </p>
                </div>
              </Card>
              
              <Card className="p-6 backdrop-blur-lg bg-white/5">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Percent className="h-5 w-5 text-purple-400" />
                  Customer Journey Funnel
                </h3>
                
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={retailData.customerJourney}>
                      <XAxis dataKey="step" />
                      <YAxis />
                      <Tooltip />
                      <Area 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#8884d8" 
                        fill="#8884d8" 
                        fillOpacity={0.4} 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="text-sm text-muted-foreground mt-2">
                  Shows conversion rates through key shopping stages
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Product Analytics Tab */}
        <TabsContent value="products" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 p-6 backdrop-blur-lg bg-white/5">
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <Tag className="h-5 w-5 text-blue-400" />
                Sales Performance
              </h3>
              
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={retailData.salesData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="sales" 
                      name="In-Store Sales" 
                      stroke="#3b82f6" 
                      strokeWidth={2}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="online" 
                      name="Online Sales" 
                      stroke="#8b5cf6" 
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-4 bg-green-500/10 border-green-500/30">
                  <h4 className="font-medium mb-2">Best Day</h4>
                  <div className="flex items-end gap-2">
                    <span className="text-2xl font-bold">
                      Saturday
                    </span>
                  </div>
                  <div className="text-xl font-bold mt-2">
                    ${Math.max(...retailData.salesData.map(d => d.sales + d.online)).toLocaleString()}
                  </div>
                </Card>
                
                <Card className="p-4 bg-blue-500/10 border-blue-500/30">
                  <h4 className="font-medium mb-2">Weekly Total</h4>
                  <div className="flex items-end gap-2">
                    <span className="text-2xl font-bold">
                      ${(retailData.salesData.reduce((a,b) => a + b.sales + b.online, 0)).toLocaleString()}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground mt-2">
                    +15% vs last week
                  </div>
                </Card>
                
                <Card className="p-4 bg-purple-500/10 border-purple-500/30">
                  <h4 className="font-medium mb-2">Online Share</h4>
                  <div className="flex items-end gap-2">
                    <span className="text-2xl font-bold">
                      {Math.round(
                        retailData.salesData.reduce((a,b) => a + b.online, 0) / 
                        retailData.salesData.reduce((a,b) => a + b.sales + b.online, 0) * 100
                      )}%
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground mt-2">
                    +4% vs last week
                  </div>
                </Card>
              </div>
            </Card>
            
            <Card className="p-6 backdrop-blur-lg bg-white/5">
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-purple-400" />
                Product Recommendations
              </h3>
              
              <div className="space-y-4">
                {retailData.productRecommendations.map((item, index) => (
                  <Card key={index} className={`p-4 ${
                    item.performance > 80 
                      ? 'bg-green-500/10 border-green-500/30'
                      : item.performance > 50
                      ? 'bg-yellow-500/10 border-yellow-500/30'
                      : 'bg-red-500/10 border-red-500/30'
                  }`}>
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-medium">{item.product}</h4>
                      <Badge variant="outline" className={
                        item.popularityTrend === 'up' ? 'bg-green-500/10 text-green-500' :
                        item.popularityTrend === 'down' ? 'bg-red-500/10 text-red-500' :
                        'bg-blue-500/10 text-blue-500'
                      }>
                        {item.popularityTrend === 'up' ? '↑ Trending' :
                         item.popularityTrend === 'down' ? '↓ Declining' : '→ Steady'}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 mb-3">
                      <div>
                        <div className="text-sm text-muted-foreground">Performance</div>
                        <div className="text-xl font-bold">{item.performance}/100</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Profit</div>
                        <div className="text-xl font-bold">{item.profitMargin}%</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Stock</div>
                        <div className="text-xl font-bold">{item.stockLevel}</div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-1">AI Recommendations:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {item.recommendations.map((rec, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span>•</span>
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <Button variant="outline" size="sm" className="mt-3 w-full">
                      Optimize This Product
                    </Button>
                  </Card>
                ))}
              </div>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6 backdrop-blur-lg bg-white/5">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 text-blue-400" />
                Sales by Category
              </h3>
              
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={retailData.categorySales}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {retailData.categorySales.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={CATEGORY_COLORS[index % CATEGORY_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>
            
            <Card className="p-6 backdrop-blur-lg bg-white/5">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Package className="h-5 w-5 text-purple-400" />
                Inventory Health
              </h3>
              
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={retailData.inventoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {retailData.inventoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={INVENTORY_COLORS[index % INVENTORY_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Store Operations Tab */}
        <TabsContent value="operations" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 p-6 backdrop-blur-lg bg-white/5">
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <Store className="h-5 w-5 text-purple-400" />
                Store Section Utilization
              </h3>
              
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[
                    { name: 'Electronics', current: retailData.storeOperations.sections.electronics, optimal: retailData.storeOperations.optimalUtilization.electronics },
                    { name: 'Home', current: retailData.storeOperations.sections.home, optimal: retailData.storeOperations.optimalUtilization.home },
                    { name: 'Apparel', current: retailData.storeOperations.sections.apparel, optimal: retailData.storeOperations.optimalUtilization.apparel },
                    { name: 'Groceries', current: retailData.storeOperations.sections.groceries, optimal: retailData.storeOperations.optimalUtilization.groceries }
                  ]}>
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Bar dataKey="current" name="Current Usage %" fill="#8884d8">
                      {[0, 1, 2, 3].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                    <Bar dataKey="optimal" name="Optimal Target %" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="p-4 bg-blue-500/10 border-blue-500/30">
                  <h4 className="font-medium mb-2">Electronics</h4>
                  <div className="flex items-end gap-2">
                    <span className="text-2xl font-bold">
                      {retailData.storeOperations.sections.electronics}%
                    </span>
                    <span className="text-sm text-muted-foreground">
                      / {retailData.storeOperations.optimalUtilization.electronics}% target
                    </span>
                  </div>
                  <div className="mt-2">
                    <Progress 
                      value={retailData.storeOperations.sections.electronics} 
                      className="h-2 bg-blue-500/30" 
                      indicatorClassName="bg-blue-500"
                    />
                  </div>
                </Card>
                
                <Card className="p-4 bg-purple-500/10 border-purple-500/30">
                  <h4 className="font-medium mb-2">Home</h4>
                  <div className="flex items-end gap-2">
                    <span className="text-2xl font-bold">
                      {retailData.storeOperations.sections.home}%
                    </span>
                    <span className="text-sm text-muted-foreground">
                      / {retailData.storeOperations.optimalUtilization.home}% target
                    </span>
                  </div>
                  <div className="mt-2">
                    <Progress 
                      value={retailData.storeOperations.sections.home} 
                      className="h-2 bg-purple-500/30" 
                      indicatorClassName="bg-purple-500"
                    />
                  </div>
                </Card>
                
                <Card className="p-4 bg-pink-500/10 border-pink-500/30">
                  <h4 className="font-medium mb-2">Apparel</h4>
                  <div className="flex items-end gap-2">
                    <span className="text-2xl font-bold">
                      {retailData.storeOperations.sections.apparel}%
                    </span>
                    <span className="text-sm text-muted-foreground">
                      / {retailData.storeOperations.optimalUtilization.apparel}% target
                    </span>
                  </div>
                  <div className="mt-2">
                    <Progress 
                      value={retailData.storeOperations.sections.apparel} 
                      className="h-2 bg-pink-500/30" 
                      indicatorClassName="bg-pink-500"
                    />
                  </div>
                </Card>
                
                <Card className="p-4 bg-green-500/10 border-green-500/30">
                  <h4 className="font-medium mb-2">Groceries</h4>
                  <div className="flex items-end gap-2">
                    <span className="text-2xl font-bold">
                      {retailData.storeOperations.sections.groceries}%
                    </span>
                    <span className="text-sm text-muted-foreground">
                      / {retailData.storeOperations.optimalUtilization.groceries}% target
                    </span>
                  </div>
                  <div className="mt-2">
                    <Progress 
                      value={retailData.storeOperations.sections.groceries} 
                      className="h-2 bg-green-500/30" 
                      indicatorClassName="bg-green-500"
                    />
                  </div>
                </Card>
              </div>
            </Card>
            
            <Card className="p-6 backdrop-blur-lg bg-white/5">
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-400" />
                Store Optimization
              </h3>
              
              <div className="space-y-4">
                <Card className="p-4 bg-green-500/10 border-green-500/30">
                  <h4 className="font-medium mb-2">Staff Scheduling</h4>
                  <p className="text-sm text-muted-foreground">
                    Shift 3 staff from weekday mornings to weekends based on foot traffic patterns.
                  </p>
                  <div className="text-xs mt-2">
                    <span className="font-medium">Foot Traffic:</span> Weekdays: {retailData.storeOperations.footTraffic.weekday}, Weekends: {retailData.storeOperations.footTraffic.weekend}
                  </div>
                  <Button variant="outline" size="sm" className="mt-3">
                    View Schedule
                  </Button>
                </Card>
                
                <Card className="p-4 bg-blue-500/10 border-blue-500/30">
                  <h4 className="font-medium mb-2">Inventory Replenishment</h4>
                  <p className="text-sm text-muted-foreground">
                    Prioritize restocking electronics and home goods based on sales velocity.
                  </p>
                  <Button variant="outline" size="sm" className="mt-3">
                    View Inventory
                  </Button>
                </Card>
                
                <Card className="p-4 bg-purple-500/10 border-purple-500/30">
                  <h4 className="font-medium mb-2">Promotional Strategy</h4>
                  <p className="text-sm text-muted-foreground">
                    Create bundles pairing high-margin electronics with accessories.
                  </p>
                  <Button variant="outline" size="sm" className="mt-3">
                    Create Promotion
                  </Button>
                </Card>
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Automated Reporting Tab */}
        <TabsContent value="reports" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {retailData.automationReports.map((report, index) => (
              <Card key={index} className="p-6 backdrop-blur-lg bg-white/5">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold capitalize">
                      {report.type} Report
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Generated {report.generated}
                    </p>
                  </div>
                  <Badge variant="outline">
                    {report.recipients.length} recipients
                  </Badge>
                </div>
                
                <div className="space-y-3 mb-6">
                  <h4 className="font-medium flex items-center gap-2">
                    <Rocket className="h-4 w-4 text-blue-400" />
                    Key Highlights
                  </h4>
                  <ul className="space-y-2">
                    {report.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span>•</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}