import React, { useRef, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useLocation } from "react-router-dom";

function TextEditor({ note, onUpdateNote }) {
  const quillRef = useRef(null);
  const location = useLocation(); 

  const handleContentChange = (value) => {
    // Locally update the note content while typing (without triggering save)
    const updatedNote = { ...note, content: value };
    onUpdateNote(updatedNote); // This only updates the state locally
  };

  const countCheckboxes = (updatedNote) => {
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

    return { ...updatedNote, checkboxCount: { total, checked } };
  };

  const saveNoteToBackend = async (note) => {
    try {
      await fetch("/api/saveNote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(note),
      });
      console.log("Note saved successfully");
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };

  // Save note on tab close or refresh and when location changes
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      // Save the note before closing or refreshing the page
      saveNoteToBackend(note);
    };

    // Save the note when the user navigates to a new route (detect location change)
    const handleLocationChange = () => {
      saveNoteToBackend(note);
    };

    // Add event listener for beforeunload
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Save the note when the route changes
    const unlisten = handleLocationChange;

    // Clean up event listeners on unmount
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [note, location]); // Dependency on `note` and `location` changes

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
    <div style={{ flex: 1, padding: "16px" }}>
      <h2>{note.title}</h2>
      <p>
        Checked: {note.checkboxCount.checked} / Total:{" "}
        {note.checkboxCount.total}
      </p>
      <ReactQuill
        ref={quillRef}
        value={note.content}
        onChange={handleContentChange}
        modules={modules}
        formats={formats}
      />
    </div>
  );
}

export default TextEditor;
