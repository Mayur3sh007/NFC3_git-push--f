import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { BarChart, FileText, Users, ShieldAlert } from "lucide-react";

const PoliticianCards = () => {
  return (
    <div className="grid grid-cols-4 grid-rows-3 gap-4 w-[800px] h-[600px] p-4">
      {/* Card 1: News Tracking and Sentiment Analysis */}
      <Card className="col-span-2 row-span-2 flex flex-col">
        <CardHeader className="flex-row items-center space-x-4">
          <div className="bg-primary/20 p-2 rounded-full">
            <BarChart className="text-primary h-6 w-6" />
          </div>
          <div>
            <CardTitle>News Tracking & Sentiment</CardTitle>
            <CardDescription>Monitor news mentions and analyze sentiment</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-sm">
            Stay updated with how the politician is being discussed in the media and public sentiment towards them.
          </p>
        </CardContent>
      </Card>

      {/* Card 2: Parliamentary Activity Tracking */}
      <Card className="col-span-2 row-span-1">
        <CardHeader className="flex-row items-center space-x-4">
          <div className="bg-primary/20 p-2 rounded-full">
            <FileText className="text-primary h-6 w-6" />
          </div>
          <div>
            <CardTitle>Parliamentary Activities</CardTitle>
            <CardDescription>Legislative contributions and involvement</CardDescription>
          </div>
        </CardHeader>
      </Card>

      {/* Card 3: Constituency Work */}
      <Card className="col-span-2 row-span-1">
        <CardHeader className="flex-row items-center space-x-4">
          <div className="bg-primary/20 p-2 rounded-full">
            <Users className="text-primary h-6 w-6" />
          </div>
          <div>
            <CardTitle>Custom Scoring System</CardTitle>
            <CardDescription>Robust Scoring Algorithm</CardDescription>
          </div>
        </CardHeader>
      </Card>

      {/* Card 4: Criminal Records */}
      <Card className="col-span-2 row-span-1">
        <CardHeader className="flex-row items-center space-x-4">
          <div className="bg-primary/20 p-2 rounded-full">
            <ShieldAlert className="text-primary h-6 w-6" />
          </div>
          <div>
            <CardTitle>Criminal Records</CardTitle>
            <CardDescription>Check for any criminal cases or allegations</CardDescription>
          </div>
        </CardHeader>
      </Card>

      {/* New Card 5: Voting Record */}
      <Card className="col-span-2 row-span-1">
        <CardHeader className="flex-row items-center space-x-4">
          <div className="bg-primary/20 p-2 rounded-full">
            <FileText className="text-primary h-6 w-6" />
          </div>
          <div>
            <CardTitle>Voting Record</CardTitle>
            <CardDescription>Track politician's voting history</CardDescription>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
};

export default PoliticianCards;