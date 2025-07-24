import { 
  Package,
  Box,
  AlertCircle,
  RefreshCw,
  Truck,
  BarChart2,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  XCircle,
  ArrowRight,
  Filter,
  Search,
  Plus
} from 'lucide-react';
import { 
  Cell, 
  Pie, 
  PieChart, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip 
} from 'recharts';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "lucide-react";
import { DollarSign } from "lucide-react";
import { Star } from "lucide-react";


// Mock inventory data
const inventoryData = {
  summary: {
    totalItems: 1245,
    lowStockItems: 42,
    outOfStock: 8,
    inventoryValue: 125800.50,
    turnoverRate: 3.2,
    shrinkageRate: 1.8
  },
  categories: [
    { name: 'Electronics', value: 35, items: 320, lowStock: 12 },
    { name: 'Apparel', value: 25, items: 280, lowStock: 8 },
    { name: 'Home Goods', value: 20, items: 210, lowStock: 15 },
    { name: 'Grocery', value: 15, items: 185, lowStock: 5 },
    { name: 'Other', value: 5, items: 150, lowStock: 2 }
  ],
  lowStockItems: [
    { 
      id: 'SKU-4821', 
      name: 'Wireless Headphones X3', 
      category: 'Electronics',
      currentStock: 3, 
      threshold: 10,
      supplier: 'TechGadgets Inc',
      leadTime: '2 days',
      status: 'critical'
    },
    { 
      id: 'SKU-6723', 
      name: 'Organic Coffee Beans 1kg', 
      category: 'Grocery',
      currentStock: 5, 
      threshold: 15,
      supplier: 'Global Foods',
      leadTime: '5 days',
      status: 'warning'
    },
    { 
      id: 'SKU-8912', 
      name: 'Ceramic Dinner Set', 
      category: 'Home Goods',
      currentStock: 2, 
      threshold: 8,
      supplier: 'HomeStyle',
      leadTime: '7 days',
      status: 'critical'
    }
  ],
  deadStock: [
    { 
      id: 'SKU-1245', 
      name: 'Vintage Analog Camera', 
      category: 'Electronics',
      lastSold: '45 days ago',
      stockAge: '120 days',
      quantity: 18,
      value: 2700
    },
    { 
      id: 'SKU-3367', 
      name: 'Winter Jacket (Size XL)', 
      category: 'Apparel',
      lastSold: '62 days ago',
      stockAge: '90 days',
      quantity: 7,
      value: 1050
    }
  ],
  suppliers: [
    {
      id: 'SUP-001',
      name: 'TechGadgets Inc',
      rating: 4.8,
      onTimeDelivery: 92,
      itemsSupplied: 45,
      lastDelivery: '2 days ago'
    },
    {
      id: 'SUP-002',
      name: 'Fashion Forward',
      rating: 4.5,
      onTimeDelivery: 88,
      itemsSupplied: 32,
      lastDelivery: '1 day ago'
    },
    {
      id: 'SUP-003',
      name: 'HomeStyle',
      rating: 4.2,
      onTimeDelivery: 85,
      itemsSupplied: 28,
      lastDelivery: '5 days ago'
    }
  ],
  shrinkage: [
    { month: 'Jan', expected: 125000, actual: 123500, difference: 1500 },
    { month: 'Feb', expected: 118000, actual: 116200, difference: 1800 },
    { month: 'Mar', expected: 132000, actual: 129500, difference: 2500 },
    { month: 'Apr', expected: 140000, actual: 137800, difference: 2200 }
  ],
  aiRecommendations: [
    {
      type: 'replenishment',
      title: 'Urgent Replenishment Needed',
      description: '3 items in Electronics category are critically low',
      priority: 'high',
      action: 'Place order with TechGadgets Inc'
    },
    {
      type: 'clearance',
      title: 'Dead Stock Alert',
      description: 'Vintage Analog Camera not sold in 45 days',
      priority: 'medium',
      action: 'Create promotional bundle'
    }
  ]
};

const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b'];

export default function Inventory() {
  return (
    <div className="rounded-3xl overflow-hidden 
      bg-gradient-to-br from-blue-900/20 to-indigo-900/20
      dark:from-gray-900/90 dark:to-gray-800/90
      border border-white/20 dark:border-gray-700/50
      p-6 space-y-8">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 
            to-indigo-400 bg-clip-text text-transparent">
            Inventory Intelligence
          </h1>
          <div className="flex items-center gap-4 text-muted-foreground">
            <Badge className="bg-blue-500/10 text-blue-500">
              <Package className="h-4 w-4 mr-2" />
              Real-time Tracking
            </Badge>
            <span className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              Auto-replenishment Active
            </span>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Plus className="h-4 w-4" />
            New Supplier
          </Button>
          <Button>
            <Truck className="h-4 w-4 mr-2" />
            Place Order
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 backdrop-blur-lg bg-white/5">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-sm text-muted-foreground">Total Inventory Value</h3>
              <div className="text-2xl font-bold">
                ${inventoryData.summary.inventoryValue.toLocaleString()}
              </div>
            </div>
            <div className="p-2 rounded-lg bg-blue-500/10">
              <Package className="h-5 w-5 text-blue-400" />
            </div>
          </div>
          <Separator className="my-4" />
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">SKUs</span>
            <span className="font-medium">{inventoryData.summary.totalItems}</span>
          </div>
        </Card>

        <Card className="p-6 backdrop-blur-lg bg-white/5">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-sm text-muted-foreground">Low Stock Items</h3>
              <div className="text-2xl font-bold text-orange-400">
                {inventoryData.summary.lowStockItems}
              </div>
            </div>
            <div className="p-2 rounded-lg bg-orange-500/10">
              <AlertCircle className="h-5 w-5 text-orange-400" />
            </div>
          </div>
          <Separator className="my-4" />
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Out of Stock</span>
            <span className="font-medium text-red-400">
              {inventoryData.summary.outOfStock}
            </span>
          </div>
        </Card>

        <Card className="p-6 backdrop-blur-lg bg-white/5">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-sm text-muted-foreground">Turnover Rate</h3>
              <div className="text-2xl font-bold">
                {inventoryData.summary.turnoverRate}x
              </div>
            </div>
            <div className="p-2 rounded-lg bg-green-500/10">
              <TrendingUp className="h-5 w-5 text-green-400" />
            </div>
          </div>
          <Separator className="my-4" />
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Industry Avg</span>
              <span className="font-medium">2.8x</span>
            </div>
            <Progress 
              value={(inventoryData.summary.turnoverRate / 5) * 100} 
              className="h-2 bg-gray-800/50"
              indicatorClassName="bg-green-400"
            />
          </div>
        </Card>

        <Card className="p-6 backdrop-blur-lg bg-white/5">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-sm text-muted-foreground">Shrinkage Rate</h3>
              <div className="text-2xl font-bold">
                {inventoryData.summary.shrinkageRate}%
              </div>
            </div>
            <div className="p-2 rounded-lg bg-red-500/10">
              <TrendingDown className="h-5 w-5 text-red-400" />
            </div>
          </div>
          <Separator className="my-4" />
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Industry Avg</span>
              <span className="font-medium">2.5%</span>
            </div>
            <Progress 
              value={inventoryData.summary.shrinkageRate} 
              className="h-2 bg-gray-800/50"
              indicatorClassName="bg-red-400"
            />
          </div>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Inventory Composition */}
        <Card className="lg:col-span-2 p-6 backdrop-blur-lg bg-white/5">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Box className="h-5 w-5 text-blue-400" />
              Inventory Composition
            </h3>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">By Category</Button>
              <Button variant="outline" size="sm">By Value</Button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={inventoryData.categories}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {inventoryData.categories.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-6">
              {inventoryData.categories.map((category, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <span className="font-medium">{category.name}</span>
                    </div>
                    <Badge variant="outline" className="bg-red-500/10 text-red-500">
                      {category.lowStock} low
                    </Badge>
                  </div>
                  <Progress 
                    value={(category.items / inventoryData.summary.totalItems) * 100} 
                    className="h-2 bg-gray-800/50"
                    style={{ backgroundColor: COLORS[index % COLORS.length] + '20' }}
                    indicatorClassName="bg-current"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{category.items} items</span>
                    <span>{category.value}% of total</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* AI Recommendations */}
        <Card className="p-6 backdrop-blur-lg bg-white/5">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <BarChart2 className="h-5 w-5 text-purple-400" />
            AI Inventory Advisor
          </h3>
          <ScrollArea className="h-[300px]">
            <div className="space-y-4">
              {inventoryData.aiRecommendations.map((rec, index) => (
                <Card key={index} className={`p-4 ${
                  rec.priority === 'high' 
                    ? 'bg-red-500/10 border-red-500/30'
                    : 'bg-yellow-500/10 border-yellow-500/30'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    {rec.type === 'replenishment' ? (
                      <AlertCircle className="h-4 w-4 text-red-400" />
                    ) : (
                      <Box className="h-4 w-4 text-yellow-400" />
                    )}
                    <span className="font-semibold">{rec.title}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {rec.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">
                      {rec.priority} priority
                    </Badge>
                    <Button variant="ghost" size="sm" className="gap-1">
                      {rec.action}
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))}

              <Card className="p-4 bg-blue-500/10 border-blue-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <Truck className="h-4 w-4 text-blue-400" />
                  <span className="font-semibold">Supplier Performance</span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Top supplier: TechGadgets Inc (92% on-time delivery)
                </p>
                <div className="flex justify-between">
                  <Badge variant="outline">Average rating: 4.5</Badge>
                  <Button variant="ghost" size="sm" className="gap-1">
                    View All
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            </div>
          </ScrollArea>
        </Card>
      </div>

      {/* Low Stock & Dead Stock */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Low Stock Items */}
        <Card className="p-6 backdrop-blur-lg bg-white/5">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-400" />
              Critical Low Stock
            </h3>
            <Select>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="apparel">Apparel</SelectItem>
                <SelectItem value="home">Home Goods</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-4">
            {inventoryData.lowStockItems.map((item, index) => (
              <Card key={index} className={`p-4 ${
                item.status === 'critical' 
                  ? 'bg-red-500/10 border-red-500/30'
                  : 'bg-yellow-500/10 border-yellow-500/30'
              }`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {item.category} • {item.id}
                    </div>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-1 text-sm">
                        <Box className="h-4 w-4" />
                        Stock: {item.currentStock}/{item.threshold}
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <Truck className="h-4 w-4" />
                        Lead: {item.leadTime}
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Reorder
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </Card>

        {/* Dead Stock */}
        <Card className="p-6 backdrop-blur-lg bg-white/5">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <XCircle className="h-5 w-5 text-gray-400" />
              Dead Stock Identification
            </h3>
            <Badge variant="outline" className="bg-gray-500/10">
              {inventoryData.deadStock.length} items
            </Badge>
          </div>
          <div className="space-y-4">
            {inventoryData.deadStock.map((item, index) => (
              <Card key={index} className="p-4 bg-gray-500/10 border-gray-500/30">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {item.category} • {item.id}
                    </div>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-1 text-sm">
                        <Calendar className="h-4 w-4" />
                        Last sold: {item.lastSold}
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <DollarSign className="h-4 w-4" />
                        Value: ${item.value}
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Create Promotion
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </Card>
      </div>

      {/* Shrinkage Analysis */}
      <Card className="p-6 backdrop-blur-lg bg-white/5">
        <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
          <TrendingDown className="h-5 w-5 text-red-400" />
          Shrinkage Analysis
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={inventoryData.shrinkage}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="difference" fill="#ef4444" name="Shrinkage Loss" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-6">
            <div>
              <h4 className="font-medium mb-2">Monthly Variance</h4>
              <div className="space-y-3">
                {inventoryData.shrinkage.map((month, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between">
                      <span className="font-medium">{month.month}</span>
                      <span className="text-red-400">-${month.difference}</span>
                    </div>
                    <Progress 
                      value={(month.difference / 3000) * 100} 
                      className="h-2 bg-gray-800/50"
                      indicatorClassName="bg-red-400"
                    />
                  </div>
                ))}
              </div>
            </div>
            <Card className="p-4 bg-purple-500/10 border-purple-500/30">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="h-4 w-4 text-purple-400" />
                <span className="font-semibold">AI Insight</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Shrinkage spikes on weekends. Consider increasing security during peak hours.
              </p>
            </Card>
          </div>
        </div>
      </Card>

      {/* Supplier Performance */}
      <Card className="p-6 backdrop-blur-lg bg-white/5">
        <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
          <Truck className="h-5 w-5 text-green-400" />
          Supplier Performance
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-muted-foreground border-b border-white/10">
                <th className="pb-4">Supplier</th>
                <th className="pb-4">Rating</th>
                <th className="pb-4">On-Time Delivery</th>
                <th className="pb-4">Items Supplied</th>
                <th className="pb-4">Last Delivery</th>
                <th className="pb-4"></th>
              </tr>
            </thead>
            <tbody>
              {inventoryData.suppliers.map((supplier, index) => (
                <tr key={index} className="border-b border-white/10 last:border-0">
                  <td className="py-4 font-medium">{supplier.name}</td>
                  <td className="py-4">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      {supplier.rating}
                    </div>
                  </td>
                  <td className="py-4">
                    <Progress 
                      value={supplier.onTimeDelivery} 
                      className="h-2 w-24 bg-gray-800/50"
                      indicatorClassName="bg-green-400"
                    />
                  </td>
                  <td className="py-4">{supplier.itemsSupplied}</td>
                  <td className="py-4">{supplier.lastDelivery}</td>
                  <td className="py-4 text-right">
                    <Button variant="ghost" size="sm" className="gap-1">
                      Order <ArrowRight className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}