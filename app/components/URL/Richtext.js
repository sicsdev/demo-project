import React, { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState, convertFromHTML } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const TextEditor = ({ oldContent, editing }) => {

  const [editorState, setEditorState] = useState(() => {
    // if (oldContent) {
    //     const blocksFromHtml = convertFromHTML(oldContent);
    //     const state = ContentState.createFromBlockArray(blocksFromHtml.contentBlocks);
    //     return EditorState.createWithContent(state);
    // }
    return EditorState.createEmpty();
  });

  const [postContent, setPostContent] = useState('')

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    setPostContent(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  };


  return (
    <div>
      <Editor
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={onEditorStateChange}
        toolbar={{
          options: ['inline', 'fontSize', 'fontFamily', 'colorPicker', 'emoji', 'link'],
          inline: {
            options: ['bold', 'italic', 'underline'],
          },
          fontSize: {
            options: [8, 9, 10, 11, 12, 14, 16, 18, 24],
          },
          fontFamily: {
            options: ['Arial', 'Georgia', 'Impact', 'Tahoma', 'Times New Roman', 'Verdana'],
          },
          link: {
            options: ['link', 'unlink'],
          },
        }}
        placeholder="Que deseas publicar?"
      />
    </div>
  );
};

export default TextEditor;
