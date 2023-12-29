import React, { useState } from 'react';
import AddBookForm from './AddBookForm';

function AddButton() {
  const [showForm, setShowForm] = useState(false);

  const handleToggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div>
      <button className="add" onClick={handleToggleForm}>
        Add Book
      </button>
    </div>
  );
}

export default AddButton;
