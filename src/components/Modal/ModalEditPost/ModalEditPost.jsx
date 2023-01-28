import React from 'react'
import classes from './ModalEditPost.module.scss'

const ModalEditPost = () => {
  return (
    <div className={classes.title}>
      <div className={classes.createTitle}>
        <h2 className={classes.titleh2}>Edit article</h2>
        <form>
          <span className={classes.labelTitle}>Title</span>
          <label htmlFor="Title" className={classes.label}>
            <input id="Title" className={classes.input} placeholder="Title" />
          </label>
          <span className={classes.labelTitle}>Short description</span>
          <label htmlFor="Short description" className={classes.label}>
            <input id="Short description" className={classes.input} placeholder="Short description" />
          </label>
          <span className={classes.labelTitle}>Text</span>
          <input id="Text" type="text" className={classes.inputText} placeholder="Text" />
          <span className={classes.labelTitleTag}>Tags</span>
          <label htmlFor="Tags" className={classes.wrapTag}>
            <input id="Tags" className={classes.inputTag} placeholder="Tag" />
            <input id="Tags" className={classes.inputTag} placeholder="Tag" />
            <input id="Tags" className={classes.inputTag} placeholder="Tag" />
            <button className={classes.wrapperBtn}>Delete</button>
            <button className={classes.wrapperBtn}>Delete</button>
            <button className={classes.wrapperBtn}>Delete</button>
            <button className={classes.wrapperBtn}>Add tag</button>
          </label>
        </form>
        <button type="submit" className={classes.sendBtn}>
          Send
        </button>
      </div>
    </div>
  )
}

export default ModalEditPost
