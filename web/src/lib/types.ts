export type User = {
    username: string;
    firstName: string;
};

export type MPProfile = {
    id: string,
    attendance: number | null;
    attendance_national_average: number | null;
    attendance_state_average: number | null;
    debates: number;
    educational_qualification: string;
    educational_qualification_details: string;
    image_url: string;
    mp_age: number;
    mp_election_index: number;
    mp_gender: string;
    mp_house: string;
    mp_name: string;
    mp_note: string;
    mp_political_party: string;
    national_average_debate: number;
    national_average_pmb: number;
    national_average_questions: number;
    nature_membership: string;
    pc_name: string;
    private_member_bills: number;
    questions: number;
    state: string;
    state_average_debate: number;
    state_average_pmb: number | null;
    state_average_questions: number;
    term: string;
    term_end_date: string;
    term_start_date: string;
  };

export type ChartData = {
    profile_url: string;
    cases: {
        pending_cases: {
            "Serial No.": string;
            "FIR No.": string;
            "Case No.": string;
            "Court": string;
            "IPC Sections Applicable": string;
            "Other Details / Other Acts / Sections Applicable": string;
            "Charges Framed": string;
            "Date on which charges were framed": string;
            "Appeal Filed": string;
            "Details and present status of appeal": string;
        }[];
        convicted_cases: {
            "Serial No.": string;
        }[];
    };
    criminal_cases: number;
    laws_broken: string[];
    parliamentary_activities: {
        questions: never[];
        debates: {
            "Date": string;
            "Title": string;
            "Link": string;
            "Type": string;
        }[];
        bills: never[];
    };
};

export type AIData = {
    main_agenda_or_focus_areas: {
        identified_themes: string[];
        focus_areas: string;
    };
    criminal_record_or_corruption_issues: {
        pending_cases: {
            case_number: string;
            court: string;
            charges_framed: boolean;
            date: string;
            details: string;
        }[];
        convicted_cases: string;
    };
    legislative_activity: {
        questions_raised_count: number;
        activity_description: string;
    };
    overall_performance: {
        impact: string;
        potential_concerns: string;
    };
};