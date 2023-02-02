import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom'
import { format } from 'date-fns'
import { fetchSlug, delPost, putEdittt, likeArticle } from '../../../store/Slice/getPostsSlice'
import ReactMarkdown from 'react-markdown'
import { message, Popconfirm, Button } from 'antd'
import { HeartOutlined, HeartFilled } from '@ant-design/icons'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'
import classes from './ModalFullPost.module.scss'

const ModalFullPost = (props) => {
  const dispatch = useDispatch()
  const { slug } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const { title, author, createdAt, description, favoritesCount, tagList, body, key, favorited } = location.state
  const { username } = useSelector((state) => state.user.user)
  const { isIn, isReg } = useSelector((state) => state.user)
  const { error, status } = useSelector((state) => state.posts)
  const [like, setLike] = useState(favorited)
  const [count, setCount] = useState(favoritesCount)

  const hiddenText = description && description.length > 100 ? description.slice(0, description.indexOf('', 70)) + '...' : description
  const hiddenTitle = title && title.length > 25 ? title.slice(0, title.indexOf('', 40)) + '...' : title

  const formatData = (data) => {
    if (!data) return null
    return format(new Date(data), 'MMMM d, yyyy')
  }

  const confirm = (e) => {
    message.success('Пост удален')
    dispatch(delPost(slug))
    navigate('/', { replace: true })
  }
  const cancel = (e) => {
    message.error('Отмена удаления поста')
  }

  // useEffect(() => {
  //   dispatch(fetchSlug(key))
  //   if (favorited || !favorited) {
  //     setLike(favorited)
  //   }
  //   setCount(favoritesCount)
  // }, [slug, favorited, favoritesCount, dispatch])
  useEffect(() => {
    if (favorited || !favorited) {
      setLike(favorited)
    }
    setCount(favoritesCount)
  }, [slug, favorited, favoritesCount])

  // console.log(.trim().slice(0, 1700))
  return (
    <div className={classes.item}>
      {status === 'loading' && (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <CircularProgress color="success" />
        </Box>
      )}{' '}
      {error && (
        <Stack sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '30px' }} spacing={2}>
          <Alert severity="error">Посты не найден</Alert>
        </Stack>
      )}
      {key === slug ? (
        <>
          <div className={classes.postInfo}>
            <div className={classes.title}>
              <div className={classes.header}>
                <h3 className={classes.headerTitle}>{hiddenTitle}</h3>
                {isIn || isReg ? (
                  <Button
                    className={classes.like}
                    onClick={() => {
                      setLike(!like)
                      setCount(like ? count - 1 : count + 1)
                      dispatch(likeArticle([like, slug]))
                    }}
                  >
                    {like ? <HeartFilled style={{ color: '#FF0707' }} /> : <HeartOutlined />}
                  </Button>
                ) : (
                  <HeartOutlined style={{ marginLeft: '10px' }} />
                )}
                <div className={classes.likeCounter}>{count}</div>
              </div>
              <div className={classes.info}>
                {tagList &&
                  tagList.map((el) => (
                    <div className={classes.tag} key={el.id}>
                      {/* {el.substr(0, 10)} */}
                      {el?.length > 6 ? `${el.slice(0, 6)}` : el}
                    </div>
                  ))}
              </div>
              <div className={classes.text}>{hiddenText}</div>
              <div className={classes.fullInfo}>
                <ReactMarkdown>{body}</ReactMarkdown>
              </div>
            </div>
          </div>
          <div className={classes.userInfo}>
            <div className={classes.userContainer}>
              <div className={classes.name}>{author.username}</div>
              <div className={classes.date}>{formatData(createdAt)}</div>
              <div className={classes.DBbtns}>
                {author.username === username && (
                  <>
                    <Popconfirm
                      title="Delete the task"
                      description="Are you sure to delete this task?"
                      onConfirm={confirm}
                      onCancel={cancel}
                      okText="Yes"
                      cancelText="No"
                    >
                      <button type="submit" className={classes.Dbtn}>
                        Delete
                      </button>
                    </Popconfirm>

                    <Link
                      to={`/edit`}
                      className={classes.Ebtn}
                      state={{
                        key: slug,
                        author: author,
                        title: title,
                        description: description,
                        createdAt: createdAt,
                        favoritesCount: favoritesCount,
                        tagList: tagList,
                        body: body,
                      }}
                      onClick={() => dispatch(putEdittt())}
                    >
                      Edit
                    </Link>
                  </>
                )}
              </div>
            </div>
            <img className={classes.avatar} src={author.image}></img>
          </div>
        </>
      ) : (
        <h2>Статья не найдена</h2>
      )}
    </div>
  )
}

export default ModalFullPost
