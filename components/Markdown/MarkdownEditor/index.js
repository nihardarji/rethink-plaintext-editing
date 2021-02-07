import React from 'react'
import PropTypes from 'prop-types'
// import SimpleMDE from 'react-simplemde-editor';
import ReactMde from "react-mde"
import * as Showdown from "showdown"
import css from './style.module.css'

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true
})

function MarkdownEditor({ setValue, value }) {
  const [selectedTab, setSelectedTab] = React.useState("write")
  return (
    <div className={css.editor}>
      <ReactMde
        value={value}
        onChange={setValue}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={markdown =>
          Promise.resolve(converter.makeHtml(markdown))
        }
      />
    </div>
  )
}

MarkdownEditor.propTypes = {
  value: PropTypes.string,
  setValue: PropTypes.func,
}

export default MarkdownEditor
