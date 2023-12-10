import React, { useState } from 'react';
import DeleteBookForm from './DeleteBookForm';

function DeleteButton() {
  const [showForm, setShowForm] = useState(false);

  const handleToggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div>
      <button className="delete" onClick={handleToggleForm}>
        Delete Book
      </button>
      {showForm && <DeleteBookForm />}
    </div>
  );
}

export default DeleteButton;
