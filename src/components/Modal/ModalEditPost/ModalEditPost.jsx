import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { putEdit } from '../../../store/Slice/getPostsSlice'
import { useDispatch, useSelector } from 'react-redux'
import classes from './ModalEditPost.module.scss'

const ModalEditPost = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const { title, description, tagList, body, key } = location.state
  const { isEditPost } = useSelector((state) => state.posts)

  const [unputs, setInputs] = useState([tagList])

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
    const stateEditPost = {
      article: {
        title: data.title,
        description: data.description,
        body: data.body,
      },
    }
    dispatch(putEdit(key, stateEditPost))
    reset()
  }

  useEffect(() => {
    if (isEditPost) {
      navigate('/', { replace: true })
    }
    reset()
  }, [isEditPost])

  return (
    <div className={classes.title}>
      <div className={classes.createTitle}>
        <h2 className={classes.titleh2}>Edit article</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <span className={classes.labelTitle}>title</span>
          <label htmlFor="Title" className={classes.label}>
            <input
              defaultValue={title}
              id="Title"
              className={classes.input}
              {...register('title', {
                required: false,
                minLength: { value: 3, message: 'Минимум 3 символов' },
                maxLength: { value: 50, message: 'Максимум 50 символов' },
              })}
            />
          </label>
          <span className={classes.labelTitle}>description</span>
          <label htmlFor="Short description" className={classes.label}>
            <input
              id="Short description"
              defaultValue={description}
              {...register('description', {
                required: false,
                minLength: { value: 3, message: 'Минимум 3 символов' },
                maxLength: { value: 80, message: 'Максимум 80 символов' },
              })}
              className={classes.input}
            />
          </label>
          <span className={classes.labelTitle}>body</span>
          <input
            id="Text"
            defaultValue={body}
            {...register('body', {
              required: false,
              minLength: { value: 3, message: 'Минимум 3 символов' },
              maxLength: { value: 1000, message: 'Максимум 50 символов' },
            })}
            type="text"
            className={classes.inputText}
          />
          <span className={classes.labelTitleTag}>Tags</span>
          <label htmlFor="Tags" className={classes.wrapTag}>
            {unputs.map((singlInput, index) => (
              <>
                <div key={index}>
                  <input
                    name="service"
                    id="Tag"
                    type="text"
                    defaultValue={singlInput}
                    // value={singlInput}
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
              </>
            ))}
          </label>
          <button type="submit" className={classes.sendBtn}>
            Send
          </button>
        </form>
      </div>
    </div>
  )
}

export default ModalEditPost
