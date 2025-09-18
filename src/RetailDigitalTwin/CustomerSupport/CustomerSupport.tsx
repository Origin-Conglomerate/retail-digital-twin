import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Mail,
    Search,
    Filter,
    Archive,
    Trash2,
    Star,
    Clock,
    Send,
    Paperclip,
    Smile,
    Zap,
    Bot,
    Sparkles,
    User,
    Calendar,
    Phone,
    MapPin,
    ChevronDown,
    ChevronUp,
    Plus,
    RefreshCw,
    MoreHorizontal,
    BarChart3,
    Megaphone,
    MailOpen,
    Workflow,
    Settings,
    Play,
    Pause,
    Edit3,
    Image,
    Video,
    FileText,
    Wand2,
    Type,
    Loader2,
    CheckCircle2,
    AlertCircle
} from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

// Mock data for CRM mailbox with campaign tools
const adGenerationTemplates = {
    text: [
        { name: "Product Launch", prompt: "Create an engaging ad copy for a new product launch" },
        { name: "Special Offer", prompt: "Generate compelling copy for a limited-time discount" },
        { name: "Brand Story", prompt: "Craft a narrative that showcases our brand values" }
    ],
    image: [
        { name: "Product Showcase", prompt: "Create a modern, minimalist product showcase" },
        { name: "Lifestyle", prompt: "Generate lifestyle imagery featuring our products" },
        { name: "Social Media", prompt: "Design eye-catching social media visuals" }
    ],
    video: [
        { name: "Product Demo", prompt: "Create a short product demonstration video" },
        { name: "Brand Story", prompt: "Generate an emotional brand story video" },
        { name: "Tutorial", prompt: "Create an engaging how-to video" }
    ]
};

const mailboxData = {
    overview: {
        totalMessages: 142,
        unread: 23,
        awaitingReply: 15,
        resolved: 89,
        openRate: 68,
        clickRate: 23,
        conversionRate: 5.4
    },
    folders: [
        { name: 'inbox', count: 23, icon: Mail },
        { name: 'sent', count: 45, icon: Send },
        { name: 'drafts', count: 5, icon: Clock },
        { name: 'archived', count: 67, icon: Archive },
        { name: 'spam', count: 2, icon: Filter }
    ],
    messages: [
        {
            id: 1,
            from: 'Sarah Johnson',
            email: 'sarah.j@example.com',
            subject: 'Order delivery question',
            preview: 'Hi there, I was wondering when my order #45892 will be delivered...',
            date: '2023-09-15T14:30:00',
            read: false,
            priority: 'high',
            labels: ['customer', 'order'],
            attachments: true,
            sentiment: 'positive'
        },
        {
            id: 2,
            from: 'Michael Chen',
            email: 'michael.c@example.com',
            subject: 'Product return request',
            preview: 'I would like to return a product I purchased last week...',
            date: '2023-09-14T11:15:00',
            read: true,
            priority: 'medium',
            labels: ['return', 'refund'],
            attachments: false,
            sentiment: 'neutral'
        },
        {
            id: 3,
            from: 'Emma Rodriguez',
            email: 'emma.r@example.com',
            subject: 'Subscription renewal',
            preview: 'My subscription is about to renew but I want to change my plan...',
            date: '2023-09-14T09:45:00',
            read: true,
            priority: 'low',
            labels: ['subscription', 'billing'],
            attachments: false,
            sentiment: 'positive'
        },
        {
            id: 4,
            from: 'James Wilson',
            email: 'james.w@example.com',
            subject: 'Partnership inquiry',
            preview: 'I represent a retail chain and would like to discuss potential partnership...',
            date: '2023-09-13T16:20:00',
            read: false,
            priority: 'high',
            labels: ['business', 'partnership'],
            attachments: true,
            sentiment: 'positive'
        },
        {
            id: 5,
            from: 'Lisa Thompson',
            email: 'lisa.t@example.com',
            subject: 'Product feature request',
            preview: 'I love your product but would really appreciate if you could add...',
            date: '2023-09-12T13:10:00',
            read: true,
            priority: 'medium',
            labels: ['feedback', 'feature'],
            attachments: false,
            sentiment: 'positive'
        }
    ],
    customerProfiles: {
        1: {
            name: 'Sarah Johnson',
            email: 'sarah.j@example.com',
            phone: '+1 (555) 123-4567',
            location: 'New York, NY',
            customerSince: '2022-03-15',
            orders: 12,
            totalSpent: 2450,
            lastOrder: '2023-09-10',
            preferences: {
                contactMethod: 'email',
                category: 'fashion',
                frequency: 'monthly'
            },
            engagement: {
                emailsOpened: 45,
                clicks: 23,
                lastActive: '2023-09-14'
            }
        },
        2: {
            name: 'Michael Chen',
            email: 'michael.c@example.com',
            phone: '+1 (555) 987-6543',
            location: 'San Francisco, CA',
            customerSince: '2021-11-08',
            orders: 8,
            totalSpent: 1200,
            lastOrder: '2023-09-05',
            preferences: {
                contactMethod: 'email',
                category: 'electronics',
                frequency: 'quarterly'
            },
            engagement: {
                emailsOpened: 32,
                clicks: 12,
                lastActive: '2023-09-10'
            }
        }
    },
    aiSuggestions: [
        {
            messageId: 1,
            type: 'response',
            suggestions: [
                "Hello Sarah, your order #45892 is scheduled for delivery tomorrow between 2-4pm.",
                "Hi there! I've checked your order status and it's out for delivery. You'll receive a tracking link shortly.",
                "Thank you for reaching out. Your order is in transit and expected to arrive by end of day tomorrow."
            ],
            tone: ['friendly', 'professional', 'casual']
        },
        {
            messageId: 2,
            type: 'process',
            suggestions: [
                "Our return policy allows for 30-day returns. I can initiate the process for you.",
                "Please provide your order number and reason for return so I can assist with the return process.",
                "I've attached our return form. Please fill it out and we'll email you a return shipping label."
            ],
            tone: ['helpful', 'efficient', 'empathetic']
        }
    ],
    quickReplies: [
        "Thank you for your message. We'll get back to you shortly.",
        "I appreciate you bringing this to our attention.",
        "Let me check that for you right away.",
        "I understand your concern and will help resolve this.",
        "Thanks for your patience while we look into this."
    ],
    campaigns: [
        {
            id: 1,
            name: "Summer Sale Announcement",
            type: "email",
            status: "completed",
            sent: 12500,
            opened: 8450,
            clicked: 2850,
            conversion: 420,
            revenue: 25800,
            schedule: "2023-06-15"
        },
        {
            id: 2,
            name: "Back to School Promotion",
            type: "social",
            status: "active",
            sent: 8500,
            opened: 5200,
            clicked: 1850,
            conversion: 230,
            revenue: 12500,
            schedule: "2023-08-01"
        },
        {
            id: 3,
            name: "New Product Launch",
            type: "email",
            status: "draft",
            sent: 0,
            opened: 0,
            clicked: 0,
            conversion: 0,
            revenue: 0,
            schedule: "2023-09-25"
        }
    ],
    newsletters: [
        {
            id: 1,
            name: "Weekly Digest",
            subscribers: 18500,
            openRate: 62,
            clickRate: 18,
            lastSent: "2023-09-10",
            nextIssue: "2023-09-17"
        },
        {
            id: 2,
            name: "Product Updates",
            subscribers: 12500,
            openRate: 58,
            clickRate: 22,
            lastSent: "2023-09-05",
            nextIssue: "2023-09-19"
        },
        {
            id: 3,
            name: "Special Offers",
            subscribers: 21500,
            openRate: 71,
            clickRate: 29,
            lastSent: "2023-09-12",
            nextIssue: "2023-09-14"
        }
    ],
    automations: [
        {
            id: 1,
            name: "Welcome Series",
            trigger: "New signup",
            actions: ["Send welcome email", "Add to segment", "Schedule follow-up"],
            status: "active",
            enrolled: 1250,
            completion: 89
        },
        {
            id: 2,
            name: "Abandoned Cart",
            trigger: "Cart abandoned",
            actions: ["Send reminder email", "Apply discount", "Notify sales"],
            status: "active",
            enrolled: 845,
            completion: 72
        },
        {
            id: 3,
            name: "Post-Purchase Follow-up",
            trigger: "Order completed",
            actions: ["Send thank you", "Request review", "Suggest products"],
            status: "draft",
            enrolled: 0,
            completion: 0
        }
    ],
    aiAgentWorkflows: [
        {
            id: 1,
            name: "Customer Support Tier 1",
            description: "Handles common customer inquiries automatically",
            status: "active",
            resolutionRate: 68,
            handledToday: 42
        },
        {
            id: 2,
            name: "Lead Qualification",
            description: "Qualifies incoming leads based on criteria",
            status: "active",
            resolutionRate: 82,
            handledToday: 28
        },
        {
            id: 3,
            name: "Feedback Analysis",
            description: "Analyzes customer feedback sentiment",
            status: "development",
            resolutionRate: 0,
            handledToday: 0
        }
    ]
};

const priorityColors = {
    high: 'red',
    medium: 'yellow',
    low: 'green'
};

const sentimentColors = {
    positive: 'green',
    neutral: 'blue',
    negative: 'red'
};

export default function AllInOneCRMDashboard() {
    const [activeFolder, setActiveFolder] = useState('inbox');
    const [adGenerationOpen, setAdGenerationOpen] = useState(false);
    const [selectedAdType, setSelectedAdType] = useState('text');
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [customPrompt, setCustomPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedContent, setGeneratedContent] = useState(null);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [replyContent, setReplyContent] = useState('');
    const [aiSuggestions, setAiSuggestions] = useState([]);
    const [isAiThinking, setIsAiThinking] = useState(false);
    const [campaignDialogOpen, setCampaignDialogOpen] = useState(false);
    const [newCampaign, setNewCampaign] = useState({
        name: '',
        type: 'email',
        audience: 'all',
        schedule: ''
    });
    const textareaRef = useRef(null);

    const handleSelectMessage = (message) => {
        setSelectedMessage(message);
        setReplyContent('');
        generateAiSuggestions(message.id);
    };

    const generateAiSuggestions = (messageId) => {
        setIsAiThinking(true);
        // Simulate AI processing
        setTimeout(() => {
            const suggestions = mailboxData.aiSuggestions.find(s => s.messageId === messageId);
            setAiSuggestions(suggestions ? suggestions.suggestions.slice(0, 3) : []);
            setIsAiThinking(false);
        }, 1000);
    };

    const applySuggestion = (suggestion) => {
        setReplyContent(suggestion);
        if (textareaRef.current) {
            textareaRef.current.focus();
        }
    };

    const handleSendReply = () => {
        // In a real app, this would send the reply
        console.log('Sending reply:', replyContent);
        setReplyContent('');
        setSelectedMessage(null);
    };

    const handleCreateCampaign = () => {
        // In a real app, this would create a new campaign
        console.log('Creating campaign:', newCampaign);
        setNewCampaign({ name: '', type: 'email', audience: 'all', schedule: '' });
        setCampaignDialogOpen(false);
    };

    const handleGenerateAd = async () => {
        setIsGenerating(true);
        // Simulate AI generation
        setTimeout(() => {
            const mockContent = {
                text: "Experience innovation at its finest! 🌟 Introducing our latest product that redefines excellence. Limited time offer - Act now and transform your daily routine! #Innovation #Excellence",
                image: "https://placehold.co/600x400/darkgray/white?text=AI+Generated+Ad+Image",
                video: "https://placehold.co/600x400/darkgray/white?text=AI+Generated+Ad+Video"
            };
            setGeneratedContent(mockContent[selectedAdType]);
            setIsGenerating(false);
        }, 2000);
    };

    const AdGenerationDialog = () => (
        <Dialog open={adGenerationOpen} onOpenChange={setAdGenerationOpen}>
            <DialogContent className="backdrop-blur-lg bg-gray-900/95 border-gray-700 max-w-3xl">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Wand2 className="h-5 w-5 text-purple-500" />
                        AI Ad Generation
                    </DialogTitle>
                    <DialogDescription>
                        Create compelling ad content using AI. Choose a type and template or write your own prompt.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 py-4">
                    <div className="flex gap-4">
                        <Button
                            variant={selectedAdType === 'text' ? 'default' : 'outline'}
                            onClick={() => setSelectedAdType('text')}
                            className="flex-1"
                        >
                            <Type className="h-4 w-4 mr-2" />
                            Text
                        </Button>
                        <Button
                            variant={selectedAdType === 'image' ? 'default' : 'outline'}
                            onClick={() => setSelectedAdType('image')}
                            className="flex-1"
                        >
                            <Image className="h-4 w-4 mr-2" />
                            Image
                        </Button>
                        <Button
                            variant={selectedAdType === 'video' ? 'default' : 'outline'}
                            onClick={() => setSelectedAdType('video')}
                            className="flex-1"
                        >
                            <Video className="h-4 w-4 mr-2" />
                            Video
                        </Button>
                    </div>

                    <div className="grid gap-4">
                        <Label>Templates</Label>
                        <div className="grid grid-cols-3 gap-3">
                            {adGenerationTemplates[selectedAdType].map((template, index) => (
                                <Card
                                    key={index}
                                    className={`p-3 cursor-pointer transition-all ${
                                        selectedTemplate === template ? 'bg-purple-500/20 border-purple-500' : 'bg-white/5'
                                    }`}
                                    onClick={() => {
                                        setSelectedTemplate(template);
                                        setCustomPrompt(template.prompt);
                                    }}
                                >
                                    <h4 className="font-medium">{template.name}</h4>
                                    <p className="text-sm text-muted-foreground">{template.prompt}</p>
                                </Card>
                            ))}
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <Label>Custom Prompt</Label>
                        <Textarea
                            value={customPrompt}
                            onChange={(e) => setCustomPrompt(e.target.value)}
                            placeholder="Enter your custom prompt..."
                            className="min-h-24"
                        />
                    </div>

                    {generatedContent && (
                        <Card className="p-4 bg-purple-500/10 border-purple-500/30">
                            <h4 className="font-medium mb-2">Generated Content</h4>
                            {selectedAdType === 'text' ? (
                                <p className="whitespace-pre-line">{generatedContent}</p>
                            ) : (
                                <div className="aspect-video bg-black/20 rounded-lg overflow-hidden">
                                    <img
                                        src={generatedContent}
                                        alt="Generated content"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}
                        </Card>
                    )}
                </div>
                <div className="flex justify-end gap-3">
                    <Button variant="outline" onClick={() => setAdGenerationOpen(false)}>
                        Close
                    </Button>
                    <Button
                        onClick={handleGenerateAd}
                        disabled={!customPrompt || isGenerating}
                        className="min-w-[100px]"
                    >
                        {isGenerating ? (
                            <>
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                Generating...
                            </>
                        ) : (
                            <>
                                <Wand2 className="h-4 w-4 mr-2" />
                                Generate
                            </>
                        )}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );

    const CustomerProfile = ({ customerId }) => {
        const profile = mailboxData.customerProfiles[customerId];
        if (!profile) return <div>Customer profile not found</div>;

        return (
            <Card className="p-4 backdrop-blur-lg bg-white/5 mb-4">
                <div className="flex items-center gap-3 mb-4">
                    <Avatar>
                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.name}`} />
                        <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <h3 className="font-semibold">{profile.name}</h3>
                        <p className="text-sm text-muted-foreground">{profile.email}</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                    <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        <span>{profile.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{profile.location}</span>
                    </div>
                    <div>
                        <div className="text-muted-foreground">Customer since</div>
                        <div>{new Date(profile.customerSince).toLocaleDateString()}</div>
                    </div>
                    <div>
                        <div className="text-muted-foreground">Orders</div>
                        <div>{profile.orders} (${profile.totalSpent})</div>
                    </div>
                </div>

                <div className="pt-4 border-t border-white/10">
                    <h4 className="font-medium mb-2">Engagement Stats</h4>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                            <div className="text-muted-foreground">Emails Opened</div>
                            <div>{profile.engagement.emailsOpened}</div>
                        </div>
                        <div>
                            <div className="text-muted-foreground">Clicks</div>
                            <div>{profile.engagement.clicks}</div>
                        </div>
                        <div>
                            <div className="text-muted-foreground">Last Active</div>
                            <div>{new Date(profile.engagement.lastActive).toLocaleDateString()}</div>
                        </div>
                    </div>
                </div>
            </Card>
        );
    };

    const CampaignCard = ({ campaign }) => {
        return (
            <Card className="p-4 backdrop-blur-lg bg-white/5">
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <h3 className="font-semibold">{campaign.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="capitalize">
                                {campaign.type}
                            </Badge>
                            <Badge
                                className={
                                    campaign.status === 'active' ? 'bg-green-500/10 text-green-500' :
                                        campaign.status === 'completed' ? 'bg-blue-500/10 text-blue-500' :
                                            'bg-gray-500/10 text-gray-500'
                                }
                            >
                                {campaign.status}
                            </Badge>
                        </div>
                    </div>
                    <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <div className="text-2xl font-bold">{campaign.opened.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">Opened</div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold">{campaign.conversion.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">Conversions</div>
                    </div>
                </div>

                <div className="mb-3">
                    <div className="flex items-center justify-between text-xs mb-1">
                        <span>Open rate</span>
                        <span>{Math.round((campaign.opened / campaign.sent) * 100)}%</span>
                    </div>
                    <Progress value={Math.round((campaign.opened / campaign.sent) * 100)} className="h-2" />
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                        Scheduled: {new Date(campaign.schedule).toLocaleDateString()}
                    </span>
                    <Button variant="outline" size="sm">View Report</Button>
                </div>
            </Card>
        );
    };

    const AutomationCard = ({ automation }) => {
        return (
            <Card className="p-4 backdrop-blur-lg bg-white/5">
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <h3 className="font-semibold">{automation.name}</h3>
                        <p className="text-sm text-muted-foreground">{automation.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Switch
                            checked={automation.status === 'active'}
                            className="data-[state=checked]:bg-green-500"
                        />
                    </div>
                </div>

                <div className="mb-4">
                    <div className="text-xs text-muted-foreground mb-1">Trigger: {automation.trigger}</div>
                    <div className="flex flex-wrap gap-1">
                        {automation.actions.map((action, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                                {action}
                            </Badge>
                        ))}
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div>
                        <div className="text-xs text-muted-foreground">{automation.enrolled} enrolled</div>
                        <Progress value={automation.completion} className="h-2 w-24" />
                    </div>
                    <Button variant="outline" size="sm">Edit</Button>
                </div>
            </Card>
        );
    };

    const AIAgentWorkflowCard = ({ workflow }) => {
        return (
            <Card className="p-4 backdrop-blur-lg bg-white/5">
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <h3 className="font-semibold">{workflow.name}</h3>
                        <p className="text-sm text-muted-foreground">{workflow.description}</p>
                    </div>
                    <Badge
                        className={
                            workflow.status === 'active' ? 'bg-green-500/10 text-green-500' :
                                workflow.status === 'development' ? 'bg-yellow-500/10 text-yellow-500' :
                                    'bg-gray-500/10 text-gray-500'
                        }
                    >
                        {workflow.status}
                    </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <div className="text-2xl font-bold">{workflow.resolutionRate}%</div>
                        <div className="text-xs text-muted-foreground">Resolution Rate</div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold">{workflow.handledToday}</div>
                        <div className="text-xs text-muted-foreground">Handled Today</div>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <Button variant="outline" size="sm">View Logs</Button>
                    <Button size="sm">
                        <Sparkles className="h-4 w-4 mr-2" />
                        Optimize
                    </Button>
                </div>
            </Card>
        );
    };

    return (
        <div className="relative rounded-3xl overflow-hidden 
      bg-gradient-to-br from-blue-900/20 to-indigo-900/20
      dark:from-gray-900/90 dark:to-gray-800/90
      border border-white/20 dark:border-gray-700/50
      p-6 h-full flex flex-col">

            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 
            to-indigo-400 bg-clip-text text-transparent">
                        AI Customer Hub
                    </h1>
                    <div className="flex items-center gap-4 text-muted-foreground">
                        <Badge className="bg-indigo-500/10 text-indigo-500">
                            <Sparkles className="h-4 w-4 mr-2" />
                            AI-Powered CRM
                        </Badge>
                        <span className="flex items-center gap-2">
                            <Zap className="h-4 w-4 text-yellow-400" />
                            Real-time Analytics
                        </span>
                    </div>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline">
                        <Filter className="h-4 w-4 mr-2" />
                        Filter
                        <ChevronDown className="h-4 w-4 ml-2" />
                    </Button>
                    <Button>
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Refresh
                    </Button>
                </div>
            </div>

            <div className="flex-grow flex flex-col space-y-6">
                {/* Main Dashboard Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-grow">
                    {/* Left Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Stats Overview */}
                        <Card className="p-4 backdrop-blur-lg bg-white/5">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-3 rounded-lg bg-blue-500/10">
                                    <div className="text-2xl font-bold">{mailboxData.overview.totalMessages}</div>
                                    <div className="text-sm text-muted-foreground">Total</div>
                                </div>
                                <div className="p-3 rounded-lg bg-purple-500/10">
                                    <div className="text-2xl font-bold">{mailboxData.overview.unread}</div>
                                    <div className="text-sm text-muted-foreground">Unread</div>
                                </div>
                                <div className="p-3 rounded-lg bg-green-500/10">
                                    <div className="text-2xl font-bold">{mailboxData.overview.resolved}</div>
                                    <div className="text-sm text-muted-foreground">Resolved</div>
                                </div>
                                <div className="p-3 rounded-lg bg-yellow-500/10">
                                    <div className="text-2xl font-bold">{mailboxData.overview.awaitingReply}</div>
                                    <div className="text-sm text-muted-foreground">Awaiting Reply</div>
                                </div>
                            </div>
                        </Card>

                        {/* Folders */}
                        <Card className="p-4 backdrop-blur-lg bg-white/5">
                            <h3 className="font-semibold mb-4">Folders</h3>
                            <div className="space-y-2">
                                {mailboxData.folders.map((folder, index) => {
                                    const Icon = folder.icon;
                                    return (
                                        <div
                                            key={index}
                                            className={`flex items-center justify-between p-2 rounded-lg cursor-pointer ${activeFolder === folder.name ? 'bg-blue-500/20' : 'hover:bg-white/5'
                                                }`}
                                            onClick={() => setActiveFolder(folder.name)}
                                        >
                                            <div className="flex items-center gap-2">
                                                <Icon className="h-4 w-4" />
                                                <span className="capitalize">{folder.name}</span>
                                            </div>
                                            <Badge variant="outline">{folder.count}</Badge>
                                        </div>
                                    );
                                })}
                            </div>
                        </Card>

                        {/* Quick Replies */}
                        <Card className="p-4 backdrop-blur-lg bg-white/5">
                            <h3 className="font-semibold mb-4">Quick Replies</h3>
                            <div className="space-y-2">
                                {mailboxData.quickReplies.map((reply, index) => (
                                    <div
                                        key={index}
                                        className="p-2 text-sm rounded-lg cursor-pointer hover:bg-white/5"
                                        onClick={() => setReplyContent(reply)}
                                    >
                                        {reply}
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>

                    {/* Main Content Area */}
                    <div className="lg:col-span-3 flex flex-col">
                        {selectedMessage ? (
                            /* Message Detail View */
                            <div className="flex flex-col flex-grow">
                                <div className="flex items-center justify-between mb-4">
                                    <Button variant="outline" onClick={() => setSelectedMessage(null)}>
                                        Back to inbox
                                    </Button>
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm">
                                            <Archive className="h-4 w-4" />
                                        </Button>
                                        <Button variant="outline" size="sm">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>

                                {/* Customer Profile */}
                                <CustomerProfile customerId={selectedMessage.id} />

                                {/* Message Thread */}
                                <Card className="p-4 backdrop-blur-lg bg-white/5 mb-4 flex-grow">
                                    <div className="flex items-start gap-4 mb-6">
                                        <Avatar>
                                            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedMessage.from}`} />
                                            <AvatarFallback>{selectedMessage.from.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex-grow">
                                            <div className="flex items-center justify-between">
                                                <h3 className="font-semibold">{selectedMessage.from}</h3>
                                                <span className="text-sm text-muted-foreground">
                                                    {new Date(selectedMessage.date).toLocaleString()}
                                                </span>
                                            </div>
                                            <p className="text-muted-foreground">{selectedMessage.email}</p>
                                            <div className="mt-2 flex gap-2">
                                                <Badge
                                                    variant="outline"
                                                    className={`bg-${priorityColors[selectedMessage.priority]}-500/10 text-${priorityColors[selectedMessage.priority]}-500`}
                                                >
                                                    {selectedMessage.priority} priority
                                                </Badge>
                                                <Badge
                                                    variant="outline"
                                                    className={`bg-${sentimentColors[selectedMessage.sentiment]}-500/10 text-${sentimentColors[selectedMessage.sentiment]}-500`}
                                                >
                                                    {selectedMessage.sentiment}
                                                </Badge>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-6">
                                        <h2 className="text-xl font-semibold mb-4">{selectedMessage.subject}</h2>
                                        <p className="whitespace-pre-line">{selectedMessage.preview}</p>
                                    </div>

                                    {selectedMessage.attachments && (
                                        <div className="mb-6">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Paperclip className="h-4 w-4" />
                                                <span className="font-medium">Attachments</span>
                                            </div>
                                            <div className="flex gap-2">
                                                <Button variant="outline" size="sm">receipt.pdf</Button>
                                                <Button variant="outline" size="sm">image.jpg</Button>
                                            </div>
                                        </div>
                                    )}
                                </Card>

                                {/* AI Suggestions */}
                                {aiSuggestions.length > 0 && (
                                    <Card className="p-4 backdrop-blur-lg bg-white/5 mb-4 border-blue-500/30">
                                        <h3 className="font-semibold mb-3 flex items-center gap-2">
                                            <Sparkles className="h-4 w-4 text-blue-400" />
                                            AI Response Suggestions
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                            {aiSuggestions.map((suggestion, index) => (
                                                <Card
                                                    key={index}
                                                    className="p-3 bg-blue-500/10 border-blue-500/30 cursor-pointer hover:bg-blue-500/20"
                                                    onClick={() => applySuggestion(suggestion)}
                                                >
                                                    <p className="text-sm">{suggestion}</p>
                                                </Card>
                                            ))}
                                        </div>
                                    </Card>
                                )}

                                {/* Reply Editor */}
                                <Card className="p-4 backdrop-blur-lg bg-white/5">
                                    <div className="mb-4">
                                        <Textarea
                                            ref={textareaRef}
                                            placeholder="Type your response..."
                                            value={replyContent}
                                            onChange={(e) => setReplyContent(e.target.value)}
                                            className="min-h-32"
                                        />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex gap-2">
                                            <Button variant="outline" size="sm">
                                                <Paperclip className="h-4 w-4" />
                                            </Button>
                                            <Button variant="outline" size="sm">
                                                <Smile className="h-4 w-4" />
                                            </Button>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button variant="outline">Save Draft</Button>
                                            <Button onClick={handleSendReply}>
                                                <Send className="h-4 w-4 mr-2" />
                                                Send Reply
                                            </Button>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        ) : (
                            /* Message List View */
                            <>
                                {/* Search Bar */}
                                <div className="relative mb-6">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input placeholder="Search messages..." className="pl-10 backdrop-blur-lg bg-white/5" />
                                </div>

                                {/* Message List */}
                                <ScrollArea className="flex-grow">
                                    <div className="space-y-2">
                                        {mailboxData.messages.map((message) => (
                                            <Card
                                                key={message.id}
                                                className={`p-4 backdrop-blur-lg bg-white/5 cursor-pointer transition-all hover:bg-white/10 ${!message.read ? 'border-l-4 border-blue-500' : ''
                                                    }`}
                                                onClick={() => handleSelectMessage(message)}
                                            >
                                                <div className="flex items-start gap-4">
                                                    <div className="flex-shrink-0">
                                                        <Avatar className="h-10 w-10">
                                                            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${message.from}`} />
                                                            <AvatarFallback>{message.from.charAt(0)}</AvatarFallback>
                                                        </Avatar>
                                                    </div>
                                                    <div className="flex-grow">
                                                        <div className="flex items-center justify-between">
                                                            <h3 className="font-semibold">{message.from}</h3>
                                                            <span className="text-sm text-muted-foreground">
                                                                {new Date(message.date).toLocaleDateString()}
                                                            </span>
                                                        </div>
                                                        <p className="font-medium">{message.subject}</p>
                                                        <p className="text-sm text-muted-foreground truncate">{message.preview}</p>
                                                    </div>
                                                    <div className="flex-shrink-0 flex flex-col items-end gap-2">
                                                        {!message.read && (
                                                            <Badge className="bg-blue-500">New</Badge>
                                                        )}
                                                        <Badge
                                                            variant="outline"
                                                            className={`bg-${priorityColors[message.priority]}-500/10 text-${priorityColors[message.priority]}-500`}
                                                        >
                                                            {message.priority}
                                                        </Badge>
                                                    </div>
                                                </div>
                                            </Card>
                                        ))}
                                    </div>
                                </ScrollArea>
                            </>
                        )}
                    </div>
                </div>

                {/* Marketing Dashboard Section */}
                <div className="mt-8">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold">Marketing Dashboard</h2>
                        <Button onClick={() => setAdGenerationOpen(true)} className="bg-purple-500 hover:bg-purple-600">
                            <Wand2 className="h-4 w-4 mr-2" />
                            Generate AI Ad
                        </Button>
                    </div>

                    <AdGenerationDialog />

                    {/* Campaigns Section */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-semibold">Active Campaigns</h3>
                            <Dialog open={campaignDialogOpen} onOpenChange={setCampaignDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button>
                                        <Plus className="h-4 w-4 mr-2" />
                                        New Campaign
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="backdrop-blur-lg bg-gray-900/95 border-gray-700">
                                    <DialogHeader>
                                        <DialogTitle>Create New Campaign</DialogTitle>
                                        <DialogDescription>
                                            Set up a new marketing campaign to engage with your customers.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="name">Campaign Name</Label>
                                            <Input
                                                id="name"
                                                placeholder="Summer Sale 2023"
                                                value={newCampaign.name}
                                                onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="type">Campaign Type</Label>
                                            <Select
                                                value={newCampaign.type}
                                                onValueChange={(value) => setNewCampaign({ ...newCampaign, type: value })}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="email">Email</SelectItem>
                                                    <SelectItem value="social">Social Media</SelectItem>
                                                    <SelectItem value="sms">SMS</SelectItem>
                                                    <SelectItem value="push">Push Notification</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="audience">Target Audience</Label>
                                            <Select
                                                value={newCampaign.audience}
                                                onValueChange={(value) => setNewCampaign({ ...newCampaign, audience: value })}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select audience" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="all">All Customers</SelectItem>
                                                    <SelectItem value="new">New Customers</SelectItem>
                                                    <SelectItem value="returning">Returning Customers</SelectItem>
                                                    <SelectItem value="premium">Premium Members</SelectItem>
                                                    <SelectItem value="inactive">Inactive Customers</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="schedule">Schedule</Label>
                                            <Input
                                                id="schedule"
                                                type="datetime-local"
                                                value={newCampaign.schedule}
                                                onChange={(e) => setNewCampaign({ ...newCampaign, schedule: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-end gap-3">
                                        <Button variant="outline" onClick={() => setCampaignDialogOpen(false)}>
                                            Cancel
                                        </Button>
                                        <Button onClick={handleCreateCampaign}>
                                            Create Campaign
                                        </Button>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {mailboxData.campaigns.map((campaign) => (
                                <CampaignCard key={campaign.id} campaign={campaign} />
                            ))}
                        </div>
                    </div>
                    {/* Newsletters Section */}
                    <div className="mb-8">
                        <h3 className="text-xl font-semibold mb-4">Newsletters</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {mailboxData.newsletters.map((newsletter) => (
                                <Card key={newsletter.id} className="p-4 backdrop-blur-lg bg-white/5">
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <h4 className="font-semibold">{newsletter.name}</h4>
                                            <p className="text-sm text-muted-foreground">{newsletter.subscribers.toLocaleString()} subscribers</p>
                                        </div>
                                        <Button variant="ghost" size="sm">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <div className="text-2xl font-bold">{newsletter.openRate}%</div>
                                            <div className="text-xs text-muted-foreground">Open Rate</div>
                                        </div>
                                        <div>
                                            <div className="text-2xl font-bold">{newsletter.clickRate}%</div>
                                            <div className="text-xs text-muted-foreground">Click Rate</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span>Next: {new Date(newsletter.nextIssue).toLocaleDateString()}</span>
                                        <Button variant="outline" size="sm">Edit</Button>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* Automations Section */}
                    <div className="mb-8">
                        <h3 className="text-xl font-semibold mb-4">Marketing Automations</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {mailboxData.automations.map((automation) => (
                                <AutomationCard key={automation.id} automation={automation} />
                            ))}
                        </div>
                    </div>

                    {/* AI Agent Workflows */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4">AI Agent Workflows</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {mailboxData.aiAgentWorkflows.map((workflow) => (
                                <AIAgentWorkflowCard key={workflow.id} workflow={workflow} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}