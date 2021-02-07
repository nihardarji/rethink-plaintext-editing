import React from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter';
// import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const CodePreviewer = ({ value, fileType }) => {
    return (
        <div>
            <SyntaxHighlighter language={fileType.split('/')[1]} >
                {value}
            </SyntaxHighlighter>
        </div>
    )
}

export default CodePreviewer
