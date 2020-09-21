export interface Club {
  _id: string
  name: string
  school: string
  description: string
}

export interface ClubList {
  clubs: Club[]
}