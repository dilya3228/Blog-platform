import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { likeArticle } from '../../store/Slice/getPostsSlice'
import { path } from '../../utils/path'
import { format } from 'date-fns'
import { v4 as uuidv4 } from 'uuid'
import { HeartOutlined, HeartFilled } from '@ant-design/icons'
import { Button, Avatar } from 'antd'
import avatar from '../../img/Rectangle1.png'
import classes from './BlogItem.module.scss'

const BlogItem = ({ article }) => {
  const dispatch = useDispatch()
  const { author, title, createdAt, description, favoritesCount, tagList, body, slug, favorited } = article
  const {
    posts: { articles, articlesCount },
  } = useSelector((state) => state.posts)

  const { isIn, isReg } = useSelector((state) => state.user)
  const [like, setLike] = useState(favorited)
  const [count, setCount] = useState(favoritesCount)
  const userAvatar = author?.image ? author.image : avatar

  const formatData = (data) => {
    if (!data) return null
    return format(new Date(data), 'MMMM d, yyyy')
  }

  useEffect(() => {
    if (favorited || !favorited) {
      setLike(favorited)
    }
    setCount(favoritesCount)
  }, [slug, favorited, favoritesCount])

  const hiddenTitle = title && title.length > 25 ? title.slice(0, title.indexOf('', 25)) + '...' : title

  return (
    <li className={classes.item}>
      <div className={classes.postInfo}>
        <div className={classes.title}>
          <div className={classes.header}>
            <div>
              <Link
                to={`/${path.articles}/${slug}`}
                state={{
                  key: slug,
                  author: author,
                  title: title,
                  description: description,
                  createdAt: createdAt,
                  favoritesCount: favoritesCount,
                  tagList: tagList,
                  body: body,
                  favorited: favorited,
                }}
                className={classes.none}
              >
                <h3 className={classes.headerTitle}>{hiddenTitle}</h3>
              </Link>
            </div>
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
            {tagList.map((tag) => {
              return (
                <span key={uuidv4()} className={classes.tag}>
                  {tag?.length > 8 ? tag.slice(0, 8) + '...' : tag}
                </span>
              )
            })}
          </div>
          <div className={classes.text}>{description && description.length > 70 ? description.slice(0, description.indexOf('', 70)) + '...' : description}</div>
        </div>
      </div>
      <div className={classes.userInfo}>
        <div className={classes.userContainer}>
          <div className={classes.name}>{author.username.slice(0, 8)}</div>
          <div className={classes.date}>{formatData(createdAt)}</div>
        </div>
        <Avatar src={userAvatar} size={46} />
      </div>
    </li>
  )
}

export default BlogItem
