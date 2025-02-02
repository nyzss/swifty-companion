interface Token {
    access_token: string;
    created_at: number;
    expires_in: number;
    refresh_token: string;
    scope: string;
    secret_valid_until: number;
    token_type: string;
}

interface ImageVersions {
    large: string;
    medium: string;
    small: string;
    micro: string;
}

interface Image {
    link: string;
    versions: ImageVersions;
}

interface Skill {
    id: number;
    name: string;
    level: number;
}

interface Cursus {
    id: number;
    created_at: string;
    name: string;
    slug: string;
    kind: string;
}

interface ProjectInfo {
    id: number;
    name: string;
    slug: string;
    parent_id: number | null;
}

interface ProjectUser {
    id: number;
    occurrence: number;
    final_mark: number | null;
    status: "in_progress" | "finished";
    "validated?": boolean | null;
    current_team_id: number;
    project: ProjectInfo;
    cursus_ids: number[];
    marked_at: string | null;
    marked: boolean;
    retriable_at: string | null;
    created_at: string;
    updated_at: string;
}

interface CursusUser {
    id: number;
    begin_at: string;
    end_at: string | null;
    grade: string | null;
    level: number;
    skills: Skill[];
    cursus_id: number;
    has_coalition: boolean;
    blackholed_at: string | null;
    created_at: string;
    updated_at: string;
    cursus: Cursus;
}

interface Achievement {
    id: number;
    name: string;
    description: string;
    tier: string;
    kind: string;
    visible: boolean;
    image: string;
    nbr_of_success: number | null;
    users_url: string;
}

interface Title {
    id: number;
    name: string;
}

interface TitleUser {
    id: number;
    user_id: number;
    title_id: number;
    selected: boolean;
    created_at: string;
    updated_at: string;
}

interface Language {
    id: number;
    name: string;
    identifier: string;
    created_at: string;
    updated_at: string;
}

interface Campus {
    id: number;
    name: string;
    time_zone: string;
    language: Language;
    users_count: number;
    vogsphere_id: number;
    country: string;
    address: string;
    zip: string;
    city: string;
    website: string;
    facebook: string;
    twitter: string;
    active: boolean;
    public: boolean;
    email_extension: string;
    default_hidden_phone: boolean;
}

interface CampusUser {
    id: number;
    user_id: number;
    campus_id: number;
    is_primary: boolean;
    created_at: string;
    updated_at: string;
}

interface ExpertiseUser {
    id: number;
    expertise_id: number;
    interested: boolean;
    value: number;
    contact_me: boolean;
    created_at: string;
    user_id: number;
}

interface LanguageUser {
    id: number;
    language_id: number;
    user_id: number;
    position: number;
    created_at: string;
}

interface User {
    id: number;
    email: string;
    login: string;
    first_name: string;
    last_name: string;
    usual_full_name: string;
    usual_first_name: string | null;
    url: string;
    phone: string;
    displayname: string;
    kind: string;
    image: Image;
    "staff?": boolean;
    correction_point: number;
    pool_month: string;
    pool_year: string;
    location: string | null;
    wallet: number;
    anonymize_date: string;
    data_erasure_date: string;
    created_at: string;
    updated_at: string;
    alumnized_at: string | null;
    "alumni?": boolean;
    "active?": boolean;
    groups: any[];
    cursus_users: CursusUser[];
    projects_users: ProjectUser[];
    languages_users: LanguageUser[];
    achievements: Achievement[];
    titles: Title[];
    titles_users: TitleUser[];
    partnerships: any[];
    patroned: any[];
    patroning: any[];
    expertises_users: ExpertiseUser[];
    roles: any[];
    campus: Campus[];
    campus_users: CampusUser[];
}
