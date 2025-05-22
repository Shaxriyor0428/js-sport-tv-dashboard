// types/admin.ts
export interface IconProps extends React.SVGProps<SVGSVGElement> {
    active?: boolean;
}

export interface AdminCreateRequest {
    id?: number;
    name: string;
    fullname?: string;
    role: string;
    created_at: string;
    permission?: {
        [key: string]: boolean;
    };
}

export interface AdminProps {
    name: string;
    fullname?: string;
    password: string;
    role: string;
    permission?: {
        [key: string]: boolean;
    };
}

export interface NewsData {
    id: number;
    title: string;
    description: string;
    position: string;
    cover_image: File | undefined;
    content: string
    content_images: File[] | undefined;
}
export interface NewsResponse {
    data: INewsData[];
    page: number;
    limit: number;
    all: boolean;
    position: string;
}

export interface INewsData {
    id: number;
    title: string;
    description: string;
    position: string;
    cover_image: string;
    content: string
    content_images: string[]
    created_at: string
}

export interface StaffCreateRequest {
    id?: number;
    fullname?: string;
    position: string;
    region_id: string;
    image_url: string;
    level: string;
    role: string;
    created_at: string;
    more_info: {
        email: string;
        phone: string;
        website: string;
        work_time: string;
    };
    region?: {
        id: string;
        name: string;
    }
}

export interface Region {
    id: number;
    name: string;
    created_at: string;
}

export interface GalleryCreateRequest {
    id?: number;
    title: string;
    position: string;
    image_url: File[] | undefined;
}

export interface GalleryResponse {
    data: IGalleryData[];
    total: number;
    page: number;
    limit: number;
}

export interface IGalleryData {
    id: number;
    title: string;
    position: string;
    video_img_url: string[];
    created_at: string;
    video_url: string;
}

export interface ScheduleCreateRequest {
    id?: number;
    title: string;
    start_period: string;
    end_period: string;
    gender_type: string;
    location: string;
    type: string;
    status: string
}

export interface Params {
    page?: number;
    limit?: number;
    all?: boolean;
    position?: string;
}

export interface ClubCreateRequest {
    id?: number;
    name: string;
    club_image: File;
    created_at: string; 
    short_name: string;
    federation_type: string;
    location_type: string;
    more_info: string[];
}

export interface ClubResponse {
    data: IClubData[];
    total: number;
    page: number;
    limit: number;
}

export interface IClubData {
    id: number;
    name: string;
    club_image: string;
    created_at: string;
    ratings: IRatingData[];
    short_name: string;
    federation_type: string;
    location_type: string;
    more_info?: string[];
}


// model Rating {
//   id              String @id @default (uuid())
//   score           Float
//   federation_type String
//   gender_type     GenderType
//   sport_type      String
//   more_info       Json ?
//         created_at      DateTime @default (now())
//   deleted_at      DateTime ?
//         club_id         String   
//   club            Club @relation(fields: [club_id], references: [id])

//     @@map("rating")
// }

export interface RatingCreateRequest {
    id?: string;
    score: number;
    gender_type: string;
    sport_type: string;
    club_id: string;
    score_details?: {
        date: string;
        shortname_enemy_team: string;
        shortname_our_team: string;
        enemy_team_points: number;
        our_team_point: number;
        our_team_result: string;
        enemy_team_result: string;
    }[];
}

export interface IRatingData {
    id: string;
    score: number;
    gender_type: string;
    sport_type: string;
    // more_info: string[];
    club_id: string;
    score_details: {
        date: string;
        shortname_enemy_team: string;
        shortname_our_team: string;
        enemy_team_points: number;
        our_team_point: number;
        our_team_result: string;
        enemy_team_result: string;
    }[];    
    club: {
        id: string;
        name: string;
        club_image: string;
        short_name: string;
        federation_type: string;
        location_type: string;
        // more_info: string[];
    }
}
    
export interface IScoreOneDetailModal {
    id?: number;
    date: string;
    shortname_enemy_team: string;
    shortname_our_team: string;
    enemy_team_points: number;
    our_team_point: number;
    our_team_result: number;
    enemy_team_result: number;
    location: string;
}

export interface IFlagCreateRequest {
    id?: number;
    name: string;
    image: File;
}

export interface IFlagData {
    id: number;
    name: string;
    image: string
}

export interface IFlagResponse {
    data: IFlagData[]
}

export interface ErrorResponse {
    message: string;
}

export interface IGameCreateRequest {
    id?: string;
    homeTeamName: string;
    guestTeamName: string;
    homeTeamFlag: string;
    guestTeamFlag: string;
    startTime: Date;
    coverImage: File
}

export interface IGameData {
    id: string;
    homeTeamName: string;
    guestTeamName: string;
    homeTeamFlag: string;
    guestTeamFlag: string;
    startTime: Date;
    coverImage: string
}

export interface IGameResponse {
    data: IGameData[]
}
