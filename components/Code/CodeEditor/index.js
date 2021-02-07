import React from 'react'
import PropTypes from 'prop-types'
import css from './style.module.css'
import Editor from '@monaco-editor/react'

const CodeEditor = ({ value, setValue, fileType }) => {
  return (
    <div>
      <Editor
        className={css.editor}
        language={fileType.split('/')[1]}
        value={value}
        onChange={(e) => setValue(e)}
      />
    </div>
  )
}

CodeEditor.propTypes = {
  value: PropTypes.string,
  setValue: PropTypes.func,
  fileType: PropTypes.string
}

export default CodeEditor
