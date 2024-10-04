import React, { useState } from "react";
import Sidebar from "./Sidebar";
import TextEditor from "./TextEditor";

function MainPage() {
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: "Note 1",
      content: "",
      checkboxCount: { total: 0, checked: 0 },
    },
    {
      id: 2,
      title: "Note 2",
      content: "",
      checkboxCount: { total: 0, checked: 0 },
    },
    {
      id: 3,
      title: "Note 3",
      content: "",
      checkboxCount: { total: 0, checked: 0 },
    },
  ]);

  const [selectedNote, setSelectedNote] = useState(notes[0]);

  const handleNoteSelect = (note) => {
    setSelectedNote(note);
  };

  const updateNoteContent = (updatedNote) => {
    const updatedNotes = notes.map((note) =>
      note.id === updatedNote.id ? updatedNote : note
    );
    setNotes(updatedNotes);
    setSelectedNote(updatedNote);
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar notes={notes} onSelect={handleNoteSelect} />
      <TextEditor note={selectedNote} onUpdateNote={updateNoteContent} />
    </div>
  );
}

export default MainPage;
