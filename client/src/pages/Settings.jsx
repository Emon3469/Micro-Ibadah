import { useEffect, useState } from "react";
import { Palette, Bell, Shield } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import projectLogo from "../assets/logo.svg";

export default function Settings() {
  const [theme, setTheme] = useState(() => localStorage.getItem("app_theme") || "ramadan");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("app_theme", theme);
    window.dispatchEvent(new Event("app-theme-change"));
  }, [theme]);

  return (
    <div className="max-w-3xl mx-auto py-6 px-4 space-y-5">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-linear-to-br from-primary/20 via-base-100 to-secondary/15 ring-2 ring-primary/20 shadow-sm overflow-hidden">
          <img src={projectLogo} alt="Micro-Ibadah logo" className="h-8 w-8 object-contain" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-base-content">Settings</h1>
          <p className="text-sm text-base-content/65">Control appearance and app preferences.</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base-content">
            <Palette className="h-4 w-4" /> Theme
          </CardTitle>
          <CardDescription>Choose your preferred look for the app.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Button
            onClick={() => setTheme("ramadan")}
            className={theme === "ramadan" ? "bg-primary text-primary-content" : "bg-base-200 text-base-content hover:bg-base-300"}
          >
            Ramadan
          </Button>
          <Button
            onClick={() => setTheme("ramadan-night")}
            className={theme === "ramadan-night" ? "bg-primary text-primary-content" : "bg-base-200 text-base-content hover:bg-base-300"}
          >
            Ramadan Night
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base-content">
            <Bell className="h-4 w-4" /> Notifications
          </CardTitle>
          <CardDescription>Notification controls will appear here in a future update.</CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base-content">
            <Shield className="h-4 w-4" /> Privacy
          </CardTitle>
          <CardDescription>Privacy and security controls will appear here in a future update.</CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
