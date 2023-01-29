import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getListPost } from '../../service/getPostsService'
import { getSlug } from '../../service/getPostsSlug'
import { postCreatePost } from '../../service/postCreatePost'
import { deletePost } from '../../service/deletePost'

export const fetchPosts = createAsyncThunk('/articles/fetchPosts', async (offset, { rejectWithValue }) => {
  return await getListPost(offset, { rejectWithValue })
})

export const fetchSlug = createAsyncThunk('/articles/fetchSlug', async ({ rejectWithValue }) => {
  return await getSlug({ rejectWithValue })
})

export const createPost = createAsyncThunk('/articles/createPost', async (userRegData, { rejectWithValue }) => {
  return await postCreatePost(userRegData, { rejectWithValue })
})

export const delPost = createAsyncThunk('/articles/delPost', async (slug) => {
  return await deletePost(slug)
})

const getPostSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    createPost: [],
    status: null,
    error: null,
    offset: 0,
    actuallyPage: 1,
    articlesCount: 0,
    isCreatePost: false,
  },
  reducers: {
    SetOffset: function (state, { payload }) {
      state.offset = payload
    },
    SetPage: function (state, { payload }) {
      state.actuallyPage = payload
    },
    createArticle(state) {
      state.isCreatePost = false
    },
  },
  extraReducers: {
    [fetchPosts.pending]: (state) => {
      state.status = 'loading'
      state.error = null
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.status = 'resolve'
      state.posts = action.payload
    },
    [fetchPosts.rejected]: (state, action) => {
      state.status = 'rejected'
      state.error = action.payload
    },
    [fetchSlug.pending]: (state) => {
      state.status = 'loading'
      state.error = null
    },
    [fetchSlug.fulfilled]: (state, action) => {
      state.status = 'resolve'
      state.slug = action.payload
    },
    [fetchSlug.rejected]: (state, action) => {
      state.status = 'rejected'
      state.error = action.payload
    },
    [createPost.pending]: (state) => {
      state.status = 'loading'
      state.error = null
      state.isCreatePost = false
    },
    [createPost.fulfilled]: (state, action) => {
      state.status = 'resolve'
      state.createPost = action.payload
      state.isCreatePost = true
    },
    [createPost.rejected]: (state, action) => {
      state.status = 'rejected'
      state.error = action.payload
    },
    [delPost.pending]: (state) => {
      state.status = 'loading'
      state.error = null
    },
    [delPost.fulfilled]: (state, action) => {
      state.status = 'resolve'
      // state.createPost = action.payload
    },
    [delPost.rejected]: (state, action) => {
      state.status = 'rejected'
      state.error = action.payload
    },
  },
})

export const { SetOffset, SetPage, createArticle } = getPostSlice.actions

export default getPostSlice.reducer
