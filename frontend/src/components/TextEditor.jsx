import React, { useRef, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { API_ROUTES } from "../constants/apiRoutes";
import { toast } from "react-hot-toast";

function TextEditor({ note, onUpdateNote }) {
  const quillRef = useRef(null);
  const saveTimeoutRef = useRef(null);
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [lastSavedContent, setLastSavedContent] = useState(note.content);
  const [lastSavedTitle, setLastSavedTitle] = useState(note.title);
  // Update when a new note is selected
  useEffect(() => {
    setTitle(note.title);
    setContent(note.content);
    setLastSavedContent(note.content);
    setLastSavedTitle(note.title);
  }, [note]);

  const handleContentChange = (content, delta, source, editor) => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    const deltaContent = editor.getContents();
    setContent(deltaContent);

    const updatedNote = {
      ...note,
      content: deltaContent,
      checkboxCount: countCheckboxes(deltaContent),
    };

    saveTimeoutRef.current = setTimeout(() => {
      saveNoteToBackend(updatedNote);
    }, 2000);
  };

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    const updatedNote = {
      ...note,
      title: newTitle,
    };
    onUpdateNote(updatedNote);

    saveTimeoutRef.current = setTimeout(() => {
      saveNoteToBackend(updatedNote);
    }, 2000);
  };

  const countCheckboxes = (delta) => {
    let total = 0;
    let checked = 0;

    delta.ops.forEach((op) => {
      if (op.attributes && op.attributes.list === "checked") {
        checked++;
        total++;
      } else if (op.attributes && op.attributes.list === "unchecked") {
        total++;
      }
    });

    return { total, checked };
  };

  const saveNoteToBackend = async (noteToSave) => {
    const contentChanged =
      JSON.stringify(noteToSave.content) !== JSON.stringify(lastSavedContent);
    const titleChanged = noteToSave.title !== lastSavedTitle;

    if (!contentChanged && !titleChanged) return;

    try {
      await axios.put(API_ROUTES.UPDATE_NOTE(noteToSave.id), noteToSave);
      setLastSavedContent(noteToSave.content);
      setLastSavedTitle(noteToSave.title);
    } catch (error) {
      console.error("Error saving note:", error);
      toast.error("Failed to save changes");
    }
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
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
    "link",
    "image",
  ];

  return (
    <div className="flex-1 p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            className="text-2xl font-semibold text-gray-900 border-none focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1"
          />
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span>
              Checked: {note.checkboxCount?.checked || 0} /{" "}
              {note.checkboxCount?.total || 0}
            </span>
          </div>
        </div>

        <div className="h-[calc(100vh-200px)] border border-gray-200 rounded-lg">
          <ReactQuill
            ref={quillRef}
            value={content || ""}
            onChange={handleContentChange}
            modules={modules}
            formats={formats}
            className="h-full"
            theme="snow"
          />
        </div>
      </div>
    </div>
  );
}

export default TextEditor;
