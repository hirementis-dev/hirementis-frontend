"use client";
import React from "react";
import Link from "next/link";
import { Linkedin, Twitter } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-100 pt-16 pb-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-16">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center text-white font-bold shadow-md">
                H
              </div>
              <span className="text-xl font-bold text-slate-900 tracking-tight">
                HireMentis
              </span>
            </div>
            <p className="text-slate-500 mb-6 max-w-sm leading-relaxed">
              Empowering job seekers with AI-driven interview preparation to
              land their dream roles with confidence.
            </p>
            <div className="flex gap-4">
              <a
                href="https://x.com/HireMentis"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 transition-all duration-300"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/hirementis/"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 transition-all duration-300"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-slate-900 mb-6">Product</h3>
            <ul className="space-y-4">
              {["Features", "Pricing", "Testimonials", "Enterprise"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href={`/#${item.toLowerCase()}`}
                      className="text-slate-500 hover:text-emerald-600 transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-slate-900 mb-6">Support</h3>
            <ul className="space-y-4">
              {["Help Center", "Documentation", "Contact Us", "Status"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-slate-500 hover:text-emerald-600 transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-slate-900 mb-6">Company</h3>
            <ul className="space-y-4">
              {["About Us", "Meet the Founders", "Blog", "Press"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-slate-500 hover:text-emerald-600 transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-sm">
            © {new Date().getFullYear()} HireMentis. All rights reserved.
          </p>
          <div className="flex gap-8">
            <Link
              href="/links/privacy"
              className="text-slate-400 text-sm hover:text-emerald-600 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/links/terms"
              className="text-slate-400 text-sm hover:text-emerald-600 transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
