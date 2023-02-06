import instance from './instance'
export const postSignIn = async (userRegData, { rejectWithValue }) => {
  try {
    const res = await instance.post('users/login', userRegData)
    !localStorage.getItem('token') && localStorage.setItem('token', res.data.user.token)
    return res.data
  } catch (error) {
    // if (error.status === 404) {
    //   return rejectWithValue('A user with the same username or email address exists')
    // }
    return rejectWithValue('Не правильно введен пароль или E-mail')
  }
}
// if (!res.ok) {
//   return rejectWithValue('Не правильно введен пароль или E-mail')
// }
