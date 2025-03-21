
import React from "react";
import { useAuth } from "@/context/AuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, User, Calendar, Home, Users, Building } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f9f8f0]">
      <header className="sticky top-0 z-30 w-full backdrop-blur border-b border-[#e2e1d5] bg-[#f9f8f0]/50">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center space-x-2">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="h-8 w-8 rounded-full bg-[#8a7e66] flex items-center justify-center text-white font-bold"
              >
                JF
              </motion.div>
              <motion.span
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="font-semibold text-lg hidden sm:inline-block text-[#5d4d40]"
              >
                JobFair Hub
              </motion.span>
            </Link>

            <div className="hidden md:flex items-center gap-6">
              <NavLink to="/" icon={<Home size={18} />} label="Home" pathname={location.pathname} />
              <NavLink to="/companies" icon={<Building size={18} />} label="Companies" pathname={location.pathname} />
              {user && (
                <NavLink to={user.isAdmin ? "/admin" : "/user"} icon={<User size={18} />} label="My Profile" pathname={location.pathname} />
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium hidden md:block text-[#5d4d40]">
                  {user.name} {user.isAdmin && <span className="text-xs text-[#7d7259] ml-1">(Admin)</span>}
                </span>
                <Button variant="ghost" size="icon" onClick={handleLogout} aria-label="Logout" className="text-[#8a7e66]">
                  <LogOut size={18} />
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="ghost" asChild className="text-[#5d4d40]">
                  <Link to="/login">Login</Link>
                </Button>
                <Button variant="default" asChild className="bg-[#8a7e66] hover:bg-[#6b6353]">
                  <Link to="/register">Register</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 container py-6 md:py-10 animate-fade-in">
        {children}
      </main>

      <footer className="border-t border-[#e2e1d5] py-6 md:py-0 bg-[#f9f8f0]/50 backdrop-blur">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 md:h-16 text-sm">
          <p className="text-center md:text-left text-[#7d7259]">
            &copy; {new Date().getFullYear()} JobFair Hub. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link to="/terms" className="text-[#7d7259] hover:text-[#5d4d40] transition-colors">
              Terms
            </Link>
            <Link to="/privacy" className="text-[#7d7259] hover:text-[#5d4d40] transition-colors">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

interface NavLinkProps {
  to: string;
  label: string;
  icon?: React.ReactNode;
  pathname: string;
}

function NavLink({ to, label, icon, pathname }: NavLinkProps) {
  const isActive = pathname === to || (pathname.startsWith('/user') && to === '/user') || (pathname.startsWith('/admin') && to === '/admin');

  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-1 text-sm font-medium transition-colors hover:text-[#5d4d40] relative",
        isActive ? "text-[#5d4d40]" : "text-[#7d7259]"
      )}
    >
      {icon}
      {label}
      {isActive && (
        <motion.div
          layoutId="nav-indicator"
          className="h-0.5 w-full bg-[#8a7e66] absolute -bottom-[29px]"
          transition={{ duration: 0.2 }}
        />
      )}
    </Link>
  );
}
