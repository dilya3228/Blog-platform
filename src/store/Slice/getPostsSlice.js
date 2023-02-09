import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getListPost } from '../../service/getPostsService'
import { getSlug } from '../../service/getPostsSlug'
import { postCreatePost } from '../../service/postCreatePost'
import { deletePost } from '../../service/deletePost'
import { putEditPost } from '../../service/putEditPost'

export const fetchPosts = createAsyncThunk('/articles/fetchPosts', async (offset, { rejectWithValue }) => {
  return await getListPost(offset, { rejectWithValue })
})

export const fetchSlug = createAsyncThunk('/articles/fetchSlug', async (slug, { rejectWithValue }) => {
  return await getSlug(slug, { rejectWithValue })
})

export const createPost = createAsyncThunk('/articles/createPost', async (userRegData, { rejectWithValue }) => {
  return await postCreatePost(userRegData, { rejectWithValue })
})

export const delPost = createAsyncThunk('/articles/delPost', async (slug, { rejectWithValue }) => {
  return await deletePost(slug, { rejectWithValue })
})

export const putEdit = createAsyncThunk('/articles/putEdit', async (slugData, { rejectWithValue }) => {
  return await putEditPost(slugData, { rejectWithValue })
})

export const likeArticle = createAsyncThunk('articles/likeArticle', async (slug, { rejectWithValue }) => {
  const token = localStorage.getItem('token')
  const res = await fetch(`https://blog.kata.academy/api/articles/${slug[1]}/favorite`, {
    method: !slug[0] ? 'POST' : 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
  if (!res.ok) {
    return rejectWithValue('Лайк не поставлен')
  }
  return await res.json()
})

const getPostSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    article: {
      slug: '',
      title: '',
      description: '',
      body: '',
      createdAt: '',
      updatedAt: '',
      tagList: [],
      favorited: false,
      favoritesCount: 0,
      author: {
        username: '',
        bio: '',
        image: '',
        following: false,
      },
    },
    createPost: [],
    status: null,
    error: null,
    offset: 0,
    actuallyPage: 1,
    articlesCount: 0,
    isCreatePost: false,
    isEditPost: false,
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
    putEdittt(state) {
      state.isEditPost = false
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
      state.articlesCount = action.payload
      state.isEditPost = false
      state.isCreatePost = false
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
      state.posts = action.payload
      state.article = action.payload
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
    },
    [delPost.rejected]: (state, action) => {
      state.status = 'rejected'
      state.error = action.payload
    },
    [putEdit.pending]: (state) => {
      state.status = 'loading'
      state.error = null
      state.isEditPost = false
    },
    [putEdit.fulfilled]: (state, action) => {
      state.status = 'resolve'
      state.isEditPost = true
    },
    [putEdit.rejected]: (state, action) => {
      state.status = 'rejected'
      state.error = action.payload
    },
    [likeArticle.pending]: (state) => {
      // state.status = 'loading'
      state.error = null
    },
    [likeArticle.fulfilled]: (state, { payload }) => {
      state.status = 'resolve'
      state.posts.articles.map((article) => {
        if (article.slug === payload.article.slug) article = payload.article
        return article
      })
    },
    [likeArticle.rejected]: (state, action) => {
      state.status = 'rejected'
      state.error = action.payload
    },
  },
})

export const { SetOffset, SetPage, createArticle, putEdittt } = getPostSlice.actions

export default getPostSlice.reducer
