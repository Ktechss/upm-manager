import React, { useState, useEffect } from 'react';
import { fetchCategories, addCategory, updateCategory, deleteCategory } from '../services/api';

const CategoriesManager = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [editingCategory, setEditingCategory] = useState(null);
  const [showAddCategory, setShowAddCategory] = useState(false); // State to toggle add form
  const [error, setError] = useState(''); // Error handling

  // Fetch all categories
  const loadCategories = async () => {
    try {
      const response = await fetchCategories();
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setError('Failed to load categories. Please try again later.');
    }
  };

  // Add a new category
  const handleAddCategory = async () => {
    if (!newCategory.trim()) {
      setError('Category name cannot be empty.');
      return;
    }
    try {
      await addCategory(newCategory);
      setNewCategory('');
      setShowAddCategory(false);
      loadCategories();
    } catch (error) {
      console.error('Error adding category:', error);
      setError('Failed to add category. Please try again.');
    }
  };

  // Update an existing category
  const handleUpdateCategory = async (id, name) => {
    if (!name.trim()) {
      setError('Category name cannot be empty.');
      return;
    }
    try {
      await updateCategory(id, name);
      setEditingCategory(null);
      loadCategories();
    } catch (error) {
      console.error('Error updating category:', error);
      setError('Failed to update category. Please try again.');
    }
  };

  // Delete a category
  const handleDeleteCategory = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;
    try {
      await deleteCategory(id);
      loadCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
      setError('Failed to delete category. Please try again.');
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <div className="container">
      <h1>Categories Manager</h1>

      {error && <p className="error">{error}</p>}

      {!showAddCategory && (
        <button className="add-new-btn" onClick={() => setShowAddCategory(true)}>
          Add New Category
        </button>
      )}

      {showAddCategory && (
        <div className="add-category-form">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Enter new category"
          />
          <button onClick={handleAddCategory}>Add</button>
          <button onClick={() => setShowAddCategory(false)}>Cancel</button>
        </div>
      )}

      <table className="categories-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>
                {editingCategory?.id === category.id ? (
                  <input
                    type="text"
                    value={editingCategory.name}
                    onChange={(e) =>
                      setEditingCategory({ ...editingCategory, name: e.target.value })
                    }
                  />
                ) : (
                  category.name
                )}
              </td>
              <td>
                {editingCategory?.id === category.id ? (
                  <>
                    <button
                      onClick={() =>
                        handleUpdateCategory(editingCategory.id, editingCategory.name)
                      }
                    >
                      Save
                    </button>
                    <button onClick={() => setEditingCategory(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => setEditingCategory(category)}>Edit</button>
                    <button onClick={() => handleDeleteCategory(category.id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoriesManager;
