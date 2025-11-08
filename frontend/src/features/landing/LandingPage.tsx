import { Link } from "react-router-dom";
import { Heart, Users, Shield, Sparkles } from "lucide-react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-primary dark:text-primary-500 mb-6">
              Flint
            </h1>
            <p className="text-2xl text-[#4A4A4A] dark:text-dark-text-secondary mb-4">
              Find Your Spark on Campus
            </p>
            <p className="text-lg text-[#6B8F60] dark:text-primary-600 mb-12 max-w-2xl mx-auto">
              The exclusive dating platform for college students. Connect with
              verified students from your campus and beyond.
            </p>

            <div className="flex gap-4 justify-center">
              <Link
                to="/signup"
                className="px-8 py-4 bg-primary dark:bg-primary-500 text-white rounded-full font-semibold text-lg hover:scale-105 transition-transform shadow-lg"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="px-8 py-4 bg-primary-100 dark:bg-dark-surface text-primary dark:text-primary-500 rounded-full font-semibold text-lg hover:scale-105 transition-transform border-2 border-primary dark:border-primary-500"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl font-bold text-center text-primary dark:text-primary-500 mb-16">
          Why Flint?
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            icon={<Shield className="w-12 h-12" />}
            title="Verified Students"
            description="Only verified college students with .edu emails can join"
          />
          <FeatureCard
            icon={<Users className="w-12 h-12" />}
            title="Campus Connect"
            description="Meet people from your college and nearby campuses"
          />
          <FeatureCard
            icon={<Heart className="w-12 h-12" />}
            title="Genuine Connections"
            description="Build meaningful relationships with fellow students"
          />
          <FeatureCard
            icon={<Sparkles className="w-12 h-12" />}
            title="Smart Matching"
            description="Find your perfect match with our intelligent algorithm"
          />
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-50 dark:bg-dark-surface py-20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold text-primary dark:text-primary-500 mb-6">
            Ready to Find Your Match?
          </h2>
          <p className="text-xl text-[#4A4A4A] dark:text-dark-text-secondary mb-8">
            Join thousands of college students already using Flint
          </p>
          <Link
            to="/signup"
            className="inline-block px-10 py-4 bg-primary dark:bg-primary-500 text-white rounded-full font-semibold text-lg hover:scale-105 transition-transform shadow-lg"
          >
            Create Your Account
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="p-6 bg-white dark:bg-dark-surface rounded-2xl shadow-md hover:shadow-xl transition-shadow border border-primary-200 dark:border-dark-border">
      <div className="text-primary dark:text-primary-500 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-primary dark:text-primary-500 mb-2">
        {title}
      </h3>
      <p className="text-[#4A4A4A] dark:text-dark-text-secondary">
        {description}
      </p>
    </div>
  );
}
