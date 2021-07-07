import React, { useState } from "react";
import { Editor, EditorState, convertToRaw } from "draft-js";
import "draft-js/dist/Draft.css";
import "./RichTextEditor.scss";
import Toolbar from "./toolbar/Toolbar";
import { toolbarItems } from "./constants";
const RichTextEditor = props => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onChange = editorState => {
    const plainText = editorState.getCurrentContent().getPlainText("");
    const richTextFormat = convertToRaw(editorState.getCurrentContent());
    setEditorState(editorState);
    props.callback({ plainText: plainText, richTextFormat: richTextFormat });
  };

  return (
    <div className={`${props.className} rte-container`}>
      <Toolbar
        toolbarItems={toolbarItems}
        editorState={editorState}
        onChange={onChange}
      />
      <Editor
        editorState={editorState}
        onChange={onChange}
        placeholder={props.placeholder}
        readOnly={props.readOnly}
        className="rte-editor"
      />
    </div>
  );
};

export default RichTextEditor;
