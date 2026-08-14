import { useState } from "react";
import { Link } from "react-router-dom";
import { Sprout, Bell, User, LogOut, Send, ThumbsUp, MessageCircle, TrendingUp, Search, Filter } from "lucide-react";
import { Button } from "@/Components/Ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/Ui/Card";
import { Input } from "@/Components/Ui/Input";
import { Textarea } from "@/Components/Ui/Textarea";
import { Badge } from "@/Components/Ui/Badge";
import { Avatar, AvatarFallback } from "@/Components/Ui/Avatar";

const discussions = [
  {
    id: 1, author: "Ramesh Kumar", avatar: "RK", time: "2 ghante pehle",
    topic: "Gehun ka rate kab badhega?",
    content: "Bhai log, gehun ka rate bahut gir gaya hai ₹1,800/Q. Kya agle hafte mein rate badhne ki umeed hai? Mandi mein kya chal raha hai?",
    likes: 24, replies: 8, tags: ["gehun", "mandi-rate"], trending: true,
  },
  {
    id: 2, author: "Suresh Yadav", avatar: "SY", time: "5 ghante pehle",
    topic: "Tamatar ki supply kam ho rahi hai",
    content: "Mere area mein tamatar ki supply kam hai, rate ₹50/Kg tak pahunch gaya hai. Kya aapke area mein bhi aisa hai?",
    likes: 15, replies: 12, tags: ["tamatar", "supply"],
  },
  {
    id: 3, author: "Priya Devi", avatar: "PD", time: "1 din pehle",
    topic: "Pyaaz store kaise karein?",
    content: "Pyaaz ka rate abhi kam hai ₹20/Kg. Kya 2 hafte store karke bechna theek rahega? Cold storage ka kharcha kitna aata hai?",
    likes: 31, replies: 15, tags: ["pyaaz", "storage"],
  },
  {
    id: 4, author: "Mohan Singh", avatar: "MS", time: "1 din pehle",
    topic: "Aaloo ka export demand",
    content: "Suna hai UAE mein aaloo ki demand badh rahi hai. Koi export karta hai kya? Process kya hai?",
    likes: 18, replies: 6, tags: ["aaloo", "export"],
  },
];

const trendingTopics = [
  { tag: "gehun", count: 45 },
  { tag: "mandi-rate", count: 38 },
  { tag: "tamatar", count: 29 },
  { tag: "AI-price", count: 22 },
  { tag: "organic", count: 17 },
];

const FarmerDiscussion = () => {
  const [newPost, setNewPost] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="gradient-hero text-primary-foreground px-4 sm:px-6 py-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary-foreground/10 backdrop-blur-sm">
              <Sprout className="h-6 w-6" />
            </div>
            <h1 className="text-xl font-bold">Apna Kheti</h1>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/farmer/dashboard">
              <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-foreground/10 rounded-xl">
                Dashboard
              </Button>
            </Link>
            <button className="relative p-2.5 rounded-xl hover:bg-primary-foreground/10 transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 bg-accent rounded-full border-2 border-primary" />
            </button>
            <button className="p-2.5 rounded-xl hover:bg-primary-foreground/10 transition-colors">
              <User className="h-5 w-5" />
            </button>
            <Link to="/login">
              <button className="p-2.5 rounded-xl hover:bg-primary-foreground/10 transition-colors">
                <LogOut className="h-5 w-5" />
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Banner */}
      <div className="gradient-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="animate-fade-up">
            <h2 className="text-2xl sm:text-3xl font-bold flex items-center gap-3">💬 Kisan Charcha</h2>
            <p className="text-primary-foreground/80 mt-1">Rate, tips aur market ki baat — apne saathi kisano ke saath</p>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 -mt-4 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-5">
            {/* New Post */}
            <Card className="glass-card rounded-2xl animate-fade-up">
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <Avatar className="h-10 w-10 border-2 border-primary/20">
                    <AvatarFallback className="bg-primary/10 text-primary font-bold text-sm">RK</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-3">
                    <Textarea
                      value={newPost}
                      onChange={(e) => setNewPost(e.target.value)}
                      placeholder="Apna sawal ya suggestion likhein... 🌾"
                      className="min-h-[80px] rounded-xl bg-muted/50 border-border/60 resize-none focus:bg-card"
                    />
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        <Badge variant="outline" className="cursor-pointer hover:bg-primary/10 rounded-lg text-xs">#gehun</Badge>
                        <Badge variant="outline" className="cursor-pointer hover:bg-primary/10 rounded-lg text-xs">#rate</Badge>
                      </div>
                      <Button className="gap-2 rounded-xl gradient-primary text-primary-foreground hover:shadow-lg transition-all">
                        <Send className="h-4 w-4" /> Post Karein
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Search */}
            <div className="flex gap-3 animate-fade-up">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Discussion khojein..."
                  className="pl-10 h-11 rounded-xl bg-card border-border/60"
                />
              </div>
              <Button variant="outline" className="h-11 gap-2 rounded-xl">
                <Filter className="h-4 w-4" /> Filter
              </Button>
            </div>

            {/* Discussion Posts */}
            {discussions.map((post) => (
              <Card key={post.id} className="glass-card rounded-2xl hover:shadow-lg transition-all duration-300 animate-fade-up-delay group">
                <CardContent className="p-5">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-10 w-10 border-2 border-primary/20">
                      <AvatarFallback className="bg-primary/10 text-primary font-bold text-sm">{post.avatar}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-foreground">{post.author}</span>
                        <span className="text-xs text-muted-foreground">• {post.time}</span>
                        {post.trending && (
                          <Badge className="bg-accent/20 text-accent-foreground text-xs gap-1 rounded-lg">
                            <TrendingUp className="h-3 w-3" /> Trending
                          </Badge>
                        )}
                      </div>
                      <h3 className="font-bold text-foreground mt-2 text-base group-hover:text-primary transition-colors">{post.topic}</h3>
                      <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{post.content}</p>
                      <div className="flex items-center gap-2 mt-3 flex-wrap">
                        {post.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="rounded-lg text-xs">#{tag}</Badge>
                        ))}
                      </div>
                      <div className="flex items-center gap-4 mt-4 pt-3 border-t border-border/40">
                        <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors">
                          <ThumbsUp className="h-4 w-4" /> {post.likes}
                        </button>
                        <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors">
                          <MessageCircle className="h-4 w-4" /> {post.replies} Replies
                        </button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Trending Topics */}
            <Card className="glass-card rounded-2xl animate-fade-up-delay">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-bold flex items-center gap-2">
                  🔥 Trending Topics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {trendingTopics.map((topic) => (
                  <div key={topic.tag} className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/60 transition-colors cursor-pointer">
                    <span className="text-sm font-medium text-primary">#{topic.tag}</span>
                    <span className="text-xs text-muted-foreground">{topic.count} posts</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Price Card */}
            <Card className="gradient-primary border-0 rounded-2xl text-primary-foreground animate-fade-up-delay-2">
              <CardContent className="p-5">
                <h3 className="font-bold flex items-center gap-2 mb-3">📊 Aaj ke Rate</h3>
                <div className="space-y-2.5">
                  {[
                    { crop: "Gehun", price: "₹2,200/Q", trend: "↑" },
                    { crop: "Tamatar", price: "₹48/Kg", trend: "↑" },
                    { crop: "Aaloo", price: "₹28/Kg", trend: "↓" },
                    { crop: "Pyaaz", price: "₹32/Kg", trend: "↑" },
                  ].map((item) => (
                    <div key={item.crop} className="flex items-center justify-between p-2.5 rounded-lg bg-primary-foreground/10">
                      <span className="text-sm">{item.crop}</span>
                      <span className="text-sm font-bold">{item.price} {item.trend}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FarmerDiscussion;
