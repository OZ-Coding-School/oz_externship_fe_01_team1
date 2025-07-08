import type { PostData } from '@customType/communityDetail'
import axios from 'axios'

export const fetchCommunityDetail: (id: string) => Promise<PostData> = async (
  id
) => {
  const url = import.meta.env.VITE_API_COMMUNITY_POST_URL
  try {
    const res = await axios(`${url}/${id}`)
    return res.data
  } catch (err) {
    console.error('게시글 조회 실패', err)
    return []
  }
}
