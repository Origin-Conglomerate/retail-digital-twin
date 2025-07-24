import { useState } from 'react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Cell
} from 'recharts';
import {
  Users,
  ShoppingBag,
  DollarSign,
  CreditCard,
  Package,
  TrendingUp,
  AlertTriangle,
  Zap,
  LayoutGrid,
  Star,
  Activity,
  BarChart2,
  PieChart as PieIcon,
  Brain,
  MessageSquare,
  UserCheck,
  Plus,
  Search,
  Settings,
  HelpCircle
} from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
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
import { Link } from 'react-router-dom';

// Mock retail data
const retailData = {
  currentStats: {
    revenue: 45280.50,
    customers: 324,
    transactions: 412,
    avgOrderValue: 109.90,
    conversionRate: 28.5,
    onlineVsStore: { online: 38, store: 62 }
  },
  hourlyData: [
    { hour: '09:00', customers: 45, revenue: 3250, transactions: 52 },
    { hour: '10:00', customers: 68, revenue: 4870, transactions: 72 },
    { hour: '11:00', customers: 92, revenue: 7540, transactions: 98 },
    { hour: '12:00', customers: 105, revenue: 8920, transactions: 114 },
    { hour: '13:00', customers: 87, revenue: 6850, transactions: 93 },
    { hour: '14:00', customers: 76, revenue: 5430, transactions: 81 }
  ],
  categoryPerformance: [
    { name: 'Electronics', sales: 18450, margin: 42, stock: 78 },
    { name: 'Apparel', sales: 12560, margin: 38, stock: 65 },
    { name: 'Home Goods', sales: 8920, margin: 35, stock: 82 },
    { name: 'Grocery', sales: 5350, margin: 28, stock: 45 }
  ],
  staffMetrics: {
    present: 18,
    absent: 2,
    efficiency: 88,
    topPerformers: [
      { name: 'Alex Johnson', sales: 8450, upsells: 12 },
      { name: 'Maria Garcia', sales: 7820, upsells: 9 }
    ]
  },
  inventoryAlerts: [
    {
      type: 'low-stock',
      title: 'Low Stock Alert',
      description: 'Wireless headphones (SKU: WH-2023) - 5 units remaining',
      urgency: 'high'
    },
    {
      type: 'overstock',
      title: 'Excess Inventory',
      description: 'Winter coats - 120 units (projected 60-day supply)',
      urgency: 'medium'
    }
  ],
  aiInsights: [
    {
      type: 'prediction',
      title: 'Weekend Surge Expected',
      description: 'Anticipate 35% more foot traffic this weekend due to local event',
      impact: 'high',
      action: 'Schedule additional staff and stock high-demand items'
    },
    {
      type: 'optimization',
      title: 'Pricing Opportunity',
      description: 'Electronics category has 5% higher price elasticity than market average',
      impact: 'medium',
      action: 'Consider dynamic pricing adjustments'
    }
  ]
};

const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b'];

export default function RetailDashboard() {
  const [activeView, setActiveView] = useState('overview');
  const [timeRange, setTimeRange] = useState('today');

  return (
    <div className="relative rounded-3xl overflow-hidden 
      bg-gradient-to-br from-blue-900/20 to-indigo-900/20
      dark:from-gray-900/90 dark:to-gray-800/90
      border border-white/20 dark:border-gray-700/50
      p-6 space-y-8">

      {/* Dashboard Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 
            to-indigo-400 bg-clip-text text-transparent">
            Retail Digital Data Twin
          </h1>
          <div className="flex items-center gap-4 text-muted-foreground">
            <Badge className="bg-blue-500/10 text-blue-500">
              <Brain className="h-4 w-4 mr-2" />
              AI Analytics Active
            </Badge>
            <span className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Real-time Monitoring
            </span>
          </div>
        </div>
        <div className="flex gap-3">
          <Select defaultValue={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Revenue"
          value={`$${retailData.currentStats.revenue.toLocaleString()}`}
          icon={<DollarSign className="h-5 w-5 text-green-500" />}
          trend="+8.5%"
          trendUp={true}
        />
        <MetricCard
          title="Customers"
          value={retailData.currentStats.customers.toString()}
          icon={<Users className="h-5 w-5 text-blue-500" />}
          trend="+5.2%"
          trendUp={true}
        />
        <MetricCard
          title="Transactions"
          value={retailData.currentStats.transactions.toString()}
          icon={<CreditCard className="h-5 w-5 text-purple-500" />}
          trend="+12.3%"
          trendUp={true}
        />
        <MetricCard
          title="Conversion"
          value={`${retailData.currentStats.conversionRate}%`}
          icon={<TrendingUp className="h-5 w-5 text-orange-500" />}
          trend="+2.7%"
          trendUp={true}
        />
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Trends */}
        <Card className="lg:col-span-2 p-6 backdrop-blur-lg bg-white/5">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Activity className="h-5 w-5 text-blue-400" />
              Sales & Customer Flow
            </h3>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Hourly</Button>
              <Button variant="outline" size="sm">Daily</Button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={retailData.hourlyData}>
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="revenue"
                stackId="1"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.2}
              />
              <Area
                type="monotone"
                dataKey="customers"
                stackId="2"
                stroke="#8b5cf6"
                fill="#8b5cf6"
                fillOpacity={0.2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* AI Insights & Alerts */}
        <Card className="p-6 backdrop-blur-lg bg-white/5">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Brain className="h-5 w-5 text-indigo-400" />
            AI Insights
          </h3>
          <ScrollArea className="h-[300px]">
            <div className="space-y-4">
              {retailData.aiInsights.map((insight, index) => (
                <Card key={index} className={`p-4 ${insight.impact === 'high'
                    ? 'bg-blue-500/10 border-blue-500/30'
                    : 'bg-indigo-500/10 border-indigo-500/30'
                  }`}>
                  <div className="flex items-center gap-2 mb-2">
                    {insight.type === 'prediction' ? (
                      <TrendingUp className="h-4 w-4 text-blue-400" />
                    ) : (
                      <Zap className="h-4 w-4 text-indigo-400" />
                    )}
                    <span className="font-semibold">{insight.title}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {insight.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">
                      Impact: {insight.impact}
                    </Badge>
                    <Button variant="ghost" size="sm">Take Action</Button>
                  </div>
                </Card>
              ))}

              {retailData.inventoryAlerts.map((alert, index) => (
                <Card key={index} className={`p-4 ${alert.urgency === 'high'
                    ? 'bg-red-500/10 border-red-500/30'
                    : 'bg-yellow-500/10 border-yellow-500/30'
                  }`}>
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className={`h-4 w-4 ${alert.urgency === 'high' ? 'text-red-400' : 'text-yellow-400'
                      }`} />
                    <span className="font-semibold">{alert.title}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {alert.description}
                  </p>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </Card>
      </div>

      {/* Category Performance & Staff */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Performance */}
        <Card className="p-6 backdrop-blur-lg bg-white/5">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <LayoutGrid className="h-5 w-5 text-green-400" />
            Category Performance
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={retailData.categoryPerformance}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="sales"
                  nameKey="name"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {retailData.categoryPerformance.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Staff Performance */}
        <Card className="p-6 backdrop-blur-lg bg-white/5">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <UserCheck className="h-5 w-5 text-purple-400" />
              Staff Overview
            </h3>
            <Badge variant="outline" className="bg-green-500/10">
              {retailData.staffMetrics.present} Active
            </Badge>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-blue-500/10">
                <div className="text-2xl font-bold">
                  {retailData.staffMetrics.efficiency}%
                </div>
                <div className="text-sm text-muted-foreground">
                  Sales Efficiency
                </div>
              </div>
              <div className="p-4 rounded-lg bg-purple-500/10">
                <div className="text-2xl font-bold">
                  {retailData.staffMetrics.present}/{retailData.staffMetrics.present + retailData.staffMetrics.absent}
                </div>
                <div className="text-sm text-muted-foreground">
                  Attendance
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-4">Top Performers</h4>
              <div className="space-y-3">
                {retailData.staffMetrics.topPerformers.map((staff, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>{staff.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="font-medium">{staff.name}</div>
                      <div className="text-sm text-muted-foreground">
                        ${staff.sales.toLocaleString()} • {staff.upsells} upsells
                      </div>
                    </div>
                    <Star className="h-4 w-4 text-yellow-400" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Inventory Status */}
      <Card className="p-6 backdrop-blur-lg bg-white/5">
        <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
          <Package className="h-5 w-5 text-orange-400" />
          Inventory Health
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {retailData.categoryPerformance.map((category) => (
            <Card key={category.name} className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{category.name}</span>
                <Badge variant="outline">
                  {category.stock}% Stock
                </Badge>
              </div>
              <div className="text-sm text-muted-foreground space-y-1">
                <div className="flex items-center justify-between">
                  <span>Sales:</span>
                  <span>${category.sales.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Margin:</span>
                  <span>{category.margin}%</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 flex gap-3">
        <Link to="/agentic-ai">
          <Button className="rounded-full shadow-lg gap-2">
            <Plus className="h-4 w-4" />
            Agentic AI
          </Button>
        </Link>
        <Link to="/log-monitor">
          <Button className="rounded-full shadow-lg gap-2">
            <HelpCircle className="h-4 w-4" />
            Log Monitor
          </Button>
        </Link>
      </div>
    </div>
  );
}

function MetricCard({ title, value, icon, trend, trendUp }) {
  return (
    <Card className="p-6 backdrop-blur-lg bg-white/5">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 rounded-lg bg-white/5">
          {icon}
        </div>
        <Badge variant="outline" className={`${trendUp ? 'text-green-500' : 'text-red-500'
          }`}>
          {trend}
        </Badge>
      </div>
      <div className="space-y-1">
        <h3 className="text-sm text-muted-foreground">{title}</h3>
        <div className="text-2xl font-bold">{value}</div>
      </div>
    </Card>
  );
}