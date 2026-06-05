/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BookOpen, Award, MessageSquare, Calendar, User, BrainCircuit, Menu, X, LogOut, Video, Newspaper, Briefcase, GraduationCap, Trophy } from 'lucide-react';
import CrestLogo from './CrestLogo';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  user: any;
  onLogin: () => void;
  onLogout: () => void;
  notificationCount: number;
}

export default function Sidebar({
  activeTab,
  setActiveTab,
  isOpen,
  setIsOpen,
  user,
  onLogin,
  onLogout,
  notificationCount
}: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Milestones & Progress', icon: Award },
    { id: 'study', label: 'Study Guides & Cards', icon: BookOpen },
    { id: 'tests', label: 'Practice Tests', icon: BrainCircuit },
    { id: 'consultation', label: '1-on-1 Consultation', icon: Video },
    { id: 'news', label: 'Health News & Resources', icon: Newspaper },
    { id: 'jobs', label: 'UAE Nursing Jobs', icon: Briefcase },
    { id: 'workshops', label: 'Workshops & Seminars', icon: GraduationCap },
    { id: 'scholarships', label: 'Scholarships & Grants', icon: Trophy },
    { id: 'forum', label: 'Collaborative Forum', icon: MessageSquare },
    { id: 'calendar', label: 'Study Calendar & Q&A', icon: Calendar },
  ];

  return (
    <>
      {/* Mobile Header */}
      <header className="lg:hidden h-16 bg-[#0d1b2e] text-slate-100 flex items-center justify-between px-4 sticky top-0 z-40 border-b border-[#1b2b3f] shadow-sm">
        <div className="flex items-center gap-3">
          <CrestLogo className="w-10 h-10 shrink-0" />
          <div>
            <h1 className="font-sans font-extrabold leading-none text-xs tracking-wider text-white uppercase">The Centered Nurse</h1>
            <p className="text-[9px] text-[#dfba6b] font-mono mt-1 font-bold">UAE LICENSING ACADEMY</p>
          </div>
        </div>
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="p-2 hover:bg-[#1a2e48] text-slate-350 hover:text-white rounded-lg focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Sidebar Overlay for Mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Primary Navigation Drawer */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 lg:sticky lg:top-0 w-72 lg:w-76 h-full bg-[#0b1320] text-slate-300 border-r border-[#1a2d44] flex flex-col justify-between transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Upper Control Panel */}
        <div className="p-6">
          <div className="hidden lg:flex items-center gap-3.5 mb-8">
            <CrestLogo className="w-16 h-16 shrink-0" />
            <div>
              <h1 className="font-sans font-black text-white tracking-widest leading-tight text-xs uppercase">
                THE CENTERED
                <br />
                <span className="text-[#dfba6b]">NURSE</span>
              </h1>
              <p className="text-[9px] text-slate-400 font-mono tracking-widest mt-1 uppercase font-extrabold">ACADEMY</p>
            </div>
          </div>

          {/* User Widget / Auth Status */}
          <div className="mb-6 p-4 bg-[#0f1b2e] border border-[#1d314c] rounded-xl shadow-inner">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#dfba6b] to-[#cca96a] flex items-center justify-center text-slate-950 font-bold shadow-sm">
                  {user.displayName ? user.displayName.charAt(0).toUpperCase() : <User className="w-5 h-5" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="font-bold text-xs text-white truncate">{user.displayName || 'Candidate'}</p>
                    {(user.email === 'loveline082022@gmail.com' || user.email === 'uncledez8@gmail.com') && (
                      <span className="text-[8px] font-mono font-extrabold bg-[#dfba6b] text-slate-950 px-1 py-0.5 rounded-xs shrink-0">
                        OWNER
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-slate-400 truncate">{user.email}</p>
                  {(user.email === 'loveline082022@gmail.com' || user.email === 'uncledez8@gmail.com') && (
                    <p className="text-[9px] font-mono text-[#dfba6b] font-extrabold mt-0.5">👑 Academy Admin</p>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-2">
                <p className="text-xs text-slate-400 mb-3">Sync your study metrics & collaborative profile</p>
                <button
                  onClick={() => {
                    onLogin();
                    setIsOpen(false);
                  }}
                  className="w-full py-2 px-3 bg-[#dfba6b] hover:bg-[#ebd095] text-slate-950 rounded-lg text-xs font-bold shadow transition-all flex items-center justify-center gap-1.5 cursor-pointer uppercase font-mono tracking-wider"
                >
                  <User className="w-3.5 h-3.5" />
                  Connect Profile
                </button>
              </div>
            )}
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsOpen(false);
                  }}
                  className={`
                    w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer group uppercase tracking-widest font-mono
                    ${isActive 
                      ? 'bg-[#dfba6b]/10 text-[#dfba6b] border-l-4 border-[#dfba6b] pl-3 bg-gradient-to-r from-[#dfba6b]/5 to-transparent' 
                      : 'hover:bg-[#152336] text-slate-400 hover:text-slate-100'}
                  `}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#dfba6b]' : 'text-slate-400 group-hover:text-slate-200'}`} />
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.id === 'dashboard' && notificationCount > 0 && (
                    <span className="ml-auto w-5 h-5 bg-[#dfba6b] text-slate-950 rounded-full flex items-center justify-center font-black text-[10px] animate-pulse">
                      {notificationCount}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Lower Control Panel / Logout */}
        <div className="p-6 border-t border-[#1a2d44] bg-[#070d16]">
          {user ? (
            <button
              onClick={() => {
                onLogout();
                setIsOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 hover:bg-rose-500/10 text-slate-400 hover:text-rose-450 rounded-lg text-xs font-bold border border-transparent hover:border-rose-500/20 transition-all cursor-pointer uppercase tracking-wider font-mono"
            >
              <LogOut className="w-4 h-4" />
              Sign Out Secure Panel
            </button>
          ) : (
            <p className="text-[9px] text-[#dfba6b] text-center font-mono uppercase tracking-widest font-extrabold pointer-events-none">
              Centered Nurse Academy · 2026
            </p>
          )}
        </div>
      </aside>
    </>
  );
}
