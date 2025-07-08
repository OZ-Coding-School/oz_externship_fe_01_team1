export type commentData = {
  id: number
  name: string
  date: string
  content: string
  imgUrl: string
}

export interface PostData {
  id: number
  category: { id: number; name: string }
  author_id: number
  title: string
  content: string
  view_count: number
  is_visible: boolean
  is_notice: boolean
  attachments: { id: number; file_url: string; file_name: string }[]
  images: [
    {
      id: number
      image_url: string
      image_name: string
      image_type: string
    },
  ]
  created_at: string
  updated_at: string
}
