import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from '../Header/Header'
import BlogList from '../BlogList/BlogList'
import classes from './App.module.scss'
import ModalFullPost from '../Modal/ModalFullPost/ModalFullPost'
import ModalCreateAccount from '../Modal/ModalCreateAccount/ModalCreateAccount'
import ModalEditProfile from '../Modal/ModalEditProfile/ModalEditProfile'
import ModalLogin from '../Modal/ModalLogin/ModalLogin'
import ModalCreatePost from '../Modal/ModalCreatePost/ModalCreatePost'
import ModalEditPost from '../Modal/ModalEditPost/ModalEditPost'
import PrivateRoute from './PrivatRoute'

const App = () => {
  return (
    <div className={classes.container}>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<BlogList />} />
          <Route path="articles/:slug" element={<ModalFullPost />} />
          <Route path="sign-up" element={<ModalCreateAccount />} />
          <Route path="sign-in" element={<ModalLogin />} />
          <Route path="profile" element={<ModalEditProfile />} />
          <Route
            path="new-article"
            element={
              <PrivateRoute>
                <ModalCreatePost />
              </PrivateRoute>
            }
          />
          <Route path="edit" element={<ModalEditPost />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
