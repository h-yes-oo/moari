export enum SearchMenu {
    HOME = 'HOME',
    CATEGORY = 'CATEGORY',
    TAG = 'TAG',
    STATUS = 'STATUS',
    NAME = 'NAME',
}

export enum RegisterButton {
    CLUB_REGISTER = 'CLUB_REGISTER',
    RECRUIT_REGISTER = 'RECRUIT_REGISTER'
}

export enum RegisterFormType {
    INPUT = 'INPUT',
    INPUT_ADDABLE = 'INPUT_ADDABLE',
    TEXT_AREA = 'TEXT_AREA',
    SELECT_BOX = 'SELECT_BOX',
    FILE = 'FILE',
    CALENDAR = 'CALENDAR',   
}

export enum Category {
    STUDY = "학문",
    SPORTS = "스포츠",
    ACADEMY = "학회",
    PERFORMANCE = "공연",
    ENTERTAIN = "엔터테인/친목",
    VOLUNTEER = "봉사",
    IT = "개발/IT",
    HOBBY = "취미",
    SOCIETY = "사회",
    PR = "홍보대사",
    PRESS = "신문/방송",
}

// add contents
export enum Tag {
    TAG1 = "태그1",
    TAG2 = "태그2",
    TAG3 = "태그3",
}

export enum Status {
    ALWAYS = '상시 모집',
    OPEN = '모집 중',
    CLOSED = '모집 완료',
    PREPARE = '모집 준비 중',
}

// how to reduce code? 
export type FilterType = typeof Category | typeof Tag | typeof Status;
