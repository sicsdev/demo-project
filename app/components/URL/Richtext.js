import React, { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState, convertFromHTML } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import './customstyles.css'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const TextEditor = ({ oldContent, editing, handleTextEditorChange, debugMode }) => {

  const [editorState, setEditorState] = useState(() => {
    if (oldContent) {
      const blocksFromHtml = convertFromHTML(oldContent);
      const state = ContentState.createFromBlockArray(blocksFromHtml.contentBlocks);
      console.log(oldContent, 'oldcontent')
      console.log(blocksFromHtml, 'blocks')
      console.log('state', state)
      return EditorState.createWithContent(restoreLinks(state));
    }
    return EditorState.createEmpty();
  });

  const [postContentWithOutReplace, setPostContentWithOutReplace] = useState('')
  const [postContent, setPostContent] = useState('')

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    setPostContentWithOutReplace(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    setPostContent(replaceLink(draftToHtml(convertToRaw(editorState.getCurrentContent()))));
    handleTextEditorChange(replaceLink(draftToHtml(convertToRaw(editorState.getCurrentContent()))));
  };

  const showOutput = () => {
    console.log(postContent, 'postcontent')
    console.log(editorState, 'editor state')
    console.log(postContentWithOutReplace, 'without format')
  }


  const customStyleMap = {
    LINK: {
      color: 'blue',
      fontWeight: 'bold',
      textDecoration: 'underline',
    },
  };



  function replaceLink(html) {
    let pattern = /<a\s+[^>]*href="([^"]+)"[^>]*>([^<]+)<\/a>/g;
    let matches = html.match(pattern);

    if (matches) {
      matches.forEach(function (match) {
        let parts = pattern.exec(match);
        let url = parts[1];
        let name = parts[2];
        let newFormat = '[' + name + ':' + url + ']';
        html = html.replace(match, newFormat);
      });
    }

    html = html.replace(/^<p>/, '').replace(/<\/p>$/, '');
    return html;
  }


  function restoreLinks(html) {
    let pattern = /\[([^:]+):([^]+)\]/g;
    let matches = html.match(pattern);

    if (matches) {
      matches.forEach(function (match) {
        let parts = pattern.exec(match);
        let name = parts[1];
        let url = parts[2];
        let newFormat = '<a href="' + url + '" target="_self">' + name + '</a>';
        html = html.replace(match, newFormat);
      });
    }

    return html;
  }



  // uses example
  // let originalHtml = '<p><a href="www.usetempo.ai" target="_self">Use Tempo</a>&nbsp;</p>';
  // let modifiedHtml = replaceLink(originalHtml);
  // console.log(modifiedHtml);


  return (
    <div className="border border-gray rounded-md p-3">
      <Editor
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={onEditorStateChange}
        customStyleMap={customStyleMap}

        toolbar={{
          options: ['link'],
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
            options: ['link'],
          },
        }}
        placeholder="Start writing your content..."
      />

      {debugMode && <button onClick={showOutput}>show output</button>}
    </div>
  );
};

export default TextEditor;
