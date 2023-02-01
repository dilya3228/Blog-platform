import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createPost } from '../../../store/Slice/getPostsSlice'
import classes from './ModalCreatePost.module.scss'

const ModalCreatePost = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isCreatePost } = useSelector((state) => state.posts)

  const [unputs, setInputs] = useState([''])

  const handelAdd = () => {
    setInputs([...unputs, ''])
  }

  const handelDel = (index) => {
    const list = [...unputs]
    list.splice(index, 1)
    setInputs(list)
  }

  const handleChange = (e, index) => {
    const { value } = e.target
    const list = [...unputs]
    list[index] = value
    setInputs(list)
  }

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
    const stateCreatePost = {
      article: {
        title: data.title,
        description: data.description,
        body: data.body,
        tagList: unputs.filter((tag) => tag),
      },
    }
    dispatch(createPost(stateCreatePost))
    reset()
  }

  useEffect(() => {
    if (isCreatePost) {
      navigate(`/`, { replace: true })
    }
    reset()
  }, [isCreatePost])

  return (
    <div className={classes.title}>
      <div className={classes.createTitle}>
        <h2 className={classes.titleh2}>Create new article</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <span className={classes.labelTitle}>Title</span>
          <label htmlFor="title" className={classes.label}>
            <input
              type="text"
              id="title"
              className={classes.input}
              placeholder="Title"
              {...register('title', {
                required: 'Поле обязательно для заполнения',
                minLength: { value: 3, message: 'Минимум 3 символов' },
                maxLength: { value: 50, message: 'Максимум 50 символов' },
              })}
            />
          </label>
          <div className={classes.error}>{errors?.title && <p>{errors?.title?.message || 'Error!'}</p>}</div>
          <span className={classes.labelTitle}>Short description</span>
          <label htmlFor="description" className={classes.label}>
            <input
              type="text"
              id="description"
              className={classes.input}
              placeholder="Short description"
              {...register('description', {
                required: 'Поле обязательно для заполнения',
                minLength: { value: 3, message: 'Минимум 3 символов' },
                maxLength: { value: 80, message: 'Максимум 80 символов' },
              })}
            />
          </label>
          <div className={classes.error}>{errors?.description && <p>{errors?.description?.message || 'Error!'}</p>}</div>
          <span className={classes.labelTitle}>Text</span>
          <label htmlFor="body" className={classes.label}>
            <input
              id="body"
              type="text"
              className={classes.inputText}
              placeholder="Text"
              {...register('body', {
                required: 'Поле обязательно для заполнения',
                minLength: { value: 3, message: 'Минимум 3 символов' },
                maxLength: { value: 1000, message: 'Максимум 50 символов' },
              })}
            />
          </label>
          <div className={classes.error}>{errors?.body && <p>{errors?.body?.message || 'Error!'}</p>}</div>
          <span className={classes.labelTitleTag}>Tag</span>
          <label htmlFor="Tag" className={classes.wrapTag}>
            <>
              {unputs.map((singlInput, index) => (
                <div key={index}>
                  <input
                    name="service"
                    id="Tag"
                    type="text"
                    value={singlInput}
                    className={classes.inputTag}
                    placeholder="Tag"
                    onChange={(e) => handleChange(e, index)}
                  />
                  {unputs.length > 1 && (
                    <button onClick={() => handelDel(index)} className={classes.wrapperBtnDel}>
                      Delete
                    </button>
                  )}

                  {unputs.length - 1 === index && unputs.length < 4 && (
                    <button onClick={handelAdd} className={classes.wrapperBtnAdd}>
                      Add tag
                    </button>
                  )}
                </div>
              ))}
            </>
          </label>
          <button type="submit" className={classes.sendBtn}>
            Send
          </button>
        </form>
      </div>
    </div>
  )
}

export default ModalCreatePost
