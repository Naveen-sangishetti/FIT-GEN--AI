import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Upload, ArrowLeft } from "lucide-react";
import { PROFILE_UPDATED_EVENT } from "@/lib/profile-events";

interface ProfileData {
  user_id: string;
  full_name: string | null;
  avatar_url: string | null;
  preferences: any;
}

const ProfileSettings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [userId, setUserId] = useState<string | null>(null);
  const [fullName, setFullName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [preferences, setPreferences] = useState("");

  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  /* 🔄 Load profile on mount */
  useEffect(() => {
    const loadProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        navigate("/auth");
        return;
      }

      setUserId(user.id);

      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (data) {
        setFullName(data.full_name ?? "");
        setAvatarUrl(data.avatar_url ?? null);
        setPreferences(
          data.preferences ? JSON.stringify(data.preferences, null, 2) : ""
        );
      }
    };

    loadProfile();
  }, [navigate]);

  /* 🖼️ Avatar upload */
  const handleAvatarUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      setUploading(true);

      const file = event.target.files?.[0];
      if (!file) return;

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        navigate("/auth");
        return;
      }

      const fileExt = file.name.split(".").pop();
      const filePath = `${user.id}/avatar.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);

      const avatarWithTimestamp = `${data.publicUrl}?t=${Date.now()}`;
      setAvatarUrl(avatarWithTimestamp);

      /* ✅ UPSERT profile */
      const { error } = await supabase
        .from("profiles")
        .upsert(
          {
            user_id: user.id,
            avatar_url: avatarWithTimestamp,
          },
          { onConflict: "user_id" }
        );

      if (error) throw error;

      window.dispatchEvent(new Event(PROFILE_UPDATED_EVENT));

      toast({
        title: "Avatar uploaded!",
        description: "Profile picture updated successfully.",
      });
    } catch (err: any) {
      toast({
        title: "Upload failed",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  /* 💾 Save profile */
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

      let parsedPreferences = {};
      try {
        parsedPreferences = preferences
          ? JSON.parse(preferences)
          : {};
      } catch {
        toast({
          title: "Invalid preferences JSON",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase
        .from("profiles")
        .upsert(
          {
            user_id: user.id,
            full_name: fullName || null,
            avatar_url: avatarUrl || null,
            preferences: parsedPreferences,
          },
          { onConflict: "user_id" }
        );

      if (error) throw error;

      window.dispatchEvent(new Event(PROFILE_UPDATED_EVENT));

      toast({ title: "Profile updated!" });
    } catch (err: any) {
      toast({
        title: "Save failed",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <Button variant="ghost" onClick={() => navigate(-1)}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>

      <div className="flex items-center gap-4">
        <Avatar className="h-20 w-20">
          <AvatarImage src={avatarUrl ?? undefined} />
          <AvatarFallback>
            {fullName?.charAt(0).toUpperCase() || "U"}
          </AvatarFallback>
        </Avatar>

        <label className="cursor-pointer">
          <Input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarUpload}
          />
          <Button variant="outline" disabled={uploading}>
            {uploading ? (
              <Loader2 className="animate-spin h-4 w-4" />
            ) : (
              <Upload className="h-4 w-4 mr-2" />
            )}
            Upload Avatar
          </Button>
        </label>
      </div>

      <Input
        placeholder="Full name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />

      <textarea
        className="w-full rounded-md border p-2 text-sm"
        rows={5}
        placeholder="Preferences (JSON)"
        value={preferences}
        onChange={(e) => setPreferences(e.target.value)}
      />

      <Button onClick={handleSave} disabled={saving}>
        {saving ? <Loader2 className="animate-spin h-4 w-4" /> : "Save Profile"}
      </Button>
    </div>
  );
};

export default ProfileSettings;
