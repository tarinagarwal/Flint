import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "../../lib/AuthContext";
import apiClient from "../../lib/api-client";
import Loader from "../../components/ui/Loader";
import PhotoUpload from "../../components/ui/PhotoUpload";
import CustomDropdown from "../../components/ui/CustomDropdown";

export default function EditProfilePage() {
  const navigate = useNavigate();
  const { user, login, token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    username: user?.username || "",
    bio: user?.bio || "",
    interests:
      user?.interests && user.interests.length > 0 ? user.interests : [""],
    photos: user?.photos || [],
    preferences: {
      lookingFor: user?.preferences?.lookingFor || "friendship",
      ageRange: {
        min: user?.preferences?.ageRange?.min || 18,
        max: user?.preferences?.ageRange?.max || 30,
      },
      distance: user?.preferences?.distance || 50,
      genderPreference: user?.preferences?.genderPreference || "everyone",
    },
  });

  const lookingForOptions = [
    { id: "friendship", label: "Friendship" },
    { id: "dating", label: "Dating" },
    { id: "relationship", label: "Relationship" },
    { id: "networking", label: "Networking" },
  ];

  const genderOptions = [
    { id: "everyone", label: "Everyone" },
    { id: "male", label: "Male" },
    { id: "female", label: "Female" },
    { id: "non-binary", label: "Non-binary" },
  ];

  const handleAddInterest = () => {
    if (formData.interests.length < 10) {
      setFormData({ ...formData, interests: [...formData.interests, ""] });
    }
  };

  const handleRemoveInterest = (index: number) => {
    if (formData.interests.length > 1) {
      const newInterests = formData.interests.filter((_, i) => i !== index);
      setFormData({ ...formData, interests: newInterests });
    }
  };

  const handleInterestChange = (index: number, value: string) => {
    const newInterests = [...formData.interests];
    newInterests[index] = value;
    setFormData({ ...formData, interests: newInterests });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    const validInterests = formData.interests.filter((i) => i.trim() !== "");

    if (!formData.name.trim()) {
      setError("Name is required");
      return;
    }

    if (!formData.username.trim()) {
      setError("Username is required");
      return;
    }

    if (!formData.bio.trim()) {
      setError("Bio is required");
      return;
    }

    if (validInterests.length === 0) {
      setError("At least one interest is required");
      return;
    }

    if (formData.photos.length === 0) {
      setError("Profile photo is required");
      return;
    }

    setLoading(true);

    try {
      const response = await apiClient.patch("/api/auth/update-profile", {
        name: formData.name,
        username: formData.username,
        bio: formData.bio,
        interests: validInterests,
        photos: formData.photos,
        preferences: formData.preferences,
      });

      // Update user in context
      if (token) {
        login(token, response.data.user);
      }

      setSuccess(true);
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 dark:from-dark-bg dark:via-dark-surface dark:to-dark-bg">
      {/* Header */}
      <div className="bg-white/80 dark:bg-dark-surface/80 backdrop-blur-lg border-b border-primary-200 dark:border-dark-border sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/dashboard")}
              className="p-2 hover:bg-primary-100 dark:hover:bg-dark-border rounded-full transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-[#1A1A1A] dark:text-dark-text" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-[#1A1A1A] dark:text-dark-text">
                Edit Profile
              </h1>
              <p className="text-sm text-[#4A4A4A] dark:text-dark-text-secondary">
                Update your profile information
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-dark-surface rounded-3xl shadow-xl p-8 border border-primary-200 dark:border-dark-border space-y-6"
        >
          {error && (
            <div className="p-4 bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400">
              {error}
            </div>
          )}

          {success && (
            <div className="p-4 bg-green-100 dark:bg-green-900/20 border border-green-300 dark:border-green-800 rounded-lg text-green-700 dark:text-green-400">
              Profile updated successfully! Redirecting...
            </div>
          )}

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-[#4A4A4A] dark:text-dark-text-secondary mb-2">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-4 py-3 bg-white dark:bg-dark-surface border border-primary-200 dark:border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-500 text-[#1A1A1A] dark:text-dark-text"
              placeholder="Your name"
            />
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-[#4A4A4A] dark:text-dark-text-secondary mb-2">
              Username <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              className="w-full px-4 py-3 bg-white dark:bg-dark-surface border border-primary-200 dark:border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-500 text-[#1A1A1A] dark:text-dark-text"
              placeholder="username"
            />
          </div>

          {/* Email (Read-only) */}
          <div>
            <label className="block text-sm font-medium text-[#4A4A4A] dark:text-dark-text-secondary mb-2">
              Email (Cannot be changed)
            </label>
            <input
              type="email"
              value={user.email}
              disabled
              className="w-full px-4 py-3 bg-primary-50 dark:bg-dark-bg border border-primary-200 dark:border-dark-border rounded-lg text-[#4A4A4A] dark:text-dark-text-secondary cursor-not-allowed"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium text-[#4A4A4A] dark:text-dark-text-secondary mb-2">
              Bio <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.bio}
              onChange={(e) =>
                setFormData({ ...formData, bio: e.target.value })
              }
              placeholder="Tell us about yourself..."
              rows={4}
              maxLength={500}
              className="w-full px-4 py-3 bg-white dark:bg-dark-surface border border-primary-200 dark:border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-500 text-[#1A1A1A] dark:text-dark-text resize-none"
            />
            <p className="text-xs text-[#6B8F60] dark:text-primary-600 mt-1">
              {formData.bio.length}/500 characters
            </p>
          </div>

          {/* Interests */}
          <div>
            <label className="block text-sm font-medium text-[#4A4A4A] dark:text-dark-text-secondary mb-2">
              Interests <span className="text-red-500">*</span>
            </label>
            <div className="space-y-2">
              {formData.interests.map((interest, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={interest}
                    onChange={(e) =>
                      handleInterestChange(index, e.target.value)
                    }
                    placeholder={`Interest ${index + 1}`}
                    maxLength={50}
                    className="flex-1 px-4 py-2 bg-white dark:bg-dark-surface border border-primary-200 dark:border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-500 text-[#1A1A1A] dark:text-dark-text"
                  />
                  {formData.interests.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveInterest(index)}
                      className="px-4 py-2 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/30 transition-colors"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </div>
            {formData.interests.length < 10 && (
              <button
                type="button"
                onClick={handleAddInterest}
                className="mt-2 text-sm text-primary dark:text-primary-500 hover:underline"
              >
                + Add another interest
              </button>
            )}
          </div>

          {/* Profile Photo */}
          <div>
            <label className="block text-sm font-medium text-[#4A4A4A] dark:text-dark-text-secondary mb-2">
              Profile Photo <span className="text-red-500">*</span>
            </label>
            <PhotoUpload
              photos={formData.photos}
              onPhotosChange={(photos) => setFormData({ ...formData, photos })}
              maxPhotos={1}
            />
          </div>

          {/* Preferences */}
          <div className="space-y-4 p-6 bg-gradient-to-br from-primary-50 to-white dark:from-dark-bg dark:to-dark-surface rounded-2xl border border-primary-200 dark:border-dark-border">
            <h3 className="text-lg font-semibold text-[#1A1A1A] dark:text-dark-text">
              Dating Preferences
            </h3>

            {/* Looking For */}
            <div>
              <label className="block text-sm font-medium text-[#4A4A4A] dark:text-dark-text-secondary mb-2">
                Looking For
              </label>
              <CustomDropdown
                options={lookingForOptions}
                value={formData.preferences.lookingFor}
                onChange={(value) =>
                  setFormData({
                    ...formData,
                    preferences: { ...formData.preferences, lookingFor: value },
                  })
                }
                placeholder="Select what you're looking for"
              />
            </div>

            {/* Age Range */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#4A4A4A] dark:text-dark-text-secondary mb-2">
                  Min Age
                </label>
                <input
                  type="number"
                  min="18"
                  max="100"
                  value={formData.preferences.ageRange.min}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      preferences: {
                        ...formData.preferences,
                        ageRange: {
                          ...formData.preferences.ageRange,
                          min: parseInt(e.target.value) || 18,
                        },
                      },
                    })
                  }
                  className="w-full px-4 py-3 bg-white dark:bg-dark-surface border border-primary-200 dark:border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-500 text-[#1A1A1A] dark:text-dark-text"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#4A4A4A] dark:text-dark-text-secondary mb-2">
                  Max Age
                </label>
                <input
                  type="number"
                  min="18"
                  max="100"
                  value={formData.preferences.ageRange.max}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      preferences: {
                        ...formData.preferences,
                        ageRange: {
                          ...formData.preferences.ageRange,
                          max: parseInt(e.target.value) || 30,
                        },
                      },
                    })
                  }
                  className="w-full px-4 py-3 bg-white dark:bg-dark-surface border border-primary-200 dark:border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-500 text-[#1A1A1A] dark:text-dark-text"
                />
              </div>
            </div>

            {/* Distance */}
            <div>
              <label className="block text-sm font-medium text-[#4A4A4A] dark:text-dark-text-secondary mb-2">
                Distance: {formData.preferences.distance} km
              </label>
              <input
                type="range"
                min="1"
                max="100"
                value={formData.preferences.distance}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    preferences: {
                      ...formData.preferences,
                      distance: parseInt(e.target.value),
                    },
                  })
                }
                className="w-full h-2 bg-primary-200 dark:bg-dark-border rounded-lg appearance-none cursor-pointer accent-primary dark:accent-primary-500"
              />
              <div className="flex justify-between text-xs text-[#4A4A4A] dark:text-dark-text-secondary mt-1">
                <span>1 km</span>
                <span>100 km</span>
              </div>
            </div>

            {/* Gender Preference */}
            <div>
              <label className="block text-sm font-medium text-[#4A4A4A] dark:text-dark-text-secondary mb-2">
                Gender Preference
              </label>
              <CustomDropdown
                options={genderOptions}
                value={formData.preferences.genderPreference}
                onChange={(value) =>
                  setFormData({
                    ...formData,
                    preferences: {
                      ...formData.preferences,
                      genderPreference: value,
                    },
                  })
                }
                placeholder="Select gender preference"
              />
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              disabled={loading}
              className="flex-1 py-3 bg-primary-100 dark:bg-dark-border text-[#1A1A1A] dark:text-dark-text rounded-lg font-semibold hover:bg-primary-200 dark:hover:bg-dark-border/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || success}
              className="flex-1 py-3 bg-gradient-to-r from-primary to-primary-700 dark:from-primary-500 dark:to-primary-700 text-white rounded-lg font-semibold hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading && <Loader size="sm" />}
              {loading ? "Saving..." : success ? "Saved! ✓" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
