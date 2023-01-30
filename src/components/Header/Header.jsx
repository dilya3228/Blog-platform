import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, editProfile } from '../../store/Slice/userSlice'
import { createArticle } from '../../store/Slice/getPostsSlice'
import classes from './Header.module.scss'
import avatar from '../../img/Rectangle1.png'

const Header = () => {
  const dispatch = useDispatch()
  const { isIn, isReg } = useSelector((state) => state.user)
  const { username, image } = useSelector((state) => state.user.user)

  return (
    <>
      <div className={classes.container}>
        <Link to="/" className={classes.none}>
          <h1>Realworld Blog</h1>
        </Link>
        <div className={classes.containerBtn}>
          {isIn || isReg ? (
            <div className={classes.wrapper}>
              <Link to="new-article" className={classes.createArt} onClick={() => dispatch(createArticle())}>
                Create article
              </Link>
              <div className={classes.userContainer}>
                <Link to="/profile" className={classes.userProf} onClick={() => dispatch(editProfile())}>
                  <span className={classes.name}>{username}</span>
                  <img className={classes.avatar} src={image || avatar} />
                </Link>
              </div>
              <Link to="/" className={classes.logOut} onClick={() => dispatch(logout())}>
                Log Out
              </Link>
            </div>
          ) : (
            <>
              <Link to="sign-in" className={classes.signInBtn}>
                Sign In
              </Link>
              <Link to="sign-up" className={classes.signUpBtn}>
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
