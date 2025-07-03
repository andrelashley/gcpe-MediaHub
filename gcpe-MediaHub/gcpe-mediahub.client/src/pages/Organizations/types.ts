export type Organization = {
  id: string;
  name: string
  email: string
  phone: string
  mediaTypes: string[]
  city: string
  isMajorMedia: boolean
  parentId: string;
}