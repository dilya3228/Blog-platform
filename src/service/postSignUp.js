import instance from './instance'
import { createAsyncThunk } from '@reduxjs/toolkit'
export const postSignUp = createAsyncThunk('user/fetchRegistrationUser', async (userRegData, { rejectWithValue }) => {
  const response = await instance.post('users/', userRegData)
  if (response.status === 422) {
    return rejectWithValue('A user with the same username or email address exists')
  }
  !localStorage.getItem('token') && localStorage.setItem('token', response.data.user.token)
  return response.data
})
// import { createAsyncThunk } from '@reduxjs/toolkit'
// export const postSignUp = createAsyncThunk('user/fetchRegistrationUser', async (userRegData, { rejectWithValue }) => {
//   try {
//     const response = await fetch('https://blog.kata.academy/api/users', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(userRegData),
//     })
//     // if (response.status === 422) {
//     //   return rejectWithValue(new Error('Ошибка авторизации'))
//     // }
//     // if (!response.ok) {
//     //   return rejectWithValue('A user with the same username or email address exists')
//     // }
//     const result = await response.json()
//     !localStorage.getItem('token') && localStorage.setItem('token', result.user.token)
//     return result
//   } catch (error) {
//     // if (!error.result) {
//     //   throw error
//     // }
//     throw rejectWithValue(error.message)
//   }
// })
