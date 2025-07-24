import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertCircle,
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  Bell,
  CheckCircle,
  Clock,
  CreditCard,
  Download,
  HelpCircle,
  Loader2,
  MapPin,
  MessageSquare,
  Package,
  RefreshCw,
  Settings,
  Shield,
  ShoppingBag,
  ShoppingCart,
  Tag,
  Trash2,
  Truck,
  User,
  Users,
  BarChart2,
  Gift,
  Percent,
  LayoutGrid,
  Database
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Log event types for retail operations
const LOG_TYPES = {
  SALES: { label: 'Sales', icon: <ShoppingBag className="h-4 w-4" />, color: 'text-green-400' },
  INVENTORY: { label: 'Inventory', icon: <Package className="h-4 w-4" />, color: 'text-blue-400' },
  CUSTOMER: { label: 'Customer', icon: <User className="h-4 w-4" />, color: 'text-indigo-400' },
  SUPPLY: { label: 'Supply Chain', icon: <Truck className="h-4 w-4" />, color: 'text-purple-400' },
  PAYMENT: { label: 'Payment', icon: <CreditCard className="h-4 w-4" />, color: 'text-cyan-400' },
  PROMO: { label: 'Promotions', icon: <Percent className="h-4 w-4" />, color: 'text-pink-400' },
  STAFF: { label: 'Staff', icon: <Users className="h-4 w-4" />, color: 'text-yellow-400' },
  SYSTEM: { label: 'System', icon: <Database className="h-4 w-4" />, color: 'text-gray-400' }
};

// Mock log events for retail operations
const generateLogEvent = () => {
  const types = Object.keys(LOG_TYPES);
  const randomType = types[Math.floor(Math.random() * types.length)];
  const now = new Date();
  
  const products = ['Nike Air Max', 'Apple iPad Pro', 'Samsung TV', 'Levi\'s Jeans', 'Dyson Vacuum'];
  const customers = ['Alex Johnson', 'Maria Garcia', 'James Smith', 'Sarah Lee', 'David Kim'];
  const staff = ['Cashier Wilson', 'Manager Chen', 'Stock Clerk Rodriguez', 'Customer Service Thompson'];
  const randomProduct = products[Math.floor(Math.random() * products.length)];
  const randomCustomer = customers[Math.floor(Math.random() * customers.length)];
  const randomStaff = staff[Math.floor(Math.random() * staff.length)];

  const baseEvent = {
    id: Date.now(),
    timestamp: now,
    type: randomType,
    source: ['POS System', 'Inventory System', 'E-Commerce', 'Security System'][Math.floor(Math.random() * 4)],
    status: ['success', 'warning', 'error', 'info'][Math.floor(Math.random() * 4)]
  };

  switch(randomType) {
    case 'SALES':
      return {
        ...baseEvent,
        message: `New ${Math.random() > 0.7 ? 'online' : 'in-store'} sale`,
        details: {
          customer: randomCustomer,
          items: [
            { name: randomProduct, quantity: Math.floor(1 + Math.random() * 3), price: (50 + Math.random() * 450).toFixed(2) },
            { name: products[Math.floor(Math.random() * products.length)], quantity: 1, price: (20 + Math.random() * 100).toFixed(2) }
          ],
          total: (50 + Math.random() * 500).toFixed(2),
          payment: ['Credit Card', 'Cash', 'Mobile Pay', 'Gift Card'][Math.floor(Math.random() * 4)],
          staff: randomStaff,
          location: Math.random() > 0.7 ? 'Online' : ['Main Store', 'Mall Kiosk', 'Outlet'][Math.floor(Math.random() * 3)]
        }
      };
    case 'INVENTORY':
      return {
        ...baseEvent,
        message: `Inventory ${Math.random() > 0.5 ? 'low' : 'restocked'} for ${randomProduct}`,
        details: {
          product: randomProduct,
          sku: `SKU-${Math.floor(10000 + Math.random() * 90000)}`,
          quantity: Math.floor(Math.random() * 50),
          threshold: Math.floor(5 + Math.random() * 15),
          action: Math.random() > 0.5 ? 'Alert' : 'Restocked',
          warehouse: ['Main Warehouse', 'Store Backroom', 'Distribution Center'][Math.floor(Math.random() * 3)]
        }
      };
    case 'CUSTOMER':
      return {
        ...baseEvent,
        message: `${randomCustomer} ${Math.random() > 0.5 ? 'made purchase' : 'returned item'}`,
        details: {
          customer: randomCustomer,
          loyaltyTier: ['Bronze', 'Silver', 'Gold', 'Platinum'][Math.floor(Math.random() * 4)],
          action: Math.random() > 0.5 ? 'Purchase' : 'Return',
          value: (20 + Math.random() * 300).toFixed(2),
          staff: randomStaff
        }
      };
    case 'SUPPLY':
      return {
        ...baseEvent,
        message: `Shipment ${Math.random() > 0.5 ? 'received' : 'delayed'}`,
        details: {
          trackingId: `TRK-${Math.floor(100000 + Math.random() * 900000)}`,
          carrier: ['UPS', 'FedEx', 'DHL', 'USPS'][Math.floor(Math.random() * 4)],
          items: Math.floor(10 + Math.random() * 100),
          status: ['In Transit', 'Delayed', 'Received', 'Processing'][Math.floor(Math.random() * 4)],
          eta: Math.random() > 0.5 ? `${Math.floor(1 + Math.random() * 3)} days` : 'Delayed'
        }
      };
    case 'PAYMENT':
      return {
        ...baseEvent,
        message: `Payment ${Math.random() > 0.5 ? 'processed' : 'declined'} for order #${Math.floor(1000 + Math.random() * 9000)}`,
        details: {
          amount: (50 + Math.random() * 450).toFixed(2),
          method: ['Credit Card', 'Debit Card', 'Gift Card', 'Store Credit'][Math.floor(Math.random() * 4)],
          last4: Math.floor(1000 + Math.random() * 9000),
          processor: ['Visa', 'Mastercard', 'Amex', 'Discover'][Math.floor(Math.random() * 4)]
        }
      };
    case 'PROMO':
      return {
        ...baseEvent,
        message: `${Math.random() > 0.5 ? 'Promotion applied' : 'Coupon redeemed'}`,
        details: {
          code: `DISC${Math.floor(10 + Math.random() * 90)}`,
          discount: `${Math.floor(5 + Math.random() * 25)}%`,
          product: randomProduct,
          customer: Math.random() > 0.3 ? randomCustomer : 'Guest',
          savings: (5 + Math.random() * 50).toFixed(2)
        }
      };
    case 'STAFF':
      return {
        ...baseEvent,
        message: `${randomStaff} ${Math.random() > 0.5 ? 'shift started' : 'made sale'}`,
        details: {
          staff: randomStaff,
          role: ['Cashier', 'Manager', 'Stock Clerk', 'Customer Service'][Math.floor(Math.random() * 4)],
          hours: `${Math.floor(4 + Math.random() * 6)} hours`,
          sales: Math.random() > 0.5 ? (100 + Math.random() * 900).toFixed(2) : null,
          performance: ['On Target', 'Exceeding', 'Needs Improvement'][Math.floor(Math.random() * 3)]
        }
      };
    default: // SYSTEM
      return {
        ...baseEvent,
        message: `${['POS System', 'Inventory DB', 'Security Camera', 'Website'][Math.floor(Math.random() * 4)]} ${Math.random() > 0.5 ? 'alert' : 'update'}`,
        details: {
          system: ['POS Terminal', 'Inventory Database', 'Security System', 'E-Commerce Platform'][Math.floor(Math.random() * 4)],
          status: ['Online', 'Offline', 'Maintenance', 'Update'][Math.floor(Math.random() * 4)],
          action: ['Rebooted', 'Patched', 'Monitoring', 'Technician Dispatched'][Math.floor(Math.random() * 4)]
        }
      };
  }
};

export default function LogMonitor() {
  const [logs, setLogs] = useState([]);
  const [filter, setFilter] = useState('all');
  const [isPaused, setIsPaused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [stats, setStats] = useState({
    total: 0,
    sales: 0,
    inventoryAlerts: 0,
    systemIssues: 0,
    hourlyCustomers: 0,
    conversionRate: 0
  });
  const logsEndRef = useRef(null);

  // Auto-scroll to bottom when logs change
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  // Simulate live log events
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      const newEvent = generateLogEvent();
      setLogs(prev => [newEvent, ...prev].slice(0, 200));
      setStats(prev => ({
        total: prev.total + 1,
        sales: prev.sales + (newEvent.type === 'SALES' ? 1 : 0),
        inventoryAlerts: prev.inventoryAlerts + (newEvent.type === 'INVENTORY' && newEvent.status === 'warning' ? 1 : 0),
        systemIssues: prev.systemIssues + (newEvent.type === 'SYSTEM' && newEvent.status === 'error' ? 1 : 0),
        hourlyCustomers: prev.hourlyCustomers + (newEvent.type === 'CUSTOMER' ? 1 : 0),
        conversionRate: Math.floor(Math.random() * 30) + 10 // Simulate conversion rate
      }));
    }, 800 + Math.random() * 1200); // Random interval between 0.8-2s

    return () => clearInterval(interval);
  }, [isPaused]);

  // Reset hourly customer count every hour
  useEffect(() => {
    const hourTimer = setInterval(() => {
      setStats(prev => ({ ...prev, hourlyCustomers: 0 }));
    }, 3600000);

    return () => clearInterval(hourTimer);
  }, []);

  const filteredLogs = logs.filter(log => {
    const matchesFilter = filter === 'all' || log.type === filter.toUpperCase();
    const matchesSearch = searchQuery === '' || 
      log.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (log.details.customer && log.details.customer.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (log.details.staff && log.details.staff.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (log.details.product && log.details.product.toLowerCase().includes(searchQuery.toLowerCase())) ||
      log.source.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const clearLogs = () => {
    setLogs([]);
    setStats(prev => ({ ...prev, total: 0, sales: 0, inventoryAlerts: 0, systemIssues: 0 }));
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  return (
    <div className="relative rounded-3xl overflow-hidden 
      bg-gradient-to-br from-gray-900/20 to-blue-900/20
      dark:from-gray-900/90 dark:to-gray-800/90
      border border-white/20 dark:border-gray-700/50
      p-6 h-full flex flex-col">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-300 
            to-cyan-300 bg-clip-text text-transparent">
            Retail Digital Twin Monitor
          </h1>
          <div className="flex items-center gap-4 text-muted-foreground">
            <Badge className="bg-blue-500/10 text-blue-500">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Live Operations Active
            </Badge>
            <span className="flex items-center gap-2">
              <BarChart2 className="h-4 w-4" />
              {stats.total} total events
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button 
            variant={isPaused ? 'default' : 'outline'} 
            size="sm" 
            onClick={() => setIsPaused(!isPaused)}
            className="gap-2"
          >
            {isPaused ? (
              <>
                <RefreshCw className="h-4 w-4" />
                Resume
              </>
            ) : (
              <>
                <Loader2 className="h-4 w-4" />
                Pause
              </>
            )}
          </Button>
          <Button variant="outline" size="sm" onClick={clearLogs}>
            <Trash2 className="h-4 w-4 mr-2" />
            Clear
          </Button>
        </div>
      </div>

      {/* Stats and Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="p-4 backdrop-blur-lg bg-white/5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-muted-foreground">Total Sales</div>
              <div className="text-2xl font-bold">{stats.sales}</div>
            </div>
            <div className="p-2 rounded-lg bg-green-500/10">
              <ShoppingBag className="h-5 w-5 text-green-400" />
            </div>
          </div>
        </Card>
        <Card className="p-4 backdrop-blur-lg bg-white/5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-muted-foreground">Hourly Customers</div>
              <div className="text-2xl font-bold">{stats.hourlyCustomers}</div>
            </div>
            <div className="p-2 rounded-lg bg-indigo-500/10">
              <User className="h-5 w-5 text-indigo-400" />
            </div>
          </div>
        </Card>
        <Card className="p-4 backdrop-blur-lg bg-white/5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-muted-foreground">Inventory Alerts</div>
              <div className="text-2xl font-bold">{stats.inventoryAlerts}</div>
            </div>
            <div className="p-2 rounded-lg bg-yellow-500/10">
              <AlertTriangle className="h-5 w-5 text-yellow-400" />
            </div>
          </div>
        </Card>
        <Card className="p-4 backdrop-blur-lg bg-white/5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-muted-foreground">Conversion Rate</div>
              <div className="text-2xl font-bold">{stats.conversionRate}%</div>
            </div>
            <div className="p-2 rounded-lg bg-purple-500/10">
              <Percent className="h-5 w-5 text-purple-400" />
            </div>
          </div>
        </Card>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search logs by product, customer, or staff..." 
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {Object.entries(LOG_TYPES).map(([key, value]) => (
              <SelectItem key={key} value={key.toLowerCase()}>
                <div className="flex items-center gap-2">
                  {value.icon}
                  {value.label}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Log Container */}
      <Card className="flex-1 backdrop-blur-lg bg-white/5 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="p-4 space-y-4">
            {filteredLogs.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
                <ShoppingBag className="h-8 w-8 mb-2" />
                <p>No retail events match your filters</p>
              </div>
            ) : (
              filteredLogs.map((log) => (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`p-4 rounded-lg border ${
                    log.status === 'error' 
                      ? 'bg-red-500/10 border-red-500/20' 
                      : log.status === 'warning'
                      ? 'bg-yellow-500/10 border-yellow-500/20'
                      : 'bg-white/5 border-white/10'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${
                      log.status === 'error' 
                        ? 'bg-red-500/10 text-red-400' 
                        : log.status === 'warning'
                        ? 'bg-yellow-500/10 text-yellow-400'
                        : 'bg-white/5'
                    }`}>
                      {LOG_TYPES[log.type].icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className={`font-medium ${LOG_TYPES[log.type].color}`}>
                            {LOG_TYPES[log.type].label}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {log.source}
                          </Badge>
                          {log.status === 'error' && (
                            <Badge variant="destructive" className="text-xs">
                              Critical
                            </Badge>
                          )}
                          {log.status === 'warning' && (
                            <Badge variant="secondary" className="text-xs">
                              Alert
                            </Badge>
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {formatTime(log.timestamp)}
                        </div>
                      </div>
                      <p className="mb-2">{log.message}</p>
                      <div className="text-sm text-muted-foreground">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {Object.entries(log.details).map(([key, value]) => (
                            <div key={key} className="flex items-center gap-1">
                              <span className="font-medium capitalize">{key}:</span>
                              <span>
                                {Array.isArray(value) ? (
                                  <ul className="list-disc list-inside">
                                    {value.map((item, i) => (
                                      <li key={i}>
                                        {item.name} (x{item.quantity}) - ${item.price}
                                      </li>
                                    ))}
                                  </ul>
                                ) : value instanceof Date ? (
                                  formatDate(value)
                                ) : (
                                  value
                                )}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
            <div ref={logsEndRef} />
          </div>
        </ScrollArea>
      </Card>

      {/* Status Bar */}
      <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
            {filteredLogs.filter(l => l.status === 'success').length} Normal
          </span>
          <span className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
            {filteredLogs.filter(l => l.status === 'warning').length} Alerts
          </span>
          <span className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-red-500"></div>
            {filteredLogs.filter(l => l.status === 'error').length} Critical
          </span>
        </div>
        <div>
          {isPaused ? 'Updates Paused' : 'Streaming Live'}
        </div>
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

function Search(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}