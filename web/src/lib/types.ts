export type QuickLink = {
    title: string;
    url: string;
};

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
  