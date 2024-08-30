import React from "react";
import { BarChart3, FileText, Users, ShieldCheck, Vote } from "lucide-react";

export default function Hero() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
            Political Insight Platform
          </h1>
          <p className="mx-auto max-w-[700px] text-zinc-200 md:text-xl">
            Comprehensive tracking and analysis for political activities
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          <FeatureCard
            icon={<BarChart3 className="h-10 w-10" />}
            title="News Tracking & Sentiment"
            description="Monitor news mentions and analyze sentiment. Stay updated with how the politician is being discussed in the media and public sentiment towards them."
          />
          <FeatureCard
            icon={<FileText className="h-10 w-10" />}
            title="Parliamentary Activities"
            description="Track legislative contributions and involvement. Get insights into the politician's participation in parliamentary proceedings."
          />
          <FeatureCard
            icon={<Users className="h-10 w-10" />}
            title="Custom Scoring System"
            description="Utilize a robust scoring algorithm to evaluate political performance based on various metrics and activities."
          />
          <FeatureCard
            icon={<ShieldCheck className="h-10 w-10" />}
            title="Criminal Records"
            description="Check for any criminal cases or allegations. Ensure transparency in the politician's legal history."
          />
          <FeatureCard
            icon={<Vote className="h-10 w-10" />}
            title="Voting Record"
            description="Track the politician's voting history. Analyze patterns and consistency in their legislative decisions."
          />
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex flex-col items-center p-6 bg-white bg-opacity-10 rounded-lg backdrop-blur-lg transition-all hover:bg-opacity-20 hover:scale-105">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-zinc-200 text-sm text-center">{description}</p>
    </div>
  );
}