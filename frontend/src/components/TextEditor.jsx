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

  // Update local state when note prop changes
  useEffect(() => {
    setTitle(note.title);
    setContent(note.content);
    setLastSavedContent(note.content);
    setLastSavedTitle(note.title);
  }, [note]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, []);

  const saveNoteToBackend = async (noteToSave) => {
    const contentChanged =
      JSON.stringify(noteToSave.content) !== JSON.stringify(lastSavedContent);
    const titleChanged = noteToSave.title !== lastSavedTitle;

    if (!contentChanged && !titleChanged) return;

    try {
      await axios.put(API_ROUTES.UPDATE_NOTE(noteToSave.id), noteToSave);
      setLastSavedContent(noteToSave.content);
      setLastSavedTitle(noteToSave.title);
      onUpdateNote(noteToSave); // Notify parent of the update
    } catch (error) {
      console.error("Error saving note:", error);
      toast.error("Failed to save changes");
      // Revert to last saved state on error
      setTitle(lastSavedTitle);
      setContent(lastSavedContent);
    }
  };

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
    }, 1000);
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
      content: content, // Include current content to prevent content loss
    };

    saveTimeoutRef.current = setTimeout(() => {
      saveNoteToBackend(updatedNote);
    }, 1000);
  };

  const handleTitleBlur = () => {
    // Save immediately on blur if there are unsaved changes
    if (title !== lastSavedTitle) {
      const updatedNote = {
        ...note,
        title: title,
        content: content,
      };
      saveNoteToBackend(updatedNote);
    }
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
            onBlur={handleTitleBlur}
            className="text-2xl font-semibold text-gray-900 border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 rounded-lg px-2 py-1"
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
