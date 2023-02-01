import instance from './instance'
export const postLike = async (slug, favorited) => {
  try {
    const token = localStorage.getItem('token')
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }
    const res = await instance.post(`articles/${slug}/favorite`, favorited, { headers })
    return res.data
  } catch (error) {
    return error.message
  }
}
