"use client";
import { useState } from "react";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProfilePictureUpload from "./ProfilePictureUpload";
import TagSelector from "./TagSelector";
import ResumeUpload from "./ResumeUpload";
import SocialLinks from "./SocialLinks";
import Link from "next/link";

const ProfileBuilder = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    bio: "",
    location: "",
    pronouns: "",
    website: "",
    calendar: "",
    profilePicture: null as File | null,
    resume: null as File | null,
    tags: [] as string[],
    socialLinks: {
      twitter: "",
      linkedin: "",
      instagram: "",
      figma: "",
    },
  });

  const [bioCount, setBioCount] = useState(0);
  const maxBioLength = 500;

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleBioChange = (value: string) => {
    if (value.length <= maxBioLength) {
      setBioCount(value.length);
      handleInputChange("bio", value);
    }
  };

  const handleFileUpload = (field: string, file: File | null) => {
    setFormData((prev) => ({
      ...prev,
      [field]: file,
    }));
  };

  const handleSaveProfile = () => {
    console.log("Saving profile:", formData);
  };

  return (
    <div className="space-y-6 pb-20 ">
      <Card className="shadow-md border rounded-2xl dark:bg-gray-900/50 dark:border-gray-800">
        <CardHeader>
          <CardTitle className="flex justify-between items-center text-xl font-semibold text-gray-900 dark:text-white">
            Basic Information
            <Link href="/profile">
              <Button variant="link">Back to profile</Button>
            </Link>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center">
            <ProfilePictureUpload
              onImageChange={(file) =>
                handleInputChange("profilePicture", file)
              }
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-sm font-medium">
                First Name
              </Label>
              <Input
                id="firstName"
                placeholder="Enter your first name"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                className="rounded-lg"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-sm font-medium">
                Last Name
              </Label>
              <Input
                id="lastName"
                placeholder="Enter your last name"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                className="rounded-lg"
              />
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <Label htmlFor="bio" className="text-sm font-medium">
              Bio
            </Label>
            <Textarea
              id="bio"
              placeholder="Tell us about yourself, your experience, and what you're passionate about..."
              value={formData.bio}
              onChange={(e) => handleBioChange(e.target.value)}
              className="rounded-lg min-h-[120px] resize-none"
            />
            <div className="text-right text-sm text-gray-500 dark:text-gray-400">
              {bioCount}/{maxBioLength}
            </div>
          </div>

          {/* Location and Pronouns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 w-full">
              <Label htmlFor="location" className="text-sm font-medium">
                Location
              </Label>
              <Select
                onValueChange={(value) => handleInputChange("location", value)}
              >
                <SelectTrigger className="rounded-lg w-full">
                  <SelectValue placeholder="Select your location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="remote">Remote</SelectItem>
                  <SelectItem value="new-york">New York, NY</SelectItem>
                  <SelectItem value="san-francisco">
                    San Francisco, CA
                  </SelectItem>
                  <SelectItem value="london">London, UK</SelectItem>
                  <SelectItem value="toronto">Toronto, ON</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="pronouns" className="text-sm font-medium">
                Pronouns
              </Label>
              <Select
                onValueChange={(value) => handleInputChange("pronouns", value)}
              >
                <SelectTrigger className="rounded-lg w-full">
                  <SelectValue placeholder="Select pronouns" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="he-him">He/Him</SelectItem>
                  <SelectItem value="she-her">She/Her</SelectItem>
                  <SelectItem value="they-them">They/Them</SelectItem>
                  <SelectItem value="prefer-not-to-say">
                    Prefer not to say
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Website and Calendar */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="website" className="text-sm font-medium">
                Website/Portfolio
              </Label>
              <Input
                id="website"
                placeholder="https://yourwebsite.com"
                value={formData.website}
                onChange={(e) => handleInputChange("website", e.target.value)}
                className="rounded-lg"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="calendar" className="text-sm font-medium">
                Calendar Link
              </Label>
              <Input
                id="calendar"
                placeholder="https://calendly.com/yourusername"
                value={formData.calendar}
                onChange={(e) => handleInputChange("calendar", e.target.value)}
                className="rounded-lg"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resume Upload Card */}
      <Card className="shadow-md border rounded-2xl dark:bg-gray-900/50 dark:border-gray-800">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
            Resume
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResumeUpload
            onFileChange={(file) => handleFileUpload("resume", file)}
            currentFile={formData.resume}
          />
        </CardContent>
      </Card>

      {/* Profile Tags Card */}
      <Card className="shadow-md border rounded-2xl dark:bg-gray-900/50 dark:border-gray-800">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
            Skills & Interests
          </CardTitle>
        </CardHeader>
        <CardContent>
          <TagSelector
            selectedTags={formData.tags}
            onTagsChange={(tags) => handleInputChange("tags", tags)}
          />
        </CardContent>
      </Card>

      {/* Social Links Card */}
      <Card className="shadow-md border rounded-2xl dark:bg-gray-900/50 dark:border-gray-800">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
            Social Links
          </CardTitle>
        </CardHeader>
        <CardContent>
          <SocialLinks
            socialLinks={formData.socialLinks}
            onSocialLinksChange={(links) =>
              handleInputChange("socialLinks", links)
            }
          />
        </CardContent>
      </Card>

      {/* Floating Save Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={handleSaveProfile}
          className="shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 rounded-2xl px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 dark:from-teal-500 dark:to-blue-600 dark:hover:from-teal-600 dark:hover:to-blue-700"
        >
          <Save className="h-5 w-5 mr-2" />
          Save Profile
        </Button>
      </div>
    </div>
  );
};

export default ProfileBuilder;
