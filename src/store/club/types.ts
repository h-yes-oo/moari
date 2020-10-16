export interface Club {
  _id: string
  name: string
  school: string
  description: string
  photos: string[]
}

export interface ClubList {
  clubs: Club[]
}