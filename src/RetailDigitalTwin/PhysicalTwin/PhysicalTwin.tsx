import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  PolarGrid
} from 'recharts';
import {
  Wifi,
  Thermometer,
  Users,
  ShoppingBasket,
  Lightbulb,
  BatteryFull,
  Shield,
  AlertCircle,
  Zap,
  Clock,
  MapPin,
  Bluetooth,
  Radio,
  Cpu,
  HardDrive,
  Database,
  Activity,
  Check,
  Plus,
  Minus,
  Settings,
  RefreshCw,
  Phone,
  ChevronDown
} from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"

// Mock IoT data for retail
const retailIoTData = {
  storeOverview: {
    totalSensors: 42,
    connected: 38,
    batteryLevel: 87,
    lastUpdated: '2 seconds ago'
  },
  footTraffic: [
    { hour: '8:00', count: 12 },
    { hour: '9:00', count: 45 },
    { hour: '10:00', count: 78 },
    { hour: '11:00', count: 112 },
    { hour: '12:00', count: 156 },
    { hour: '13:00', count: 134 },
    { hour: '14:00', count: 98 },
    { hour: '15:00', count: 76 }
  ],
  shelfMonitoring: [
    { section: 'Electronics', stockLevel: 72, alerts: 2 },
    { section: 'Clothing', stockLevel: 45, alerts: 5 },
    { section: 'Grocery', stockLevel: 88, alerts: 1 },
    { section: 'Home Goods', stockLevel: 63, alerts: 0 }
  ],
  environmental: {
    temperature: 22.5,
    humidity: 45,
    lighting: 78,
    airQuality: 92
  },
  energyUsage: [
    { name: 'Lighting', value: 35 },
    { name: 'HVAC', value: 45 },
    { name: 'Electronics', value: 15 },
    { name: 'Other', value: 5 }
  ],
  security: {
    cameras: 8,
    active: 8,
    lastAlert: '30 mins ago',
    alertsToday: 2
  },
  queueMetrics: {
    avgWaitTime: 4.2,
    maxWaitTime: 8.5,
    currentQueues: 3,
    longestQueue: 5
  },
  deviceHealth: [
    { name: 'Shelf Sensor A1', battery: 85, signal: 92, status: 'normal' },
    { name: 'Foot Traffic Cam', battery: 45, signal: 78, status: 'warning' },
    { name: 'Checkout Scale', battery: 92, signal: 85, status: 'normal' },
    { name: 'Temp Sensor F3', battery: 23, signal: 65, status: 'critical' }
  ],
  aiInsights: [
    {
      title: 'High Traffic Prediction',
      description: 'Expected 20% increase in foot traffic in next hour',
      action: 'Prepare additional checkout staff',
      icon: <Users className="h-5 w-5" />,
      priority: 'high'
    },
    {
      title: 'Energy Optimization',
      description: 'Lighting usage can be reduced by 15% in low-traffic areas',
      action: 'Adjust smart lighting schedule',
      icon: <Lightbulb className="h-5 w-5" />,
      priority: 'medium'
    },
    {
      title: 'Restocking Alert',
      description: 'Clothing section has 5 items below threshold',
      action: 'Initiate restocking procedure',
      icon: <ShoppingBasket className="h-5 w-5" />,
      priority: 'high'
    }
  ]
};

const environmentalData = [
  { subject: 'Temp', A: retailIoTData.environmental.temperature, fullMark: 40 },
  { subject: 'Humidity', A: retailIoTData.environmental.humidity, fullMark: 100 },
  { subject: 'Lighting', A: retailIoTData.environmental.lighting, fullMark: 100 },
  { subject: 'Air Quality', A: retailIoTData.environmental.airQuality, fullMark: 100 }
];

export default function PhysicalTwin() {
  const [activeTab, setActiveTab] = useState('overview');
  const [is3DView, setIs3DView] = useState(false);

  return (
    <div className="relative rounded-3xl overflow-hidden 
      bg-gradient-to-br from-blue-900/20 to-purple-900/20
      dark:from-gray-900/90 dark:to-gray-800/90
      border border-white/20 dark:border-gray-700/50
      p-6 space-y-8">

      {/* Header with 3D toggle */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 
            to-purple-400 bg-clip-text text-transparent">
            Retail Physical Twin
          </h1>
          <div className="flex items-center gap-4 text-muted-foreground">
            <Badge className="bg-blue-500/10 text-blue-500">
              <Wifi className="h-4 w-4 mr-2" />
              {retailIoTData.storeOverview.connected}/{retailIoTData.storeOverview.totalSensors} Devices Online
            </Badge>
            <span className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Updated {retailIoTData.storeOverview.lastUpdated}
            </span>
          </div>
        </div>
        <Button 
          variant={is3DView ? "default" : "outline"} 
          onClick={() => setIs3DView(!is3DView)}
          className="gap-2"
        >
          {is3DView ? (
            <>
              <MapPin className="h-4 w-4" />
              2D Dashboard
            </>
          ) : (
            <>
              <Cpu className="h-4 w-4" />
              3D Store View
            </>
          )}
        </Button>
      </div>

      {is3DView ? (
        <div className="h-[600px] rounded-xl bg-gradient-to-br from-blue-900/30 to-purple-900/30 border border-white/10 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="mx-auto w-24 h-24 bg-blue-500/20 rounded-full flex items-center justify-center border-2 border-blue-400/50">
              <Cpu className="h-12 w-12 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold">Interactive 3D Store View</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              This would be an interactive 3D representation of your retail space with real-time IoT data overlays.
              Click on any area to see detailed sensor information.
            </p>
            <Button variant="outline" onClick={() => setIs3DView(false)}>
              Return to Dashboard
            </Button>
          </div>
        </div>
      ) : (
        <>
          {/* Tabs for different views */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-5 w-full">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="traffic">Foot Traffic</TabsTrigger>
              <TabsTrigger value="inventory">Smart Shelves</TabsTrigger>
              <TabsTrigger value="environment">Environment</TabsTrigger>
              <TabsTrigger value="devices">Device Health</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Top Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <IoTStatsCard
                  title="Foot Traffic"
                  value={retailIoTData.footTraffic[retailIoTData.footTraffic.length - 1].count}
                  change="+12%"
                  icon={<Users className="h-6 w-6" />}
                  color="text-blue-400"
                />
                <IoTStatsCard
                  title="Avg. Wait Time"
                  value={`${retailIoTData.queueMetrics.avgWaitTime}m`}
                  change="-1.2m"
                  icon={<Clock className="h-6 w-6" />}
                  color="text-purple-400"
                />
                <IoTStatsCard
                  title="Stock Alerts"
                  value={retailIoTData.shelfMonitoring.reduce((acc, curr) => acc + curr.alerts, 0)}
                  change="+3"
                  icon={<AlertCircle className="h-6 w-6" />}
                  color="text-orange-400"
                />
                <IoTStatsCard
                  title="Energy Usage"
                  value="82%"
                  change="-5%"
                  icon={<Zap className="h-6 w-6" />}
                  color="text-green-400"
                />
              </div>

              {/* AI Insights */}
              <Card className="p-6 backdrop-blur-lg bg-white/5">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Activity className="h-5 w-5 text-blue-400" />
                  AI Insights & Recommendations
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {retailIoTData.aiInsights.map((insight, index) => (
                    <Card key={index} className={`p-4 ${
                      insight.priority === 'high' 
                        ? 'bg-red-500/10 border-red-500/30'
                        : 'bg-blue-500/10 border-blue-500/30'
                    }`}>
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${
                          insight.priority === 'high' 
                            ? 'bg-red-500/20 text-red-400'
                            : 'bg-blue-500/20 text-blue-400'
                        }`}>
                          {insight.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold">{insight.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1 mb-3">
                            {insight.description}
                          </p>
                          <Button variant="ghost" size="sm" className="mt-2">
                            {insight.action}
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </Card>

              {/* Foot Traffic and Environment */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="p-6 backdrop-blur-lg bg-white/5">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Users className="h-5 w-5 text-purple-400" />
                    Hourly Foot Traffic
                  </h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <AreaChart data={retailIoTData.footTraffic}>
                      <XAxis dataKey="hour" />
                      <YAxis />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="count"
                        stroke="#8b5cf6"
                        fill="#8b5cf6"
                        fillOpacity={0.2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </Card>

                <Card className="p-6 backdrop-blur-lg bg-white/5">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Thermometer className="h-5 w-5 text-blue-400" />
                    Store Environment
                  </h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <RadarChart outerRadius={90} data={environmentalData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="subject" />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} />
                      <Radar
                        name="Environment"
                        dataKey="A"
                        stroke="#3b82f6"
                        fill="#3b82f6"
                        fillOpacity={0.6}
                      />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                  <div className="grid grid-cols-4 gap-4 mt-4 text-center text-sm">
                    <div>
                      <div className="font-medium">{retailIoTData.environmental.temperature}°C</div>
                      <div className="text-muted-foreground">Temp</div>
                    </div>
                    <div>
                      <div className="font-medium">{retailIoTData.environmental.humidity}%</div>
                      <div className="text-muted-foreground">Humidity</div>
                    </div>
                    <div>
                      <div className="font-medium">{retailIoTData.environmental.lighting}%</div>
                      <div className="text-muted-foreground">Lighting</div>
                    </div>
                    <div>
                      <div className="font-medium">{retailIoTData.environmental.airQuality}</div>
                      <div className="text-muted-foreground">AQI</div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {/* Foot Traffic Tab */}
          {activeTab === 'traffic' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="p-6 backdrop-blur-lg bg-white/5 lg:col-span-2">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Users className="h-5 w-5 text-purple-400" />
                    Foot Traffic Analysis
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={retailIoTData.footTraffic}>
                      <XAxis dataKey="hour" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="count"
                        stroke="#8b5cf6"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </Card>

                <Card className="p-6 backdrop-blur-lg bg-white/5">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Clock className="h-5 w-5 text-blue-400" />
                    Queue Metrics
                  </h3>
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-lg bg-blue-500/10">
                        <div className="text-2xl font-bold">
                          {retailIoTData.queueMetrics.avgWaitTime}m
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Avg Wait Time
                        </div>
                      </div>
                      <div className="p-4 rounded-lg bg-purple-500/10">
                        <div className="text-2xl font-bold">
                          {retailIoTData.queueMetrics.currentQueues}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Active Queues
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Max Wait Today</span>
                        <span className="font-medium">{retailIoTData.queueMetrics.maxWaitTime}m</span>
                      </div>
                      <Progress value={(retailIoTData.queueMetrics.maxWaitTime / 15) * 100} className="h-2" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Longest Queue</span>
                        <span className="font-medium">{retailIoTData.queueMetrics.longestQueue} people</span>
                      </div>
                      <Progress value={(retailIoTData.queueMetrics.longestQueue / 10) * 100} className="h-2" />
                    </div>
                  </div>
                </Card>
              </div>

              <Card className="p-6 backdrop-blur-lg bg-white/5">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-orange-400" />
                  Heatmap Analysis
                </h3>
                <div className="h-64 rounded-lg bg-gradient-to-br from-blue-900/30 to-purple-900/30 border border-white/10 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-muted-foreground">
                      Interactive store heatmap showing customer concentration areas
                    </p>
                    <Button variant="outline" className="mt-4">
                      View Live Heatmap
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Smart Shelves Tab */}
          {activeTab === 'inventory' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="p-6 backdrop-blur-lg bg-white/5 lg:col-span-2">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <ShoppingBasket className="h-5 w-5 text-green-400" />
                    Shelf Inventory Monitoring
                  </h3>
                  <div className="space-y-4">
                    {retailIoTData.shelfMonitoring.map((section, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{section.section}</span>
                          <Badge variant={section.alerts > 0 ? "destructive" : "outline"}>
                            {section.alerts} alert{section.alerts !== 1 ? 's' : ''}
                          </Badge>
                        </div>
                        <Progress value={section.stockLevel} className="h-2" />
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>Stock Level: {section.stockLevel}%</span>
                          <span className="flex items-center gap-1">
                            {section.alerts > 0 ? (
                              <>
                                <AlertCircle className="h-4 w-4 text-red-400" />
                                Needs attention
                              </>
                            ) : (
                              <>
                                <Check className="h-4 w-4 text-green-400" />
                                Stock OK
                              </>
                            )}
                          </span>
                        </div>
                        {index < retailIoTData.shelfMonitoring.length - 1 && <Separator className="my-2" />}
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-6 backdrop-blur-lg bg-white/5">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <HardDrive className="h-5 w-5 text-blue-400" />
                    Inventory Alerts
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                      <div className="flex items-center gap-2 mb-1">
                        <AlertCircle className="h-4 w-4 text-red-400" />
                        <span className="font-medium">Urgent Restock Needed</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Clothing section has 5 items below minimum threshold
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
                      <div className="flex items-center gap-2 mb-1">
                        <AlertCircle className="h-4 w-4 text-yellow-400" />
                        <span className="font-medium">Potential Theft Detected</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Unusual activity in electronics section
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
                      <div className="flex items-center gap-2 mb-1">
                        <ShoppingBasket className="h-4 w-4 text-blue-400" />
                        <span className="font-medium">Restock Completed</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Grocery section restocked 15 minutes ago
                      </p>
                    </div>
                  </div>
                </Card>
              </div>

              <Card className="p-6 backdrop-blur-lg bg-white/5">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Database className="h-5 w-5 text-purple-400" />
                  Smart Shelf Network
                </h3>
                <div className="h-64 rounded-lg bg-gradient-to-br from-blue-900/30 to-purple-900/30 border border-white/10 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-muted-foreground">
                      Interactive map showing all smart shelf sensors and their status
                    </p>
                    <Button variant="outline" className="mt-4">
                      View Sensor Network
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Environment Tab */}
          {activeTab === 'environment' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="p-6 backdrop-blur-lg bg-white/5">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Thermometer className="h-5 w-5 text-orange-400" />
                    Temperature Zones
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Main Floor</span>
                      <span className="font-medium">22.5°C</span>
                    </div>
                    <Progress value={((22.5 - 15) / (30 - 15)) * 100} className="h-2" />
                    
                    <div className="flex items-center justify-between">
                      <span>Storage Room</span>
                      <span className="font-medium">18.2°C</span>
                    </div>
                    <Progress value={((18.2 - 15) / (30 - 15)) * 100} className="h-2" />
                    
                    <div className="flex items-center justify-between">
                      <span>Perishables</span>
                      <span className="font-medium">4.5°C</span>
                    </div>
                    <Progress value={((4.5 - 0) / (10 - 0)) * 100} className="h-2" />
                  </div>
                </Card>

                <Card className="p-6 backdrop-blur-lg bg-white/5">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-yellow-400" />
                    Energy Consumption
                  </h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <RadialBarChart
                      innerRadius="20%"
                      outerRadius="100%"
                      data={retailIoTData.energyUsage}
                      startAngle={180}
                      endAngle={-180}
                    >
                      <RadialBar
                        minAngle={15}
                        label={{ fill: '#fff', position: 'insideStart' }}
                        background
                        dataKey="value"
                      >
                        {retailIoTData.energyUsage.map((entry, index) => (
                          <Phone key={`cell-${index}`} fill={['#3b82f6', '#8b5cf6', '#ec4899', '#10b981'][index]} />
                        ))}
                      </RadialBar>
                      <Tooltip />
                    </RadialBarChart>
                  </ResponsiveContainer>
                  <div className="grid grid-cols-4 gap-2 mt-2 text-center text-xs">
                    <div className="text-blue-400">Lighting</div>
                    <div className="text-purple-400">HVAC</div>
                    <div className="text-pink-400">Electronics</div>
                    <div className="text-green-400">Other</div>
                  </div>
                </Card>

                <Card className="p-6 backdrop-blur-lg bg-white/5">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Shield className="h-5 w-5 text-green-400" />
                    Safety & Security
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Security Cameras</span>
                      <Badge variant="outline">
                        {retailIoTData.security.active}/{retailIoTData.security.cameras} Active
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Today's Alerts</span>
                      <span className="font-medium">{retailIoTData.security.alertsToday}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Last Alert</span>
                      <span className="text-muted-foreground">{retailIoTData.security.lastAlert}</span>
                    </div>
                    <Button variant="outline" className="w-full mt-4">
                      View Security Dashboard
                    </Button>
                  </div>
                </Card>
              </div>

              <Card className="p-6 backdrop-blur-lg bg-white/5">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Radio className="h-5 w-5 text-blue-400" />
                  Environmental Controls
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 rounded-lg border border-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">Lighting</span>
                      <Badge variant="outline">Auto</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold">78%</span>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" className="p-1">
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="p-1">
                          <ChevronUp className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg border border-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">Temperature</span>
                      <Badge variant="outline">22.5°C</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold">Auto</span>
                      <Button variant="ghost" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg border border-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">Humidity</span>
                      <Badge variant="outline">45%</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold">Optimal</span>
                      <Button variant="ghost" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg border border-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">Air Quality</span>
                      <Badge variant="outline">92 AQI</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold">Excellent</span>
                      <Button variant="ghost" size="sm">
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Device Health Tab */}
          {activeTab === 'devices' && (
            <div className="space-y-6">
              <Card className="p-6 backdrop-blur-lg bg-white/5">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Bluetooth className="h-5 w-5 text-blue-400" />
                  IoT Device Network Health
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-4">Device Status Overview</h4>
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="p-4 rounded-lg bg-green-500/10 text-center">
                        <div className="text-2xl font-bold">
                          {retailIoTData.deviceHealth.filter(d => d.status === 'normal').length}
                        </div>
                        <div className="text-sm">Normal</div>
                      </div>
                      <div className="p-4 rounded-lg bg-yellow-500/10 text-center">
                        <div className="text-2xl font-bold">
                          {retailIoTData.deviceHealth.filter(d => d.status === 'warning').length}
                        </div>
                        <div className="text-sm">Warning</div>
                      </div>
                      <div className="p-4 rounded-lg bg-red-500/10 text-center">
                        <div className="text-2xl font-bold">
                          {retailIoTData.deviceHealth.filter(d => d.status === 'critical').length}
                        </div>
                        <div className="text-sm">Critical</div>
                      </div>
                    </div>
                    <h4 className="font-medium mb-4">Connection Health</h4>
                    <ResponsiveContainer width="100%" height={200}>
                      <RadarChart outerRadius={90} data={[
                        { subject: 'Signal', A: 85, fullMark: 100 },
                        { subject: 'Battery', A: 65, fullMark: 100 },
                        { subject: 'Uptime', A: 98, fullMark: 100 },
                        { subject: 'Data Quality', A: 92, fullMark: 100 },
                      ]}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="subject" />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} />
                        <Radar
                          name="Health"
                          dataKey="A"
                          stroke="#3b82f6"
                          fill="#3b82f6"
                          fillOpacity={0.6}
                        />
                        <Tooltip />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                  <div>
                    <h4 className="font-medium mb-4">Device Details</h4>
                    <ScrollArea className="h-[340px]">
                      <div className="space-y-3">
                        {retailIoTData.deviceHealth.map((device, index) => (
                          <Card key={index} className={`p-3 ${
                            device.status === 'critical' 
                              ? 'bg-red-500/10 border-red-500/30'
                              : device.status === 'warning'
                              ? 'bg-yellow-500/10 border-yellow-500/30'
                              : 'bg-green-500/10 border-green-500/30'
                          }`}>
                            <div className="flex items-center justify-between">
                              <div className="font-medium">{device.name}</div>
                              <Badge variant="outline">
                                {device.status.charAt(0).toUpperCase() + device.status.slice(1)}
                              </Badge>
                            </div>
                            <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                              <div className="flex items-center gap-1">
                                <BatteryFull className="h-4 w-4" />
                                {device.battery}%
                              </div>
                              <div className="flex items-center gap-1">
                                <Wifi className="h-4 w-4" />
                                {device.signal}%
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                </div>
              </Card>

              <Card className="p-6 backdrop-blur-lg bg-white/5">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Activity className="h-5 w-5 text-purple-400" />
                  Network Diagnostics
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 rounded-lg border border-white/10">
                    <div className="text-sm text-muted-foreground mb-1">Latency</div>
                    <div className="text-xl font-bold">42ms</div>
                  </div>
                  <div className="p-4 rounded-lg border border-white/10">
                    <div className="text-sm text-muted-foreground mb-1">Data Rate</div>
                    <div className="text-xl font-bold">1.2MB/s</div>
                  </div>
                  <div className="p-4 rounded-lg border border-white/10">
                    <div className="text-sm text-muted-foreground mb-1">Packet Loss</div>
                    <div className="text-xl font-bold">0.2%</div>
                  </div>
                  <div className="p-4 rounded-lg border border-white/10">
                    <div className="text-sm text-muted-foreground mb-1">Uptime</div>
                    <div className="text-xl font-bold">99.98%</div>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </>
      )}

      {/* Background Effects */}
      <div className="absolute inset-0 -z-10 opacity-20 pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 bg-blue-400 rounded-full"
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 3 + Math.random()
            }}
          />
        ))}
      </div>
    </div>
  );
}

function IoTStatsCard({ title, value, icon, trend, trendUp }) {
  return (
    <Card className="p-6 backdrop-blur-lg bg-white/5">
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