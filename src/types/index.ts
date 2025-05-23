// types/admin.ts
export interface IconProps extends React.SVGProps<SVGSVGElement> {
    active?: boolean;
}

export interface AdminCreateRequest {
    id?: number;
    fullName?: string;
    username: string;
    password?: string;
    role: string;
    status: string;
}

export interface IAdminData {
    id?: string;
    fullName?: string;
    username: string;
    password: string;
    role: string;
    status: string;
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

export interface UserLogin {
    username: string;
    password: string;
  }