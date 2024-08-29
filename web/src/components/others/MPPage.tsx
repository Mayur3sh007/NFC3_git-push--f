'use client'

import React from 'react'
import { MPProfile, AIData, ChartData } from '@/lib/types'
import Image from 'next/image'
import { AlertTriangle, User, MapPin, Building, Calendar, Briefcase, School, Target, FileText, BarChart3, Award } from 'lucide-react'
import { Component } from './ParTracker'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function MPPage({ data, id, aiData, chartData }: { data: MPProfile[], id: string, aiData: AIData, chartData: ChartData }) {
    const mp = data.find(item => item.id === id);

    if (!mp) {
        return <div className="text-destructive">MP not found</div>;
    }

    return (
        <div className="container mx-auto p-4 space-y-8">
            <Card>
                <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                        <Image
                            src={mp.image_url}
                            alt={mp.mp_name}
                            width={200}
                            height={200}
                            className="rounded-full border-4 border-primary"
                        />
                        <div className="flex-grow space-y-4">
                            <h1 className="text-4xl font-bold">{mp.mp_name}</h1>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <InfoItem icon={<MapPin />} label="State" value={mp.state} />
                                <InfoItem icon={<Building />} label="Constituency" value={mp.pc_name} />
                                <InfoItem icon={<User />} label="Party" value={mp.mp_political_party} />
                                <InfoItem icon={<Briefcase />} label="Nature of membership" value={mp.nature_membership} />
                                <InfoItem icon={<Calendar />} label="Start of Term" value={mp.term_start_date} />
                                <InfoItem icon={<Calendar />} label="End of Term" value={mp.term_end_date || 'In Office'} />
                                <InfoItem icon={<User />} label="Age" value={mp.mp_age.toString()} />
                                <InfoItem icon={<User />} label="Gender" value={mp.mp_gender} />
                                <InfoItem icon={<School />} label="Education" value={mp.educational_qualification} />
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl font-bold flex items-center gap-2">
                        <BarChart3 className="text-primary" />
                        Parliamentary Activity
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Component />
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AISection icon={<Target />} title="Main Agenda / Focus Areas" content={aiData?.main_agenda_or_focus_areas} />
                <CriminalRecordSection icon={<AlertTriangle />} title="Criminal Record / Corruption Issues" content={chartData} />
                <LegislativeActivitySection icon={<FileText />} title="Legislative Activity" content={chartData?.parliamentary_activities} />
                <AISection icon={<Award />} title="Overall Performance" content={aiData?.overall_performance} />
            </div>
        </div>
    )
}

const InfoItem = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
    <div className="flex items-center gap-2">
        {icon}
        <span className="font-semibold">{label}:</span>
        <span>{value}</span>
    </div>
)

const CriminalRecordSection = ({ icon, title, content }: { icon: React.ReactNode, title: string, content: ChartData }) => (
    <Card>
        <CardHeader>
            <CardTitle className="text-xl font-semibold flex items-center gap-2">
                {icon}
                {title}
            </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
                <span className="font-semibold">Number of Criminal Cases:</span>
                <Badge variant={content.criminal_cases > 0 ? "destructive" : "secondary"}>{content.criminal_cases}</Badge>
            </div>
            <Separator />
            <div>
                <div className="flex items-center justify-between">
                    <h4 className="font-semibold mb-2">Laws Broken:</h4>
                    <Badge variant={content.laws_broken?.length > 0 ? "destructive" : "secondary"}>{content.laws_broken?.length}</Badge>
                </div>
                <ul className="list-disc list-inside space-y-1">
                    {content.laws_broken.map((law, index) => (
                        <li key={index}>{law}</li>
                    ))}
                </ul>
            </div>
        </CardContent>
    </Card>
)

const LegislativeActivitySection = ({ icon, title, content }: { icon: React.ReactNode, title: string, content: any }) => (
    <Card>
        <CardHeader>
            <CardTitle className="text-xl font-semibold flex items-center gap-2">
                {icon}
                {title}
            </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
                <span className="font-semibold">Questions Raised:</span>
                <Badge variant="secondary">{content?.questions.length}</Badge>
            </div>
            <Separator />
            <div>
                <h4 className="font-semibold mb-2">Debates Participated:</h4>
                <ul className="list-disc list-inside space-y-1">
                    {content?.debates.map((debate: any, index: number) => (
                        <li key={index}>{debate.Title} <span className="text-muted-foreground">({debate.Date})</span></li>
                    ))}
                </ul>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
                <span className="font-semibold">Bills Introduced:</span>
                <Badge variant="secondary">{content?.bills.length}</Badge>
            </div>
        </CardContent>
    </Card>
)

const AISection = ({ icon, title, content }: { icon: React.ReactNode, title: string, content: any }) => (
    <Card>
        <CardHeader>
            <CardTitle className="text-xl font-semibold flex items-center gap-2">
                {icon}
                {title}
            </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            {title === "Main Agenda / Focus Areas" && (
                <>
                    <ul className="list-disc list-inside space-y-1">
                        {content?.identified_themes.map((theme: string, index: number) => (
                            <li key={index}>{theme}</li>
                        ))}
                    </ul>
                    <Separator />
                    <p>{content?.focus_areas}</p>
                </>
            )}
            {title === "Overall Performance" && (
                <>
                    <p>{content?.impact}</p>
                    <Separator />
                    <div className="flex items-start p-2 bg-yellow-100 dark:bg-yellow-900 rounded">
                        <AlertTriangle className="text-yellow-500 mr-2 mt-1 flex-shrink-0" />
                        <p><strong>Potential Concerns:</strong> {content?.potential_concerns}</p>
                    </div>
                </>
            )}
        </CardContent>
    </Card>
)