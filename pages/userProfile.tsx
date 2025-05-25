"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link'
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import { Loader } from '@/components/Loader';
import UserProfileCard from '@/app/profile/user_profile_card';
import InterviewHistoryCard from '@/app/profile/interviewhistorycard';
import { useRouter } from "next/navigation";
import { auth } from "@/firebase/client";

const UserProfile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthed, setIsAuthed] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      if (!firebaseUser || !firebaseUser.emailVerified) {
        router.replace("/login");
      } else {
        setIsAuthed(true);
      }
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  if (isLoading) {
    return <Loader loading={true} message="Loading profile..." />;
  }

  if (!isAuthed) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-mint-50/50 to-white">
      <Navbar />
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold">My Profile</h1>
          <p className="text-gray-600 mt-1">Manage your account and view interview history</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <UserProfileCard />
          {/* Interviews List */}
          <div className="lg:col-span-2">
            <InterviewHistoryCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;