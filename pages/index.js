import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import PropTypes from 'prop-types'
import path from 'path'

// Used below, these need to be registered
import PlaintextEditor from '../components/Plaintext/PlaintextEditor'
import MarkdownEditor from '../components/Markdown/MarkdownEditor'
import MarkdownPreviewer from '../components/Markdown/MarkdownPreviewer'
import PlaintextPreviewer from '../components/Plaintext/PlaintextPreviewer'
import CodeEditor from '../components/Code/CodeEditor'
import CodePreviewer from '../components/Code/CodePreviewer'
import FilesTable from '../components/FileTable'

import css from './style.module.css'
import { Box, Button } from '@material-ui/core'
import { write, deleteFile, getFiles } from '../helper/index'

const REGISTERED_PREVIEWERS = {
  "text/plain": PlaintextPreviewer,
  "text/markdown": MarkdownPreviewer,
  "text/javascript": CodePreviewer,
  "application/json": CodePreviewer
}
// Uncomment keys to register editors for media types
const REGISTERED_EDITORS = {
  "text/plain": PlaintextEditor,
  "text/markdown": MarkdownEditor,
  "text/javascript": CodeEditor,
  "application/json": CodeEditor
}

function Previewer({ file, edit, setEdit, files, del, setDel, setActiveFile }) {
  const [value, setValue] = useState('')

  const Viewer = file.type ? REGISTERED_PREVIEWERS[file.type] : null
  const Editor = file.type ? REGISTERED_EDITORS[file.type] : null

  useEffect(() => {
    setValue(JSON.parse(localStorage.getItem('files')).find(f => f.name === file.name).text)
  }, [file, edit])

  return (
    <div className={css.preview}>
      <div className={css.title}>{path.basename(file.name)}</div>
      <div className={css.content}>
        {edit ?
          <Editor value={value} setValue={setValue} fileType={file.type} write={write} />
          :
          <Viewer value={value} fileType={file.type} />
        }
      </div>
      <div>
        {!edit ? (
          <Box p={2}>
            <Button className={css.button} onClick={() => setEdit(true)} variant='outlined' color='primary'>Edit</Button>
            <Button className={css.button} onClick={() => {
              if (confirm('Are you sure?')) {
                deleteFile(file, files, del, setDel)
                setActiveFile(null)
              }
            }} variant='outlined' color='primary'>Delete</Button>
          </Box>
        ) : (
            <Box p={2}>
              <Button
                className={css.button}
                onClick={() => {
                  write(file, value, files)
                  setEdit(false)
                }}
                variant='outlined'
                color='primary'>
                Save
            </Button>
              <Button
                className={css.button}
                onClick={() => setEdit(false)}
                variant='outlined'
                color='primary'>
                Cancel
            </Button>
            </Box>
          )}
      </div>
    </div>
  )
}

Previewer.propTypes = {
  file: PropTypes.object
}

function PlaintextFilesChallenge() {
  const [files, setFiles] = useState([])
  const [activeFile, setActiveFile] = useState(null)
  const [edit, setEdit] = useState(false)
  const [del, setDel] = useState(false)

  useEffect(() => {
    (async () => {
      const files = await getFiles()
      setFiles(files)
    })()
  }, [])

  return (
    <div className={css.page}>
      <Head>
        <title>Rethink Engineering Challenge</title>
      </Head>
      <aside>
        <header>
          <div className={css.tagline}>Rethink Engineering Challenge</div>
          <h1>Fun With Plaintext</h1>
          <div className={css.description}>
            Let{"'"}s explore files in JavaScript. What could be more fun than
            rendering and editing plaintext? Not much, as it turns out.
          </div>
        </header>

        <FilesTable
          files={files}
          activeFile={activeFile}
          setActiveFile={setActiveFile}
          setEdit={setEdit}
        />

        <div style={{ flex: 1 }}></div>

        <footer>
          <div className={css.link}>
            <a href="https://v3.rethink.software/jobs">Rethink Software</a>
            &nbsp;—&nbsp;Frontend Engineering Challenge
          </div>
          <div className={css.link}>
            Questions? Feedback? Email us at jobs@rethink.software
          </div>
        </footer>
      </aside>

      <main className={css.editorWindow}>
        {activeFile && (
          <>
            <Previewer
              file={activeFile}
              edit={edit}
              setEdit={setEdit}
              files={files}
              del={del}
              setDel={setDel}
              setActiveFile={setActiveFile}
            />
          </>
        )}

        {!activeFile && (
          <div className={css.empty}>Select a file to view or edit</div>
        )}
      </main>
    </div>
  )
}

export default PlaintextFilesChallenge
