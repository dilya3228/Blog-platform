import instance from './instance'
export const deleteLike = async (slug) => {
  try {
    const token = localStorage.getItem('token')
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }
    const res = await instance.delete(`articles/${slug}/favorite`, { headers })
    return res.data
  } catch (error) {
    return error.message
  }
}
