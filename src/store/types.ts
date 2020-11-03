export interface Club {
  _id: string
  name: string
  school: string
  description: string
  photos: any[]
  recruit?: string
  category?: string
  tags?: string[]
  // managerIds: string[]
}

export interface ClubList {
  clubs: Club[]
}