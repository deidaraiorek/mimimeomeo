import React from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Dropdown } from "flowbite-react";
import { HiPlus, HiTrash, HiDotsVertical } from "react-icons/hi";

function Sidebar({ notes, onCreateNew, onDelete }) {
  const { noteId } = useParams();

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen overflow-y-auto">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Notes</h2>
          <Button
            size="sm"
            color="gray"
            pill
            onClick={onCreateNew}
            className="!p-2"
          >
            <HiPlus className="h-4 w-4" />
          </Button>
        </div>
        <div className="space-y-1">
          {notes.map((note) => (
            <div
              key={note.id}
              className={`flex items-center justify-between group ${
                note.id === parseInt(noteId, 10)
                  ? "bg-gray-100"
                  : "hover:bg-gray-50"
              } rounded-lg`}
            >
              <Link
                to={`/notes/${note.id}`}
                className="flex-1 px-3 py-2 text-sm text-gray-900"
              >
                {note.title || "Untitled Note"}
              </Link>
              <Dropdown
                label={<HiDotsVertical className="h-4 w-4" />}
                size="sm"
                color="gray"
                pill
                className="opacity-0 group-hover:opacity-100"
                inline
              >
                <Dropdown.Item onClick={() => onDelete(note.id)}>
                  <div className="flex items-center gap-2 text-red-600">
                    <HiTrash className="h-4 w-4" />
                    Delete
                  </div>
                </Dropdown.Item>
              </Dropdown>
            </div>
          ))}

          {notes.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p>No notes yet</p>
              <Button
                size="sm"
                color="gray"
                onClick={onCreateNew}
                className="mt-2"
              >
                <HiPlus className="h-4 w-4 mr-2" />
                Create your first note
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
