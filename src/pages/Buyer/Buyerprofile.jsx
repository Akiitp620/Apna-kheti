import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/Components/Ui/Button";
import { Input } from "@/Components/Ui/Input";
import { Label } from "@/Components/Ui/Label";
import { Textarea } from "@/Components/Ui/Textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/Ui/Card";
import { ArrowLeft, Camera, MapPin, Phone, Mail, Save, User, Sprout } from "lucide-react";

const FarmerProfile = () => {
  const [profile, setProfile] = useState({
    name: "Suhani Kumari",
    phone: "9876543210",
    email: "suhani@example.com",
    village: "Sundarpur",
    district: "Prayagraj",
    state: "Uttar Pradesh",
    bio: "10 saal se organic farming kar raha hoon. Gehu, Dhan aur Sabziyan ugata hoon.",
    experience: "10",
    landSize: "5",
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-card/80 backdrop-blur-lg border-b border-border/50">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link to="/farmer/dashboard">
            <Button variant="ghost" size="icon" className="rounded-xl">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-lg font-bold text-foreground">Meri Profile</h1>
            <p className="text-xs text-muted-foreground">Apni details update karein</p>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Profile Photo */}
        <div className="flex flex-col items-center gap-3">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center border-4 border-primary/20">
              <User className="h-10 w-10 text-primary" />
            </div>
            <button className="absolute bottom-0 right-0 p-2 rounded-full bg-primary text-primary-foreground shadow-lg">
              <Camera className="h-4 w-4" />
            </button>
          </div>
          <h2 className="text-xl font-bold text-foreground">{profile.name}</h2>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Sprout className="h-4 w-4 text-primary" />
            <span>Kisan • {profile.experience} saal ka anubhav</span>
          </div>
        </div>

        {/* Personal Info */}
        <Card className="border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <User className="h-4 w-4 text-primary" />
              Personal Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Poora Naam</Label>
                <Input value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} className="h-11 rounded-xl bg-muted/50" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} className="h-11 pl-10 rounded-xl bg-muted/50" />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} className="h-11 pl-10 rounded-xl bg-muted/50" />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Kheti ka Anubhav (saal)</Label>
                <Input value={profile.experience} onChange={(e) => setProfile({ ...profile, experience: e.target.value })} className="h-11 rounded-xl bg-muted/50" />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-semibold">Apne baare mein</Label>
              <Textarea value={profile.bio} onChange={(e) => setProfile({ ...profile, bio: e.target.value })} className="rounded-xl bg-muted/50 min-h-[80px]" />
            </div>
          </CardContent>
        </Card>

        {/* Location */}
        <Card className="border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              Location Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Gaon / Village</Label>
                <Input value={profile.village} onChange={(e) => setProfile({ ...profile, village: e.target.value })} className="h-11 rounded-xl bg-muted/50" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Zila / District</Label>
                <Input value={profile.district} onChange={(e) => setProfile({ ...profile, district: e.target.value })} className="h-11 rounded-xl bg-muted/50" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Rajya / State</Label>
                <Input value={profile.state} onChange={(e) => setProfile({ ...profile, state: e.target.value })} className="h-11 rounded-xl bg-muted/50" />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-semibold">Zameen ka Size (Acre)</Label>
              <Input value={profile.landSize} onChange={(e) => setProfile({ ...profile, landSize: e.target.value })} className="h-11 rounded-xl bg-muted/50" />
            </div>
          </CardContent>
        </Card>

        <Button className="w-full h-12 text-base font-semibold rounded-xl gradient-primary text-primary-foreground shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all">
          <Save className="h-4 w-4 mr-2" />
          Profile Save Karein
        </Button>
      </main>
    </div>
  );
};

export default BuyerProfile;
