import instance from './instance'
export const postSignIn = async (userRegData, { rejectWithValue }) => {
  try {
    const res = await instance.post('users/login', userRegData)
    !localStorage.getItem('token') && localStorage.setItem('token', res.data.user.token)
    return res.data
  } catch (error) {
    return rejectWithValue(error.message)
  }
}
