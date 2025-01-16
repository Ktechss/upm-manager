import React, { useState, useEffect } from 'react';
import { fetchRegions, addRegion, updateRegion, deleteRegion } from '../services/api';

const RegionsManager = () => {
  const [regions, setRegions] = useState([]);
  const [newRegion, setNewRegion] = useState('');
  const [editingRegion, setEditingRegion] = useState(null);
  const [showAddRegion, setShowAddRegion] = useState(false);
  const [error, setError] = useState('');

  // Fetch all regions
  const loadRegions = async () => {
    try {
      const response = await fetchRegions();
      setRegions(response.data);
    } catch (error) {
      console.error('Error fetching regions:', error);
      setError('Failed to load regions. Please try again later.');
    }
  };

  // Add a new region
  const handleAddRegion = async () => {
    if (!newRegion.trim()) {
      setError('Region name cannot be empty.');
      return;
    }
    try {
      await addRegion(newRegion);
      setNewRegion('');
      setShowAddRegion(false);
      loadRegions();
    } catch (error) {
      console.error('Error adding region:', error);
      setError('Failed to add region. Please try again.');
    }
  };

  // Update an existing region
  const handleUpdateRegion = async (id, name) => {
    if (!name.trim()) {
      setError('Region name cannot be empty.');
      return;
    }
    try {
      await updateRegion(id, name);
      setEditingRegion(null);
      loadRegions();
    } catch (error) {
      console.error('Error updating region:', error);
      setError('Failed to update region. Please try again.');
    }
  };

  // Delete a region
  const handleDeleteRegion = async (id) => {
    if (!window.confirm('Are you sure you want to delete this region?')) return;
    try {
      await deleteRegion(id);
      loadRegions();
    } catch (error) {
      console.error('Error deleting region:', error);
      setError('Failed to delete region. Please try again.');
    }
  };

  useEffect(() => {
    loadRegions();
  }, []);

  return (
    <div className="container regions-container">
      <h1 className="regions-title">Regions Manager</h1>

      {error && <p className="error-message">{error}</p>}

      {!showAddRegion && (
        <button className="add-new-btn" onClick={() => setShowAddRegion(true)}>
          Add New Region
        </button>
      )}

      {showAddRegion && (
        <div className="add-region-form">
          <input
            type="text"
            value={newRegion}
            onChange={(e) => setNewRegion(e.target.value)}
            placeholder="Enter new region"
            className="input-field"
          />
          <button className="save-btn" onClick={handleAddRegion}>
            Add
          </button>
          <button className="cancel-btn" onClick={() => setShowAddRegion(false)}>
            Cancel
          </button>
        </div>
      )}

      <table className="regions-table">
        <thead>
          <tr>
            <th className="table-header">Name</th>
            <th className="table-header">Actions</th>
          </tr>
        </thead>
        <tbody>
          {regions.map((region) => (
            <tr key={region.id}>
              <td className="table-data">
                {editingRegion?.id === region.id ? (
                  <input
                    type="text"
                    value={editingRegion.name}
                    onChange={(e) =>
                      setEditingRegion({ ...editingRegion, name: e.target.value })
                    }
                    className="input-field"
                  />
                ) : (
                  region.name
                )}
              </td>
              <td className="table-data">
                {editingRegion?.id === region.id ? (
                  <>
                    <button
                      className="save-btn"
                      onClick={() =>
                        handleUpdateRegion(editingRegion.id, editingRegion.name)
                      }
                    >
                      Save
                    </button>
                    <button
                      className="cancel-btn"
                      onClick={() => setEditingRegion(null)}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="edit-btn"
                      onClick={() => setEditingRegion(region)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteRegion(region.id)}
                    >
                      Delete
                    </button>
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

export default RegionsManager;
