import React from 'react'
// import MonacoEditor from 'react-monaco-editor'
import css from './style.module.css';
import Editor from '@monaco-editor/react';

const CodeEditor = ({value, setValue, fileType }) => {
    return (
        <div>
          <Editor 
            className={css.editor} 
            language={fileType.split('/')[1]} 
            value={value} 
            onChange ={(e) => setValue(e)} 
          />
        </div>
    )
}

export default CodeEditor
