export enum ClubStatus {
    ALWAYS = 'ALWAYS',
    OPEN = 'OPEN',
    CLOSED = 'CLOSED',
    PREPARE = 'PREPARE',
}

export enum SearchMenu {
    HOME = 'HOME',
    CATEGORY = 'CATEGORY',
    TAG = 'TAG',
    STATUS = 'STATUS',
    NAME = 'NAME',
}

export interface ClubInfo {
    id: number;
    name: string;
    description: string;
    image: string; // need change
    status: ClubStatus;    
    tags: Array<string>;
}

export enum RegisterButton {
    CLUB_REGISTER = 'CLUB_REGISTER',
    RECRUIT_REGISTER = 'RECRUIT_REGISTER'
}

export enum RegisterFormType {
    INPUT = 'INPUT',
    SELECT_BOX = 'SELECT_BOX',
    FILE = 'FILE',
    CALENDAR = 'CALENDAR',
}