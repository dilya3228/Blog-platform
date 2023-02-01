import instance from './instance'
export const getListPost = async (offset, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token')
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }
    const res = await instance.get('articles', {
      headers,
      params: {
        token,
        limit: 5,
        offset,
      },
    })
    return res.data
  } catch (error) {
    return rejectWithValue(error.message)
  }
}
