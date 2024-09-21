"use client"

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { ChartData } from '@/lib/types'

export function ParTracker({ chartData }: { chartData: ChartData }) {
    const { parliamentary_activities } = chartData

    // Process the data to create a format suitable for the chart
    const processedData = parliamentary_activities.debates.map((debate, index) => ({
        date: debate.Date,
        debates: index + 1, // Cumulative count of debates
        questions: parliamentary_activities.questions.length, // Assuming questions don't have dates, use total count
        bills: parliamentary_activities.bills.length, // Assuming bills don't have dates, use total count
    }))

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Parliamentary Activity Tracker</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[400px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                            data={processedData}
                            margin={{
                                top: 10,
                                right: 30,
                                left: 0,
                                bottom: 0,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                dataKey="date"
                                tick={{ fill: 'hsl(var(--foreground))' }}
                                tickFormatter={(value) => new Date(value).toLocaleDateString()}
                            />
                            <YAxis tick={{ fill: 'hsl(var(--foreground))' }} />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'hsl(var(--background))',
                                    border: '1px solid hsl(var(--border))'
                                }}
                                labelStyle={{ color: 'hsl(var(--foreground))' }}
                            />
                            <Legend />
                            <Area
                                type="monotone"
                                dataKey="debates"
                                name="Debates"
                                stackId="1"
                                stroke="hsl(var(--primary))"
                                fill="hsl(var(--primary))"
                            />
                            <Area
                                type="monotone"
                                dataKey="questions"
                                name="Questions"
                                stackId="1"
                                stroke="hsl(215, 100%, 50%)"
                                fill="hsl(215, 100%, 50%)"
                            />
                            <Area
                                type="monotone"
                                dataKey="bills"
                                name="Bills"
                                stackId="1"
                                stroke="hsl(25, 100%, 50%)"
                                fill="hsl(25, 100%, 50%)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    )
}