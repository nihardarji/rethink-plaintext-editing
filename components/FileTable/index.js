import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import css from './style.module.css'
import path from 'path'
import IconPlaintextSVG from '../../public/icon-plaintext.svg'
import IconMarkdownSVG from '../../public/icon-markdown.svg'
import IconJavaScriptSVG from '../../public/icon-javascript.svg'
import IconJSONSVG from '../../public/icon-json.svg'

const TYPE_TO_ICON = {
  'text/plain': IconPlaintextSVG,
  'text/markdown': IconMarkdownSVG,
  'text/javascript': IconJavaScriptSVG,
  'application/json': IconJSONSVG
}

const FilesTable = ({ files, activeFile, setActiveFile, setEdit }) => {
  return (
    <div className={css.files}>
      <table>
        <thead>
          <tr>
            <th>File</th>
            <th>Modified</th>
          </tr>
        </thead>
        <tbody>
          {files.map(file => (
            <tr
              key={file.name}
              className={classNames(
                css.row,
                activeFile && activeFile.name === file.name ? css.active : ''
              )}
              onClick={() => {
                setActiveFile(file)
                setEdit(false)
              }
              }>
              <td className={css.file}>
                <div
                  className={css.icon}
                  dangerouslySetInnerHTML={{
                    __html: TYPE_TO_ICON[file.type]
                  }}
                ></div>
                {path.basename(file.name)}
              </td>

              <td>
                {new Date(file.lastModified).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
FilesTable.propTypes = {
  files: PropTypes.arrayOf(PropTypes.object),
  activeFile: PropTypes.object,
  setActiveFile: PropTypes.func,
  setEdit: PropTypes.func
}

export default FilesTable
