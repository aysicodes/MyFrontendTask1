// src/features/diary/components/RichTextEditor.jsx
import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const RichTextEditor = ({ value, onChange }) => (
  <ReactQuill theme="snow" value={value} onChange={onChange} />
);

export default RichTextEditor;
