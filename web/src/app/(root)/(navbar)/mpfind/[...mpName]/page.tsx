'use client'

import MPPage from '@/components/others/MPPage'
import { useMPs } from '@/context/MPContext'
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { AIData, ChartData } from '@/lib/types'
import axios from 'axios';
import { set } from 'date-fns'

const Page = () => {
    const { data } = useMPs()
    const params = useParams()
    const id = params.mpName[0] as string
    const mp = data.find(item => item.id === id);
    const [aiData, setAIData] = React.useState<AIData>({
        main_agenda_or_focus_areas: {
            identified_themes: [],
            focus_areas: "",
        },
        criminal_record_or_corruption_issues: {
            pending_cases: [],
            convicted_cases: "",
        },
        legislative_activity: {
            questions_raised_count: 0,
            activity_description: "",
        },
        overall_performance: {
            impact: "",
            potential_concerns: "",
        },
    });
    const [chartData, setChartData] = React.useState<ChartData>({
        profile_url: "",
        cases: {
            pending_cases: [],
            convicted_cases: [],
        },
        parliamentary_activities: {
            questions: [],
            debates: [],
            bills: [],
        },
    });

    useEffect(() => {
        if (!mp) return;
        async function fetchAIData() {
            try {
                const response = await axios.post('http://127.0.0.1:5000/get_summary', {
                    name: mp?.mp_name
                }, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                const data = await response.data.summary;
                const parsedData = JSON.parse(data);
                // console.log(parsedData);
                setAIData(parsedData);
            } catch (error) {
                console.error('Error fetching AI data:', error);
            }
        }
        fetchAIData();

        async function fetchChartData() {
            try {
                const response = await axios.post('http://127.0.0.1:5000/get_scraped_data', {
                    name: mp?.mp_name
                }, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                const data = await response.data;
                console.log(data)
                setChartData(data);
            } catch (error) {
                console.error('Error fetching AI data:', error);
            }
        }
        fetchChartData();
    }, []);

    return (
        // <div>temp</div>
        <MPPage data={data} id={id} aiData={aiData} chartData={chartData} />
    )
}

export default Page
