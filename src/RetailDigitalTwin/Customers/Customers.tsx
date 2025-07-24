import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts';
import {
  Users,
  ShoppingBag,
  ShoppingCart,
  Heart,
  Clock,
  TrendingUp,
  MapPin,
  Smartphone,
  Laptop,
  CreditCard,
  Repeat,
  Star,
  MessageSquare,
  Award,
  Calendar,
  Filter,
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
  MoreHorizontal,
  AlertTriangle
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

// Mock data for retail customer analytics
const customerData = {
  overview: {
    totalCustomers: 1245,
    newCustomers: 89,
    returningCustomers: 1156,
    avgSpend: 87.32,
    satisfactionScore: 4.7,
    loyaltyMembers: 843
  },
  traffic: {
    hourly: [
      { hour: '9:00', inStore: 45, online: 12 },
      { hour: '10:00', inStore: 78, online: 18 },
      { hour: '11:00', inStore: 112, online: 32 },
      { hour: '12:00', inStore: 145, online: 45 },
      { hour: '13:00', inStore: 132, online: 38 },
      { hour: '14:00', inStore: 98, online: 42 },
      { hour: '15:00', inStore: 85, online: 55 }
    ],
    byDay: [
      { day: 'Mon', inStore: 452, online: 145 },
      { day: 'Tue', inStore: 512, online: 178 },
      { day: 'Wed', inStore: 487, online: 162 },
      { day: 'Thu', inStore: 532, online: 198 },
      { day: 'Fri', inStore: 612, online: 245 },
      { day: 'Sat', inStore: 845, online: 312 },
      { day: 'Sun', inStore: 732, online: 287 }
    ]
  },
  demographics: {
    ageGroups: [
      { name: '18-24', value: 18 },
      { name: '25-34', value: 32 },
      { name: '35-44', value: 25 },
      { name: '45-54', value: 15 },
      { name: '55+', value: 10 }
    ],
    gender: [
      { name: 'Male', value: 45 },
      { name: 'Female', value: 52 },
      { name: 'Other', value: 3 }
    ],
    deviceUsage: [
      { name: 'Mobile', value: 68 },
      { name: 'Desktop', value: 25 },
      { name: 'Tablet', value: 7 }
    ]
  },
  behavior: {
    purchaseFrequency: [
      { name: 'Daily', value: 8 },
      { name: 'Weekly', value: 32 },
      { name: 'Monthly', value: 45 },
      { name: 'Quarterly', value: 15 }
    ],
    basketSize: [
      { name: 'Small (<$50)', value: 42 },
      { name: 'Medium ($50-$150)', value: 38 },
      { name: 'Large (>$150)', value: 20 }
    ],
    preferredCategories: [
      { name: 'Electronics', value: 35 },
      { name: 'Fashion', value: 28 },
      { name: 'Home Goods', value: 18 },
      { name: 'Beauty', value: 12 },
      { name: 'Groceries', value: 7 }
    ]
  },
  loyalty: {
    tiers: [
      { name: 'Bronze', value: 320, spend: 45.2 },
      { name: 'Silver', value: 285, spend: 87.5 },
      { name: 'Gold', value: 185, spend: 152.8 },
      { name: 'Platinum', value: 53, spend: 298.3 }
    ],
    redemptionRate: 68,
    pointsAccrued: 12450,
    pointsRedeemed: 8450
  },
  sentiment: {
    reviews: [
      { rating: 5, count: 245, sentiment: 'positive' },
      { rating: 4, count: 187, sentiment: 'positive' },
      { rating: 3, count: 42, sentiment: 'neutral' },
      { rating: 2, count: 15, sentiment: 'negative' },
      { rating: 1, count: 8, sentiment: 'negative' }
    ],
    keywords: [
      { word: 'Quality', count: 124, sentiment: 'positive' },
      { word: 'Price', count: 98, sentiment: 'neutral' },
      { word: 'Service', count: 87, sentiment: 'positive' },
      { word: 'Delivery', count: 45, sentiment: 'negative' },
      { word: 'Selection', count: 32, sentiment: 'positive' }
    ]
  },
  topCustomers: [
    { id: 'C1001', name: 'Alex Johnson', spend: 2450, visits: 18, lastVisit: '2 days ago' },
    { id: 'C1002', name: 'Sarah Williams', spend: 1980, visits: 15, lastVisit: '1 week ago' },
    { id: 'C1003', name: 'Michael Brown', spend: 1750, visits: 12, lastVisit: '3 days ago' },
    { id: 'C1004', name: 'Emily Davis', spend: 1620, visits: 11, lastVisit: '5 days ago' },
    { id: 'C1005', name: 'David Miller', spend: 1480, visits: 10, lastVisit: '2 weeks ago' }
  ],
  aiInsights: [
    {
      type: 'opportunity',
      title: 'Loyalty Potential',
      description: '68% of high-spenders not enrolled in loyalty program',
      action: 'Targeted enrollment campaign'
    },
    {
      type: 'warning',
      title: 'Negative Sentiment',
      description: 'Delivery complaints increased by 45% this month',
      action: 'Review logistics partners'
    },
    {
      type: 'trend',
      title: 'Mobile Shift',
      description: 'Mobile conversions up 22% - optimize app experience',
      action: 'Prioritize mobile UX'
    }
  ]
};

const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b'];

export default function Customers() {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedInsight, setExpandedInsight] = useState(null);

  return (
    <div className="relative rounded-3xl overflow-hidden 
      bg-gradient-to-br from-blue-900/20 to-indigo-900/20
      dark:from-gray-900/90 dark:to-gray-800/90
      border border-white/20 dark:border-gray-700/50
      p-6 space-y-8">

      {/* Header with animated gradient */}
      <div className="relative">
        <motion.div 
          className="absolute -top-8 -left-8 w-32 h-32 rounded-full bg-blue-500/30 blur-xl"
          animate={{
            x: [0, 20, 0],
            y: [0, 15, 0]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <div className="relative z-10">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 
            to-indigo-400 bg-clip-text text-transparent">
            Customer Intelligence Hub
          </h1>
          <p className="text-muted-foreground mt-2">
            AI-powered customer behavior analysis and engagement insights
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-6 bg-white/5 backdrop-blur-lg">
          <TabsTrigger value="overview" className="flex gap-2">
            <Users className="h-4 w-4" /> Overview
          </TabsTrigger>
          <TabsTrigger value="traffic" className="flex gap-2">
            <MapPin className="h-4 w-4" /> Foot Traffic
          </TabsTrigger>
          <TabsTrigger value="demographics" className="flex gap-2">
            <Heart className="h-4 w-4" /> Demographics
          </TabsTrigger>
          <TabsTrigger value="behavior" className="flex gap-2">
            <ShoppingCart className="h-4 w-4" /> Behavior
          </TabsTrigger>
          <TabsTrigger value="loyalty" className="flex gap-2">
            <Award className="h-4 w-4" /> Loyalty
          </TabsTrigger>
          <TabsTrigger value="sentiment" className="flex gap-2">
            <MessageSquare className="h-4 w-4" /> Sentiment
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 backdrop-blur-lg bg-white/5 border-blue-500/30">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm text-muted-foreground">Total Customers</h3>
                  <p className="text-3xl font-bold mt-1">
                    {customerData.overview.totalCustomers.toLocaleString()}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-blue-500/10">
                  <Users className="h-6 w-6 text-blue-400" />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <Badge variant="outline" className="bg-green-500/10 text-green-500">
                  +12.8%
                </Badge>
                <span className="text-sm text-muted-foreground">vs last month</span>
              </div>
            </Card>

            <Card className="p-6 backdrop-blur-lg bg-white/5 border-purple-500/30">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm text-muted-foreground">Avg. Spend</h3>
                  <p className="text-3xl font-bold mt-1">
                    ${customerData.overview.avgSpend.toFixed(2)}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-purple-500/10">
                  <ShoppingBag className="h-6 w-6 text-purple-400" />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-muted-foreground">High: $152</span>
                  <span className="text-muted-foreground">Low: $42</span>
                </div>
                <Progress value={68} className="h-2" />
              </div>
            </Card>

            <Card className="p-6 backdrop-blur-lg bg-white/5 border-green-500/30">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm text-muted-foreground">Satisfaction</h3>
                  <p className="text-3xl font-bold mt-1">
                    {customerData.overview.satisfactionScore}/5
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-green-500/10">
                  <Star className="h-6 w-6 text-green-400" />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(customerData.overview.satisfactionScore)
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-muted-foreground'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  ({customerData.overview.satisfactionScore - 0.3} last month)
                </span>
              </div>
            </Card>
          </div>

          {/* Customer Segments Visualization */}
          <Card className="p-6 backdrop-blur-lg bg-white/5">
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-400" />
              Customer Value Segmentation
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart
                    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                    <XAxis type="number" dataKey="x" name="Frequency" unit="visits" />
                    <YAxis type="number" dataKey="y" name="Spend" unit="$" />
                    <ZAxis type="number" dataKey="z" range={[60, 400]} name="Recency" />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                    <Scatter name="Customers" data={[
                      { x: 5, y: 45, z: 30 },
                      { x: 12, y: 87, z: 14 },
                      { x: 8, y: 62, z: 21 },
                      { x: 15, y: 152, z: 7 },
                      { x: 3, y: 32, z: 45 },
                      { x: 18, y: 198, z: 5 },
                      { x: 10, y: 75, z: 12 },
                      { x: 7, y: 58, z: 28 },
                    ]} fill="#8884d8">
                      {[...Array(8)].map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % 5]} />
                      ))}
                    </Scatter>
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">High-Value Segments</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-blue-500/10">
                      <span>Frequent Shoppers</span>
                      <Badge>18%</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-purple-500/10">
                      <span>Big Spenders</span>
                      <Badge>12%</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-green-500/10">
                      <span>Loyal Members</span>
                      <Badge>24%</Badge>
                    </div>
                  </div>
                </div>
                <div className="pt-4 border-t border-white/10">
                  <h4 className="font-medium mb-2">At-Risk Segments</h4>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-yellow-500/10">
                    <span>Lapsing Customers</span>
                    <Badge variant="destructive">8%</Badge>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* AI Insights & Top Customers */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* AI Insights */}
            <Card className="lg:col-span-2 p-6 backdrop-blur-lg bg-white/5">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <img src="/ai-icon.svg" className="h-5 w-5" alt="AI" />
                Customer AI Insights
              </h3>
              <div className="space-y-3">
                {customerData.aiInsights.map((insight, index) => (
                  <motion.div 
                    key={index}
                    whileHover={{ scale: 1.01 }}
                  >
                    <Card 
                      className={`p-4 cursor-pointer ${
                        insight.type === 'warning' 
                          ? 'bg-red-500/10 border-red-500/30' 
                          : insight.type === 'opportunity'
                          ? 'bg-green-500/10 border-green-500/30'
                          : 'bg-blue-500/10 border-blue-500/30'
                      }`}
                      onClick={() => setExpandedInsight(expandedInsight === index ? null : index)}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg mt-1 ${
                          insight.type === 'warning' 
                            ? 'bg-red-500/20 text-red-400' 
                            : insight.type === 'opportunity'
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-blue-500/20 text-blue-400'
                        }`}>
                          {insight.type === 'warning' ? (
                            <AlertTriangle className="h-4 w-4" />
                          ) : insight.type === 'opportunity' ? (
                            <TrendingUp className="h-4 w-4" />
                          ) : (
                            <Repeat className="h-4 w-4" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">{insight.title}</h4>
                            {expandedInsight === index ? (
                              <ChevronUp className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <ChevronDown className="h-4 w-4 text-muted-foreground" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {insight.description}
                          </p>
                          {expandedInsight === index && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              transition={{ duration: 0.3 }}
                              className="mt-3"
                            >
                              <div className="flex items-center justify-between pt-3 border-t border-white/10">
                                <span className="text-sm">Recommended Action</span>
                                <Button variant="outline" size="sm">
                                  {insight.action}
                                  <ArrowUpRight className="h-4 w-4 ml-2" />
                                </Button>
                              </div>
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </Card>

            {/* Top Customers */}
            <Card className="p-6 backdrop-blur-lg bg-white/5">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Award className="h-5 w-5 text-yellow-400" />
                Top Customers
              </h3>
              <div className="space-y-4">
                {customerData.topCustomers.map((customer, index) => (
                  <div key={customer.id} className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white">
                        {customer.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="font-medium">{customer.name}</div>
                      <div className="text-sm text-muted-foreground">
                        ${customer.spend.toLocaleString()} • {customer.visits} visits
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {customer.lastVisit}
                    </Badge>
                  </div>
                ))}
                <Button variant="ghost" className="w-full mt-2">
                  View All Customers
                </Button>
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* Foot Traffic Tab */}
      {activeTab === 'traffic' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6 backdrop-blur-lg bg-white/5">
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-blue-400" />
                Hourly Foot Traffic
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={customerData.traffic.hourly}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="inStore" fill="#3b82f6" name="In-Store" />
                  <Bar dataKey="online" fill="#8b5cf6" name="Online" />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-6 backdrop-blur-lg bg-white/5">
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-purple-400" />
                Weekly Traffic Patterns
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={customerData.traffic.byDay}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="inStore" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    name="In-Store"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="online" 
                    stroke="#8b5cf6" 
                    strokeWidth={2}
                    name="Online"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </div>

          <Card className="p-6 backdrop-blur-lg bg-white/5">
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <Clock className="h-5 w-5 text-green-400" />
              Dwell Time Analysis
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-blue-500/10">
                <div className="text-2xl font-bold">8.2 min</div>
                <div className="text-sm text-muted-foreground">Avg. In-Store Time</div>
              </div>
              <div className="p-4 rounded-lg bg-purple-500/10">
                <div className="text-2xl font-bold">4.7 min</div>
                <div className="text-sm text-muted-foreground">Avg. Online Session</div>
              </div>
              <div className="p-4 rounded-lg bg-green-500/10">
                <div className="text-2xl font-bold">62%</div>
                <div className="text-sm text-muted-foreground">Engagement Rate</div>
              </div>
            </div>
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">Conversion Funnel</h4>
                <Badge variant="outline">3.8% Overall</Badge>
              </div>
              <div className="flex items-center justify-between h-8 bg-white/5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500 flex items-center justify-center text-xs font-medium" 
                  style={{ width: '100%' }}
                >
                  Visitors
                </div>
                <div 
                  className="h-full bg-purple-500 flex items-center justify-center text-xs font-medium" 
                  style={{ width: '45%' }}
                >
                  Engaged
                </div>
                <div 
                  className="h-full bg-green-500 flex items-center justify-center text-xs font-medium" 
                  style={{ width: '12%' }}
                >
                  Converted
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Demographics Tab */}
      {activeTab === 'demographics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="p-6 backdrop-blur-lg bg-white/5">
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-400" />
                Age Distribution
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={customerData.demographics.ageGroups}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {customerData.demographics.ageGroups.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-6 backdrop-blur-lg bg-white/5">
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <Heart className="h-5 w-5 text-purple-400" />
                Gender Breakdown
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={customerData.demographics.gender}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {customerData.demographics.gender.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={index === 0 ? '#3b82f6' : index === 1 ? '#ec4899' : '#10b981'} 
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-6 backdrop-blur-lg bg-white/5">
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <Smartphone className="h-5 w-5 text-green-400" />
                Device Usage
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={customerData.demographics.deviceUsage}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8">
                    {customerData.demographics.deviceUsage.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={index === 0 ? '#10b981' : index === 1 ? '#3b82f6' : '#f59e0b'} 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>

          <Card className="p-6 backdrop-blur-lg bg-white/5">
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-yellow-400" />
              Geographic Distribution
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-lg bg-blue-500/10">
                <div className="text-2xl font-bold">42%</div>
                <div className="text-sm text-muted-foreground">Local (5mi)</div>
              </div>
              <div className="p-4 rounded-lg bg-purple-500/10">
                <div className="text-2xl font-bold">28%</div>
                <div className="text-sm text-muted-foreground">City (25mi)</div>
              </div>
              <div className="p-4 rounded-lg bg-green-500/10">
                <div className="text-2xl font-bold">18%</div>
                <div className="text-sm text-muted-foreground">State</div>
              </div>
              <div className="p-4 rounded-lg bg-orange-500/10">
                <div className="text-2xl font-bold">12%</div>
                <div className="text-sm text-muted-foreground">National/Int'l</div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Behavior Tab */}
      {activeTab === 'behavior' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="p-6 backdrop-blur-lg bg-white/5">
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <Repeat className="h-5 w-5 text-blue-400" />
                Purchase Frequency
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={customerData.behavior.purchaseFrequency}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-6 backdrop-blur-lg bg-white/5">
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-purple-400" />
                Basket Size Distribution
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={customerData.behavior.basketSize}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {customerData.behavior.basketSize.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-6 backdrop-blur-lg bg-white/5">
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 text-green-400" />
                Category Preferences
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={customerData.behavior.preferredCategories}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8">
                    {customerData.behavior.preferredCategories.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>

          <Card className="p-6 backdrop-blur-lg bg-white/5">
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <Clock className="h-5 w-5 text-yellow-400" />
              Customer Journey Analysis
            </h3>
            <div className="flex flex-col items-center">
              <div className="relative w-full h-32">
                {/* Customer journey visualization */}
                <div className="absolute left-0 top-1/2 h-1 w-full bg-white/10"></div>
                {[
                  { step: 'Awareness', position: '0%', color: '#3b82f6' },
                  { step: 'Consideration', position: '25%', color: '#8b5cf6' },
                  { step: 'Purchase', position: '50%', color: '#ec4899' },
                  { step: 'Retention', position: '75%', color: '#10b981' },
                  { step: 'Advocacy', position: '100%', color: '#f59e0b' }
                ].map((stage, index) => (
                  <div 
                    key={index}
                    className="absolute flex flex-col items-center"
                    style={{ left: stage.position, transform: 'translateX(-50%)' }}
                  >
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold mb-2"
                      style={{ backgroundColor: stage.color }}
                    >
                      {index + 1}
                    </div>
                    <span className="text-sm font-medium">{stage.step}</span>
                    <span className="text-xs text-muted-foreground">
                      {Math.floor(Math.random() * 15) + 5} days avg.
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-16 grid grid-cols-1 md:grid-cols-5 gap-4 w-full">
                {[
                  { step: 'Social Media', rate: '12%'},
                  { step: 'Search Engines', rate: '32%'},
                  { step: 'Referrals', rate: '28%'},
                  { step: 'Direct', rate: '20%'}
                ].map((step, index) => (
                  <div key={index} className="p-4 rounded-lg bg-white/5">
                    <div className="text-sm font-medium">{step.step}</div>
                    <div className="text-2xl font-bold">{step.rate}</div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}