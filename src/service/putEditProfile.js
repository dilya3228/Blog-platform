import instance from './instance'
export const putEditProfile = async (userRegData, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token')
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }
    const res = await instance.put('https://blog.kata.academy/api/user', userRegData, { headers })
    return res.data
  } catch (error) {
    return rejectWithValue(error.message)
  }
}
