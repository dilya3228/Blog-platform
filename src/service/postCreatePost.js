import instance from './instance'
export const postCreatePost = async (userRegData, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token')
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }
    const res = await instance.post('/articles', userRegData, { headers })
    return res.data
  } catch (error) {
    return rejectWithValue(error.message)
  }
}
