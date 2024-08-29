'use client'

import MPPage from '@/components/others/MPPage'
import { useMPs } from '@/context/MPContext'
import { useParams } from 'next/navigation'
import React from 'react'
import { AIData, ChartData } from '@/lib/types'

const chartData: ChartData[] = [
    {
        "profile_url": "https://myneta.info/LokSabha2024/candidate.php?candidate_id=6236",
        "cases": {
            "pending_cases": [
                {
                    "Serial No.": "1",
                    "FIR No.": "0023/2022, Thana Saifai, District Etawah",
                    "Case No.": "",
                    "Court": "",
                    "IPC Sections Applicable": "188",
                    "Other Details / Other Acts / Sections Applicable": "Section 130 R. P. Act",
                    "Charges Framed": "No",
                    "Date on which charges were framed": "",
                    "Appeal Filed": "No",
                    "Details and present status of appeal": ""
                },
                {
                    "Serial No.": "2",
                    "FIR No.": "0078/2022, Thana Dadri Dist Greater Noida (Gautambudhnagar)",
                    "Case No.": "16331/2023",
                    "Court": "Civil Judge (Senior Division).F.T.C./M.P/M.L.A. Court Dist Gautambudhnagar",
                    "IPC Sections Applicable": "188, 269, 270",
                    "Other Details / Other Acts / Sections Applicable": "Sec.3/4 Epidemic Act, 1897",
                    "Charges Framed": "No",
                    "Date on which charges were framed": "",
                    "Appeal Filed": "Yes",
                    "Details and present status of appeal": "Honorable High Court Allahabad Criminal Miscellaneous Application no-44373/2023, Sec. 482, C.R.P.C., Dt-05.12.2023"
                },
                {
                    "Serial No.": "3",
                    "FIR No.": "0084/2020, Thana Gautampalli, District Lucknow",
                    "Case No.": "",
                    "Court": "",
                    "IPC Sections Applicable": "188",
                    "Other Details / Other Acts / Sections Applicable": "Section 54 Disaster Management Act 2005 & Section 3 Epidemic Act 1897",
                    "Charges Framed": "No",
                    "Date on which charges were framed": "",
                    "Appeal Filed": "No",
                    "Details and present status of appeal": ""
                }
            ],
            "convicted_cases": [
                {
                    "Serial No.": "---------No Cases--------"
                }
            ]
        },
        "parliamentary_activities": {
            "questions": [],
            "debates": [
                {
                    "Date": "08.08.2024",
                    "Title": "Opposed the introduction of The Waqf (Amendment) Bill, 2024",
                    "Link": "/mptrack/debatenotfound",
                    "Type": "Government Bills"
                },
                {
                    "Date": "30.07.2024",
                    "Title": "(i) General Discussion on the Budget\ufffd2024-25; (ii) General Discussion on the Budget of Union Territory of Jammu and Kashmir for 2024-25; and (iii) Demands for Grants in respect of Union Territory of Jammu and Kashmir-2024-25.",
                    "Link": "/mptrack/debatenotfound",
                    "Type": "Budget (General)"
                },
                {
                    "Date": "29.07.2024",
                    "Title": "Request to govt an inquiry should be set up against the delhi govt. in the incident of 3 student deaths in old rajinder nagar",
                    "Link": "/mptrack/debatenotfound",
                    "Type": "Special Mention"
                },
                {
                    "Date": "02.07.2024",
                    "Title": "Motion of Thanks on the President's Address",
                    "Link": "/mptrack/debatenotfound",
                    "Type": "Motion of Thanks on the President's Address"
                }
            ],
            "bills": []
        }
    }
];

const aiData: AIData[] = [
    {
        main_agenda_or_focus_areas: {
            identified_themes: [
                "Economy and Development",
                "Infrastructure",
                "Youth Empowerment",
                "Sustainable Development",
                "State-wise Projects"
            ],
            focus_areas: "The politician's main agenda appears to focus on economic and development-related issues, infrastructure, youth empowerment, sustainable development, and state-wise projects."
        },
        criminal_record_or_corruption_issues: {
            pending_cases: [
                {
                    case_number: "FIR No. 64/2020",
                    court: "Patna Civil Court Patna Sadar (121 ACJM-2)",
                    charges_framed: true,
                    date: "29 Jan 2022",
                    details: "Case No. 2981/2020 related to P.S-Sachivalaya Patna"
                },
                {
                    case_number: "FIR No. 360/2020",
                    court: "Patna Civil Court Patna Sadar (76, SDJM)",
                    charges_framed: false,
                    date: "",
                    details: "Case No. 7323/2020 related to P.S-Gandhi Maidan Patna"
                },
                {
                    case_number: "FIR No. 140/2018",
                    court: "Civil Court (19-Addl Dist & Session Judge-VI)",
                    charges_framed: true,
                    date: "23 Jun 2022",
                    details: "Case No. 18/2019 related to P.S-Magadh Medical College Gaya"
                }
            ],
            convicted_cases: "No convicted cases available."
        },
        legislative_activity: {
            questions_raised_count: 19,
            activity_description: "The politician has raised a total of 19 questions in the Lok Sabha, showing a high level of legislative engagement. The questions cover a diverse range of topics, including those related to economic development, infrastructure, youth empowerment, and sustainable development, which is a positive sign of their interest in legislative work."
        },
        overall_performance: {
            impact: "Based on the available data, the politician appears to be actively engaged in legislative work and has raised questions on a wide range of topics. This suggests that they may be making an effort to address the concerns of their constituents and engage with issues that matter to them. However, pending cases and lack of information on convicted cases may raise some concerns about their integrity.",
            potential_concerns: "The pending cases against the politician, particularly Case No. 2981/2020, may raise concerns about their involvement in criminal activities or corruption. Further investigation and transparency on these cases would be necessary to clarify these concerns."
        }
    }
];

const Page = () => {
    const { data } = useMPs()
    const params = useParams()
    const id = params.mpName[0] as string

    return (
        <MPPage data={data} id={id} aiData={aiData} />
    )
}

export default Page