import React from 'react'
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'

const MarkdownPreviewer = ({ value }) => {

    return (
        <ReactMarkdown>
            {value}
        </ReactMarkdown>
    )
}

MarkdownPreviewer.propTypes = {
    file: PropTypes.object,
}

export default MarkdownPreviewer
