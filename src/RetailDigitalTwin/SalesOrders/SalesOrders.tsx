import { useState } from 'react';
import {
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
  Cell,
  Legend
} from 'recharts';
import {
  ShoppingBag,
  CreditCard,
  Store,
  Globe,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  RefreshCw,
  Package,
  DollarSign,
  Percent,
  Zap,
  AlertCircle,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for retail sales
const retailSalesData = {
  today: {
    totalSales: 28750.89,
    transactions: 342,
    onlineSales: 12540.50,
    inStoreSales: 16210.39,
    avgOrderValue: 84.07,
    conversionRate: 3.2,
    returns: 12,
    exchanges: 8
  },
  hourlySales: [
    { hour: '9:00', sales: 1250, customers: 45, online: 420, inStore: 830 },
    { hour: '10:00', sales: 1870, customers: 62, online: 580, inStore: 1290 },
    { hour: '11:00', sales: 2450, customers: 78, online: 920, inStore: 1530 },
    { hour: '12:00', sales: 3210, customers: 105, online: 1250, inStore: 1960 },
    { hour: '13:00', sales: 2780, customers: 92, online: 980, inStore: 1800 },
    { hour: '14:00', sales: 1950, customers: 68, online: 720, inStore: 1230 },
    { hour: '15:00', sales: 2310, customers: 74, online: 890, inStore: 1420 },
    { hour: '16:00', sales: 2890, customers: 88, online: 1150, inStore: 1740 },
  ],
  salesByCategory: [
    { name: 'Electronics', value: 8450, trend: 'up' },
    { name: 'Apparel', value: 6720, trend: 'up' },
    { name: 'Home Goods', value: 5230, trend: 'down' },
    { name: 'Beauty', value: 3870, trend: 'up' },
    { name: 'Grocery', value: 4480, trend: 'down' },
  ],
  topSellingItems: [
    { name: 'Wireless Earbuds Pro', sales: 125, revenue: 6250, returnRate: 2.1 },
    { name: 'Organic Cotton T-Shirt', sales: 98, revenue: 2450, returnRate: 5.4 },
    { name: 'Smart Home Hub', sales: 76, revenue: 5320, returnRate: 1.3 },
    { name: 'Vitamin C Serum', sales: 112, revenue: 3360, returnRate: 3.8 },
  ],
  conversionFunnel: [
    { name: 'Visitors', value: 10680 },
    { name: 'Engaged', value: 4272 },
    { name: 'Added to Cart', value: 2136 },
    { name: 'Checkout Started', value: 854 },
    { name: 'Purchased', value: 342 },
  ],
  aiInsights: [
    {
      type: 'opportunity',
      title: 'Upsell Opportunity',
      description: 'Customers buying wireless earbuds often purchase cases too',
      action: 'Create bundle offer'
    },
    {
      type: 'warning',
      title: 'High Return Rate',
      description: 'Apparel returns 23% higher than category average',
      action: 'Review quality/sizing'
    }
  ]
};

const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b'];

export default function SalesOrders() {
  const [timeRange, setTimeRange] = useState('today');
  const [expandedView, setExpandedView] = useState({
    funnel: false,
    topItems: false,
    categories: true
  });

  return (
    <div className="relative rounded-3xl overflow-hidden 
      bg-gradient-to-br from-blue-900/20 to-indigo-900/20
      dark:from-gray-900/90 dark:to-gray-800/90
      border border-white/20 dark:border-gray-700/50
      p-6 space-y-8">

      {/* Header with animated sales pulse */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 
            to-indigo-400 bg-clip-text text-transparent">
            Sales & Orders Intelligence
          </h1>
          <div className="flex items-center gap-4 text-muted-foreground">
            <Badge className="bg-blue-500/10 text-blue-500 animate-pulse">
              <Zap className="h-4 w-4 mr-2" />
              Real-time Data Stream
            </Badge>
            <span className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              ${retailSalesData.today.totalSales.toLocaleString()} today
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
        </div>
      </div>

      {/* Sales Pulse Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Sales"
          value={`$${retailSalesData.today.totalSales.toLocaleString()}`}
          icon={<ShoppingBag className="h-5 w-5 text-blue-500" />}
          trend="+8.7%"
          trendUp={true}
          pulse={true}
        />
        <MetricCard
          title="Transactions"
          value={retailSalesData.today.transactions.toString()}
          icon={<CreditCard className="h-5 w-5 text-purple-500" />}
          trend="+5.2%"
          trendUp={true}
        />
        <MetricCard
          title="Avg Order Value"
          value={`$${retailSalesData.today.avgOrderValue.toFixed(2)}`}
          icon={<DollarSign className="h-5 w-5 text-green-500" />}
          trend="+3.1%"
          trendUp={true}
        />
        <MetricCard
          title="Conversion Rate"
          value={`${retailSalesData.today.conversionRate}%`}
          icon={<Percent className="h-5 w-5 text-yellow-500" />}
          trend="+0.8%"
          trendUp={true}
        />
      </div>

      {/* Main Sales Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Trend */}
        <Card className="lg:col-span-2 p-6 backdrop-blur-lg bg-white/5">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-400" />
              Sales Trend
            </h3>
            <Tabs defaultValue="combined" className="w-[300px]">
              <TabsList>
                <TabsTrigger value="combined" className="text-xs">Combined</TabsTrigger>
                <TabsTrigger value="online" className="text-xs">Online</TabsTrigger>
                <TabsTrigger value="instore" className="text-xs">In-Store</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={retailSalesData.hourlySales}>
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="online"
                stroke="#8b5cf6"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="inStore"
                stroke="#10b981"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Sales Distribution */}
        <Card className="p-6 backdrop-blur-lg bg-white/5">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <Globe className="h-5 w-5 text-indigo-400" />
            Sales Distribution
          </h3>
          <div className="flex items-center justify-center h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: 'Online', value: retailSalesData.today.onlineSales },
                    { name: 'In-Store', value: retailSalesData.today.inStoreSales }
                  ]}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  <Cell fill="#3b82f6" />
                  <Cell fill="#10b981" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="p-3 rounded-lg bg-blue-500/10">
              <div className="flex items-center gap-2 mb-1">
                <Globe className="h-4 w-4 text-blue-400" />
                <span className="text-sm">Online</span>
              </div>
              <div className="text-xl font-bold">
                ${retailSalesData.today.onlineSales.toLocaleString()}
              </div>
            </div>
            <div className="p-3 rounded-lg bg-green-500/10">
              <div className="flex items-center gap-2 mb-1">
                <Store className="h-4 w-4 text-green-400" />
                <span className="text-sm">In-Store</span>
              </div>
              <div className="text-xl font-bold">
                ${retailSalesData.today.inStoreSales.toLocaleString()}
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales by Category */}
        <Card className="p-6 backdrop-blur-lg bg-white/5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Package className="h-5 w-5 text-purple-400" />
              Sales by Category
            </h3>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setExpandedView({...expandedView, categories: !expandedView.categories})}
            >
              {expandedView.categories ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </div>
          
          {expandedView.categories && (
            <div className="space-y-4">
              <ResponsiveContainer width="100%" height={200}>
                <BarChart
                  layout="vertical"
                  data={retailSalesData.salesByCategory}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={80} />
                  <Tooltip />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                    {retailSalesData.salesByCategory.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.trend === 'up' ? '#10b981' : '#ef4444'} 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              
              <div className="grid grid-cols-2 gap-2">
                {retailSalesData.salesByCategory.map((category, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 rounded-lg bg-white/5">
                    {category.trend === 'up' ? (
                      <TrendingUp className="h-4 w-4 text-green-400" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-400" />
                    )}
                    <span className="text-sm font-medium">{category.name}</span>
                    <span className="ml-auto font-bold">${category.value.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Card>

        {/* Top Selling Items */}
        <Card className="p-6 backdrop-blur-lg bg-white/5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-yellow-400" />
              Top Selling Items
            </h3>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setExpandedView({...expandedView, topItems: !expandedView.topItems})}
            >
              {expandedView.topItems ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </div>
          
          {expandedView.topItems && (
            <div className="space-y-4">
              {retailSalesData.topSellingItems.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-md bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{item.name}</div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{item.sales} sold</span>
                      <span>${item.revenue.toLocaleString()}</span>
                    </div>
                    <Progress 
                      value={100 - item.returnRate} 
                      className="h-2 mt-2 bg-red-500/20" 
                      indicatorClassName="bg-green-500"
                    />
                    <div className="text-xs text-right text-muted-foreground">
                      Return rate: {item.returnRate}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Conversion Funnel */}
        <Card className="p-6 backdrop-blur-lg bg-white/5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <RefreshCw className="h-5 w-5 text-blue-400" />
              Conversion Funnel
            </h3>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setExpandedView({...expandedView, funnel: !expandedView.funnel})}
            >
              {expandedView.funnel ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </div>
          
          {expandedView.funnel && (
            <div className="space-y-6">
              <div className="space-y-2">
                {retailSalesData.conversionFunnel.map((step, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{step.name}</span>
                      <span className="text-sm font-bold">{step.value.toLocaleString()}</span>
                    </div>
                    {index < retailSalesData.conversionFunnel.length - 1 && (
                      <>
                        <Progress 
                          value={(step.value / retailSalesData.conversionFunnel[0].value) * 100} 
                          className="h-2 bg-white/10" 
                          indicatorClassName="bg-blue-500"
                        />
                        <div className="text-xs text-right text-muted-foreground">
                          {index < retailSalesData.conversionFunnel.length - 1 && 
                            `${((step.value / retailSalesData.conversionFunnel[index].value) * 100).toFixed(1)}% →`}
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="p-3 rounded-lg bg-blue-500/10">
                <div className="flex items-center gap-2">
                  <Percent className="h-4 w-4 text-blue-400" />
                  <span className="font-medium">Overall Conversion Rate</span>
                </div>
                <div className="text-2xl font-bold mt-1">
                  {retailSalesData.today.conversionRate}%
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>

      {/* AI Insights */}
      <Card className="p-6 backdrop-blur-lg bg-white/5">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Zap className="h-5 w-5 text-yellow-400" />
          AI Sales Insights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {retailSalesData.aiInsights.map((insight, index) => (
            <Card key={index} className={`p-4 ${
              insight.type === 'warning' 
                ? 'bg-red-500/10 border-red-500/30'
                : 'bg-blue-500/10 border-blue-500/30'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                {insight.type === 'warning' ? (
                  <AlertCircle className="h-4 w-4 text-red-400" />
                ) : (
                  <TrendingUp className="h-4 w-4 text-blue-400" />
                )}
                <span className="font-semibold">{insight.title}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                {insight.description}
              </p>
              <div className="flex items-center justify-between">
                <Badge variant="outline">
                  {insight.type === 'warning' ? 'Attention Needed' : 'Opportunity'}
                </Badge>
                <Button variant="ghost" size="sm" className="gap-1">
                  {insight.action}
                  <ArrowUpRight className="h-3 w-3" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
}

function MetricCard({ title, value, icon, trend, trendUp, pulse = false }) {
  return (
    <Card className={`p-6 backdrop-blur-lg bg-white/5 relative overflow-hidden ${
      pulse ? 'border-blue-500/30' : 'border-white/10'
    }`}>
      {pulse && (
        <div className="absolute inset-0 bg-blue-500/10 animate-pulse opacity-20"></div>
      )}
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 rounded-lg bg-white/5">
          {icon}
        </div>
        <Badge variant="outline" className={`${
          trendUp ? 'text-green-500' : 'text-red-500'
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