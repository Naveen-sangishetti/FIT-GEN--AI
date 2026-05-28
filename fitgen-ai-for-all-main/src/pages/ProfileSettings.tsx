import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Upload, ArrowLeft, Clock, LogIn } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { PROFILE_UPDATED_EVENT } from "@/lib/profile-events";


interface ProfileData {
  user_id: string;
  full_name: string | null;
  avatar_url: string | null;
  preferences: any;
  last_login: string | null;
  login_count: number | null;
  activity_log: any;
}

const ProfileSettings = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [fullName, setFullName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [preferences, setPreferences] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate("/auth");
        return;
      }

      setUserId(user.id);
      
      const { data, error } = await supabase
        .from("profiles" as any)
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') throw error;

      if (data) {
        const profileData = data as unknown as ProfileData;
        setProfile(profileData);
        setFullName(profileData.full_name || "");
        setAvatarUrl(profileData.avatar_url || "");
        setPreferences(JSON.stringify(profileData.preferences || {}, null, 2));
      }
    } catch (error: any) {
      toast({
        title: "Error loading profile",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        navigate("/auth");
        return;
      }

      if (!event.target.files || event.target.files.length === 0) {
        return;
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const filePath = `${user.id}/avatar.${fileExt}`;

      // Upload to Storage
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      // Get public URL with cache-busting timestamp
      const {
        data: { publicUrl },
      } = supabase.storage.from("avatars").getPublicUrl(filePath);

      const avatarUrlWithTimestamp = `${publicUrl}?t=${Date.now()}`;
      setAvatarUrl(avatarUrlWithTimestamp);

      // Ensure profile row exists, then persist avatar URL
      const { data: existing, error: existingError } = await supabase
        .from("profiles" as any)
        .select("id")
        .eq("user_id", user.id)
        .maybeSingle();

      if (existingError && existingError.code !== "PGRST116") throw existingError;

      if (existing) {
        const { error: updateError } = await supabase
          .from("profiles" as any)
          .update({ avatar_url: avatarUrlWithTimestamp } as any)
          .eq("user_id", user.id);

        if (updateError) throw updateError;
      } else {
        const { error: insertError } = await supabase
          .from("profiles" as any)
          .insert({ user_id: user.id, avatar_url: avatarUrlWithTimestamp } as any);

        if (insertError) throw insertError;
      }

      window.dispatchEvent(new Event(PROFILE_UPDATED_EVENT));

      toast({
        title: "Avatar uploaded!",
        description: "Your profile picture has been saved.",
      });
    } catch (error: any) {
      toast({
        title: "Upload failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        navigate("/auth");
        return;
      }

      setUserId(user.id);

      let parsedPreferences = {};
      try {
        parsedPreferences = JSON.parse(preferences);
      } catch (e) {
        toast({
          title: "Invalid JSON",
          description: "Please enter valid JSON for preferences.",
          variant: "destructive",
        });
        return;
      }

      const payload = {
        full_name: fullName || null,
        avatar_url: avatarUrl || null,
        preferences: parsedPreferences,
      };

      // Ensure profile row exists, then persist updates
      const { data: existing, error: existingError } = await supabase
        .from("profiles" as any)
        .select("id")
        .eq("user_id", user.id)
        .maybeSingle();

      if (existingError && existingError.code !== "PGRST116") throw existingError;

      if (existing) {
        const { error } = await supabase
          .from("profiles" as any)
          .update(payload as any)
          .eq("user_id", user.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("profiles" as any)
          .insert({ user_id: user.id, ...(payload as any) } as any);

        if (error) throw error;
      }

      window.dispatchEvent(new Event(PROFILE_UPDATED_EVENT));

      toast({
        title: "Profile updated!",
        description: "Your changes have been saved.",
      });

      // Refresh profile data
      await fetchProfile();
    } catch (error: any) {
      toast({
        title: "Error saving profile",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/20 via-background to-secondary/20">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-background to-secondary/20 p-4">
      <div className="max-w-4xl mx-auto pt-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Profile Settings Card */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Profile Settings</CardTitle>
              <CardDescription>
                Update your profile information and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar Section */}
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={avatarUrl} alt={fullName} />
                  <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                    {fullName ? fullName.charAt(0).toUpperCase() : "U"}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex items-center gap-2">
                  <Input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    className="hidden"
                  />
                  <Label htmlFor="avatar-upload">
                    <Button
                      variant="outline"
                      disabled={uploading}
                      asChild
                    >
                      <span>
                        {uploading ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <Upload className="mr-2 h-4 w-4" />
                        )}
                        Upload Avatar
                      </span>
                    </Button>
                  </Label>
                </div>
              </div>

              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>

              {/* Preferences */}
              <div className="space-y-2">
                <Label htmlFor="preferences">Preferences (JSON)</Label>
                <Textarea
                  id="preferences"
                  placeholder='{"theme": "dark", "notifications": true}'
                  value={preferences}
                  onChange={(e) => setPreferences(e.target.value)}
                  rows={6}
                  className="font-mono text-sm"
                />
                <p className="text-xs text-muted-foreground">
                  Enter your preferences as valid JSON format
                </p>
              </div>

              {/* Save Button */}
              <Button
                onClick={handleSave}
                disabled={saving}
                className="w-full"
                size="lg"
              >
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Activity & Login History Card */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Activity & Login History
              </CardTitle>
              <CardDescription>
                Track your account activity and login history
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Login Stats */}
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-primary/10 rounded-lg">
                  <div className="flex items-center gap-3">
                    <LogIn className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm font-medium">Total Logins</p>
                      <p className="text-2xl font-bold text-primary">
                        {profile?.login_count || 0}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-secondary/10 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-secondary" />
                    <div>
                      <p className="text-sm font-medium">Last Login</p>
                      <p className="text-sm text-muted-foreground">
                        {profile?.last_login 
                          ? new Date(profile.last_login).toLocaleString()
                          : "Never"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Recent Activity */}
              <div className="space-y-3">
                <h3 className="font-semibold text-sm">Recent Activity</h3>
                {profile?.activity_log && profile.activity_log.length > 0 ? (
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {profile.activity_log.slice(-10).reverse().map((activity: any, index: number) => (
                      <div 
                        key={index}
                        className="p-3 bg-muted/50 rounded-lg text-sm"
                      >
                        <div className="flex justify-between items-start">
                          <p className="font-medium">{activity.type}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(activity.timestamp).toLocaleString()}
                          </p>
                        </div>
                        {activity.data && Object.keys(activity.data).length > 0 && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {JSON.stringify(activity.data)}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    No activity recorded yet
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
