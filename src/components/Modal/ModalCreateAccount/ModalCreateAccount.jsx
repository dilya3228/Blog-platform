import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { postSignUp } from '../../../service/postSignUp'
import classes from './ModalCreateAccount.module.scss'
const ModalCreateAccount = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { error, status, isReg, isIn } = useSelector((state) => state.user)
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
    const userRegData = {
      user: {
        username: data.username,
        email: data.email.toLowerCase(),
        password: data.password,
      },
    }
    dispatch(postSignUp(userRegData))
    reset()
  }

  const password = watch('password')

  useEffect(() => {
    if (isReg) {
      navigate('/', { replace: true })
    }
    reset()
  }, [isReg])

  return (
    <div className={classes.modal}>
      <div className={classes.form}>
        <h2 className={classes.title}>Create new account</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <span className={classes.labelTitle}>Username</span>
          <label htmlFor="username" className={classes.label}>
            <input
              type="text"
              {...register('username', {
                required: 'Поле обязательно для заполнения',
                maxLength: { value: 20, message: 'Максимум 20 символов' },
                minLength: { value: 3, message: 'Минимум 3 символа' },
              })}
              id="username"
              className={classes.input}
              placeholder="Username"
            />
          </label>
          <div className={classes.error}>{errors?.username && <p>{errors?.username?.message || 'Error!'}</p>}</div>
          <span className={classes.labelTitle}>Email address</span>
          <label htmlFor="email" className={classes.label}>
            <input
              type="text"
              {...register('email', { required: 'Поле обязательно для заполнения', pattern: /^\S+@\S+\.\S+$/ })}
              id="email"
              className={classes.input}
              placeholder="Email address"
            />
          </label>
          <div className={classes.error}>{errors?.email && <p>{errors?.email?.message || 'Ввудите корpектный Email!'}</p>}</div>
          <span className={classes.labelTitle}>Password</span>
          <label htmlFor="password" className={classes.label}>
            <input
              type="password"
              {...register('password', {
                required: 'Поле обязательно для заполнения',
                minLength: { value: 6, message: 'Минимум 6 символов' },
                maxLength: { value: 40, message: 'Максимум 40 символов' },
              })}
              id="password"
              className={classes.input}
              placeholder="Password"
            />
          </label>
          <div className={classes.error}>{errors?.password && <p>{errors?.password?.message || 'Error!'}</p>}</div>
          <span className={classes.labelTitle}>Password</span>
          <label htmlFor="PasswordConfirm" className={classes.label}>
            <input
              type="password"
              {...register('PasswordConfirm', {
                required: 'Поле обязательно для заполнения',
                minLength: { value: 6, message: 'Минимум 6 символов' },
                maxLength: { value: 40, message: 'Максимум 40 символов' },
                validate: (value) => value === password || 'Пароли не совпадают',
              })}
              id="PasswordConfirm"
              className={classes.input}
              placeholder="Password"
            />
          </label>
          <div className={classes.error}>{errors?.PasswordConfirm && <p>{errors?.PasswordConfirm?.message || 'Error!'}</p>}</div>
          <div className={classes.line}></div>
          <div className={classes.checkbox}>
            <input
              className={classes.checkbox__input}
              {...register('chekk', { required: true, validate: (value) => value !== register.chekk || 'Поставь галку' })}
              type="checkbox"
              id="checkbox_1"
            ></input>
            <label className={classes.checkbox__label} htmlFor="checkbox_1">
              I agree to the processing of my personal
              <br /> information
            </label>
            <div className={classes.error}>{errors?.chekk && <p>{errors?.chekk?.message || 'Error!'}</p>}</div>
          </div>
          {status === 'rejected' ? <div className={classes.error}>{error}</div> : ''}
          {/* <div className={classes.error}>{error && <p>{error.message || 'A user with the same username or email address exists!'}</p>}</div> */}
          <button type="submit" disabled={!isValid} className={classes.createBtn}>
            Create
          </button>
        </form>

        <span className={classes.already}>
          Already have an account? <Link to="/sign-in">Sign In</Link>.
        </span>
      </div>
    </div>
  )
}

export default ModalCreateAccount
