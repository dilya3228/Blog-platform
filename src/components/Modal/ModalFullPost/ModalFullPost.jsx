import React, { useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { format } from 'date-fns'
import { fetchSlug } from '../../../store/Slice/getPostsSlice'
import { useDispatch, useSelector } from 'react-redux'
import ReactMarkdown from 'react-markdown'
import classes from './ModalFullPost.module.scss'
const ModalFullPost = () => {
  const dispatch = useDispatch()
  const { slug } = useParams()
  const location = useLocation()
  const { title, author, createdAt, description, favoritesCount, tagList, body } = location.state

  useEffect(() => {
    dispatch(fetchSlug(slug))
  }, [dispatch])

  const formatData = (data) => {
    if (!data) return null
    return format(new Date(data), 'MMMM d, yyyy')
  }

  return (
    <div className={classes.item}>
      <div className={classes.postInfo}>
        <div className={classes.title}>
          <div className={classes.header}>
            <h3 className={classes.headerTitle}>{title}</h3>
            <button className={classes.like}></button>
            <div className={classes.likeCounter}>{favoritesCount}</div>
          </div>
          <div className={classes.info}>
            <div className={classes.tag}>{tagList[0]}</div>
            <div className={classes.tag}>{tagList[1]}</div>
            <div className={classes.tag}>{tagList[2]}</div>
          </div>
          <div className={classes.text}>{description}</div>
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
            <button type="submit" className={classes.Dbtn}>
              Delete
            </button>
            <button type="submit" className={classes.Ebtn}>
              Edit
            </button>
          </div>
        </div>
        <img className={classes.avatar} src={author.image}></img>
      </div>
    </div>
  )
}

export default ModalFullPost
