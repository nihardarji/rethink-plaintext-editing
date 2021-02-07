import React from 'react'
import PropTypes from 'prop-types'

import SyntaxHighlighter from 'react-syntax-highlighter'

const CodePreviewer = ({ value, fileType }) => {
    return (
        <div>
            <SyntaxHighlighter language={fileType.split('/')[1]} >
                {value}
            </SyntaxHighlighter>
        </div>
    )
}

CodePreviewer.propTypes = {
    value: PropTypes.string,
    fileType: PropTypes.string
}

export default CodePreviewer
