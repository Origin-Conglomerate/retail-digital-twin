import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  Users,
  Clock,
  TrendingUp,
  Star,
  Calendar,
  ShoppingBag,
  DollarSign,
  Award,
  Shield,
  Smile,
  Frown,
  Meh,
  Zap,
  ChevronDown,
  ChevronUp,
  MoreVertical,
  Plus
} from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for retail staff
const retailStaffData = {
  overview: {
    totalStaff: 24,
    present: 18,
    onLeave: 3,
    late: 2,
    absent: 1,
    efficiency: 88,
    customerSatisfaction: 92,
    salesPerStaff: 2450,
    conversionRate: 32
  },
  performance: [
    {
      id: 'EMP001',
      name: 'Alex Johnson',
      position: 'Senior Associate',
      avatar: 'AJ',
      sales: 18500,
      conversion: 38,
      upsells: 42,
      hoursWorked: 38,
      customerRating: 4.9,
      attendance: 98,
      status: 'excellent'
    },
    {
      id: 'EMP002',
      name: 'Sarah Williams',
      position: 'Cashier',
      avatar: 'SW',
      sales: 12450,
      conversion: 31,
      upsells: 28,
      hoursWorked: 32,
      customerRating: 4.7,
      attendance: 95,
      status: 'good'
    },
    {
      id: 'EMP003',
      name: 'Michael Chen',
      position: 'Department Lead',
      avatar: 'MC',
      sales: 22400,
      conversion: 41,
      upsells: 56,
      hoursWorked: 40,
      customerRating: 4.8,
      attendance: 100,
      status: 'excellent'
    },
    {
      id: 'EMP004',
      name: 'Emma Rodriguez',
      position: 'Associate',
      avatar: 'ER',
      sales: 8750,
      conversion: 25,
      upsells: 18,
      hoursWorked: 28,
      customerRating: 4.3,
      attendance: 90,
      status: 'average'
    },
    {
      id: 'EMP005',
      name: 'David Kim',
      position: 'Inventory Specialist',
      avatar: 'DK',
      sales: 6800,
      conversion: 22,
      upsells: 12,
      hoursWorked: 35,
      customerRating: 4.5,
      attendance: 92,
      status: 'average'
    }
  ],
  schedule: {
    currentShift: {
      morning: 8,
      afternoon: 7,
      evening: 5,
      closing: 4
    },
    upcomingTimeOff: [
      { name: 'Alex Johnson', date: 'Jun 15-18', reason: 'Vacation' },
      { name: 'Emma Rodriguez', date: 'Jun 20', reason: 'Personal' }
    ]
  },
  training: {
    required: [
      { name: 'New POS System', staffNeeded: 12, deadline: 'Jun 30' },
      { name: 'Product Knowledge', staffNeeded: 8, deadline: 'Jul 15' }
    ],
    completed: [
      { name: 'Customer Service', completed: 18, date: 'May 15' },
      { name: 'Safety Protocols', completed: 22, date: 'Apr 28' }
    ]
  },
  customerFeedback: [
    { staff: 'Alex Johnson', positive: 42, negative: 2, neutral: 6 },
    { staff: 'Sarah Williams', positive: 38, negative: 4, neutral: 8 },
    { staff: 'Michael Chen', positive: 45, negative: 1, neutral: 4 },
    { staff: 'Emma Rodriguez', positive: 28, negative: 5, neutral: 7 },
    { staff: 'David Kim', positive: 31, negative: 3, neutral: 6 }
  ],
  aiInsights: [
    {
      type: 'optimization',
      title: 'Shift Optimization',
      description: 'Evening shifts understaffed during weekends',
      action: 'Adjust schedule for next month'
    },
    {
      type: 'training',
      title: 'Training Gap',
      description: '3 staff members missing required certifications',
      action: 'Schedule training sessions'
    },
    {
      type: 'performance',
      title: 'Upsell Opportunity',
      description: 'Associates with <30% upsell rate could improve',
      action: 'Provide upsell training'
    }
  ]
};

const COLORS = ['#10b981', '#f59e0b', '#ef4444'];

export default function Staff() {
  const [activeTab, setActiveTab] = useState('performance');
  const [expandedCard, setExpandedCard] = useState(null);

  const toggleExpand = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  const renderStatusIcon = (status) => {
    switch (status) {
      case 'excellent':
        return <Star className="h-4 w-4 text-yellow-400" />;
      case 'good':
        return <TrendingUp className="h-4 w-4 text-green-400" />;
      default:
        return <Meh className="h-4 w-4 text-orange-400" />;
    }
  };

  const renderFeedbackIcons = (feedback) => {
    return (
      <div className="flex items-center gap-1">
        <div className="flex items-center text-green-500">
          <Smile className="h-3 w-3" />
          <span className="text-xs ml-1">{feedback.positive}</span>
        </div>
        <div className="flex items-center text-red-500">
          <Frown className="h-3 w-3" />
          <span className="text-xs ml-1">{feedback.negative}</span>
        </div>
        <div className="flex items-center text-gray-500">
          <Meh className="h-3 w-3" />
          <span className="text-xs ml-1">{feedback.neutral}</span>
        </div>
      </div>
    );
  };

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
            Retail Staff Management
          </h1>
          <p className="text-muted-foreground">
            AI-powered workforce optimization and performance tracking
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Staff
        </Button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 backdrop-blur-lg bg-white/5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Staff Present</p>
              <div className="text-2xl font-bold">
                {retailStaffData.overview.present}/{retailStaffData.overview.totalStaff}
              </div>
            </div>
            <Badge variant="outline" className="bg-green-500/10">
              <Users className="h-4 w-4 mr-2" />
              {((retailStaffData.overview.present / retailStaffData.overview.totalStaff) * 100).toFixed(0)}%
            </Badge>
          </div>
          <Progress 
            value={(retailStaffData.overview.present / retailStaffData.overview.totalStaff) * 100} 
            className="h-2 mt-2 bg-white/10" 
          />
        </Card>

        <Card className="p-4 backdrop-blur-lg bg-white/5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Avg. Sales/Staff</p>
              <div className="text-2xl font-bold">
                ${retailStaffData.overview.salesPerStaff.toLocaleString()}
              </div>
            </div>
            <Badge variant="outline" className="bg-blue-500/10">
              <DollarSign className="h-4 w-4 mr-2" />
              {retailStaffData.overview.conversionRate}% CR
            </Badge>
          </div>
          <Progress 
            value={retailStaffData.overview.efficiency} 
            className="h-2 mt-2 bg-white/10" 
          />
        </Card>

        <Card className="p-4 backdrop-blur-lg bg-white/5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Customer Satisfaction</p>
              <div className="text-2xl font-bold">
                {retailStaffData.overview.customerSatisfaction}%
              </div>
            </div>
            <Badge variant="outline" className="bg-purple-500/10">
              <Star className="h-4 w-4 mr-2" />
              {retailStaffData.performance.filter(p => p.customerRating >= 4.5).length} Top
            </Badge>
          </div>
          <Progress 
            value={retailStaffData.overview.customerSatisfaction} 
            className="h-2 mt-2 bg-white/10" 
          />
        </Card>

        <Card className="p-4 backdrop-blur-lg bg-white/5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Staff Efficiency</p>
              <div className="text-2xl font-bold">
                {retailStaffData.overview.efficiency}%
              </div>
            </div>
            <Badge variant="outline" className="bg-yellow-500/10">
              <Zap className="h-4 w-4 mr-2" />
              +5.2%
            </Badge>
          </div>
          <Progress 
            value={retailStaffData.overview.efficiency} 
            className="h-2 mt-2 bg-white/10" 
          />
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-white/5">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="schedule">Scheduling</TabsTrigger>
          <TabsTrigger value="training">Training</TabsTrigger>
          <TabsTrigger value="feedback">Customer Feedback</TabsTrigger>
        </TabsList>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Performance Chart */}
            <Card className="lg:col-span-2 p-6 backdrop-blur-lg bg-white/5">
              <h3 className="text-lg font-semibold mb-6">Sales Performance</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={retailStaffData.performance}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="sales" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            {/* AI Insights */}
            <Card className="p-6 backdrop-blur-lg bg-white/5">
              <h3 className="text-lg font-semibold mb-6">AI Recommendations</h3>
              <div className="space-y-4">
                {retailStaffData.aiInsights.map((insight, index) => (
                  <Card key={index} className="p-4 bg-white/5 border border-white/10">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-blue-500/10">
                        <Zap className="h-4 w-4 text-blue-400" />
                      </div>
                      <div>
                        <h4 className="font-medium">{insight.title}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{insight.description}</p>
                        <Button variant="outline" size="sm">{insight.action}</Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </div>

          {/* Staff Performance List */}
          <Card className="p-6 backdrop-blur-lg bg-white/5">
            <h3 className="text-lg font-semibold mb-6">Staff Performance Details</h3>
            <div className="space-y-4">
              {retailStaffData.performance.map((staff) => (
                <Card key={staff.id} className="overflow-hidden">
                  <div 
                    className="p-4 cursor-pointer flex items-center justify-between"
                    onClick={() => toggleExpand(staff.id)}
                  >
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarFallback>{staff.avatar}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{staff.name}</div>
                        <div className="text-sm text-muted-foreground">{staff.position}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <div className="font-bold">${staff.sales.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">Sales</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{staff.conversion}%</div>
                        <div className="text-xs text-muted-foreground">Conversion</div>
                      </div>
                      <div className="flex items-center gap-1">
                        {renderStatusIcon(staff.status)}
                        <div className="w-4">
                          {expandedCard === staff.id ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <AnimatePresence>
                    {expandedCard === staff.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 border-t border-white/10 bg-white/5">
                          <div>
                            <p className="text-sm text-muted-foreground">Customer Rating</p>
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-yellow-400" />
                              <span className="font-medium">{staff.customerRating}</span>
                            </div>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Upsells</p>
                            <div className="font-medium">{staff.upsells}</div>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Attendance</p>
                            <div className="font-medium">{staff.attendance}%</div>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Hours Worked</p>
                            <div className="font-medium">{staff.hoursWorked}h</div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Scheduling Tab */}
        <TabsContent value="schedule" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Current Shift Distribution */}
            <Card className="p-6 backdrop-blur-lg bg-white/5">
              <h3 className="text-lg font-semibold mb-6">Current Shift Distribution</h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Morning', value: retailStaffData.schedule.currentShift.morning },
                      { name: 'Afternoon', value: retailStaffData.schedule.currentShift.afternoon },
                      { name: 'Evening', value: retailStaffData.schedule.currentShift.evening },
                      { name: 'Closing', value: retailStaffData.schedule.currentShift.closing }
                    ]}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {[0, 1, 2, 3].map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                  <span className="text-sm">Morning: {retailStaffData.schedule.currentShift.morning}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  <span className="text-sm">Afternoon: {retailStaffData.schedule.currentShift.afternoon}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                  <span className="text-sm">Evening: {retailStaffData.schedule.currentShift.evening}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-orange-500"></div>
                  <span className="text-sm">Closing: {retailStaffData.schedule.currentShift.closing}</span>
                </div>
              </div>
            </Card>

            {/* Upcoming Time Off */}
            <Card className="lg:col-span-2 p-6 backdrop-blur-lg bg-white/5">
              <h3 className="text-lg font-semibold mb-6">Upcoming Time Off</h3>
              <div className="space-y-4">
                {retailStaffData.schedule.upcomingTimeOff.map((timeoff, index) => (
                  <Card key={index} className="p-4 bg-white/5 border border-white/10">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{timeoff.name}</div>
                        <div className="text-sm text-muted-foreground">{timeoff.reason}</div>
                      </div>
                      <Badge variant="outline">{timeoff.date}</Badge>
                    </div>
                  </Card>
                ))}
                <Button variant="outline" className="w-full">
                  View Full Schedule
                </Button>
              </div>
            </Card>
          </div>

          {/* Schedule Calendar */}
          <Card className="p-6 backdrop-blur-lg bg-white/5">
            <h3 className="text-lg font-semibold mb-6">Weekly Schedule</h3>
            <div className="bg-white/5 rounded-lg p-4">
              <div className="grid grid-cols-8 gap-2">
                <div className="col-span-1"></div>
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                  <div key={day} className="text-center font-medium py-2">
                    {day}
                  </div>
                ))}

                {['Morning', 'Afternoon', 'Evening'].map((shift) => (
                  <>
                    <div key={`label-${shift}`} className="col-span-1 flex items-center justify-end pr-4 font-medium">
                      {shift}
                    </div>
                    {[...Array(7)].map((_, i) => (
                      <div key={`${shift}-${i}`} className="h-12 border border-white/10 rounded flex items-center justify-center">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-full w-full">
                              {Math.random() > 0.3 ? (
                                <Avatar className="h-8 w-8">
                                  <AvatarFallback>
                                    {retailStaffData.performance[Math.floor(Math.random() * retailStaffData.performance.length)].avatar}
                                  </AvatarFallback>
                                </Avatar>
                              ) : (
                                <Plus className="h-4 w-4 text-muted-foreground" />
                              )}
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>Assign Staff</DropdownMenuItem>
                            <DropdownMenuItem>View Options</DropdownMenuItem>
                            <DropdownMenuItem>Request Cover</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    ))}
                  </>
                ))}
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Training Tab */}
        <TabsContent value="training" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Required Training */}
            <Card className="p-6 backdrop-blur-lg bg-white/5">
              <h3 className="text-lg font-semibold mb-6">Required Training</h3>
              <div className="space-y-4">
                {retailStaffData.training.required.map((training, index) => (
                  <Card key={index} className="p-4 bg-white/5 border border-white/10">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-medium">{training.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {training.staffNeeded} staff need to complete by {training.deadline}
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Schedule</Button>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>

            {/* Completed Training */}
            <Card className="p-6 backdrop-blur-lg bg-white/5">
              <h3 className="text-lg font-semibold mb-6">Recently Completed</h3>
              <div className="space-y-4">
                {retailStaffData.training.completed.map((training, index) => (
                  <Card key={index} className="p-4 bg-white/5 border border-white/10">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-medium">{training.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {training.completed} staff completed on {training.date}
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-green-500/10">
                        Completed
                      </Badge>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </div>

          {/* Training Progress */}
          <Card className="p-6 backdrop-blur-lg bg-white/5">
            <h3 className="text-lg font-semibold mb-6">Training Progress</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {['New POS System', 'Product Knowledge', 'Safety Protocols'].map((course) => (
                <Card key={course} className="p-4 bg-white/5 border border-white/10">
                  <div className="space-y-4">
                    <div className="font-medium">{course}</div>
                    <Progress 
                      value={Math.floor(Math.random() * 100)} 
                      className="h-2 bg-white/10" 
                    />
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        {Math.floor(Math.random() * 10) + 5} staff completed
                      </span>
                      <span>
                        {Math.floor(Math.random() * 10) + 2} remaining
                      </span>
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      View Details
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Customer Feedback Tab */}
        <TabsContent value="feedback" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Feedback Summary */}
            <Card className="lg:col-span-2 p-6 backdrop-blur-lg bg-white/5">
              <h3 className="text-lg font-semibold mb-6">Customer Feedback Analysis</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={retailStaffData.customerFeedback}>
                  <XAxis dataKey="staff" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="positive" stackId="a" fill="#10b981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="neutral" stackId="a" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="negative" stackId="a" fill="#ef4444" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            {/* Feedback Distribution */}
            <Card className="p-6 backdrop-blur-lg bg-white/5">
              <h3 className="text-lg font-semibold mb-6">Feedback Distribution</h3>
              <div className="flex flex-col items-center">
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Positive', value: retailStaffData.customerFeedback.reduce((sum, f) => sum + f.positive, 0) },
                        { name: 'Neutral', value: retailStaffData.customerFeedback.reduce((sum, f) => sum + f.neutral, 0) },
                        { name: 'Negative', value: retailStaffData.customerFeedback.reduce((sum, f) => sum + f.negative, 0) }
                      ]}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {[0, 1, 2].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div className="flex flex-col items-center">
                    <div className="h-3 w-3 rounded-full bg-green-500 mb-1"></div>
                    <span className="text-sm">Positive</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="h-3 w-3 rounded-full bg-yellow-500 mb-1"></div>
                    <span className="text-sm">Neutral</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="h-3 w-3 rounded-full bg-red-500 mb-1"></div>
                    <span className="text-sm">Negative</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Detailed Feedback */}
          <Card className="p-6 backdrop-blur-lg bg-white/5">
            <h3 className="text-lg font-semibold mb-6">Detailed Feedback by Staff</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 pl-4">Staff Member</th>
                    <th className="text-right py-3">Positive</th>
                    <th className="text-right py-3">Neutral</th>
                    <th className="text-right py-3">Negative</th>
                    <th className="text-right py-3 pr-4">Ratio</th>
                  </tr>
                </thead>
                <tbody>
                  {retailStaffData.customerFeedback.map((feedback, index) => (
                    <tr key={index} className="border-b border-white/10 hover:bg-white/5">
                      <td className="py-3 pl-4">{feedback.staff}</td>
                      <td className="text-right py-3 text-green-500">{feedback.positive}</td>
                      <td className="text-right py-3 text-yellow-500">{feedback.neutral}</td>
                      <td className="text-right py-3 text-red-500">{feedback.negative}</td>
                      <td className="text-right py-3 pr-4">
                        {((feedback.positive / (feedback.positive + feedback.neutral + feedback.negative)) * 100).toFixed(1)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}