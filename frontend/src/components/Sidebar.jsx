import React from "react";

function Sidebar({ notes, onSelect }) {
  return (
    <div
      style={{ width: "300px", backgroundColor: "#f4f4f4", padding: "16px" }}
    >
      <h2>Notes</h2>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {notes.map((note) => (
          <li
            key={note.id}
            style={{ cursor: "pointer", padding: "8px 0" }}
            onClick={() => onSelect(note)}
          >
            {note.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
