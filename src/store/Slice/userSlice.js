import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { postSignUp } from '../../service/postSignUp'
import { postSignIn } from '../../service/postSignIn'
import { putEditProfile } from '../../service/putEditProfile'

export const postLogUser = createAsyncThunk('/user/postLogUser', async (userRegData, { rejectWithValue }) => {
  return await postSignIn(userRegData, { rejectWithValue })
})

export const putEdit = createAsyncThunk('/user/putEdit', async (userRegData, { rejectWithValue }) => {
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
    error: null,
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
    },
  },
  extraReducers: {
    [postSignUp.pending]: (state, action) => {
      state.status = true
      state.error = null
      state.isReg = false
      state.isIn = false
    },
    [postSignUp.fulfilled]: (state, action) => {
      state.status = false
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
    [putEdit.pending]: (state) => {
      state.status = true
      state.error = ''
      state.isEdit = false
    },
    [putEdit.fulfilled]: (state, action) => {
      state.status = false
      state.user = action.payload.user
      state.isEdit = true
    },
    [putEdit.rejected]: (state, action) => {
      state.status = 'rejected'
      state.error = action.payload
    },
  },
})

export const { logout } = userSlice.actions

export default userSlice.reducer
