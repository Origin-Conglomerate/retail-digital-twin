import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from 'recharts';
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  CreditCard,
  PieChart as PieIcon,
  BarChart2,
  ShoppingCart,
  Tag,
  Percent,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  CircleDollarSign,
  Landmark,
  Receipt,
  BadgePercent,
  AlertTriangle
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

// Mock financial data for retail
const financialData = {
  summary: {
    totalRevenue: 68450.89,
    revenueChange: 18.2,
    totalExpenses: 42380.45,
    expensesChange: -5.3,
    grossProfit: 26070.44,
    profitMargin: 38.1,
    avgTransactionValue: 78.35,
    transactions: 874
  },
  revenueTrend: [
    { day: 'Mon', revenue: 8450, transactions: 112 },
    { day: 'Tue', revenue: 10230, transactions: 134 },
    { day: 'Wed', revenue: 9240, transactions: 118 },
    { day: 'Thu', revenue: 13560, transactions: 168 },
    { day: 'Fri', revenue: 15870, transactions: 195 },
    { day: 'Sat', revenue: 20100, transactions: 247 },
    { day: 'Sun', revenue: 0, transactions: 0 }
  ],
  categories: [
    { name: 'Electronics', revenue: 28450, margin: 42, trend: 12.5 },
    { name: 'Apparel', revenue: 18760, margin: 35, trend: 8.2 },
    { name: 'Home Goods', revenue: 9650, margin: 28, trend: -3.4 },
    { name: 'Grocery', revenue: 7590, margin: 18, trend: 22.1 },
    { name: 'Other', revenue: 4000, margin: 25, trend: 5.7 }
  ],
  expenses: [
    { category: 'Inventory', amount: 22350, trend: -2.1 },
    { category: 'Payroll', amount: 12560, trend: 8.7 },
    { category: 'Rent', amount: 4500, trend: 0 },
    { category: 'Utilities', amount: 1850, trend: 12.3 },
    { category: 'Marketing', amount: 1120, trend: 45.6 }
  ],
  promotions: [
    { name: 'Summer Sale', discount: 20, revenueImpact: 18450, uplift: 32.5 },
    { name: 'Member Discount', discount: 15, revenueImpact: 8750, uplift: 18.2 },
    { name: 'Clearance', discount: 30, revenueImpact: 12400, uplift: 42.1 }
  ],
  cashFlow: [
    { period: 'Opening', amount: 12500 },
    { period: 'In', amount: 68450 },
    { period: 'Out', amount: 42380 },
    { period: 'Closing', amount: 38570 }
  ],
  aiInsights: [
    {
      type: 'opportunity',
      title: 'Margin Improvement',
      description: 'Electronics margin could increase by 5% with vendor negotiation',
      impact: 'high',
      action: 'Contact suppliers'
    },
    {
      type: 'warning',
      title: 'Expense Alert',
      description: 'Marketing spend increased 45% with only 12% revenue lift',
      impact: 'medium',
      action: 'Review campaigns'
    }
  ]
};

const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b'];

export default function Finance() {
  const [timeRange, setTimeRange] = useState('week');
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="relative rounded-3xl overflow-hidden 
      bg-gradient-to-br from-blue-900/20 to-indigo-900/20
      dark:from-gray-900/90 dark:to-gray-800/90
      border border-white/20 dark:border-gray-700/50
      p-6 space-y-8">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 
            to-indigo-400 bg-clip-text text-transparent">
            Retail Financial Intelligence
          </h1>
          <div className="flex items-center gap-4 text-muted-foreground">
            <Badge className="bg-blue-500/10 text-blue-500">
              <CircleDollarSign className="h-4 w-4 mr-2" />
              Real-time Analytics
            </Badge>
            <span className="flex items-center gap-2">
              <Landmark className="h-4 w-4" />
              Financial Data Twin
            </span>
          </div>
        </div>
        <div className="flex gap-3">
          <Select defaultValue={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5 bg-transparent gap-2">
          <TabsTrigger value="overview" className="data-[state=active]:bg-blue-500/10">
            <DollarSign className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="revenue" className="data-[state=active]:bg-green-500/10">
            <TrendingUp className="h-4 w-4 mr-2" />
            Revenue
          </TabsTrigger>
          <TabsTrigger value="expenses" className="data-[state=active]:bg-red-500/10">
            <Receipt className="h-4 w-4 mr-2" />
            Expenses
          </TabsTrigger>
          <TabsTrigger value="margin" className="data-[state=active]:bg-purple-500/10">
            <Percent className="h-4 w-4 mr-2" />
            Margins
          </TabsTrigger>
          <TabsTrigger value="promo" className="data-[state=active]:bg-yellow-500/10">
            <BadgePercent className="h-4 w-4 mr-2" />
            Promotions
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Revenue"
          value={`$${financialData.summary.totalRevenue.toLocaleString()}`}
          icon={<DollarSign className="h-5 w-5 text-blue-500" />}
          trend={financialData.summary.revenueChange}
          secondaryText={`${financialData.summary.transactions} transactions`}
        />
        <MetricCard
          title="Gross Profit"
          value={`$${financialData.summary.grossProfit.toLocaleString()}`}
          icon={<Wallet className="h-5 w-5 text-green-500" />}
          trend={financialData.summary.profitMargin}
          secondaryText={`${financialData.summary.profitMargin}% margin`}
          isPercent
        />
        <MetricCard
          title="Total Expenses"
          value={`$${financialData.summary.totalExpenses.toLocaleString()}`}
          icon={<Receipt className="h-5 w-5 text-red-500" />}
          trend={financialData.summary.expensesChange}
          secondaryText={`${(financialData.summary.expensesChange > 0 ? '+' : '') + financialData.summary.expensesChange}% change`}
        />
        <MetricCard
          title="Avg. Transaction"
          value={`$${financialData.summary.avgTransactionValue}`}
          icon={<ShoppingCart className="h-5 w-5 text-purple-500" />}
          trend={8.5}
          secondaryText="Value per customer"
        />
      </div>

      {/* Main Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Revenue Trend */}
          <Card className="lg:col-span-2 p-6 backdrop-blur-lg bg-white/5">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-400" />
                Weekly Revenue Trend
              </h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Daily</Button>
                <Button variant="outline" size="sm">Hourly</Button>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={financialData.revenueTrend}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Line 
                  type="monotone" 
                  dataKey="transactions" 
                  stroke="#8b5cf6" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Profit by Category */}
          <Card className="p-6 backdrop-blur-lg bg-white/5">
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <PieIcon className="h-5 w-5 text-purple-400" />
              Revenue by Category
            </h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={financialData.categories}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="revenue"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {financialData.categories.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Expense Breakdown */}
          <Card className="lg:col-span-2 p-6 backdrop-blur-lg bg-white/5">
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <Receipt className="h-5 w-5 text-red-400" />
              Expense Analysis
            </h3>
            <div className="space-y-4">
              {financialData.expenses.map((expense, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{expense.category}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold">${expense.amount.toLocaleString()}</span>
                      <Badge variant="outline" className={
                        expense.trend > 0 ? 'text-red-500' : 'text-green-500'
                      }>
                        {expense.trend > 0 ? '+' : ''}{expense.trend}%
                      </Badge>
                    </div>
                  </div>
                  <Progress 
                    value={(expense.amount / financialData.summary.totalExpenses) * 100} 
                    className="h-2"
                    indicatorClassName={
                      expense.trend > 0 ? 'bg-red-500' : 'bg-green-500'
                    }
                  />
                </div>
              ))}
            </div>
          </Card>

          {/* AI Insights */}
          <Card className="p-6 backdrop-blur-lg bg-white/5">
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <Landmark className="h-5 w-5 text-indigo-400" />
              Financial Insights
            </h3>
            <ScrollArea className="h-[300px]">
              <div className="space-y-4">
                {financialData.aiInsights.map((insight, index) => (
                  <Card key={index} className={`p-4 ${
                    insight.impact === 'high' 
                      ? 'bg-blue-500/10 border-blue-500/30'
                      : 'bg-purple-500/10 border-purple-500/30'
                  }`}>
                    <div className="flex items-center gap-2 mb-2">
                      {insight.type === 'opportunity' ? (
                        <TrendingUp className="h-4 w-4 text-blue-400" />
                      ) : (
                        <AlertTriangle className="h-4 w-4 text-yellow-400" />
                      )}
                      <span className="font-semibold">{insight.title}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {insight.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">
                        {insight.impact} impact
                      </Badge>
                      <Button variant="ghost" size="sm">View Details</Button>
                    </div>
                  </Card>
                ))}

                {/* Cash Flow Summary */}
                <Card className="p-4 bg-green-500/10 border-green-500/30">
                  <div className="flex items-center gap-2 mb-2">
                    <ArrowUpRight className="h-4 w-4 text-green-400" />
                    <span className="font-semibold">Positive Cash Flow</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Net positive cash flow of ${(financialData.summary.totalRevenue - financialData.summary.totalExpenses).toLocaleString()} this period
                  </p>
                  <div className="flex gap-4">
                    {financialData.cashFlow.map((flow, index) => (
                      <div key={index} className="text-center">
                        <div className="text-xs text-muted-foreground">{flow.period}</div>
                        <div className="font-bold">${flow.amount.toLocaleString()}</div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </ScrollArea>
          </Card>
        </div>
      )}

      {activeTab === 'revenue' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Revenue Trend */}
          <Card className="lg:col-span-2 p-6 backdrop-blur-lg bg-white/5">
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <BarChart2 className="h-5 w-5 text-blue-400" />
              Revenue Breakdown
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={financialData.revenueTrend}>
                <XAxis dataKey="day" />
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
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          {/* Top Categories */}
          <Card className="p-6 backdrop-blur-lg bg-white/5">
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <Tag className="h-5 w-5 text-purple-400" />
              Top Categories
            </h3>
            <div className="space-y-4">
              {financialData.categories.map((category, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 
                    to-indigo-400 flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">{category.name}</span>
                      <Badge variant="outline" className="bg-green-500/10">
                        ${category.revenue.toLocaleString()}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Percent className="h-4 w-4" />
                        {category.margin}% margin
                      </div>
                      <div className={`flex items-center gap-1 text-sm ${
                        category.trend > 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {category.trend > 0 ? (
                          <ArrowUpRight className="h-4 w-4" />
                        ) : (
                          <ArrowDownRight className="h-4 w-4" />
                        )}
                        {category.trend}%
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'expenses' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Expense Trend */}
          <Card className="lg:col-span-2 p-6 backdrop-blur-lg bg-white/5">
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <Receipt className="h-5 w-5 text-red-400" />
              Expense Analysis
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={financialData.expenses}>
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="amount" fill="#ec4899" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Expense Breakdown */}
          <Card className="p-6 backdrop-blur-lg bg-white/5">
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <PieIcon className="h-5 w-5 text-pink-400" />
              Expense Distribution
            </h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={financialData.expenses}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="amount"
                    label={({ category, percent }) => `${category} ${(percent * 100).toFixed(0)}%`}
                  >
                    {financialData.expenses.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Amount']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'margin' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Margin Analysis */}
          <Card className="lg:col-span-2 p-6 backdrop-blur-lg bg-white/5">
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <Percent className="h-5 w-5 text-purple-400" />
              Profit Margins
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={financialData.categories}>
                <XAxis dataKey="name" />
                <YAxis unit="%" />
                <Tooltip />
                <Bar dataKey="margin" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Margin Trends */}
          <Card className="p-6 backdrop-blur-lg bg-white/5">
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-400" />
              Margin Trends
            </h3>
            <div className="space-y-4">
              {financialData.categories.map((category, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{category.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold">{category.margin}%</span>
                      <Badge variant="outline" className={
                        category.trend > 0 ? 'text-green-500' : 'text-red-500'
                      }>
                        {category.trend > 0 ? '+' : ''}{category.trend}%
                      </Badge>
                    </div>
                  </div>
                  <Progress 
                    value={category.margin} 
                    className="h-2"
                    indicatorClassName={
                      category.trend > 0 ? 'bg-green-500' : 'bg-red-500'
                    }
                  />
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'promo' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Promotion Impact */}
          <Card className="lg:col-span-2 p-6 backdrop-blur-lg bg-white/5">
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <BadgePercent className="h-5 w-5 text-yellow-400" />
              Promotion Performance
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={financialData.promotions}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenueImpact" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Promotion Details */}
          <Card className="p-6 backdrop-blur-lg bg-white/5">
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <Tag className="h-5 w-5 text-orange-400" />
              Promotion ROI
            </h3>
            <div className="space-y-4">
              {financialData.promotions.map((promo, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{promo.name}</span>
                    <Badge variant="outline" className="bg-yellow-500/10">
                      {promo.discount}% off
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">Revenue Impact</div>
                      <div className="font-bold">${promo.revenueImpact.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Sales Uplift</div>
                      <div className="font-bold text-green-400">+{promo.uplift}%</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

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

function MetricCard({ title, value, icon, trend, secondaryText, isPercent = false }) {
  const trendUp = trend > 0;
  
  return (
    <Card className="p-6 backdrop-blur-lg bg-white/5">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 rounded-lg bg-white/5">
          {icon}
        </div>
        <Badge variant="outline" className={`${
          trendUp ? 'text-green-500' : 'text-red-500'
        }`}>
          {isPercent ? `${trend}%` : `${trend > 0 ? '+' : ''}${trend}%`}
          {trendUp ? (
            <ArrowUpRight className="h-3 w-3 ml-1" />
          ) : (
            <ArrowDownRight className="h-3 w-3 ml-1" />
          )}
        </Badge>
      </div>
      <div className="space-y-1">
        <h3 className="text-sm text-muted-foreground">{title}</h3>
        <div className="text-2xl font-bold">{value}</div>
        {secondaryText && (
          <p className="text-xs text-muted-foreground">{secondaryText}</p>
        )}
      </div>
    </Card>
  );
}