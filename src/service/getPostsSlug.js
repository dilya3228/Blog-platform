import instance from './instance'
export const getSlug = async ({ rejectWithValue }) => {
  try {
    const res = await instance.get('articles/', {
      params: {
        slug: '',
      },
    })
    return res.data
  } catch (error) {
    return rejectWithValue(error.message)
  }
}
