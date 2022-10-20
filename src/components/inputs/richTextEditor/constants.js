import React from "react";
export const styleType = {
  INLINE: "inline",
  BLOCK: "block"
};
export const toolbarItems = [
  {
    label: "bold",
    style: "BOLD",
    type: styleType.INLINE,
    icon: <i className="fa fa-bold"></i>
  },
  {
    label: "italic",
    style: "ITALIC",
    type: styleType.INLINE,
    icon: <i className="fa fa-italic"></i>
  },
  {
    label: "underline",
    style: "UNDERLINE",
    type: styleType.INLINE,
    icon: <i className="fa fa-underline"></i>
  },
  {
    label: "h",
    style: "header-two",
    type: styleType.BLOCK
    // icon: <i className="fa fa-heading"></i>
  },
  {
    label: "ul",
    style: "unordered-list-item",
    type: styleType.BLOCK,
    icon: <i className="fa fa-list-ul"></i>
  },
  {
    label: "ol",
    style: "ordered-list-item",
    type: styleType.BLOCK,
    icon: <i className="fa fa-list-ol"></i>
  }
];
