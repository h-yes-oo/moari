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
<<<<<<< HEAD
=======
    id: number;
>>>>>>> 05f8d9fc71c3cf0b0dca6901a732ec35404472e5
    name: string;
    description: string;
    image: string; // need change
    status: ClubStatus;    
    tags: Array<string>;
<<<<<<< HEAD
=======
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
>>>>>>> 05f8d9fc71c3cf0b0dca6901a732ec35404472e5
}