import * as ClerkReact from "@clerk/clerk-react";
import React, { createContext, useContext, useState, useRef, useEffect } from "react";
import { LogOut, User, Wallet, Settings } from "lucide-react";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// Local implementations
const mockUser = {
  id: "local_123",
  fullName: "Local User",
  imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Judge",
  primaryEmailAddress: { emailAddress: "user@local.com" }
};

const MockAuthContext = createContext<{ isSignedIn: boolean, isLoaded: boolean, user: typeof mockUser | null, setIsSignedIn?: any }>({ isSignedIn: true, isLoaded: true, user: mockUser });

export function MockClerkProvider({ children }: { children: React.ReactNode }) {
  // Check if we previously logged in during this session
  const [isSignedIn, setIsSignedIn] = React.useState(
    localStorage.getItem("mock_demo_login") === "true"
  );

  return (
    <MockAuthContext.Provider value={{ isSignedIn, isLoaded: true, user: isSignedIn ? mockUser : null, setIsSignedIn: setIsSignedIn as any }}>
      {children}
    </MockAuthContext.Provider>
  );
}

export function useMockUser() {
  return useContext(MockAuthContext);
}

export function MockSignInButton({ children }: any) {
  const context = useContext(MockAuthContext) as any;
  
  return (
    <div 
      className="cursor-pointer"
      onClick={() => {
        localStorage.setItem("mock_demo_login", "true");
        if (context.setIsSignedIn) context.setIsSignedIn(true);
        window.location.href = "/dashboard";
      }}
    >
      {children}
    </div>
  );
}

export function MockUserButton() {
  const context = useContext(MockAuthContext) as any;
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  
  return (
    <div className="relative" ref={dropdownRef}>
      <div 
        className="w-10 h-10 rounded-full border-2 border-neon-cyan/50 overflow-hidden cursor-pointer hover:border-neon-cyan transition-colors" 
        onClick={() => setOpen(!open)}
      >
        <img src={mockUser.imageUrl} alt="User" className="w-full h-full object-cover" />
      </div>

      {open && (
        <div className="absolute right-0 mt-3 w-64 rounded-2xl bg-[#111111] border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.9)] py-2 z-[100] transform-gpu transition-all">
           <div className="px-4 py-3 border-b border-white/20 mb-2 bg-white/5">
             <p className="text-sm font-bold text-white">{mockUser.fullName}</p>
             <p className="text-xs text-white/60 truncate mt-0.5">{mockUser.primaryEmailAddress.emailAddress}</p>
           </div>
           
           <button onClick={() => { setOpen(false); window.location.href = "/profile"; }} className="w-full text-left px-4 py-2.5 text-sm text-white/90 hover:text-white hover:bg-white/10 flex items-center gap-3 transition-colors font-medium">
             <User size={16} className="text-white/70" /> Profile
           </button>
           <button onClick={() => setOpen(false)} className="w-full text-left px-4 py-2.5 text-sm text-white/90 hover:text-white hover:bg-white/10 flex items-center gap-3 transition-colors font-medium">
             <Settings size={16} className="text-white/70" /> Settings
           </button>
           <button onClick={() => { setOpen(false); window.dispatchEvent(new Event("disconnect_wallet")); }} className="w-full text-left px-4 py-2.5 text-sm text-white/90 hover:text-white hover:bg-white/10 flex items-center gap-3 transition-colors font-medium">
             <Wallet size={16} className="text-white/70" /> Disconnect Wallet
           </button>
           
           <div className="h-px bg-white/20 my-2"></div>
           
           <button 
             onClick={() => {
               localStorage.removeItem("mock_demo_login");
               localStorage.removeItem("last_active_user");
               localStorage.removeItem("wallet_connected_user_id");
               localStorage.removeItem("setting_wallet_connected");
               sessionStorage.clear();
               window.dispatchEvent(new Event("disconnect_wallet"));
               
               if (context.setIsSignedIn) context.setIsSignedIn(false);
               window.location.href = "/";
             }} 
             className="w-full text-left px-4 py-2.5 text-sm text-red-400 font-bold hover:text-red-300 hover:bg-red-500/10 flex items-center gap-3 transition-colors"
           >
             <LogOut size={16} /> Sign Out
           </button>
        </div>
      )}
    </div>
  );
}

export function AuthUserButton(props: any) {
  if (PUBLISHABLE_KEY) {
    return (
      <ClerkReact.UserButton {...props}>
        <ClerkReact.UserButton.MenuItems>
          <ClerkReact.UserButton.Action 
            label="Disconnect Wallet" 
            labelIcon={<Wallet size={16} />} 
            onClick={() => {
              localStorage.setItem("wallet_disconnected_manually", "true");
              window.dispatchEvent(new Event("disconnect_wallet"));
            }} 
          />
        </ClerkReact.UserButton.MenuItems>
      </ClerkReact.UserButton>
    );
  }
  return <MockUserButton />;
}

// Dynamically export actual Clerk OR Mock based on environment
export const AuthProvider = PUBLISHABLE_KEY ? ClerkReact.ClerkProvider : MockClerkProvider;
export const useAuthUser = PUBLISHABLE_KEY ? ClerkReact.useUser : useMockUser;
export const AuthSignInButton = PUBLISHABLE_KEY ? ClerkReact.SignInButton : MockSignInButton;
