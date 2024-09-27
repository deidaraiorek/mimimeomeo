import React, { useState, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function TextEditor() {
  const [content, setContent] = useState("");
  const [checkboxCount, setCheckboxCount] = useState({ total: 0, checked: 0 });
  const quillRef = useRef(null);

  const handleChange = (value) => {
    setContent(value);
    countCheckboxes();
  };

  const countCheckboxes = () => {
    const editor = quillRef.current.getEditor();
    const delta = editor.getContents();

    let total = 0;
    let checked = 0;

    delta.ops.forEach((op) => {
      if (op.attributes && op.attributes.list) {
        if (op.attributes.list === "checked") {
          checked++;
          total++;
        }
        if (op.attributes.list === "unchecked") {
          total++;
        }
      }
    });

    setCheckboxCount({ total, checked });
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { list: "check" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  return (
    <div>
      <h2>Text Editor</h2>
      <p>
        Checked: {checkboxCount.checked} / Total: {checkboxCount.total}
      </p>
      <ReactQuill
        ref={quillRef}
        value={content}
        onChange={handleChange}
        modules={modules}
        formats={formats}
      />
    </div>
  );
}

export default TextEditor;
