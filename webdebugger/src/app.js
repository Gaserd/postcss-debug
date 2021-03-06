import React from 'react'
import ReactDOM from 'react-dom'
import FileSelector from './components/file-selector'
import './styles.css'

const { files } = window.postcssDebug

ReactDOM.render(
  <FileSelector files={files} />,
  document.getElementById('file-selector')
)
