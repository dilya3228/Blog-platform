import React, { useEffect } from 'react'
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom'
import { format } from 'date-fns'
import { fetchSlug, delPost, putEdittt } from '../../../store/Slice/getPostsSlice'
import { useDispatch, useSelector } from 'react-redux'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { message, Popconfirm } from 'antd'
import classes from './ModalFullPost.module.scss'

const ModalFullPost = () => {
  const dispatch = useDispatch()
  const { slug } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const { title, author, createdAt, description, favoritesCount, tagList, body, favorited } = location.state
  const { username } = useSelector((state) => state.user.user)

  const hiddenText = description && description.length > 120 ? description.slice(0, description.indexOf('', 100)) + '...' : description
  const hiddenTitle = title && title.length > 25 ? title.slice(0, title.indexOf('', 60)) + '...' : title

  useEffect(() => {
    dispatch(fetchSlug(slug))
  }, [dispatch, slug])

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

  const handleLike = () => {
    // dispatch(postLikePost(slug, favorited))
    // setLikeCount(likeCount + 1)
  }
  // console.log(.trim().slice(0, 1700))
  return (
    <div className={classes.item}>
      <div className={classes.postInfo}>
        <div className={classes.title}>
          <div className={classes.header}>
            <h3 className={classes.headerTitle}>{hiddenTitle}</h3>
            <button className={classes.like} onClick={handleLike}></button>
            <div className={classes.likeCounter}>{favoritesCount}</div>
          </div>
          <div className={classes.info}>
            {tagList &&
              tagList.map((el) => (
                <div className={classes.tag} key={el.id}>
                  {el.substr(0, 10)}
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
    </div>
  )
}

export default ModalFullPost
