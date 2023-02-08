import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, editProfile } from '../../store/Slice/userSlice'
import { createArticle } from '../../store/Slice/getPostsSlice'
import { Avatar } from 'antd'
import classes from './Header.module.scss'
import avatar from '../../img/Rectangle1.png'

const Header = () => {
  const dispatch = useDispatch()
  const { isIn, isReg, error, user } = useSelector((state) => state.user)
  const { username } = useSelector((state) => state.user.user)
  const userAvatar = user?.image ? user.image : avatar
  const to = {
    signUp: 'sign-up',
    signIn: 'sign-in',
    profile: 'profile',
    newArticle: 'new-article',
  }

  return (
    <>
      <div className={classes.container}>
        <Link to="/" className={classes.none}>
          <h1>Realworld Blog</h1>
        </Link>
        <div className={classes.containerBtn}>
          {isIn || isReg ? (
            <div className={classes.wrapper}>
              <Link to={`${to.newArticle}`} className={classes.createArt} onClick={() => dispatch(createArticle())}>
                Create article
              </Link>
              <div className={classes.userContainer}>
                <Link to={`${to.profile}`} className={classes.userProf} onClick={() => dispatch(editProfile())}>
                  <span className={classes.name}>{username}</span>
                  {/* <img className={classes.avatar} src={userAvatar} /> */}
                  <Avatar src={userAvatar} size={46} />
                </Link>
              </div>
              <Link to="/" className={classes.logOut} onClick={() => dispatch(logout())}>
                Log Out
              </Link>
            </div>
          ) : (
            <>
              <Link to={`${to.signIn}`} className={classes.signInBtn}>
                Sign In
              </Link>
              <Link to={`${to.signUp}`} className={classes.signUpBtn}>
                SignUp
              </Link>
            </>
          )}
        </div>
      </div>
      <Outlet />
    </>
  )
}

export default Header
