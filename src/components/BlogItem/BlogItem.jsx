import React from 'react'
import { format } from 'date-fns'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import classes from './BlogItem.module.scss'

const BlogItem = (props) => {
  const { author, title, createdAt, description, favoritesCount, tagList, body, slug } = props
  const {
    posts: { articles },
  } = useSelector((state) => state.posts)

  const formatData = (data) => {
    if (!data) return null
    return format(new Date(data), 'MMMM d, yyyy')
  }

  const hiddenText = description.length > 120 ? description.slice(0, description.indexOf('', 145)) + '...' : description
  const hiddenTitle = title.length > 25 ? title.slice(0, title.indexOf('', 25)) + '...' : title

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
                  title: title,
                  author: author,
                  createdAt: createdAt,
                  description: description,
                  favoritesCount: favoritesCount,
                  tagList: tagList,
                  body: body,
                }}
                className={classes.none}
              >
                <h3 className={classes.headerTitle}>{hiddenTitle}</h3>
              </Link>
            </div>
            <button className={classes.like}></button>
            <div className={classes.likeCounter}>{favoritesCount}</div>
          </div>
          <div className={classes.info}>
            {/* {tagList.map((el) => (
              <>
                <div className={classes.tag}>{el.substr(0, 10)}</div>
              </>
            ))} */}
            {tagList.map(
              (el) => (
                // el.includes(undefined) ? null : (
                <>
                  <div className={classes.tag} key={el.id}>
                    {el.substr(0, 10)}
                  </div>
                </>
              )
              // )
            )}
            {/* <div className={classes.tag}>{tagList}</div> */}
          </div>
          <div className={classes.text}>{hiddenText}</div>
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

// import React from 'react'
// import { format } from 'date-fns'
// import { useSelector } from 'react-redux'
// import { Link } from 'react-router-dom'
// import classes from './BlogItem.module.scss'

// const BlogItem = (props) => {
//   const { author, title, createdAt, description, favoritesCount, tagList, body } = props
//   const {
//     posts: { articles },
//   } = useSelector((state) => state.posts)
//   const formatData = (data) => {
//     if (!data) return null
//     return format(new Date(data), 'MMMM d, yyyy')
//   }

//   const hiddenText = description.length > 120 ? description.slice(0, description.indexOf('', 145)) + '...' : description
//   const hiddenTitle = title.length > 25 ? title.slice(0, title.indexOf('', 25)) + '...' : title

//   return (
//     <li className={classes.item}>
//       <div className={classes.postInfo}>
//         <div className={classes.title}>
//           <div className={classes.header}>
//             {articles.map((post) => (
//               <div key={post.slug}>
//                 <Link
//                   // key={post.slug}
//                   to={`/articles/${post.slug}`}
//                   state={{
//                     title: title,
//                     author: author,
//                     createdAt: createdAt,
//                     description: description,
//                     favoritesCount: favoritesCount,
//                     tagList: tagList,
//                     body: body,
//                   }}
//                   {...post}
//                   className={classes.none}
//                 >
//                   <h3 className={classes.headerTitle}>{hiddenTitle}</h3>
//                 </Link>
//               </div>
//             ))}

//             <button className={classes.like}></button>
//             <div className={classes.likeCounter}>{favoritesCount}</div>
//           </div>
//           <div className={classes.info}>
//             <div className={classes.tag}>{tagList[0]}</div>
//             <div className={classes.tag}>{tagList[1]}</div>
//             <div className={classes.tag}>{tagList[2]}</div>
//             <div className={classes.text}>{hiddenText}</div>
//           </div>
//         </div>
//       </div>
//       <div className={classes.userInfo}>
//         <div className={classes.userContainer}>
//           <div className={classes.name}>{author.username}</div>
//           <div className={classes.date}>{formatData(createdAt)}</div>
//         </div>
//         <img className={classes.avatar} src={author.image} />
//       </div>
//     </li>
//   )
// }

// export default BlogItem
