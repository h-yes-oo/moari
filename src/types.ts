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
    name: string;
    description: string;
    image: string; // need change
    status: ClubStatus;    
    tags: Array<string>;
}