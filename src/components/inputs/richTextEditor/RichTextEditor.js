import React, { useEffect, useRef, useState } from "react";
import { Editor, EditorState } from "draft-js";

const RichTextEditor = props => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const editor = useRef(null);

  const focusEditor = () => {
    editor.current.focus();
  };

  const onChange = editorState => {
    setEditorState(editorState);
  };

  useEffect(() => {
    focusEditor();
  }, []);

  return (
    <div onClick={focusEditor}>
      <Editor ref={editor} editorState={editorState} onChange={onChange} />
    </div>
  );
};

export default RichTextEditor;
