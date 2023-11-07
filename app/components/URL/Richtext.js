import React, { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState, convertFromHTML } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import './customstyles.css'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useEffect } from 'react';

const TextEditor = ({ oldContent, editing, handleTextEditorChange, debugMode, externalContent, setAnswer, setExternalContentForTextEditor }) => {

  const [editorState, setEditorState] = useState(() => {
    if (oldContent && oldContent !== 'undefined') {
      const blocksFromHtml = convertFromHTML(restoreLinks(`<p>${oldContent}</p>`));
      const state = ContentState.createFromBlockArray(blocksFromHtml.contentBlocks);
      return EditorState.createWithContent(state);
    }
    return EditorState.createEmpty();
  });

  // const [postContentWithOutReplace, setPostContentWithOutReplace] = useState('')
  const [postContent, setPostContent] = useState('')

  const [lastExternalContent, setLastExternalContent] = useState('')



  // useEffect(() => {
  //   // if (externalContent && externalContent !== oldContent && lastExternalContent !== externalContent) {
  //   if (externalContent && externalContent !== oldContent) {

  //     setLastExternalContent(externalContent)
  //     const blocksFromHtml = convertFromHTML(restoreLinks(`<p>${externalContent}</p>`));
  //     const state = ContentState.createFromBlockArray(blocksFromHtml.contentBlocks);
  //     onEditorStateChange(EditorState.createWithContent(state))
  //     setEditorState(EditorState.createWithContent(state));
  //   }


  // }, [externalContent, oldContent]);


  useEffect(() => {
    
    // if (externalContent && externalContent !== oldContent && lastExternalContent !== externalContent) {
    if (externalContent && externalContent !== lastExternalContent) {

      setLastExternalContent(externalContent)
      const blocksFromHtml = convertFromHTML(restoreLinks(`<p>${externalContent}</p>`));
      const state = ContentState.createFromBlockArray(blocksFromHtml.contentBlocks);
      onEditorStateChange(EditorState.createWithContent(state))
      setEditorState(EditorState.createWithContent(state));
    }


  }, [externalContent]);




  const onEditorStateChange = (editorState) => {
    // setExternalContentForTextEditor('')
    setEditorState(editorState);
    // setPostContentWithOutReplace(draftToHtml(convertToRaw(editorState.getCurrentContent())));
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
    if (html) {
      let pattern = /<a\s+[^>]*href="([^"]+)"[^>]*>([^<]+)<\/a>/g;
      let matches = html?.match(pattern);

      if (matches) {
        matches.forEach(function (match) {
          let parts = pattern.exec(match);
          let url = parts[1];
          let name = parts[2];
          let newFormat = '[' + name + ':' + url + ']';
          html = html.replace(match, newFormat);
        });
      }
    }

    html = html.replaceAll("<p>", "").replaceAll("</p>", "").replaceAll(`\n`, "")
    return html;
  }

  // if (html.startsWith("<p>") && html.endsWith("</p>") || html.endsWith(`</p>\n`)) {
  //   html = html.substring(3, html.length - 4);
  // }

  function restoreLinks(html) {
    let pattern = /\[([^:]+):([^]+)\]/g;
    let matches = html?.match(pattern);

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
        id={"answering"}
        toolbar={{
          options: ['link', 'image'],
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
          image: {
            styles: {
              maxWidth: '350px',
              margin: 'auto',
            },
          }
        }}
        wrapperId={"SDSDDSF"}
        placeholder="Start writing your content..."
      />

      {debugMode && <button onClick={showOutput}>show output</button>}
    </div>
  );
};

export default TextEditor;
