import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { putEditP } from '../../../store/Slice/userSlice'
import classes from './ModalEditProfile.module.scss'

const ModalEditProfile = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user, isEdit, isIn, isReg } = useSelector((state) => state.user)
  const { username, email, image } = user

  const {
    register,
    watch,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({
    mode: 'onChange',
    defaultValues: { username, email, avatar: image },
  })

  const onSubmit = (data) => {
    const stateUser = {
      user: {
        username: data.username,
        email: data.email.toLowerCase(),
        password: data.password,
        image: data.avatar,
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
          <input
            className={classes.input}
            placeholder="Username"
            defaultValue={username}
            {...register('username', {
              required: 'Поле обязательно к заполнению',
              minLength: 3,
              maxLength: 20,
              pattern: {
                value: /^[a-z][a-z0-9]*$/,
                message: 'Username может начинаться только со строчных английских букв и содержать цифры',
              },
            })}
          />
          {errors?.username && <p className={classes.error}>{errors?.username?.message || 'Username должен быть от 3 до 20 символов'}</p>}
          <span className={classes.labelTitle}>Email address</span>
          <input
            disabled
            type="email"
            defaultValue={email}
            {...register('email', {
              required: 'Поле обязательно для заполнения',
              pattern: /^\S+@\S+\.\S+$/,
            })}
            id="email"
            className={classes.input}
            placeholder="Email address"
          />
          {errors?.email && <p className={classes.error}>{errors?.email?.message || 'Username должен быть от 3 до 20 символов'}</p>}
          <span className={classes.labelTitle}>New password</span>
          <input
            id="password"
            type="password"
            className={classes.input}
            placeholder="New password"
            {...register('password', {
              required: 'Поле обязательно для заполнения',
              minLength: 6,
              maxLength: 40,
            })}
          />
          {errors?.password && <p className={classes.error}>{errors?.password?.message || 'Password должен быть от 6 до 40 символов'}</p>}
          <span className={classes.labelTitle}>Avatar image (url)</span>
          <input
            id="image"
            defaultValue={image}
            className={classes.input}
            placeholder="Avatar image (url)"
            {...register('avatar', {
              pattern: {
                value: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/,
                message: 'Некорректный URL',
              },
            })}
          />
          {errors?.avatar && <p className={classes.error}>{errors?.avatar?.message || ''}</p>}
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
