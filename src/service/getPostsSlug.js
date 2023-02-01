import instance from './instance'
export const getSlug = async (slug, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token')
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }
    const res = await instance.get(`articles/${slug}`, { headers })
    return res.data
  } catch (error) {
    return rejectWithValue(error.message)
  }
}
