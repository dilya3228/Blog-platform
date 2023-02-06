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
    mode: 'onChange',
  })

  const onSubmit = (data) => {
    const userRegData = {
      user: {
        username: data.name,
        email: data.email.toLowerCase(),
        password: data.password,
      },
    }
    dispatch(postSignUp(userRegData))
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
          <input
            type="text"
            className={classes.input}
            placeholder="Username"
            {...register('name', {
              required: 'Поле обязательно к заполнению',
              minLength: 3,
              maxLength: 20,
              pattern: {
                value: /^[a-z][a-z0-9]*$/,
                message: (
                  <>
                    Username может начинаться только
                    <br />
                    со строчных английских букв и содержать цифры
                  </>
                ),
              },
            })}
          />
          {errors?.name && <p className={classes.error}>{errors?.name?.message || 'Username должен быть от 3 до 20 символов'}</p>}
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
          <span className={classes.labelTitle}>Password</span>
          <input
            type="password"
            {...register('password', {
              required: 'Поле обязательно к заполнению',
              minLength: 6,
              maxLength: 40,
            })}
            className={classes.input}
            placeholder="Password"
          />
          {errors?.password && <p className={classes.error}>{errors?.password?.message || 'Password должен быть от 6 до 40 символов'}</p>}
          <span className={classes.labelTitle}>Password</span>
          <input
            type="password"
            className={classes.input}
            placeholder="Password"
            {...register('repeatPassword', {
              required: 'Поле обязательно к заполнению',
              minLength: 6,
              maxLength: 40,
              validate: (val) => {
                if (watch('password') !== val) {
                  return 'Пароль должен совпадать'
                }
              },
            })}
          />
          {errors?.repeatPassword && <p className={classes.error}>{errors?.repeatPassword?.message || 'Password должен быть от 6 до 40 символов'}</p>}
          <div className={classes.line}></div>
          <div className={classes.checkbox}>
            <input
              className={classes.checkbox__input}
              type="checkbox"
              id="chekk"
              {...register('chekk', { required: 'Соглашение с условиями обязательно' })}
            ></input>
            <label htmlFor="chekk" className={classes.checkbox__label}>
              I agree to the processing of my personal
              <br /> information
            </label>
            {/* {errors?.acceptTerms && <p className={classes.error}>{errors?.acceptTerms?.message || ''}</p>} */}
            <p className={classes.error}>{error ?? ''}</p>
            {errors?.chekk && <span className={classes.error}>{errors?.chekk?.message || ''}</span>}
            {/* <span className={classes.error}>{error ?? ''}</span> */}
            {/* <div className={classes.error}>{errors?.chekk && <p>{errors?.chekk?.message || 'Error!'}</p>}</div> */}
          </div>
          {/* {status === 'rejected' ? <div className={classes.error}>{error}</div> : ''} */}
          {/* <div className={classes.error}>{error && <p>{error.message || 'A user with the same username or email address exists!'}</p>}</div> */}
          <button type="submit" className={classes.createBtn}>
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
