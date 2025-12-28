/**
 * Ghosters Form Component - Dating Receipts
 * Form to submit profiles of people who have ghosted users
 */

"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/sonner";
import { Upload, Ghost, Check } from "lucide-react";

export default function GhostersForm() {
  const [formData, setFormData] = useState({
    profileImages: [] as File[],
    profileName: "",
    platform: "",
    context: "",
    legalConsent: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setFormData((prev) => ({
        ...prev,
        profileImages: [...prev.profileImages, ...files],
      }));
    }
  };

  const handleRemoveFile = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      profileImages: prev.profileImages.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.profileImages.length === 0 && !formData.profileName) {
      toast.error("Please provide at least a profile name or image");
      return;
    }

    if (!formData.legalConsent) {
      toast.error("Please confirm you grant permission to post this content");
      return;
    }

    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formData.profileImages.forEach((file) => {
        formDataToSend.append("profileImages", file);
      });
      formDataToSend.append("profileName", formData.profileName);
      formDataToSend.append("platform", formData.platform);
      formDataToSend.append("context", formData.context);
      formDataToSend.append("legalConsent", formData.legalConsent.toString());

      const response = await fetch("/api/ghosters", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        setFormData({
          profileImages: [],
          profileName: "",
          platform: "",
          context: "",
          legalConsent: false,
        });
        toast.success("Ghoster reported! You're helping others avoid the same fate. 👻");
      } else {
        toast.error(data.error || "Failed to submit. Please try again.");
      }
    } catch (error) {
      toast.error("Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-dark-surface border border-muted rounded-lg p-12 text-center">
        <Ghost className="h-16 w-16 text-red-flag mx-auto mb-6 animate-fade-up" />
        <h2 className="text-3xl font-headline font-bold text-white mb-4">
          Ghoster Reported! 👻
        </h2>
        <p className="text-muted-foreground font-mono text-lg mb-6">
          Your submission helps others avoid being ghosted by the same person.
        </p>
        <Button
          variant="outline"
          onClick={() => setIsSuccess(false)}
        >
          Report Another Ghoster
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Profile Name */}
      <div>
        <label htmlFor="profileName" className="block text-white font-headline font-bold mb-4">
          Profile Name / Username (Optional)
        </label>
        <Input
          id="profileName"
          type="text"
          value={formData.profileName}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, profileName: e.target.value }))
          }
          placeholder="e.g., @username or John Doe"
        />
        <p className="text-muted-foreground font-mono text-xs mt-2">
          Leave blank if you only want to submit images
        </p>
      </div>

      {/* Platform */}
      <div>
        <label htmlFor="platform" className="block text-white font-headline font-bold mb-4">
          Platform / App (Optional)
        </label>
        <Input
          id="platform"
          type="text"
          value={formData.platform}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, platform: e.target.value }))
          }
          placeholder="e.g., Tinder, Hinge, Bumble, Instagram"
        />
      </div>

      {/* Profile Image Upload */}
      <div>
        <label className="block text-white font-headline font-bold mb-4">
          Profile Screenshot(s)
        </label>
        <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center hover:border-red-flag transition-colors">
          <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <Input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="hidden"
            id="profile-upload"
          />
          <label
            htmlFor="profile-upload"
            className="cursor-pointer inline-block"
          >
            <Button type="button" variant="outline" asChild>
              <span>Choose Files</span>
            </Button>
          </label>
          <p className="text-muted-foreground font-mono text-sm mt-4">
            Upload screenshots of their profile, messages, or any evidence
          </p>
        </div>

        {/* Preview Uploaded Files */}
        {formData.profileImages.length > 0 && (
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            {formData.profileImages.map((file, index) => (
              <div
                key={index}
                className="relative bg-dark-elevated border border-muted rounded-lg p-2"
              >
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-32 object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveFile(index)}
                  className="absolute top-1 right-1 bg-red-flag text-white rounded-full p-1 hover:bg-red-flag-dark"
                >
                  <span className="text-xs">×</span>
                </button>
                <p className="text-xs text-muted-foreground font-mono mt-1 truncate">
                  {file.name}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Context */}
      <div>
        <label htmlFor="context" className="block text-white font-headline font-bold mb-4">
          What happened? (Optional)
        </label>
        <Textarea
          id="context"
          value={formData.context}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, context: e.target.value }))
          }
          placeholder="Tell us about how they ghosted you..."
          rows={5}
        />
      </div>

      {/* Legal Consent */}
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="legal-consent-ghosters"
          checked={formData.legalConsent}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, legalConsent: e.target.checked }))
          }
          className="mt-1 w-5 h-5 accent-red-flag cursor-pointer"
          required
        />
        <label
          htmlFor="legal-consent-ghosters"
          className="text-foreground font-mono text-sm cursor-pointer"
        >
          I grant Dating Receipts permission to post this content anonymously on
          social media and newsletters. I confirm this is a real person who has ghosted me.
        </label>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="default"
        size="lg"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          "Reporting Ghoster..."
        ) : (
          <>
            <Ghost className="mr-2 h-5 w-5" />
            Report Ghoster
          </>
        )}
      </Button>
    </form>
  );
}

