import React from "react";
import { Row } from "react-bootstrap";
import { asArray } from "../../../../utils/utils";
import ToolbarItem from "./toolbarItem/ToolbarItem";
import { RichUtils } from "draft-js";
import "./Toolbar.scss";
import { styleType } from "../constants";

const Toolbar = props => {
  const editorState = props.editorState;
  const onChange = props.onChange;

  const applyInlineStyle = style => {
    onChange(RichUtils.toggleInlineStyle(editorState, style));
  };
  const applyBlockStyle = style => {
    onChange(RichUtils.toggleBlockType(editorState, style));
  };

  const isActive = style => {
    const currentStyle = editorState.getCurrentInlineStyle();
    return currentStyle.has(style);
  };

  const onClick = (e, style, type) => {
    e.preventDefault();

    type === styleType.BLOCK ? applyBlockStyle(style) : applyInlineStyle(style);
  };

  return (
    <div className="toolbar-row">
      {asArray(props.toolbarItems).map((item, index) => (
        <ToolbarItem
          isActive={isActive(item.style)}
          onClick={e => onClick(e, item.style, item.type)}
          key={`${item.label}-${index}`}
        >
          {item.icon || item.label}
        </ToolbarItem>
      ))}
    </div>
  );
};

export default Toolbar;
