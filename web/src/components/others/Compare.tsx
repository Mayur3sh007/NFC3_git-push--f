'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { UserIcon, BarChart3Icon, BookOpenIcon, ScaleIcon } from 'lucide-react'

import { MPProfile, ChartData, AIData } from '@/lib/types'

type Politician = {
    profile: MPProfile;
    chartData: ChartData;
    aiData: AIData;
}

export default function Compare() {
    const [politician1, setPolitician1] = useState<Politician | null>(null)
    const [politician2, setPolitician2] = useState<Politician | null>(null)

    useEffect(() => {
        // Fetch data for both politicians
        // This is a placeholder for the actual API calls
        const fetchData = async () => {

            // const response1 = await fetch('/api/politician/1')
            // const response2 = await fetch('/api/politician/2')
            //   setPolitician1(await response1.json())
            //   setPolitician2(await response2.json())
        }
        fetchData()
    }, [])

    if (!politician1 || !politician2) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-center mb-8">Politician Comparison</h1>
            <div className="grid md:grid-cols-2 gap-8">
                <PoliticianCard politician={politician1} />
                <PoliticianCard politician={politician2} />
            </div>
        </div>
    )
}

function PoliticianCard({ politician }: { politician: Politician }) {
    const { profile, chartData, aiData } = politician

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <img src={profile.image_url} alt={profile.mp_name} className="w-12 h-12 rounded-full" />
                    <div>
                        <h2 className="text-xl">{profile.mp_name}</h2>
                        <p className="text-sm text-muted-foreground">{profile.mp_political_party}</p>
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="profile">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="profile"><UserIcon className="w-4 h-4 mr-2" />Profile</TabsTrigger>
                        <TabsTrigger value="performance"><BarChart3Icon className="w-4 h-4 mr-2" />Performance</TabsTrigger>
                        <TabsTrigger value="education"><BookOpenIcon className="w-4 h-4 mr-2" />Education</TabsTrigger>
                        <TabsTrigger value="legal"><ScaleIcon className="w-4 h-4 mr-2" />Legal</TabsTrigger>
                    </TabsList>
                    <TabsContent value="profile">
                        <dl className="grid grid-cols-2 gap-2 text-sm">
                            <dt>Age:</dt><dd>{profile.mp_age}</dd>
                            <dt>Gender:</dt><dd>{profile.mp_gender}</dd>
                            <dt>State:</dt><dd>{profile.state}</dd>
                            <dt>Constituency:</dt><dd>{profile.pc_name}</dd>
                            <dt>Term:</dt><dd>{profile.term}</dd>
                            <dt>Term Start:</dt><dd>{new Date(profile.term_start_date).toLocaleDateString()}</dd>
                            <dt>Term End:</dt><dd>{new Date(profile.term_end_date).toLocaleDateString()}</dd>
                        </dl>
                    </TabsContent>
                    <TabsContent value="performance">
                        <div className="space-y-4">
                            <PerformanceBar label="Attendance" value={profile.attendance} average={profile.attendance_national_average} />
                            <PerformanceBar label="Debates" value={profile.debates} average={profile.national_average_debate} />
                            <PerformanceBar label="Questions" value={profile.questions} average={profile.national_average_questions} />
                            <PerformanceBar label="Private Member Bills" value={profile.private_member_bills} average={profile.national_average_pmb} />
                        </div>
                    </TabsContent>
                    <TabsContent value="education">
                        <p><strong>Qualification:</strong> {profile.educational_qualification}</p>
                        <p className="mt-2"><strong>Details:</strong> {profile.educational_qualification_details}</p>
                    </TabsContent>
                    <TabsContent value="legal">
                        <div className="space-y-4">
                            <p><strong>Criminal Cases:</strong> {chartData.criminal_cases}</p>
                            <div>
                                <strong>Laws Broken:</strong>
                                <ScrollArea className="h-24 w-full rounded-md border p-2">
                                    {chartData.laws_broken.map((law, index) => (
                                        <Badge key={index} variant="secondary" className="mr-1 mb-1">{law}</Badge>
                                    ))}
                                </ScrollArea>
                            </div>
                            <div>
                                <strong>Pending Cases:</strong> {chartData.cases.pending_cases.length}
                            </div>
                            <div>
                                <strong>Convicted Cases:</strong> {chartData.cases.convicted_cases.length}
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    )
}

function PerformanceBar({ label, value, average }: { label: string; value: number | null; average: number | null }) {
    if (value === null || average === null) return null

    const percentage = Math.round((value / average) * 100)

    return (
        <div>
            <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">{label}</span>
                <span className="text-sm font-medium">{value} (Avg: {average})</span>
            </div>
            <Progress value={percentage} className="h-2" />
        </div>
    )
}