import React from 'react'
import { MPProfile, AIData, ChartData } from '@/lib/types'
import Image from 'next/image'
import { AlertTriangle } from 'lucide-react'
import { Component } from './ParTracker';

export default function MPPage({ data, id, aiData, chartData }: { data: MPProfile[], id: string, aiData: AIData, chartData: ChartData }) {
    const mp = data.find(item => item.id === id);

    if (!mp) {
        return <div className="text-light-1">MP not found</div>;
    }

    return (
        <>
            <div className="container mx-auto p-4">
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex-shrink-0">
                        <Image
                            src={mp.image_url}
                            alt={mp.mp_name}
                            width={200}
                            height={200}
                            className="rounded-full"
                        />
                    </div>
                    <div className="flex-grow">
                        <h1 className="text-3xl font-bold mb-4">{mp.mp_name}</h1>
                        <div className="flex flex-col md:flex-row gap-8">
                            <div className="flex-1">
                                <InfoItem label="State" value={mp.state} />
                                <InfoItem label="Constituency" value={mp.pc_name} />
                                <InfoItem label="Party" value={mp.mp_political_party} />
                                <InfoItem label="Nature of membership" value={mp.nature_membership} />
                                <InfoItem label="Start of Term" value={mp.term_start_date} />
                                <InfoItem label="End of Term" value={mp.term_end_date || 'In Office'} />
                            </div>
                            <div className="flex-1">
                                <h2 className="text-xl font-semibold mb-2">Personal Profile</h2>
                                <InfoItem label="Age" value={mp.mp_age.toString()} />
                                <InfoItem label="Gender" value={mp.mp_gender} />
                                <InfoItem label="Education" value={mp.educational_qualification} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8">
                    <h2 className="text-2xl font-bold mb-4">Parliamentary Activity</h2>
                    <Component />
                </div>

                <div className="mt-8">
                    <h2 className="text-2xl font-bold mb-4">AI Analysis</h2>
                    <div className="flex flex-col gap-6">
                        <AISection title="Main Agenda / Focus Areas" content={aiData?.main_agenda_or_focus_areas} />
                        <CriminalRecordSection title="Criminal Record / Corruption Issues" content={chartData?.cases} />
                        <LegislativeActivitySection title="Legislative Activity" content={chartData?.parliamentary_activities} />
                        <AISection title="Overall Performance" content={aiData?.overall_performance} />
                    </div>
                </div>
            </div>
        </>
    )
}

const CriminalRecordSection = ({ title, content }: { title: string, content: any }) => (
    <div className="bg-gray-100 p-4 rounded-lg">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <h4 className="font-semibold mt-2">Pending Cases:</h4>
        {content?.pending_cases?.map((caseItem: any, index: number) => (
            <div key={index} className="mb-2 p-2 bg-white rounded">
                <p><strong>Case Number:</strong> {caseItem["Case No."]}</p>
                <p><strong>Court:</strong> {caseItem?.court}</p>
                <p><strong>Charges Framed:</strong> {caseItem?.charges_framed ? 'Yes' : 'No'}</p>
                {caseItem?.date && <p><strong>Date:</strong> {caseItem?.date}</p>}
                <p><strong>Details:</strong> {caseItem?.details}</p>
            </div>
        ))}
        {
            content?.pending_cases?.length === 0 && (
                <p>No pending cases</p>
            )
        }
        <p><strong>Convicted Cases:</strong> {content?.convicted_cases.join(', ')}</p>
    </div>
)

const LegislativeActivitySection = ({ title, content }: { title: string, content: any }) => (
    <div className="bg-gray-100 p-4 rounded-lg">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p><strong>Questions Raised:</strong> {content?.questions.length}</p>
    </div>
)


const InfoItem = ({ label, value }: { label: string; value: string }) => (
    <p className="mb-2">
        <span className="font-semibold">{label}: </span>
        {value}
    </p>
)

const ActivityItem = ({ label, value, average }: { label: string; value: string; average: string }) => (
    <div className="flex-1 bg-gray-100 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">{label}</h3>
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-sm text-gray-600">National Average: {average}</p>
    </div>
)

const AISection = ({ title, content }: { title: string, content: any }) => (
    <div className="bg-gray-100 p-4 rounded-lg">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        {title === "Main Agenda / Focus Areas" && (
            <>
                <ul className="list-disc list-inside mb-2">
                    {content?.identified_themes.map((theme: string, index: number) => (
                        <li key={index}>{theme}</li>
                    ))}
                </ul>
                <p>{content?.focus_areas}</p>
            </>
        )}
        {title === "Criminal Record / Corruption Issues" && (
            <>
                <h4 className="font-semibold mt-2">Pending Cases:</h4>
                {content?.pending_cases?.map((caseItem: any, index: number) => (
                    <div key={index} className="mb-2 p-2 bg-white rounded">
                        <p><strong>Case Number:</strong> {caseItem?.case_number}</p>
                        <p><strong>Court:</strong> {caseItem?.court}</p>
                        <p><strong>Charges Framed:</strong> {caseItem?.charges_framed ? 'Yes' : 'No'}</p>
                        {caseItem?.date && <p><strong>Date:</strong> {caseItem?.date}</p>}
                        <p><strong>Details:</strong> {caseItem?.details}</p>
                    </div>
                ))}
                {
                    content?.pending_cases?.length === 0 && (
                        <p>No pending cases</p>
                    )
                }
                <p><strong>Convicted Cases:</strong> {content?.convicted_cases}</p>
                {
                    content?.convicted_cases?.length === 0 && (
                        <p>No convicted cases</p>
                    )
                }
            </>
        )}
        {title === "Legislative Activity" && (
            <>
                <p><strong>Questions Raised:</strong> {content?.questions_raised_count}</p>
                <p>{content?.activity_description}</p>
            </>
        )}
        {title === "Overall Performance" && (
            <>
                <p>{content?.impact}</p>
                <div className="flex items-start mt-2 p-2 bg-yellow-100 rounded">
                    <AlertTriangle className="text-yellow-500 mr-2 mt-1" />
                    <p><strong>Potential Concerns:</strong> {content?.potential_concerns}</p>
                </div>
            </>
        )}
    </div>
)