import React, { useEffect } from 'react'
import { fetchPosts, SetOffset, SetPage } from '../../store/Slice/getPostsSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Pagination } from 'antd'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'
import BlogItem from '../BlogItem/BlogItem'
import classes from './BlogList.module.scss'

const BlogList = () => {
  const dispatch = useDispatch()
  const {
    error,
    status,
    offset,
    actuallyPage,
    like,
    posts: { articles, articlesCount },
  } = useSelector((state) => state.posts)

  const handlePaginate = (e) => {
    dispatch(SetOffset((e - 1) * 5))
    dispatch(SetPage(e))
  }

  useEffect(() => {
    dispatch(fetchPosts(offset))
  }, [dispatch, offset])
  return (
    <>
      {status === 'loading' && (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <CircularProgress color="success" />
        </Box>
      )}
      {error && (
        <Stack sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '30px' }} spacing={2}>
          <Alert severity="error">Ошибка - посты не найдены</Alert>
        </Stack>
      )}
      <ul className={classes.wrapper}>{articles && articles.map((el) => <BlogItem key={el.slug} {...el} />)}</ul>
      <div className={classes.paginate}>
        <Pagination current={actuallyPage} defaultPageSize={5} onChange={(e) => handlePaginate(e)} defaultCurrent={1} total={articlesCount} />
      </div>
    </>
  )
}

export default BlogList
