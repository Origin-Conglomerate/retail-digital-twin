import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell
} from 'recharts';
import {
  ShoppingCart,
  Clock,
  AlertCircle,
  CheckCircle2,
  BatteryFull,
  Wrench,
  Gauge,
  Thermometer,
  Lightbulb,
  ClipboardCheck,
  Sparkles,
  Scan,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"

// Mock data for retail operations
const retailOperationsData = {
  checkoutMetrics: {
    efficiency: 88,
    avgWaitTime: 2.4,
    peakHours: ['15:00-17:00', '19:00-20:30'],
    issuesToday: 3,
    selfCheckoutUsage: 65
  },
  shelfStatus: [
    { section: 'Electronics', stocked: 92, needsAttention: false },
    { section: 'Grocery', stocked: 78, needsAttention: true },
    { section: 'Clothing', stocked: 95, needsAttention: false },
    { section: 'Home Goods', stocked: 85, needsAttention: false },
    { section: 'Pharmacy', stocked: 64, needsAttention: true }
  ],
  maintenance: {
    lastCleaned: '2 hours ago',
    nextScheduled: 'In 4 hours',
    equipmentStatus: [
      { name: 'AC System', status: 'optimal', lastCheck: 'Today' },
      { name: 'Elevators', status: 'needs_check', lastCheck: '2 days ago' },
      { name: 'Security System', status: 'optimal', lastCheck: 'Today' }
    ]
  },
  energyUsage: {
    current: 2450,
    comparison: -12,
    breakdown: [
      { name: 'Lighting', value: 45 },
      { name: 'HVAC', value: 30 },
      { name: 'Electronics', value: 15 },
      { name: 'Other', value: 10 }
    ]
  },
  compliance: {
    safetyChecklist: [
      { item: 'Fire Extinguishers', status: 'compliant', lastCheck: '1 week ago' },
      { item: 'Emergency Exits', status: 'non_compliant', lastCheck: '3 days ago' },
      { item: 'First Aid Kits', status: 'compliant', lastCheck: '2 weeks ago' }
    ],
    violations: 2,
    lastInspection: '2023-11-15'
  },
  alerts: [
    {
      type: 'stock',
      title: 'Low Stock Alert',
      description: 'Pharmacy section at 64% capacity',
      urgency: 'high',
      action: 'Restock needed'
    },
    {
      type: 'maintenance',
      title: 'Preventive Maintenance',
      description: 'Elevators due for service',
      urgency: 'medium',
      action: 'Schedule technician'
    }
  ]
};

const COLORS = ['#10b981', '#f59e0b', '#3b82f6', '#8b5cf6', '#ec4899'];

export default function Operations() {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedView, setExpandedView] = useState(null);

  const toggleExpandedView = (view) => {
    setExpandedView(expandedView === view ? null : view);
  };

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
            Store Operations Twin
          </h1>
          <div className="flex items-center gap-4 text-muted-foreground">
            <Badge className="bg-blue-500/10 text-blue-500">
              <Sparkles className="h-4 w-4 mr-2" />
              AI-Optimized Operations
            </Badge>
            <span className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Real-time Monitoring
            </span>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <Scan className="h-4 w-4 mr-2" />
            Run Diagnostics
          </Button>
        </div>
      </div>

      {/* Operations Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <OperationMetricCard
          title="Checkout Efficiency"
          value={`${retailOperationsData.checkoutMetrics.efficiency}%`}
          icon={<ShoppingCart className="h-5 w-5 text-blue-500" />}
          trend={retailOperationsData.checkoutMetrics.efficiency > 85 ? 'optimal' : 'needs_improvement'}
          onClick={() => toggleExpandedView('checkout')}
        />
        <OperationMetricCard
          title="Shelf Stock Level"
          value={`${Math.min(...retailOperationsData.shelfStatus.map(s => s.stocked))}%`}
          icon={<ClipboardCheck className="h-5 w-5 text-green-500" />}
          trend={retailOperationsData.shelfStatus.some(s => s.stocked < 70) ? 'critical' : 'optimal'}
          onClick={() => toggleExpandedView('shelves')}
        />
        <OperationMetricCard
          title="Energy Usage"
          value={`${retailOperationsData.energyUsage.current}kWh`}
          icon={<Lightbulb className="h-5 w-5 text-yellow-500" />}
          trend={retailOperationsData.energyUsage.comparison > 0 ? 'high' : 'low'}
          onClick={() => toggleExpandedView('energy')}
        />
        <OperationMetricCard
          title="Compliance Status"
          value={`${retailOperationsData.compliance.violations} issues`}
          icon={<ShieldCheck className="h-5 w-5 text-purple-500" />}
          trend={retailOperationsData.compliance.violations > 0 ? 'non_compliant' : 'compliant'}
          onClick={() => toggleExpandedView('compliance')}
        />
      </div>

      {/* Expanded Views */}
      {expandedView === 'checkout' && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-blue-500/20"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-blue-400" />
              Checkout Operations
            </h2>
            <Button variant="ghost" size="sm" onClick={() => toggleExpandedView(null)}>
              Close
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-4">Performance Metrics</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Efficiency Score</span>
                  <Badge variant="outline" className={retailOperationsData.checkoutMetrics.efficiency > 85 ? 'bg-green-500/10' : 'bg-yellow-500/10'}>
                    {retailOperationsData.checkoutMetrics.efficiency}%
                  </Badge>
                </div>
                <Progress value={retailOperationsData.checkoutMetrics.efficiency} className="h-2" />
                
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Avg. Wait Time</span>
                  <span className="font-medium">{retailOperationsData.checkoutMetrics.avgWaitTime} mins</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Self-Checkout Usage</span>
                  <span className="font-medium">{retailOperationsData.checkoutMetrics.selfCheckoutUsage}%</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-4">Peak Hours</h3>
              <div className="space-y-2">
                {retailOperationsData.checkoutMetrics.peakHours.map((time, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-blue-500/10 rounded-lg">
                    <Clock className="h-4 w-4 text-blue-400" />
                    <span className="font-medium">{time}</span>
                    <Badge variant="outline" className="ml-auto">
                      {index === 0 ? 'Highest Traffic' : 'Secondary Peak'}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {expandedView === 'shelves' && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-green-500/20"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <ClipboardCheck className="h-5 w-5 text-green-400" />
              Shelf Stock Status
            </h2>
            <Button variant="ghost" size="sm" onClick={() => toggleExpandedView(null)}>
              Close
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-4">Section Stock Levels</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={retailOperationsData.shelfStatus}>
                  <XAxis dataKey="section" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="stocked">
                    {retailOperationsData.shelfStatus.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.needsAttention ? '#f59e0b' : COLORS[index % COLORS.length]} 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div>
              <h3 className="font-medium mb-4">Attention Needed</h3>
              <div className="space-y-3">
                {retailOperationsData.shelfStatus
                  .filter(s => s.needsAttention)
                  .map((section, index) => (
                    <Card key={index} className="p-4 bg-yellow-500/10 border-yellow-500/30">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{section.section}</span>
                        <Badge variant="outline" className="bg-yellow-500/10">
                          {section.stocked}% stocked
                        </Badge>
                      </div>
                      <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                        <AlertCircle className="h-4 w-4 text-yellow-500" />
                        Restock recommended
                      </div>
                    </Card>
                  ))}
                
                {retailOperationsData.shelfStatus.filter(s => s.needsAttention).length === 0 && (
                  <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/30 flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <span>All sections adequately stocked</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Energy Usage Expanded View */}
      {expandedView === 'energy' && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-yellow-500/20"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-yellow-400" />
              Energy Consumption
            </h2>
            <Button variant="ghost" size="sm" onClick={() => toggleExpandedView(null)}>
              Close
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-4">Current Usage</h3>
              <div className="flex items-end gap-2 mb-4">
                <span className="text-4xl font-bold">{retailOperationsData.energyUsage.current}</span>
                <span className="text-lg text-muted-foreground">kWh</span>
                <Badge variant="outline" className={`ml-auto ${
                  retailOperationsData.energyUsage.comparison > 0 
                    ? 'bg-red-500/10 text-red-500' 
                    : 'bg-green-500/10 text-green-500'
                }`}>
                  {retailOperationsData.energyUsage.comparison > 0 ? '+' : ''}
                  {retailOperationsData.energyUsage.comparison}% vs avg
                </Badge>
              </div>
              
              <h3 className="font-medium mb-4 mt-6">Consumption Breakdown</h3>
              <div className="grid grid-cols-2 gap-4">
                {retailOperationsData.energyUsage.breakdown.map((item, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        index === 0 ? 'bg-blue-500/10 text-blue-500' :
                        index === 1 ? 'bg-yellow-500/10 text-yellow-500' :
                        index === 2 ? 'bg-purple-500/10 text-purple-500' :
                        'bg-gray-500/10 text-gray-500'
                      }`}>
                        {index === 0 ? <Lightbulb className="h-4 w-4" /> :
                         index === 1 ? <Thermometer className="h-4 w-4" /> :
                         index === 2 ? <Gauge className="h-4 w-4" /> :
                         <Zap className="h-4 w-4" />}
                      </div>
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-muted-foreground">{item.value}% of total</div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-4">Energy Efficiency</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart
                    innerRadius="20%"
                    outerRadius="100%"
                    data={[
                      { name: 'Lighting', value: 65, fill: '#3b82f6' },
                      { name: 'HVAC', value: 40, fill: '#f59e0b' },
                      { name: 'Equipment', value: 72, fill: '#8b5cf6' },
                      { name: 'Overall', value: 58, fill: '#10b981' }
                    ]}
                    startAngle={180}
                    endAngle={-180}
                  >
                    <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                    <RadialBar background dataKey="value" cornerRadius={10} />
                    <Tooltip />
                  </RadialBarChart>
                </ResponsiveContainer>
              </div>
              <div className="text-center text-sm text-muted-foreground mt-2">
                Efficiency scores by category (higher is better)
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Maintenance & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Maintenance Status */}
        <Card className="lg:col-span-2 p-6 backdrop-blur-lg bg-white/5">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Wrench className="h-5 w-5 text-orange-400" />
              Maintenance Overview
            </h3>
            <Badge variant="outline" className="bg-blue-500/10">
              {retailOperationsData.maintenance.equipmentStatus.filter(e => e.status === 'optimal').length}/
              {retailOperationsData.maintenance.equipmentStatus.length} Systems OK
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-4">Cleaning Schedule</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Last Cleaned</span>
                  <span className="font-medium">{retailOperationsData.maintenance.lastCleaned}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Next Scheduled</span>
                  <span className="font-medium">{retailOperationsData.maintenance.nextScheduled}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Equipment Status</h4>
              <div className="space-y-3">
                {retailOperationsData.maintenance.equipmentStatus.map((equip, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
                    <div className={`p-2 rounded-full ${
                      equip.status === 'optimal' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'
                    }`}>
                      {equip.status === 'optimal' ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{equip.name}</div>
                      <div className="text-sm text-muted-foreground">Last check: {equip.lastCheck}</div>
                    </div>
                    <Badge variant="outline" className={
                      equip.status === 'optimal' ? 'bg-green-500/10' : 'bg-yellow-500/10'
                    }>
                      {equip.status === 'optimal' ? 'Optimal' : 'Needs Check'}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
        
        {/* Alerts */}
        <Card className="p-6 backdrop-blur-lg bg-white/5">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-red-400" />
            Operational Alerts
          </h3>
          <ScrollArea className="h-[300px]">
            <div className="space-y-3">
              {retailOperationsData.alerts.map((alert, index) => (
                <Card key={index} className={`p-4 ${
                  alert.urgency === 'high' 
                    ? 'bg-red-500/10 border-red-500/30'
                    : 'bg-yellow-500/10 border-yellow-500/30'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`p-1 rounded-full ${
                      alert.urgency === 'high' ? 'bg-red-500/20 text-red-500' : 'bg-yellow-500/20 text-yellow-500'
                    }`}>
                      <AlertCircle className="h-4 w-4" />
                    </div>
                    <span className="font-semibold">{alert.title}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {alert.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className={
                      alert.urgency === 'high' ? 'bg-red-500/10' : 'bg-yellow-500/10'
                    }>
                      {alert.urgency === 'high' ? 'High Priority' : 'Medium Priority'}
                    </Badge>
                    <Button variant="ghost" size="sm">{alert.action}</Button>
                  </div>
                </Card>
              ))}
              
              {retailOperationsData.alerts.length === 0 && (
                <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/30 flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <span>No critical alerts at this time</span>
                </div>
              )}
            </div>
          </ScrollArea>
        </Card>
      </div>

      {/* Compliance Status */}
      <Card className="p-6 backdrop-blur-lg bg-white/5">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-purple-400" />
            Compliance Tracking
          </h3>
          <Badge variant="outline" className={
            retailOperationsData.compliance.violations > 0 
              ? 'bg-red-500/10 text-red-500' 
              : 'bg-green-500/10 text-green-500'
          }>
            {retailOperationsData.compliance.violations > 0 
              ? `${retailOperationsData.compliance.violations} Issues` 
              : 'Fully Compliant'}
          </Badge>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium mb-4">Safety Checklist</h4>
            <div className="space-y-3">
              {retailOperationsData.compliance.safetyChecklist.map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
                  <div className={`p-2 rounded-full ${
                    item.status === 'compliant' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                  }`}>
                    {item.status === 'compliant' ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{item.item}</div>
                    <div className="text-sm text-muted-foreground">Last checked: {item.lastCheck}</div>
                  </div>
                  <Badge variant="outline" className={
                    item.status === 'compliant' ? 'bg-green-500/10' : 'bg-red-500/10'
                  }>
                    {item.status === 'compliant' ? 'Compliant' : 'Non-Compliant'}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Inspection History</h4>
            <div className="p-4 bg-white/5 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <span className="text-muted-foreground">Last Inspection</span>
                <span className="font-medium">{retailOperationsData.compliance.lastInspection}</span>
              </div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-muted-foreground">Open Violations</span>
                <span className="font-medium">{retailOperationsData.compliance.violations}</span>
              </div>
              <Separator className="my-4" />
              <div className="text-sm text-muted-foreground mb-3">
                Next scheduled inspection in 14 days
              </div>
              <Button variant="outline" className="w-full">
                Schedule Early Inspection
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

function OperationMetricCard({ title, value, icon, trend, onClick }) {
  const trendColors = {
    optimal: 'bg-green-500/10 text-green-500',
    needs_improvement: 'bg-yellow-500/10 text-yellow-500',
    critical: 'bg-red-500/10 text-red-500',
    high: 'bg-red-500/10 text-red-500',
    low: 'bg-green-500/10 text-green-500',
    non_compliant: 'bg-red-500/10 text-red-500',
    compliant: 'bg-green-500/10 text-green-500'
  };
  
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="cursor-pointer"
    >
      <Card className="p-6 backdrop-blur-lg bg-white/5 transition-all hover:bg-white/10">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2 rounded-lg bg-white/5">
            {icon}
          </div>
          <Badge variant="outline" className={trendColors[trend]}>
            {trend.replace('_', ' ')}
          </Badge>
        </div>
        <div className="space-y-1">
          <h3 className="text-sm text-muted-foreground">{title}</h3>
          <div className="text-2xl font-bold">{value}</div>
        </div>
      </Card>
    </motion.div>
  );
}