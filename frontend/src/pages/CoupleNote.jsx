import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate, Navigate, useLocation } from "react-router-dom";
import Sidebar from "../components/notes/Sidebar";
import TextEditor from "../components/notes/TextEditor";
import { API_ROUTES } from "../constants/apiRoutes";

function CoupleNote() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Get current noteId from URL using useMemo
  const currentNoteId = useMemo(() => {
    const match = location.pathname.match(/\/notes\/(\d+)/);
    return match ? parseInt(match[1], 10) : null;
  }, [location.pathname]);

  // Get selected note using useMemo
  const selectedNote = useMemo(() => {
    return notes.find((note) => note.id === currentNoteId) || null;
  }, [notes, currentNoteId]);

  // Fetch notes on mount
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const coupleId = "3"; // Replace with actual coupleId
        const response = await axios.get(API_ROUTES.GET_COUPLE_NOTES(coupleId));

        const processedNotes = response.data.map((note) => ({
          ...note,
          checkboxCount: note.checkboxCount || { total: 0, checked: 0 },
          content: note.content || { ops: [] },
        }));

        setNotes(processedNotes);
      } catch (error) {
        toast.error("Failed to fetch notes");
        console.error("Error fetching notes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  // Handle navigation when notes or URL changes
  useEffect(() => {
    if (!loading && notes.length > 0) {
      if (!currentNoteId) {
        // No note selected, redirect to first note
        navigate(`/notes/${notes[0].id}`, { replace: true });
      } else if (!selectedNote) {
        // Selected note not found, redirect to first note
        navigate(`/notes/${notes[0].id}`, { replace: true });
      }
    }
  }, [loading, notes, currentNoteId, selectedNote, navigate]);

  const updateNoteContent = async (updatedNote) => {
    try {
      setNotes((notes) =>
        notes.map((note) => (note.id === updatedNote.id ? updatedNote : note))
      );

      // await axios.put(API_ROUTES.UPDATE_NOTE(updatedNote.id), updatedNote);
    } catch (error) {
      toast.error("Failed to update note");
      console.error("Error updating note:", error);
    }
  };

  const createNewNote = async () => {
    try {
      const newNote = {
        title: `Note ${notes.length + 1}`,
        content: { ops: [] },
        checkboxCount: { total: 0, checked: 0 },
        coupleId: "3", // Replace with actual coupleId
      };

      const { data: createdNote } = await axios.post(
        API_ROUTES.CREATE_NOTE,
        newNote
      );
      setNotes((notes) => [...notes, createdNote]);
      navigate(`/notes/${createdNote.id}`);
    } catch (error) {
      toast.error("Failed to create new note");
      console.error("Error creating note:", error);
    }
  };

  const deleteNote = async (noteIdToDelete) => {
    try {
      await axios.delete(API_ROUTES.DELETE_NOTE(noteIdToDelete));

      setNotes((notes) => {
        const updatedNotes = notes.filter((note) => note.id !== noteIdToDelete);
        navigate("/notes");
        return updatedNotes;
      });
    } catch (error) {
      toast.error("Failed to delete note");
      console.error("Error deleting note:", error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Toaster position="top-right" />
      <Sidebar
        notes={notes}
        onCreateNew={createNewNote}
        onDelete={deleteNote}
        selectedNoteId={selectedNote?.id}
      />
      <div className="flex-1">
        {loading ? (
          <div className="flex items-center justify-center h-screen">
            <div className="text-lg text-gray-600">Loading...</div>
          </div>
        ) : notes.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">Create your first note</p>
          </div>
        ) : selectedNote ? (
          <TextEditor
            key={selectedNote.id}
            note={selectedNote}
            onUpdateNote={updateNoteContent}
          />
        ) : null}
      </div>
    </div>
  );
}

export default CoupleNote;
