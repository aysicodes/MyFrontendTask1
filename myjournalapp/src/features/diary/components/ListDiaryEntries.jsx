import React from 'react';

const ListDiaryEntries = ({ entries, onDelete, onEdit }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold">Your Diary Entries</h2>
      <ul className="mt-4">
        {entries.length === 0 ? (
          <p>No entries yet. Start writing!</p>
        ) : (
          entries.map((entry) => (
            <li key={entry.id} className="border-b py-2">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium text-lg">{entry.title}</h3>
                  <p className="text-sm text-gray-600">{entry.content.slice(0, 100)}...</p>
                </div>
                <div>
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                    onClick={() => onEdit(entry)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={() => onDelete(entry.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default ListDiaryEntries;
