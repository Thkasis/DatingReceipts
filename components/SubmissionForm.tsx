/**
 * Submission Form Component - Dating Receipts
 * The "Gold Mine" - Frictionless UGC collection
 */

"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/sonner";
import { Upload, Flag, Check } from "lucide-react";

export default function SubmissionForm() {
  const [formData, setFormData] = useState({
    screenshots: [] as File[],
    context: "",
    audacityScore: 5,
    legalConsent: false,
    email: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setFormData((prev) => ({
        ...prev,
        screenshots: [...prev.screenshots, ...files],
      }));
    }
  };

  const handleRemoveFile = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      screenshots: prev.screenshots.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.screenshots.length === 0) {
      toast.error("Please upload at least one screenshot");
      return;
    }

    if (!formData.legalConsent) {
      toast.error("Please confirm you grant permission to post this content");
      return;
    }

    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formData.screenshots.forEach((file) => {
        formDataToSend.append("screenshots", file);
      });
      formDataToSend.append("context", formData.context);
      formDataToSend.append("audacityScore", formData.audacityScore.toString());
      formDataToSend.append("legalConsent", formData.legalConsent.toString());
      if (formData.email && formData.email.trim() !== "") {
        formDataToSend.append("email", formData.email.trim());
      }

      const response = await fetch("/api/submit", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        setFormData({
          screenshots: [],
          context: "",
          audacityScore: 5,
          legalConsent: false,
          email: "",
        });
        toast.success("Receipt Printed! If we feature this, you're saving a life. 🚩");
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
        <Check className="h-16 w-16 text-red-flag mx-auto mb-6 animate-fade-up" />
        <h2 className="text-3xl font-headline font-bold text-white mb-4">
          Receipt Printed! 🚩
        </h2>
        <p className="text-muted-foreground font-mono text-lg mb-6">
          If we feature this, you're saving a life.
        </p>
        <Button
          variant="outline"
          onClick={() => setIsSuccess(false)}
        >
          Submit Another Receipt
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Screenshot Upload */}
      <div>
        <label className="block text-white font-headline font-bold mb-4">
          Upload Screenshot(s)
        </label>
        <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center hover:border-red-flag transition-colors">
          <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <Input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="hidden"
            id="screenshot-upload"
          />
          <label
            htmlFor="screenshot-upload"
            className="cursor-pointer inline-block"
          >
            <Button type="button" variant="outline" asChild>
              <span>Choose Files</span>
            </Button>
          </label>
          <p className="text-muted-foreground font-mono text-sm mt-4">
            Multiple images allowed
          </p>
        </div>

        {/* Preview Uploaded Files */}
        {formData.screenshots.length > 0 && (
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            {formData.screenshots.map((file, index) => (
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

      {/* Email (Optional) */}
      <div>
        <label htmlFor="email" className="block text-white font-headline font-bold mb-4">
          Email (Optional - for thank you confirmation)
        </label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, email: e.target.value }))
          }
          placeholder="your.email@example.com"
        />
        <p className="text-muted-foreground font-mono text-xs mt-2">
          We'll send you a thank you email with info about Dating Receipts
        </p>
      </div>

      {/* Context */}
      <div>
        <label htmlFor="context" className="block text-white font-headline font-bold mb-4">
          What happened? Give us the tea. (Optional)
        </label>
        <Textarea
          id="context"
          value={formData.context}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, context: e.target.value }))
          }
          placeholder="Tell us the story behind these screenshots..."
          rows={5}
        />
      </div>

      {/* Audacity Score */}
      <div>
        <label className="block text-white font-headline font-bold mb-4">
          The "Audacity Score": {formData.audacityScore}/10
        </label>
        <input
          type="range"
          min="1"
          max="10"
          value={formData.audacityScore}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              audacityScore: parseInt(e.target.value),
            }))
          }
          className="w-full h-2 bg-dark-elevated rounded-lg appearance-none cursor-pointer accent-red-flag"
        />
        <div className="flex justify-between text-xs text-muted-foreground font-mono mt-2">
          <span>Mild</span>
          <span>Extreme</span>
        </div>
      </div>

      {/* Legal Consent */}
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="legal-consent"
          checked={formData.legalConsent}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, legalConsent: e.target.checked }))
          }
          className="mt-1 w-5 h-5 accent-red-flag cursor-pointer"
          required
        />
        <label
          htmlFor="legal-consent"
          className="text-foreground font-mono text-sm cursor-pointer"
        >
          I grant Dating Receipts permission to post this content anonymously on
          social media and newsletters.
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
          "Printing Receipt..."
        ) : (
          <>
            <Flag className="mr-2 h-5 w-5" />
            Send Receipt
          </>
        )}
      </Button>
    </form>
  );
}

