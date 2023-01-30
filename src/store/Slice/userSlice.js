import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { postSignUp } from '../../service/postSignUp'
import { postSignIn } from '../../service/postSignIn'
import { putEditProfile } from '../../service/putEditProfile'

export const postLogUser = createAsyncThunk('/user/postLogUser', async (userRegData, { rejectWithValue }) => {
  return await postSignIn(userRegData, { rejectWithValue })
})

export const putEditP = createAsyncThunk('/user/putEditP', async (userRegData, { rejectWithValue }) => {
  return await putEditProfile(userRegData, { rejectWithValue })
})

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {
      password: '',
      token: '',
      email: '',
      username: '',
      bio: '',
      image: '',
    },
    error: '',
    status: null,
    isReg: false,
    isIn: false,
    isEdit: false,
  },
  reducers: {
    logout(state) {
      localStorage.removeItem('token')
      localStorage.removeItem('root')
      state.user = {
        username: '',
        email: '',
        image: '',
        token: '',
        bio: '',
      }
      state.isIn = false
      state.isReg = false
    },
    editProfile(state) {
      state.isEdit = false
    },
  },
  extraReducers: {
    [postSignUp.pending]: (state, action) => {
      state.status = 'pending'
      state.error = null
      state.isReg = false
      state.isIn = false
    },
    [postSignUp.fulfilled]: (state, action) => {
      state.status = 'fulfilled'
      state.isReg = true
      state.isIn = true
      state.user = action.payload.user
    },
    [postSignUp.rejected]: (state, action) => {
      state.status = 'rejected'
      state.error = action.payload
    },
    [postLogUser.pending]: (state) => {
      state.status = true
      state.isReg = false
      state.isIn = false
      state.error = ''
    },
    [postLogUser.fulfilled]: (state, action) => {
      state.status = false
      state.user = action.payload.user
      state.isIn = true
      state.isReg = true
    },
    [postLogUser.rejected]: (state, action) => {
      state.status = 'rejected'
      state.error = action.payload
    },
    [putEditP.pending]: (state) => {
      state.status = true
      state.error = ''
      state.isEdit = false
    },
    [putEditP.fulfilled]: (state, action) => {
      state.status = false
      state.user = action.payload.user
      state.isEdit = true
    },
    [putEditP.rejected]: (state, action) => {
      state.status = 'rejected'
      state.error = action.payload
    },
  },
})

export const { logout, editProfile } = userSlice.actions

export default userSlice.reducer
