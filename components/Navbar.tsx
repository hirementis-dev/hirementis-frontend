"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import Link from "next/link";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavlinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              onClick={handleNavlinkClick}
              href="/"
              className="flex items-center gap-2"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center text-white font-bold">
                H
              </div>
              <span className="text-lg font-bold">HireMentis</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              onClick={handleNavlinkClick}
              href="/"
              className="text-gray-600 hover:text-emerald-600 transition-colors"
            >
              Home
            </Link>
            <Link
              onClick={handleNavlinkClick}
              href="/jobs"
              className="text-gray-600 hover:text-emerald-600 transition-colors"
            >
              Jobs
            </Link>
            <Link
              onClick={handleNavlinkClick}
              href="/#features"
              className="text-gray-600 hover:text-emerald-600 transition-colors"
            >
              Features
            </Link>
            <Link
              onClick={handleNavlinkClick}
              href="/#how-it-works"
              className="text-gray-600 hover:text-emerald-600 transition-colors"
            >
              How it works
            </Link>
            <Link
              onClick={handleNavlinkClick}
              href="/#pricing"
              className="text-gray-600 hover:text-emerald-600 transition-colors"
            >
              Pricing
            </Link>
            <Link
              onClick={handleNavlinkClick}
              href="/#testimonials"
              className="text-gray-600 hover:text-emerald-600 transition-colors"
            >
              Testimonials
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link onClick={handleNavlinkClick} href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link onClick={handleNavlinkClick} href="/signup">
              <Button className="bg-emerald-500 hover:bg-emerald-600 text-white">
                Sign Up Free
              </Button>
            </Link>
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
          <div className="md:hidden py-4 animate-fade-in">
            <div className="flex flex-col gap-4">
              <Link
                onClick={handleNavlinkClick}
                href="/"
                className="text-gray-600 hover:text-emerald-600 transition-colors py-2"
              >
                Home
              </Link>
              <Link
                onClick={handleNavlinkClick}
                href="/jobs"
                className="text-gray-600 hover:text-emerald-600 transition-colors py-2"
              >
                Jobs
              </Link>
              <Link
                onClick={handleNavlinkClick}
                href="#features"
                className="text-gray-600 hover:text-emerald-600 transition-colors py-2"
              >
                Features
              </Link>
              <Link
                onClick={handleNavlinkClick}
                href="#how-it-works"
                className="text-gray-600 hover:text-emerald-600 transition-colors py-2"
              >
                How it works
              </Link>
              <Link
                onClick={handleNavlinkClick}
                href="#pricing"
                className="text-gray-600 hover:text-emerald-600 transition-colors py-2"
              >
                Pricing
              </Link>
              <Link
                onClick={handleNavlinkClick}
                href="#testimonials"
                className="text-gray-600 hover:text-emerald-600 transition-colors py-2"
              >
                Testimonials
              </Link>
              <div className="flex flex-col gap-2 pt-4 border-t border-gray-100">
                <Link
                  onClick={handleNavlinkClick}
                  href="/login"
                  className="w-full"
                >
                  <Button variant="outline" className="w-full justify-center">
                    Login
                  </Button>
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
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
