import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { postLogUser, errorNull } from '../../../store/Slice/userSlice'
import classes from './ModalLogin.module.scss'

const ModalLogin = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { error, status, isIn, isReg } = useSelector((state) => state.user)

  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    mode: 'onChange',
  })

  const onSubmit = (data) => {
    const userRegData = {
      user: {
        email: data.email.toLowerCase(),
        password: data.password,
      },
    }
    dispatch(postLogUser(userRegData))
  }

  useEffect(() => {
    if (isIn) {
      navigate('/', { replace: true })
    }
    reset()
  }, [isIn])

  useEffect(() => {
    dispatch(errorNull())
  }, [])

  return (
    <div className={classes.modal}>
      <div className={classes.form}>
        <h2 className={classes.title}>Sign In</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <span className={classes.labelTitle}>Email address</span>
          <input
            type="email"
            className={classes.input}
            placeholder="Email address"
            {...register('email', {
              required: 'Поле обязательно к заполнению',
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: 'Введите корректный e-mail',
              },
            })}
          />
          {errors?.email && <p className={classes.error}>{errors?.email?.message || 'Некорректный Email'}</p>}
          {/* <div className={classes.error}>{errors?.email && <p>{errors?.email?.message || 'Введите корpектный Email!'}</p>}</div> */}
          <span className={classes.labelTitle}>Password</span>
          <input
            type="password"
            className={classes.input}
            placeholder="Password"
            {...register('password', {
              required: 'Поле обязательно к заполнению',
              minLength: 6,
              maxLength: 40,
            })}
          />
          {errors?.password && <p className={classes.error}>{errors?.password?.message || 'Password должен быть от 6 до 40 символов'}</p>}
          {status === 'rejected' ? <div className={classes.error}>{error}</div> : ''}
          {/* <div className={classes.error}>{errors?.password && <p>{errors?.password?.message || 'Error!'}</p>}</div> */}
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
