import React, { useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useForm, useFieldArray } from 'react-hook-form'
import { putEdit, createPost } from '../../../store/Slice/getPostsSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'antd'
import classes from './ModalEditPost.module.scss'

const ModalEditPost = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  const {
    isEditPost,
    isCreatePost,
    posts: { article },
  } = useSelector((state) => state.posts)
  const { title, description, tagList, body, slug } = article
  // const { title, description, tagList, body, key } = location.state

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    getValues,
    reset,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      title: title || '',
      description: description || '',
      body: body || '',
      tagList: tagList || [{ name: '' }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    name: 'tagList',
    control,
  })

  const onSubmit = handleSubmit((data) => {
    const validData = {
      article: {
        title: data.title,
        description: data.description,
        body: data.body,
        tagList: data.tagList.map((tag) => tag.name),
      },
    }
    const slugData = {
      validData,
      slug,
    }
    if (slug) {
      dispatch(putEdit(slugData))
    } else {
      dispatch(createPost(validData))
    }

    // reset()
  })

  useEffect(() => {
    if (isEditPost) {
      navigate('/', { replace: true })
    }
    if (isCreatePost) {
      navigate('/', { replace: true })
    }
    // reset()
  }, [isEditPost, isCreatePost])

  return (
    <div className={classes.title}>
      <form onSubmit={onSubmit}>
        <h2 className={classes.titleh2}>Edit post</h2>
        <span className={classes.label}>Title</span>
        <input
          type="text"
          placeholder="Title"
          {...register('title', {
            required: 'Поле обязательно к заполнению',
          })}
        />
        {errors?.title && <span className={classes.error}>{errors?.title?.message || ''}</span>}
        <span className={classes.label}>Short description</span>
        <input
          type="text"
          placeholder="Description"
          {...register('description', {
            required: 'Поле обязательно к заполнению',
          })}
        />
        {errors?.description && <span className={classes.error}>{errors?.description?.message || ''}</span>}
        <span className={classes.label}>Text</span>
        <textarea
          placeholder="Text"
          className={classes.area}
          {...register('body', {
            required: 'Поле обязательно к заполнению',
          })}
        />
        {errors?.body && <span className={classes.error}>{errors?.body?.message || ''}</span>}
        <span className={classes.label}>Tags</span>
        <div className={classes.containerTag}>
          {fields.map((field, index) => (
            <div className={classes.divOne} key={field.id}>
              <div className={classes.divTwo} style={{ display: 'flex', flexDirection: 'column', width: '320px' }}>
                <input
                  type="text"
                  placeholder="Tag"
                  className={classes.tag}
                  {...register(`tagList.${index}.name`, {
                    required: 'Тег не должен быть пустой, заполните или удалите',
                    pattern: {
                      value: /^[a-zA-Z0-9]+$/,
                      message: 'Вы можете использовать только английские буквы и цифры без пробелов и других символов',
                    },
                    validate: (tagInputValue) =>
                      !getValues()
                        .tagList.map(({ name }) => name)
                        .filter((_, currentChangingTagIndex) => index !== currentChangingTagIndex)
                        .includes(tagInputValue) || 'Теги должны быть уникальные!',
                  })}
                />
                {errors?.tagList?.[index] && <span className={classes.error}>{errors?.tagList?.[index]?.name?.message?.toString()}</span>}
              </div>
              <Button type="primary" danger ghost className={classes.delete} style={{ marginRight: '8px' }} onClick={() => remove(index)}>
                Delete
              </Button>
            </div>
          ))}
          <Button
            type="primary"
            ghost
            className={classes.add}
            onClick={() => {
              append({
                name: '',
              })
            }}
          >
            Add tag
          </Button>
        </div>
        <button className={classes.btn} type="submit">
          Send
        </button>
      </form>
    </div>
  )
}

export default ModalEditPost
