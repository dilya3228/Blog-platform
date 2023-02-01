import React, { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { addLike, delLike, postLikePost, deleteLikePost, fetchLikeArticle } from '../../store/Slice/getPostsSlice'
import { HeartOutlined, HeartFilled } from '@ant-design/icons'
import { Button } from 'antd'
import classes from './BlogItem.module.scss'

const BlogItem = (props) => {
  const dispatch = useDispatch()
  const { author, title, createdAt, description, favoritesCount, tagList, body, slug, favorited } = props
  const {
    posts: { articles, articlesCount },
  } = useSelector((state) => state.posts)

  const { isIn, isReg } = useSelector((state) => state.user)
  const [like, setLike] = useState(favorited)
  const [count, setCount] = useState(favoritesCount)

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

  const handleLike = () => {
    setLike(!like)
    setCount(like ? count - 1 : count + 1)
    dispatch(fetchLikeArticle([like, slug]))
  }

  // const handleLike = () => {
  //   if (!like) {
  //     dispatch(postLikePost(slug, favorited))
  //     setLikeCount(likeCount + 1)
  //     dispatch(addLike(like))
  //   } else {
  //     dispatch(deleteLikePost(slug))
  //     setLikeCount(likeCount - 1)
  //     dispatch(delLike(like))
  //   }
  // }

  const hiddenTitle = title && title.length > 25 ? title.slice(0, title.indexOf('', 25)) + '...' : title

  return (
    <li className={classes.item}>
      <div className={classes.postInfo}>
        <div className={classes.title}>
          <div className={classes.header}>
            <div>
              <Link
                // key={slug}
                to={`/articles/${slug}`}
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
                className={classes.none}
              >
                <h3 className={classes.headerTitle}>{hiddenTitle}</h3>
              </Link>
            </div>
            {/* <button className={classes.like} onClick={handleLike}></button>
            <div className={classes.likeCounter}>{likeCount}</div> */}
            <Button
              className={classes.like}
              onClick={() => {
                setLike(!like)
                setCount(like ? count - 1 : count + 1)
                dispatch(fetchLikeArticle([like, slug]))
              }}
            >
              {like ? <HeartFilled style={{ color: '#FF0707' }} /> : <HeartOutlined />}
              {count}
            </Button>
            {/* <div className={classes.likeCounter}>{likeCount}</div> */}
          </div>
          <div className={classes.info}>
            {/* {tagList.map((el) => (
              <>
                <div className={classes.tag}>{el.substr(0, 10)}</div>
              </>
            ))} */}
            {tagList &&
              tagList.map((el) => (
                <div className={classes.tag} key={el.id}>
                  {el.substr(0, 10)}
                </div>
              ))}
            {/* <div className={classes.tag}>{tagList}</div> */}
          </div>
          <div className={classes.text}>
            {description && description.length > 120 ? description.slice(0, description.indexOf('', 145)) + '...' : description}
          </div>
        </div>
      </div>
      <div className={classes.userInfo}>
        <div className={classes.userContainer}>
          <div className={classes.name}>{author.username.slice(0, 8)}</div>
          <div className={classes.date}>{formatData(createdAt)}</div>
        </div>
        <img className={classes.avatar} src={author.image} />
      </div>
    </li>
  )
}

export default BlogItem
