'use client';

import React from 'react';
import { FaGithub } from "react-icons/fa";
import { Button, buttonVariants } from "@/components/ui/button";
import PoliticianCards from './PoliticianCards';

const Hero = () => {
  return (
    <section className="min-h-screen w-screen bg-gradient-to-br from-gray-900 to-gray-200 dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-20 md:py-32">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="text-center lg:text-start space-y-6">
            <main className="text-4xl md:text-5xl font-bold">
              <h1 className="inline">
                <span className="inline bg-gradient-to-r from-[#F596D3] to-[#D247BF] text-transparent bg-clip-text">
                  Politician
                </span>{" "}
                performance
              </h1>{" "}
              dashboard for{" "}
              <h2 className="inline">
                <span className="inline bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text">
                  informed
                </span>{" "}
                citizens
              </h2>
            </main>

            <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
              Track your representatives' activities, voting records, and public sentiment with our comprehensive dashboard.
            </p>

            <div className="space-y-4 md:space-y-0 md:space-x-4">
              <Button className="w-full md:w-auto">Explore Dashboard</Button>

              <a
                rel="noreferrer noopener"
                href="https://github.com/your-repo-link"
                target="_blank"
                className={`w-full md:w-auto ${buttonVariants({
                  variant: "outline",
                })}`}
              >
                View Source
                <FaGithub className="ml-2 w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="lg:max-w-[600px] w-full mx-auto">
            <PoliticianCards />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;