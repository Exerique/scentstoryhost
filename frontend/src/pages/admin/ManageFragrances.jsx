import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const API = 'https://scentstory-backend.vercel.app';
const CATEGORIES = ['Aquatic', 'Earthy', 'Ethereal', 'Noir', 'Rare Blend'];

const emptyFragrance = {
  name: '',
  description: '',
  archetype: '',
  category: 'Aquatic',
  photoUrl: '',
  tags: { A: 0, B: 0, C: 0, D: 0 },
  notes: [],
};

const ManageFragrances = ({ token }) => {
  const [fragrances, setFragrances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState(null);
  const [modalMode, setModalMode] = useState(null); // 'add' | 'edit' | 'delete'
  const [formData, setFormData] = useState(emptyFragrance);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  const headers = { Authorization: `Bearer ${token}` };

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchFragrances = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/api/fragrances`);
      setFragrances(res.data.data || []);
    } catch (err) {
      console.error('Failed to fetch fragrances:', err);
      showToast('Failed to load fragrances', 'error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFragrances();
  }, [fetchFragrances]);

  const openAdd = () => {
    setFormData({ ...emptyFragrance, tags: { A: 0, B: 0, C: 0, D: 0 } });
    setModalMode('add');
  };

  const openEdit = (frag) => {
    setFormData({
      name: frag.name || '',
      description: frag.description || '',
      archetype: frag.archetype || '',
      category: frag.category || 'Aquatic',
      photoUrl: frag.photoUrl || '',
      tags: { A: frag.tags?.A || 0, B: frag.tags?.B || 0, C: frag.tags?.C || 0, D: frag.tags?.D || 0 },
      notes: frag.notes || [],
    });
    setSelectedId(frag._id);
    setModalMode('edit');
  };

  const openDelete = (frag) => {
    setSelectedId(frag._id);
    setFormData({ name: frag.name });
    setModalMode('delete');
  };

  const closeModal = () => {
    setModalMode(null);
    setSelectedId(null);
    setFormData(emptyFragrance);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (modalMode === 'add') {
        await axios.post(`${API}/api/fragrances`, formData, { headers });
        showToast('Fragrance created!');
      } else if (modalMode === 'edit') {
        await axios.put(`${API}/api/fragrances/${selectedId}`, formData, { headers });
        showToast('Fragrance updated!');
      }
      closeModal();
      fetchFragrances();
    } catch (err) {
      showToast(err.response?.data?.message || 'Save failed', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setSaving(true);
    try {
      await axios.delete(`${API}/api/fragrances/${selectedId}`, { headers });
      showToast('Fragrance deleted!');
      closeModal();
      fetchFragrances();
    } catch (err) {
      showToast(err.response?.data?.message || 'Delete failed', 'error');
    } finally {
      setSaving(false);
    }
  };

  const updateFormField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateTag = (key, value) => {
    setFormData(prev => ({
      ...prev,
      tags: { ...prev.tags, [key]: parseFloat(value) || 0 },
    }));
  };

  if (loading) {
    return <div className="admin-loading">Loading fragrances...</div>;
  }

  return (
    <>
      {/* Action buttons row */}
      <div className="admin-subtabs" style={{ paddingTop: '12px' }}>
        <div style={{ flex: 1 }} />
        <div className="admin-action-buttons">
          <button id="add-fragrance-btn" className="admin-btn admin-btn-add" onClick={openAdd}>
            Add
          </button>
        </div>
      </div>

      {/* Data Table */}
      <div className="admin-table-wrap">
        {fragrances.length === 0 ? (
          <div className="admin-empty">No fragrances found. Click "Add" to create one.</div>
        ) : (
          <table className="admin-table" id="fragrances-table">
            <thead>
              <tr>
                <th>id</th>
                <th>Name</th>
                <th>Description</th>
                <th>Archetype</th>
                <th>Weight</th>
                <th>Photo</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {fragrances.map((frag, idx) => (
                <tr key={frag._id}>
                  <td className="id-cell">{idx + 1}</td>
                  <td style={{ fontWeight: 500, minWidth: '140px' }}>{frag.name}</td>
                  <td className="truncate">{frag.description}</td>
                  <td>{frag.archetype}</td>
                  <td className="weight-cell">
                    A:{frag.tags?.A || 0} B:{frag.tags?.B || 0}<br />
                    C:{frag.tags?.C || 0} D:{frag.tags?.D || 0}
                  </td>
                  <td className="photo-cell">
                    {frag.photoUrl ? (
                      <img src={frag.photoUrl} alt={frag.name} />
                    ) : (
                      <div style={{ width: 56, height: 72, background: '#f0f0f0', borderRadius: 4 }} />
                    )}
                  </td>
                  <td>
                    <div className="row-actions">
                      <button className="row-action-btn" onClick={() => openEdit(frag)}>Edit</button>
                      <button className="row-action-btn delete" onClick={() => openDelete(frag)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Add/Edit Modal */}
      {(modalMode === 'add' || modalMode === 'edit') && (
        <div className="admin-modal-overlay" onClick={closeModal}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <h3 className="admin-modal-title">
              {modalMode === 'add' ? 'Add Fragrance' : 'Edit Fragrance'}
            </h3>

            <div className="admin-form-group">
              <label className="admin-form-label">Name</label>
              <input
                className="admin-form-input"
                value={formData.name}
                onChange={(e) => updateFormField('name', e.target.value)}
                placeholder="e.g. Maison Margiela – Sailing Day"
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Description</label>
              <textarea
                className="admin-form-textarea"
                value={formData.description}
                onChange={(e) => updateFormField('description', e.target.value)}
                placeholder="Describe the fragrance..."
              />
            </div>

            <div className="admin-form-row">
              <div className="admin-form-group">
                <label className="admin-form-label">Archetype</label>
                <input
                  className="admin-form-input"
                  value={formData.archetype}
                  onChange={(e) => updateFormField('archetype', e.target.value)}
                  placeholder="e.g. The Pure Voyager"
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">Category</label>
                <select
                  className="admin-form-select"
                  value={formData.category}
                  onChange={(e) => updateFormField('category', e.target.value)}
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Photo URL</label>
              <input
                className="admin-form-input"
                value={formData.photoUrl}
                onChange={(e) => updateFormField('photoUrl', e.target.value)}
                placeholder="https://..."
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Vibe Weights (0–10)</label>
              <div className="admin-form-row-4">
                {['A', 'B', 'C', 'D'].map((key) => (
                  <div key={key}>
                    <label className="admin-form-label" style={{ fontSize: '13px', color: '#888' }}>
                      {key === 'A' ? 'A (Aquatic)' : key === 'B' ? 'B (Earthy)' : key === 'C' ? 'C (Ethereal)' : 'D (Noir)'}
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="10"
                      step="0.5"
                      className="admin-form-input"
                      value={formData.tags[key]}
                      onChange={(e) => updateTag(key, e.target.value)}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="admin-modal-footer">
              <button className="admin-btn admin-btn-cancel" onClick={closeModal}>Cancel</button>
              <button
                className="admin-btn admin-btn-save"
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? 'Saving...' : (modalMode === 'add' ? 'Create' : 'Save Changes')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {modalMode === 'delete' && (
        <div className="admin-modal-overlay" onClick={closeModal}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()} style={{ width: 420 }}>
            <h3 className="admin-modal-title">Delete Fragrance</h3>
            <p className="admin-confirm-text">
              Are you sure you want to delete <span className="admin-confirm-name">{formData.name}</span>?
              This action cannot be undone.
            </p>
            <div className="admin-modal-footer">
              <button className="admin-btn admin-btn-cancel" onClick={closeModal}>Cancel</button>
              <button
                className="admin-btn admin-btn-delete"
                onClick={handleDelete}
                disabled={saving}
              >
                {saving ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && <div className={`admin-toast ${toast.type}`}>{toast.msg}</div>}
    </>
  );
};

export default ManageFragrances;
