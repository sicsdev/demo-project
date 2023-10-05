import React, { useState } from 'react'
import { EditorState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

function App() {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(),
  )
  const toolbarOptions = {
    options: ["link"],  
  };
  return (
    <div className="App">
      <header className="App-header">Rich Text Editor Example</header>

      <Editor editorState={editorState} toolbar={toolbarOptions} onEditorStateChange={setEditorState} />
    </div>
  )
}

export default App
