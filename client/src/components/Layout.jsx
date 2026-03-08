import { Outlet, Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { AnimatePresence, motion as Motion } from "framer-motion";
import {
  Home,
  BookOpen,
  Bot,
  Trophy,
  User,
  Heart,
  Fingerprint,
  MoonStar,
  Compass,
  Sparkles,
  Settings,
  Palette,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import projectLogo from "../assets/logo.svg";

export default function Layout() {
  const location = useLocation();
  const { user, loading } = useAuth();
  const [theme, setTheme] = useState(() => localStorage.getItem("app_theme") || "ramadan");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => localStorage.getItem("sidebar_collapsed") === "true");

  useEffect(() => {
    const syncTheme = () => {
      const nextTheme = localStorage.getItem("app_theme") || "ramadan";
      setTheme(nextTheme);
    };

    syncTheme();
    window.addEventListener("storage", syncTheme);
    window.addEventListener("app-theme-change", syncTheme);

    return () => {
      window.removeEventListener("storage", syncTheme);
      window.removeEventListener("app-theme-change", syncTheme);
    };
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("sidebar_collapsed", String(isSidebarCollapsed));
  }, [isSidebarCollapsed]);

  useEffect(() => {
    const onKeyDown = (event) => {
      const target = event.target;
      const isTypingTarget =
        target instanceof HTMLElement &&
        (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable);

      if (isTypingTarget) return;
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "b") {
        event.preventDefault();
        setIsSidebarCollapsed((prev) => !prev);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const publicPaths = ["/", "/login", "/register"];
  const isPublicRoute = publicPaths.includes(location.pathname);

  // Render app chrome only for authenticated users on non-public routes.
  if (loading || !user || isPublicRoute) return <Outlet />;

  const navItems = [
    { path: "/dashboard", icon: <Home className="w-5 h-5" />, label: "Home" },
    { path: "/quran", icon: <BookOpen className="w-5 h-5" />, label: "Quran" },
    { path: "/dua", icon: <Heart className="w-5 h-5" />, label: "Dua" },
    { path: "/dhikr", icon: <Fingerprint className="w-5 h-5" />, label: "Tasbih" },
    { path: "/ai-coach", icon: <Bot className="w-5 h-5" />, label: "Coach" },
    { path: "/ramadan-map", icon: <Compass className="w-5 h-5" />, label: "Ramadan Map" },
    { path: "/challenges", icon: <Trophy className="w-5 h-5" />, label: "Squad" },
    { path: "/journal", icon: <MoonStar className="w-5 h-5" />, label: "Journal" },
    { path: "/profile", icon: <User className="w-5 h-5" />, label: "Profile" },
  ];

  if (user?.role === "admin") {
    navItems.push({ path: "/admin", icon: <Sparkles className="w-5 h-5" />, label: "Admin" });
  }

  const switchTheme = () => {
    const nextTheme = theme === "ramadan" ? "ramadan-night" : "ramadan";
    setTheme(nextTheme);
    localStorage.setItem("app_theme", nextTheme);
    window.dispatchEvent(new Event("app-theme-change"));
  };

  return (
    <div className="pb-20 md:pb-0 min-h-screen bg-base-50" data-theme={theme}>
      <aside className={`hidden md:block fixed left-0 top-0 z-40 h-screen p-4 transition-all duration-300 ${isSidebarCollapsed ? "md:w-28" : "md:w-80"}`}>
        <div className="flex h-full flex-col rounded-3xl border border-base-300 bg-base-100 shadow-sm">
            <div className="border-b border-base-300 px-4 py-4">
              <div className="mb-3 flex justify-end">
                <button
                  onClick={() => setIsSidebarCollapsed((prev) => !prev)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-base-300 text-base-content/70 hover:bg-base-200 hover:text-base-content transition-colors"
                  aria-label={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                  title={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                >
                  {isSidebarCollapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
                </button>
              </div>
              <Link to="/dashboard" className={`flex items-center ${isSidebarCollapsed ? "justify-center" : "gap-3"}`}>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-primary/20 via-base-100 to-secondary/15 ring-2 ring-primary/20 shadow-sm overflow-hidden">
                  <img src={projectLogo} alt="Micro-Ibadah logo" className="h-8 w-8 object-contain" />
                </div>
                {!isSidebarCollapsed && (
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-base-content/55">Project</p>
                    <h2 className="text-lg font-bold text-base-content leading-tight">Micro-Ibadah</h2>
                  </div>
                )}
              </Link>
            </div>

            <nav className="flex-1 overflow-y-auto px-3 py-4">
              {!isSidebarCollapsed && <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-base-content/45">Shortcuts</p>}
              <ul className="space-y-1">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + "/");
                  return (
                    <li key={item.path} className="relative group">
                      <Link
                        to={item.path}
                        title={isSidebarCollapsed ? item.label : undefined}
                        className={`relative flex items-center rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                          isActive
                            ? "bg-primary text-primary-content shadow-sm"
                            : "text-base-content/75 hover:bg-base-200 hover:text-base-content"
                        } ${isSidebarCollapsed ? "justify-center" : "gap-3"}`}
                      >
                        <span
                          className={`absolute left-0 top-2 bottom-2 w-1 rounded-r-full transition-all duration-300 ${
                            isActive ? "bg-primary-content/90 opacity-100" : "opacity-0"
                          }`}
                        />
                        <span className={`${isActive ? "text-primary-content" : "text-base-content/55"}`}>{item.icon}</span>
                        {!isSidebarCollapsed && <span>{item.label}</span>}
                      </Link>
                      {isSidebarCollapsed && (
                        <span className="pointer-events-none absolute left-[calc(100%+0.5rem)] top-1/2 z-40 -translate-y-1/2 rounded-md bg-base-content px-2 py-1 text-xs font-semibold text-base-100 opacity-0 shadow-sm transition-opacity duration-150 group-hover:opacity-100">
                          {item.label}
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="border-t border-base-300 px-4 py-4 space-y-3">
              {!isSidebarCollapsed && (
                <div className="rounded-xl bg-base-200/70 px-3 py-3">
                  <p className="text-sm font-semibold text-base-content truncate">{user?.name || "User"}</p>
                  <p className="text-xs text-base-content/60 truncate">{user?.email || "Signed in"}</p>
                </div>
              )}

              <div className={`grid gap-2 ${isSidebarCollapsed ? "grid-cols-1" : "grid-cols-2"}`}>
                <Link
                  to="/profile"
                  title={isSidebarCollapsed ? "Profile" : undefined}
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-base-300 px-3 py-2 text-xs font-semibold text-base-content/80 hover:bg-base-200 transition-colors"
                >
                  <User className="h-3.5 w-3.5" /> {!isSidebarCollapsed && "Profile"}
                </Link>
                <Link
                  to="/settings"
                  title={isSidebarCollapsed ? "Settings" : undefined}
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-base-300 px-3 py-2 text-xs font-semibold text-base-content/80 hover:bg-base-200 transition-colors"
                >
                  <Settings className="h-3.5 w-3.5" /> {!isSidebarCollapsed && "Settings"}
                </Link>
              </div>

              <button
                onClick={switchTheme}
                title={isSidebarCollapsed ? "Switch Theme" : undefined}
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-primary/10 px-3 py-2.5 text-xs font-semibold text-primary hover:bg-primary/20 transition-colors"
              >
                <Palette className="h-3.5 w-3.5" />
                {!isSidebarCollapsed && `Theme: ${theme === "ramadan" ? "Ramadan" : "Ramadan Night"}`}
              </button>
            </div>
          </div>
      </aside>

      <div className={`transition-all duration-300 ${isSidebarCollapsed ? "md:pl-28" : "md:pl-80"}`}>
        <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 min-w-0">
          <AnimatePresence mode="wait">
            <Motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <Outlet />
            </Motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 w-full bg-base-100 border-t border-base-200 px-2 py-2 md:hidden z-50">
        <ul className="flex justify-around items-center">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + "/");
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex flex-col items-center gap-0.5 transition-colors ${isActive ? "text-primary" : "text-base-content/55 hover:text-base-content/85"}`}
                >
                  <div className={`${isActive ? "bg-primary/10 p-2 rounded-xl text-primary" : "p-2"} transition-all`}>
                    {item.icon}
                  </div>
                  <span className="text-[9px] tracking-wide uppercase font-semibold">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
