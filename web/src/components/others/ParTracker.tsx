"use client"

import * as React from "react"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { subMonths, format, parse, isAfter } from "date-fns"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type ChartData = {
    profile_url: string
    cases: {
        pending_cases: any[]
        convicted_cases: any[]
    }
    parliamentary_activities: {
        questions: any[]
        debates: {
            Date: string
            Title: string
            Link: string
            Type: string
        }[]
        bills: any[]
    }
}

const chartDatas: ChartData[] = [
    {
        profile_url: "https://myneta.info/LokSabha2024/candidate.php?candidate_id=6236",
        cases: {
            pending_cases: [
                // ... (pending cases data)
            ],
            convicted_cases: [
                { "Serial No.": "---------No Cases--------" }
            ]
        },
        parliamentary_activities: {
            questions: [],
            debates: [
                {
                    Date: "08.08.2024",
                    Title: "Opposed the introduction of The Waqf (Amendment) Bill, 2024",
                    Link: "/mptrack/debatenotfound",
                    Type: "Government Bills"
                },
                {
                    Date: "30.07.2024",
                    Title: "(i) General Discussion on the Budget\ufffd2024-25; (ii) General Discussion on the Budget of Union Territory of Jammu and Kashmir for 2024-25; and (iii) Demands for Grants in respect of Union Territory of Jammu and Kashmir-2024-25.",
                    Link: "/mptrack/debatenotfound",
                    Type: "Budget (General)"
                },
                {
                    Date: "29.07.2024",
                    Title: "Request to govt an inquiry should be set up against the delhi govt. in the incident of 3 student deaths in old rajinder nagar",
                    Link: "/mptrack/debatenotfound",
                    Type: "Special Mention"
                },
                {
                    Date: "02.07.2024",
                    Title: "Motion of Thanks on the President's Address",
                    Link: "/mptrack/debatenotfound",
                    Type: "Motion of Thanks on the President's Address"
                }
            ],
            bills: []
        }
    }
]

type ActivityData = {
    date: string
    questions: number
    debates: number
    bills: number
}

const parseDate = (dateString: string) => parse(dateString, "dd.MM.yyyy", new Date())

const generateChartData = (data: ChartData[], timeRange: number): ActivityData[] => {
    const endDate = new Date()
    const startDate = subMonths(endDate, timeRange)

    const activityMap = new Map<string, ActivityData>()

    data.forEach(item => {
        let questionCount = 0
        let debateCount = 0
        let billCount = 0

        item.parliamentary_activities.questions.forEach(question => {
            const date = parseDate(question.Date)
            if (isAfter(date, startDate)) {
                questionCount++
                updateActivityMap(activityMap, date, { questions: questionCount, debates: debateCount, bills: billCount })
            }
        })

        item.parliamentary_activities.debates.forEach(debate => {
            const date = parseDate(debate.Date)
            if (isAfter(date, startDate)) {
                debateCount++
                updateActivityMap(activityMap, date, { questions: questionCount, debates: debateCount, bills: billCount })
            }
        })

        item.parliamentary_activities.bills.forEach(bill => {
            const date = parseDate(bill.Date)
            if (isAfter(date, startDate)) {
                billCount++
                updateActivityMap(activityMap, date, { questions: questionCount, debates: debateCount, bills: billCount })
            }
        })
    })

    return Array.from(activityMap.values()).sort((a, b) => parseDate(a.date).getTime() - parseDate(b.date).getTime())
}

const updateActivityMap = (map: Map<string, ActivityData>, date: Date, counts: { questions: number, debates: number, bills: number }) => {
    const dateString = format(date, "yyyy-MM-dd")
    const existing = map.get(dateString) || { date: dateString, questions: 0, debates: 0, bills: 0 }
    map.set(dateString, {
        date: dateString,
        questions: Math.max(existing.questions, counts.questions),
        debates: Math.max(existing.debates, counts.debates),
        bills: Math.max(existing.bills, counts.bills)
    })
}

export function Component() {
    const [timeRange, setTimeRange] = React.useState("3")
    const chartData = generateChartData(chartDatas, parseInt(timeRange))

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="space-y-1">
                    <CardTitle>Parliamentary Activity Tracker</CardTitle>
                    <CardDescription>Track questions, debates, and bills over time</CardDescription>
                </div>
                <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select time range" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="1">Last 1 month</SelectItem>
                        <SelectItem value="3">Last 3 months</SelectItem>
                        <SelectItem value="6">Last 6 months</SelectItem>
                        <SelectItem value="12">Last 12 months</SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent className="pb-4">
                <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData}>
                            <XAxis
                                dataKey="date"
                                stroke="#888888"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                            />
                            <YAxis
                                stroke="#888888"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => `${value}`}
                            />
                            <Tooltip />
                            <Line type="monotone" dataKey="questions" stroke="#8884d8" strokeWidth={2} />
                            <Line type="monotone" dataKey="debates" stroke="#82ca9d" strokeWidth={2} />
                            <Line type="monotone" dataKey="bills" stroke="#ffc658" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    )
}