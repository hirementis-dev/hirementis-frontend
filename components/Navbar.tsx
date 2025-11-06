"use client";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Menu, User as UserIcon, LogOut } from "lucide-react";
import Link from "next/link";
import { auth } from "@/firebase/client";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";
import { getUserDocument } from "@/firebase/actions";
import { UserProfile } from "@/types";
import { useUserStore } from "@/hooks/userUser";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isInterviewPage = pathname?.startsWith("/interview");
  const router = useRouter();
  const {
    setUser: setUserState,
    setIsAuthenticated,
    user: userState,
  } = useUserStore();

  async function getUserDoc() {
    const currUser = auth.currentUser;
    if (!currUser?.uid) return;
    const userDoc = await getUserDocument(currUser.uid);
    if (userDoc) {
      setUserState(userDoc as UserProfile);
      setIsAuthenticated();
    } else {
      setUserState(null);
    }
  }

  useEffect(() => {
    let unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser && firebaseUser.emailVerified) {
        getUserDoc();
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNavlinkClick = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/");
    setUserState(null);
    setIsAuthenticated();
    toast.success("Logged out successfully");
  };

  if (isInterviewPage) {
    return null;
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/40 border-b border-gray-100">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center select-none">
            <Link
              onClick={handleNavlinkClick}
              href="/"
              className="flex items-center gap-2"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center text-white font-extrabold ">
                <span className="inline-block">H</span>
              </div>
              <span className="text-lg font-bold">HireMentis</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              onClick={handleNavlinkClick}
              href="/"
              className="text-gray-900 hover:text-emerald-600 transition-colors"
            >
              Home
            </Link>
            <Link
              onClick={handleNavlinkClick}
              href="/jobs"
              className="text-gray-900 hover:text-emerald-600 transition-colors"
            >
              Jobs
            </Link>
            <Link
              onClick={handleNavlinkClick}
              href="/#features"
              className="text-gray-900 hover:text-emerald-600 transition-colors"
            >
              Features
            </Link>
            <Link
              onClick={handleNavlinkClick}
              href="/#how-it-works"
              className="text-gray-900 hover:text-emerald-600 transition-colors"
            >
              How it works
            </Link>
            <Link
              onClick={handleNavlinkClick}
              href="/#pricing"
              className="text-gray-900 hover:text-emerald-600 transition-colors"
            >
              Pricing
            </Link>
            <Link
              onClick={handleNavlinkClick}
              href="/#testimonials"
              className="text-gray-900 hover:text-emerald-600 transition-colors"
            >
              Testimonials
            </Link>
          </div>

          {/* CTA Buttons and User Profile */}
          <div className="hidden md:flex items-center gap-4">
            {!userState ? (
              <>
                <Link onClick={handleNavlinkClick} href="/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link onClick={handleNavlinkClick} href="/signup">
                  <Button className="bg-emerald-500 hover:bg-emerald-600 text-white">
                    Sign Up Free
                  </Button>
                </Link>
              </>
            ) : (
              <div className="relative" ref={dropdownRef}>
                {/* User Profile Avatar */}
                <div
                  className="cursor-pointer"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  title="User Menu"
                >
                  <div className="w-10 h-10 select-none rounded-full text-xs bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold border border-emerald-300 hover:bg-emerald-200 transition">
                    {userState?.profilePicture ? (
                      <div>
                        <Image
                          src={userState?.profilePicture || ""}
                          alt="User Avatar"
                          className="w-full h-full rounded-full object-cover"
                          width={100}
                          height={100}
                        />
                      </div>
                    ) : userState.displayName ? (
                      userState.displayName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()
                    ) : (
                      userState.email?.[0]?.toUpperCase() || "U"
                    )}
                  </div>
                </div>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                    <button
                      onClick={() => {
                        setIsDropdownOpen(false);
                        router.push("/profile");
                      }}
                      className="w-full px-4 py-2 text-left text-gray-700 hover:bg-emerald-50 flex items-center gap-2 transition-colors"
                    >
                      <UserIcon className="w-4 h-4" />
                      Profile
                    </button>
                    <button
                      onClick={() => {
                        setIsDropdownOpen(false);
                        handleLogout();
                      }}
                      className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 animate-fade-in text-center">
            <div className="flex flex-col gap-4">
              <Link
                onClick={handleNavlinkClick}
                href="/"
                className="text-gray-600 hover:text-emerald-600 transition-colors py-2"
              >
                <b>Home</b>
              </Link>
              <Link
                onClick={handleNavlinkClick}
                href="/jobs"
                className="text-gray-600 hover:text-emerald-600 transition-colors py-2"
              >
                <b>Jobs</b>
              </Link>
              <Link
                onClick={handleNavlinkClick}
                href="/#features"
                className="text-gray-600 hover:text-emerald-600 transition-colors py-2"
              >
                <b>Features</b>
              </Link>
              <Link
                onClick={handleNavlinkClick}
                href="/#how-it-works"
                className="text-gray-600 hover:text-emerald-600 transition-colors py-2"
              >
                <b>How it works</b>
              </Link>
              <Link
                onClick={handleNavlinkClick}
                href="/#pricing"
                className="text-gray-600 hover:text-emerald-600 transition-colors py-2"
              >
                <b>Pricing</b>
              </Link>
              <Link
                onClick={handleNavlinkClick}
                href="/#testimonials"
                className="text-gray-600 hover:text-emerald-600 transition-colors py-2"
              >
                <b>Testimonials</b>
              </Link>
              <div className="flex flex-col gap-2 pt-4 border-t border-gray-100">
                {!userState ? (
                  <>
                    <Link
                      onClick={handleNavlinkClick}
                      href="/login"
                      className="w-full"
                    >
                      Login
                    </Link>
                    <Link
                      onClick={handleNavlinkClick}
                      href="/signup"
                      className="w-full"
                    >
                      <Button className="w-full justify-center bg-emerald-500 hover:bg-emerald-600 text-white">
                        Sign Up Free
                      </Button>
                    </Link>
                  </>
                ) : (
                  <>
                    {/* User Profile Avatar (Mobile) */}
                    <div className="w-full flex justify-center">
                      <div
                        className="w-10 h-10 select-none rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-xs border border-emerald-300 hover:bg-emerald-200 transition cursor-pointer"
                        title="Profile"
                      >
                        {userState?.profilePicture ? (
                          <div>
                            <Image
                              src={userState?.profilePicture || ""}
                              alt={userState?.displayName || "User avatar"}
                              width={100}
                              height={100}
                              className="w-full h-full rounded-full object-cover"
                            />
                          </div>
                        ) : userState.displayName ? (
                          userState.displayName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()
                        ) : (
                          userState.email?.[0]?.toUpperCase() || "U"
                        )}
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full justify-center flex items-center gap-2"
                      onClick={() => {
                        setIsMenuOpen(false);
                        router.push("/profile");
                      }}
                    >
                      <UserIcon className="w-4 h-4" />
                      Profile
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-center border-red-500 text-red-400 hover:bg-red-50 hover:text-red-300 hover:border-red-400 flex items-center gap-2"
                      onClick={handleLogout}
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
