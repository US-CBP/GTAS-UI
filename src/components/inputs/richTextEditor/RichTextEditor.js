import React, { useState } from "react";
import { Editor, EditorState, convertToRaw, convertFromRaw } from "draft-js";
import "draft-js/dist/Draft.css";
import "./RichTextEditor.scss";
import Toolbar from "./toolbar/Toolbar";
import { toolbarItems } from "./constants";
import { hasData } from "../../../utils/utils";
const RichTextEditor = props => {
  const initState = hasData(props.content)
    ? EditorState.createWithContent(convertFromRaw(props.content))
    : EditorState.createEmpty();
  const [editorState, setEditorState] = useState(initState);
  const onChange = editorState => {
    const plainText = editorState.getCurrentContent().getPlainText(". ");
    const richTextFormat = convertToRaw(editorState.getCurrentContent());
    setEditorState(editorState);
    props.callback({ plainText: plainText, richTextFormat: richTextFormat });
  };

  return (
    <div className={`${props.className} rte-container`}>
      {!props.readOnly && (
        <Toolbar
          toolbarItems={toolbarItems}
          editorState={editorState}
          onChange={onChange}
        />
      )}
      <Editor
        editorState={editorState}
        onChange={onChange}
        placeholder={props.placeholder}
        readOnly={props.readOnly}
      />
    </div>
  );
};

export default RichTextEditor;
