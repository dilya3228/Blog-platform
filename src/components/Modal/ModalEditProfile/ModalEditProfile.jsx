import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { putEditP } from '../../../store/Slice/userSlice'
import classes from './ModalEditProfile.module.scss'

const ModalEditProfile = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isEdit, isIn, isReg } = useSelector((state) => state.user)

  const {
    register,
    watch,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({
    mode: 'onBlur',
  })

  const onSubmit = (data) => {
    const stateUser = {
      user: {
        username: data.username,
        email: data.email.toLowerCase(),
        password: data.password,
        image: data.image,
      },
    }
    dispatch(putEditP(stateUser))
    reset()
  }

  useEffect(() => {
    if (isEdit) {
      navigate('/', { replace: true })
    }
    reset()
  }, [isEdit])

  return (
    <div className={classes.modal}>
      <div className={classes.form}>
        <h2 className={classes.title}>Edit Profile</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <span className={classes.labelTitle}>Username</span>
          <label htmlFor="username" className={classes.label}>
            <input
              id="username"
              className={classes.input}
              placeholder="Username"
              {...register('username', {
                required: 'Поле обязательно для заполнения',
                maxLength: { value: 20, message: 'Максимум 20 символов' },
                minLength: { value: 3, message: 'Минимум 3 символа' },
                pattern: {
                  value: /^[a-z][a-z0-9]*$/,
                  message: 'You can only use lowercase English letters and numbers',
                },
              })}
            />
          </label>
          <div className={classes.error}>{errors?.username && <p>{errors?.username?.message || 'Error!'}</p>}</div>
          <span className={classes.labelTitle}>Email address</span>
          <label htmlFor="email" className={classes.label}>
            <input
              type="text"
              {...register('email', {
                required: 'Поле обязательно для заполнения',
                pattern: /^\S+@\S+\.\S+$/,
              })}
              id="email"
              className={classes.input}
              placeholder="Email address"
            />
          </label>
          <div className={classes.error}>{errors?.email && <p>{errors?.email?.message || 'Введите корpектный Email!'}</p>}</div>
          <span className={classes.labelTitle}>New password</span>
          <label htmlFor="password" className={classes.label}>
            <input
              id="password"
              type="password"
              className={classes.input}
              placeholder="New password"
              {...register('password', {
                required: 'Поле обязательно для заполнения',
                minLength: { value: 6, message: 'Минимум 6 символов' },
                maxLength: { value: 40, message: 'Максимум 40 символов' },
              })}
            />
          </label>
          <div className={classes.error}>{errors?.password && <p>{errors?.password?.message || 'Error!'}</p>}</div>
          <span className={classes.labelTitle}>Avatar image (url)</span>
          <label htmlFor="image" className={classes.label}>
            <input
              id="image"
              className={classes.input}
              placeholder="Avatar image (url)"
              {...register('image', {
                pattern:
                  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/,
              })}
            />
          </label>
          <div className={classes.error}>{errors?.image && <p>{errors?.image?.message || 'Не корректная ссылка'}</p>}</div>
          <button type="submit" className={classes.saveBtn}>
            Save
          </button>
        </form>
      </div>
    </div>
  )
}

export default ModalEditProfile
