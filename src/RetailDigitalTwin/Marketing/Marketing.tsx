import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  CartesianGrid,
  Legend
} from 'recharts';
import {
  TrendingUp,
  Zap,
  AlertTriangle,
  Mail,
  Smartphone,
  Percent,
  Tag,
  Calendar,
  Users,
  DollarSign,
  Share2,
  BarChart2,
  PieChart as PieIcon,
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Plus
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

// Mock data for retail marketing
const marketingData = {
  overview: {
    totalCampaigns: 8,
    activeCampaigns: 3,
    roi: 4.8,
    totalSpend: 12500,
    totalRevenue: 59800,
    customerAcquisitionCost: 42.50
  },
  campaignPerformance: [
    {
      name: 'Summer Sale',
      type: 'digital',
      startDate: '2023-06-15',
      endDate: '2023-06-30',
      budget: 5000,
      revenue: 28500,
      roi: 5.7,
      channels: ['email', 'social', 'sms'],
      status: 'completed'
    },
    {
      name: 'Back to School',
      type: 'in-store',
      startDate: '2023-08-01',
      endDate: '2023-08-31',
      budget: 3000,
      revenue: 12500,
      roi: 4.2,
      channels: ['print', 'in-store'],
      status: 'active'
    },
    {
      name: 'Flash Sale',
      type: 'digital',
      startDate: '2023-07-10',
      endDate: '2023-07-12',
      budget: 2000,
      revenue: 9800,
      roi: 4.9,
      channels: ['email', 'social'],
      status: 'completed'
    },
    {
      name: 'Loyalty Rewards',
      type: 'hybrid',
      startDate: '2023-09-01',
      endDate: '2023-09-30',
      budget: 2500,
      revenue: 9000,
      roi: 3.6,
      channels: ['email', 'in-store', 'app'],
      status: 'planned'
    }
  ],
  channelEffectiveness: [
    { name: 'Email', revenue: 21500, cost: 3200, roi: 6.7, conversion: 4.2 },
    { name: 'Social Media', revenue: 18500, cost: 2800, roi: 6.6, conversion: 3.8 },
    { name: 'SMS', revenue: 9800, cost: 1500, roi: 6.5, conversion: 5.1 },
    { name: 'In-Store', revenue: 12500, cost: 3000, roi: 4.2, conversion: 8.7 },
    { name: 'Print', revenue: 6500, cost: 2000, roi: 3.3, conversion: 2.5 }
  ],
  couponPerformance: [
    { name: 'SUMMER20', redeemed: 245, issued: 500, revenue: 12500, avgOrderValue: 89.50 },
    { name: 'BTS15', redeemed: 180, issued: 400, revenue: 9800, avgOrderValue: 75.20 },
    { name: 'FLASH10', redeemed: 320, issued: 600, revenue: 15800, avgOrderValue: 65.75 },
    { name: 'LOYALTY5', redeemed: 95, issued: 250, revenue: 4200, avgOrderValue: 55.30 }
  ],
  socialMediaStats: {
    followers: 12500,
    engagementRate: 4.8,
    topPosts: [
      { platform: 'Instagram', content: 'Summer Lookbook', engagement: 1245, clicks: 320 },
      { platform: 'Facebook', content: 'Back to School Deals', engagement: 980, clicks: 210 },
      { platform: 'TikTok', content: 'Flash Sale Teaser', engagement: 2150, clicks: 540 }
    ]
  },
  aiRecommendations: [
    {
      type: 'optimization',
      title: 'Channel Reallocation',
      description: 'Shift 20% of print budget to SMS based on ROI performance',
      impact: 'high',
      confidence: 92
    },
    {
      type: 'timing',
      title: 'Campaign Timing',
      description: 'Schedule emails for 2pm based on historical open rates',
      impact: 'medium',
      confidence: 85
    },
    {
      type: 'creative',
      title: 'Content Suggestion',
      description: 'User-generated content performs 35% better - incentivize shares',
      impact: 'medium',
      confidence: 88
    }
  ]
};

const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b'];

export default function Marketing() {
  const [activeTab, setActiveTab] = useState('campaigns');
  const [expandedCampaign, setExpandedCampaign] = useState(null);

  const toggleCampaign = (index) => {
    if (expandedCampaign === index) {
      setExpandedCampaign(null);
    } else {
      setExpandedCampaign(index);
    }
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
            Marketing & Promotions
          </h1>
          <div className="flex items-center gap-4 text-muted-foreground">
            <Badge className="bg-indigo-500/10 text-indigo-500">
              <Sparkles className="h-4 w-4 mr-2" />
              AI-Powered Insights
            </Badge>
            <span className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-yellow-400" />
              Real-time Tracking
            </span>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Last 30 Days
            <ChevronDown className="h-4 w-4 ml-2" />
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Campaign
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 backdrop-blur-lg bg-white/5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm text-muted-foreground">Total ROI</h3>
              <div className="text-3xl font-bold mt-2">
                {marketingData.overview.roi}x
              </div>
            </div>
            <div className="p-3 rounded-lg bg-green-500/10">
              <TrendingUp className="h-6 w-6 text-green-400" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Spend</span>
              <span>${marketingData.overview.totalSpend.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between text-sm mt-1">
              <span className="text-muted-foreground">Revenue</span>
              <span className="text-green-400">${marketingData.overview.totalRevenue.toLocaleString()}</span>
            </div>
          </div>
        </Card>

        <Card className="p-6 backdrop-blur-lg bg-white/5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm text-muted-foreground">Active Campaigns</h3>
              <div className="text-3xl font-bold mt-2">
                {marketingData.overview.activeCampaigns}/{marketingData.overview.totalCampaigns}
              </div>
            </div>
            <div className="p-3 rounded-lg bg-blue-500/10">
              <Zap className="h-6 w-6 text-blue-400" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">CAC</span>
              <span>${marketingData.overview.customerAcquisitionCost}</span>
            </div>
            <div className="flex items-center justify-between text-sm mt-1">
              <span className="text-muted-foreground">Avg. ROI</span>
              <span className="text-blue-400">{marketingData.overview.roi}x</span>
            </div>
          </div>
        </Card>

        <Card className="p-6 backdrop-blur-lg bg-white/5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm text-muted-foreground">Social Engagement</h3>
              <div className="text-3xl font-bold mt-2">
                {marketingData.socialMediaStats.engagementRate}%
              </div>
            </div>
            <div className="p-3 rounded-lg bg-purple-500/10">
              <Share2 className="h-6 w-6 text-purple-400" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Followers</span>
              <span>{marketingData.socialMediaStats.followers.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between text-sm mt-1">
              <span className="text-muted-foreground">Top Platform</span>
              <span className="text-purple-400">Instagram</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="channels">Channels</TabsTrigger>
          <TabsTrigger value="coupons">Coupons</TabsTrigger>
          <TabsTrigger value="social">Social Media</TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns" className="space-y-6">
          <div className="space-y-4">
            {marketingData.campaignPerformance.map((campaign, index) => (
              <Card key={index} className="overflow-hidden">
                <div 
                  className={`p-6 cursor-pointer flex items-center justify-between ${
                    campaign.status === 'active' 
                      ? 'bg-blue-500/10 border-l-4 border-blue-500'
                      : campaign.status === 'completed'
                      ? 'bg-green-500/10 border-l-4 border-green-500'
                      : 'bg-gray-500/10 border-l-4 border-gray-500'
                  }`}
                  onClick={() => toggleCampaign(index)}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg ${
                      campaign.type === 'digital' 
                        ? 'bg-purple-500/10 text-purple-400'
                        : campaign.type === 'in-store'
                        ? 'bg-orange-500/10 text-orange-400'
                        : 'bg-indigo-500/10 text-indigo-400'
                    }`}>
                      {campaign.type === 'digital' ? (
                        <Smartphone className="h-5 w-5" />
                      ) : campaign.type === 'in-store' ? (
                        <Tag className="h-5 w-5" />
                      ) : (
                        <Share2 className="h-5 w-5" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold">{campaign.name}</h3>
                      <div className="text-sm text-muted-foreground">
                        {campaign.startDate} - {campaign.endDate}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <div className="font-bold">${campaign.revenue.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">Revenue</div>
                    </div>
                    <div className="text-right">
                      <div className={`font-bold ${
                        campaign.roi >= 4 ? 'text-green-400' : 'text-yellow-400'
                      }`}>
                        {campaign.roi}x ROI
                      </div>
                      <div className="text-sm text-muted-foreground">${campaign.budget.toLocaleString()} budget</div>
                    </div>
                    {expandedCampaign === index ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </div>
                </div>
                
                <AnimatePresence>
                  {expandedCampaign === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium mb-4">Channels</h4>
                          <div className="flex flex-wrap gap-2">
                            {campaign.channels.map((channel, i) => (
                              <Badge key={i} variant="outline" className="capitalize">
                                {channel}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium mb-4">Performance</h4>
                          <div className="grid grid-cols-3 gap-4">
                            <div className="text-center">
                              <div className="text-2xl font-bold">
                                ${Math.round(campaign.revenue / campaign.budget * 100) / 100}
                              </div>
                              <div className="text-sm text-muted-foreground">Rev. per $</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold">
                                {campaign.status === 'completed' ? 'Completed' : 
                                 campaign.status === 'active' ? 'Active' : 'Planned'}
                              </div>
                              <div className="text-sm text-muted-foreground">Status</div>
                            </div>
                            <div className="text-center">
                              <div className={`text-2xl font-bold ${
                                campaign.roi >= 4 ? 'text-green-400' : 'text-yellow-400'
                              }`}>
                                {campaign.roi}x
                              </div>
                              <div className="text-sm text-muted-foreground">ROI</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="channels">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6 backdrop-blur-lg bg-white/5">
              <h3 className="text-lg font-semibold mb-6">Channel ROI Comparison</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={marketingData.channelEffectiveness}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="roi" fill="#8884d8" name="ROI (x)" />
                  <Bar dataKey="conversion" fill="#82ca9d" name="Conversion (%)" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
            <Card className="p-6 backdrop-blur-lg bg-white/5">
              <h3 className="text-lg font-semibold mb-6">Revenue by Channel</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={marketingData.channelEffectiveness}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="revenue"
                    nameKey="name"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {marketingData.channelEffectiveness.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="coupons">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6 backdrop-blur-lg bg-white/5">
              <h3 className="text-lg font-semibold mb-6">Coupon Redemption Rates</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={marketingData.couponPerformance}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="redeemed" fill="#8884d8" name="Redeemed" />
                  <Bar dataKey="issued" fill="#82ca9d" name="Issued" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
            <Card className="p-6 backdrop-blur-lg bg-white/5">
              <h3 className="text-lg font-semibold mb-6">Coupon Performance</h3>
              <div className="space-y-6">
                {marketingData.couponPerformance.map((coupon, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{coupon.name}</span>
                      <Badge variant="outline">
                        {Math.round((coupon.redeemed / coupon.issued) * 100)}% Redeemed
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground">Revenue</div>
                        <div>${coupon.revenue.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Avg. Order</div>
                        <div>${coupon.avgOrderValue}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Redemptions</div>
                        <div>{coupon.redeemed}/{coupon.issued}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="social">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6 backdrop-blur-lg bg-white/5">
              <h3 className="text-lg font-semibold mb-6">Top Performing Posts</h3>
              <div className="space-y-4">
                {marketingData.socialMediaStats.topPosts.map((post, index) => (
                  <Card key={index} className="p-4 bg-white/5">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="capitalize">
                          {post.platform}
                        </Badge>
                        <span className="font-medium">{post.content}</span>
                      </div>
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground">Engagement</div>
                        <div>{post.engagement.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Clicks</div>
                        <div>{post.clicks.toLocaleString()}</div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
            <Card className="p-6 backdrop-blur-lg bg-white/5">
              <h3 className="text-lg font-semibold mb-6">Social Media Overview</h3>
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="p-4 rounded-lg bg-blue-500/10">
                  <div className="text-2xl font-bold">
                    {marketingData.socialMediaStats.followers.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">Followers</div>
                </div>
                <div className="p-4 rounded-lg bg-purple-500/10">
                  <div className="text-2xl font-bold">
                    {marketingData.socialMediaStats.engagementRate}%
                  </div>
                  <div className="text-sm text-muted-foreground">Engagement Rate</div>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">AI Recommendations</h4>
                  <div className="text-sm text-muted-foreground">
                    Post more video content - videos get 3x more engagement than images
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Best Posting Times</h4>
                  <div className="text-sm text-muted-foreground">
                    Weekdays 1-3pm, Saturdays 10am-12pm
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* AI Recommendations Sidebar */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 w-72">
        <Card className="p-6 backdrop-blur-lg bg-white/5 border-blue-500/30">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-blue-400" />
            AI Recommendations
          </h3>
          <ScrollArea className="h-96">
            <div className="space-y-4">
              {marketingData.aiRecommendations.map((rec, index) => (
                <Card key={index} className={`p-4 ${
                  rec.impact === 'high' 
                    ? 'bg-blue-500/10 border-blue-500/30'
                    : 'bg-purple-500/10 border-purple-500/30'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className={`${
                      rec.impact === 'high' ? 'bg-blue-500/10' : 'bg-purple-500/10'
                    }`}>
                      {rec.type}
                    </Badge>
                    <div className="text-xs text-muted-foreground">
                      {rec.confidence}% confidence
                    </div>
                  </div>
                  <h4 className="font-medium mb-2">{rec.title}</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    {rec.description}
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    Implement Suggestion
                  </Button>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </Card>
      </div>

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
              duration: 3 + Math.random() * 4,
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