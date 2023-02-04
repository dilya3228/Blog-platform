import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getListPost } from '../../service/getPostsService'
import { getSlug } from '../../service/getPostsSlug'
import { postCreatePost } from '../../service/postCreatePost'
import { deletePost } from '../../service/deletePost'
import { putEditPost } from '../../service/putEditPost'
import { postLike } from '../../service/postLike'
import { deleteLike } from '../../service/deleteLike'

export const fetchPosts = createAsyncThunk('/articles/fetchPosts', async (offset, { rejectWithValue }) => {
  return await getListPost(offset, { rejectWithValue })
})

export const fetchSlug = createAsyncThunk('/articles/fetchSlug', async (slug, { rejectWithValue }) => {
  return await getSlug(slug, { rejectWithValue })
})

export const createPost = createAsyncThunk('/articles/createPost', async (userRegData, { rejectWithValue }) => {
  return await postCreatePost(userRegData, { rejectWithValue })
})

export const delPost = createAsyncThunk('/articles/delPost', async (slug) => {
  return await deletePost(slug)
})

export const putEdit = createAsyncThunk('/articles/putEdit', async (slugData, { rejectWithValue }) => {
  return await putEditPost(slugData, { rejectWithValue })
})

export const postLikePost = createAsyncThunk('/articles/postLikePost', async (slug, favorited) => {
  return await postLike(slug, favorited)
})

export const deleteLikePost = createAsyncThunk('/articles/deleteLikePost', async (slug) => {
  return await deleteLike(slug)
})

export const likeArticle = createAsyncThunk('articles/likeArticle', async (slug, { rejectWithValue }) => {
  const token = localStorage.getItem('token')
  const response = await fetch(`https://blog.kata.academy/api/articles/${slug[1]}/favorite`, {
    method: !slug[0] ? 'POST' : 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
  if (!response.ok) {
    return rejectWithValue('Лайк не поставлен')
  }
  return await response.json()
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
    like: false,
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
    addLike(state) {
      state.like = true
    },
    delLike(state) {
      state.like = false
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
      // state.isEditPost = false
    },
    [fetchSlug.fulfilled]: (state, action) => {
      state.status = 'resolve'
      state.posts = action.payload
      state.article = action.payload
      // state.isEditPost = true
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
      // state.createPost = action.payload
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
      // state.posts.article = action.payload
      // state.posts.articles = payload
      // state.posts.articles.map((article) => {
      //   return (article = payload)
      //   // return article
      // })
    },
    [putEdit.rejected]: (state, action) => {
      state.status = 'rejected'
      state.error = action.payload
    },
    [postLikePost.pending]: (state) => {
      state.status = 'loading'
      state.error = null
    },
    [postLikePost.fulfilled]: (state, action) => {
      state.status = 'resolve'
    },
    [postLikePost.rejected]: (state, action) => {
      state.status = 'rejected'
      state.error = action.payload
    },
    [deleteLikePost.pending]: (state) => {
      state.status = 'loading'
      state.error = null
    },
    [deleteLikePost.fulfilled]: (state, action) => {
      state.status = 'resolve'
    },
    [deleteLikePost.rejected]: (state, action) => {
      state.status = 'rejected'
      state.error = action.payload
    },
    [likeArticle.pending]: (state) => {
      state.status = 'loading'
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

export const { SetOffset, SetPage, createArticle, putEdittt, addLike, delLike } = getPostSlice.actions

export default getPostSlice.reducer
