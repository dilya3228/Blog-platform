import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from '../Header/Header'
import BlogList from '../BlogList/BlogList'
import classes from './App.module.scss'
import ModalFullPost from '../Pages/ModalFullPost/ModalFullPost'
import ModalCreateAccount from '../Pages/ModalCreateAccount/ModalCreateAccount'
import ModalEditProfile from '../Pages/ModalEditProfile/ModalEditProfile'
import ModalLogin from '../Pages/ModalLogin/ModalLogin'
import ModalCreatePost from '../Pages/ModalCreatePost/ModalCreatePost'
import ModalEditPost from '../Pages/ModalEditPost/ModalEditPost'
import PrivateRoute from './PrivatRoute'
import { path } from '../../utils/path'

const App = () => {
  return (
    <div className={classes.container}>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<BlogList />} />
          <Route path={`${path.articles}/:slug`} element={<ModalFullPost />} />
          <Route path={`${path.signUp}`} element={<ModalCreateAccount />} />
          <Route path={`${path.signIn}`} element={<ModalLogin />} />
          <Route
            path={`${path.profile}`}
            element={
              <PrivateRoute>
                <ModalEditProfile />
              </PrivateRoute>
            }
          />
          <Route
            path={`${path.newArticle}`}
            element={
              <PrivateRoute>
                <ModalCreatePost />
              </PrivateRoute>
            }
          />
          <Route path={`${path.articles}/:slug/edit`} element={<ModalEditPost />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
