import { Link } from "react-router-dom";
import { Heart, Shield, Users, Sparkles, CheckCircle } from "lucide-react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-primary-50 dark:from-dark-bg dark:to-dark-surface">
      <Navbar />

      {/* Hero Section - Tinder Style */}
      <section className="relative overflow-hidden pt-20 pb-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-6xl lg:text-7xl font-bold text-primary dark:text-primary-500 mb-6 leading-tight">
                Swipe Right
                <br />
                <span className="text-primary-600 dark:text-primary-400">
                  On Campus
                </span>
              </h1>
              <p className="text-xl text-[#4A4A4A] dark:text-dark-text-secondary mb-8 max-w-xl">
                Meet verified college students. Real connections. Real
                relationships. Only on Flint.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  to="/signup"
                  className="group relative px-8 py-4 bg-gradient-to-r from-primary to-primary-700 dark:from-primary-500 dark:to-primary-700 text-white rounded-full font-semibold text-lg shadow-2xl hover:shadow-primary/50 transition-all duration-300 hover:scale-105"
                >
                  <span className="relative z-10">Create Account</span>
                  <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
                </Link>
                <Link
                  to="/login"
                  className="px-8 py-4 bg-white dark:bg-dark-surface text-primary dark:text-primary-500 rounded-full font-semibold text-lg border-2 border-primary dark:border-primary-500 hover:bg-primary-50 dark:hover:bg-dark-border transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  Sign In
                </Link>
              </div>

              {/* Stats */}
              {/* <div className="mt-12 grid grid-cols-3 gap-6 max-w-md mx-auto lg:mx-0">
                <div className="text-center lg:text-left">
                  <div className="text-3xl font-bold text-primary dark:text-primary-500">
                    10K+
                  </div>
                  <div className="text-sm text-[#6B8F60] dark:text-primary-600">
                    Students
                  </div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-3xl font-bold text-primary dark:text-primary-500">
                    50+
                  </div>
                  <div className="text-sm text-[#6B8F60] dark:text-primary-600">
                    Colleges
                  </div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-3xl font-bold text-primary dark:text-primary-500">
                    1K+
                  </div>
                  <div className="text-sm text-[#6B8F60] dark:text-primary-600">
                    Matches
                  </div>
                </div>
              </div> */}
            </div>

            {/* Right Visual */}
            <div className="relative hidden lg:block">
              <div className="relative w-full h-[600px]">
                {/* Card Stack Effect */}
                <div className="absolute top-0 right-0 w-80 h-96 bg-gradient-to-br from-primary-100 to-primary-200 dark:from-dark-surface dark:to-dark-border rounded-3xl shadow-2xl transform rotate-6 opacity-50" />
                <div className="absolute top-8 right-8 w-80 h-96 bg-gradient-to-br from-primary-200 to-primary-300 dark:from-dark-border dark:to-dark-surface rounded-3xl shadow-2xl transform rotate-3 opacity-75" />
                <div className="absolute top-16 right-16 w-80 h-96 bg-white dark:bg-dark-surface rounded-3xl shadow-2xl p-6 border-4 border-primary-200 dark:border-primary-700">
                  <div className="h-full flex flex-col">
                    <div className="flex-1 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl mb-4 flex items-center justify-center">
                      <Heart className="w-24 h-24 text-white" />
                    </div>
                    <div className="space-y-2">
                      <div className="h-6 bg-primary-100 dark:bg-dark-border rounded w-3/4" />
                      <div className="h-4 bg-primary-50 dark:bg-dark-bg rounded w-1/2" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary-200 dark:bg-primary-900 rounded-full opacity-20 blur-xl" />
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-primary-300 dark:bg-primary-800 rounded-full opacity-20 blur-2xl" />
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white dark:bg-dark-surface">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-primary dark:text-primary-500 mb-4">
              Why Choose Flint?
            </h2>
            <p className="text-xl text-[#4A4A4A] dark:text-dark-text-secondary max-w-2xl mx-auto">
              The safest way to meet people on your campus
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<Shield className="w-12 h-12" />}
              title="100% Verified"
              description="Only students with verified .edu emails can join"
              gradient="from-primary-500 to-primary-700"
            />
            <FeatureCard
              icon={<Users className="w-12 h-12" />}
              title="Campus First"
              description="Connect with students from your college and nearby"
              gradient="from-primary-600 to-primary-800"
            />
            <FeatureCard
              icon={<Heart className="w-12 h-12" />}
              title="Real Connections"
              description="Build meaningful relationships, not just swipes"
              gradient="from-primary-500 to-primary-700"
            />
            <FeatureCard
              icon={<Sparkles className="w-12 h-12" />}
              title="Smart Matching"
              description="Our algorithm finds your perfect campus match"
              gradient="from-primary-600 to-primary-800"
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-gradient-to-b from-primary-50 to-white dark:from-dark-bg dark:to-dark-surface">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-primary dark:text-primary-500 mb-4">
              Get Started in 3 Steps
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <StepCard
              number="1"
              title="Sign Up"
              description="Create your account with your college email"
            />
            <StepCard
              number="2"
              title="Complete Profile"
              description="Add photos and tell us about yourself"
            />
            <StepCard
              number="3"
              title="Start Matching"
              description="Swipe, match, and connect with students"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-gradient-to-r from-primary to-primary-800 dark:from-primary-700 dark:to-primary-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-60 h-60 bg-white rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-5xl font-bold text-white mb-6">
            Ready to Find Your Match?
          </h2>
          <p className="text-xl text-primary-50 mb-10 max-w-2xl mx-auto">
            Join thousands of college students already using Flint to find
            meaningful connections
          </p>
          <Link
            to="/signup"
            className="inline-block px-12 py-5 bg-white text-primary rounded-full font-bold text-xl hover:scale-105 transition-transform shadow-2xl"
          >
            Get Started Free
          </Link>
          <p className="text-primary-100 mt-6 text-sm">
            No credit card required • Free forever
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  gradient,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
}) {
  return (
    <div className="group relative bg-white dark:bg-dark-surface rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-primary-100 dark:border-dark-border overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-transparent dark:from-dark-border dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="relative z-10">
        <div
          className={`w-16 h-16 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform`}
        >
          {icon}
        </div>
        <h3 className="text-2xl font-bold text-primary dark:text-primary-500 mb-3">
          {title}
        </h3>
        <p className="text-[#4A4A4A] dark:text-dark-text-secondary leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

function StepCard({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="relative text-center">
      <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-primary-700 dark:from-primary-500 dark:to-primary-800 text-white text-3xl font-bold rounded-full mb-6 shadow-xl">
        {number}
      </div>
      <h3 className="text-2xl font-bold text-primary dark:text-primary-500 mb-3">
        {title}
      </h3>
      <p className="text-[#4A4A4A] dark:text-dark-text-secondary">
        {description}
      </p>
    </div>
  );
}
