import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { postLogUser } from '../../../store/Slice/userSlice'
import classes from './ModalLogin.module.scss'

const ModalLogin = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { isIn, isReg } = useSelector((state) => state.user)

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
        email: data.email.toLowerCase(),
        password: data.password,
      },
    }
    dispatch(postLogUser(userRegData))
    reset()
  }

  useEffect(() => {
    if (isIn) {
      navigate('/', { replace: true })
    }
  }, [isIn])

  return (
    <div className={classes.modal}>
      <div className={classes.form}>
        <h2 className={classes.title}>Sign In</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
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
          <div className={classes.error}>{errors?.email && <p>{errors?.email?.message || 'Введите корpектный Email!'}</p>}</div>
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
          <button type="submit" className={classes.loginBtn}>
            Login
          </button>
        </form>
        <span className={classes.already}>
          Already have an account? <Link to="/sign-up">Sign Up</Link>.
        </span>
      </div>
    </div>
  )
}

export default ModalLogin
