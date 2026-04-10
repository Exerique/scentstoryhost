import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const API = 'https://scentstory-backend.vercel.app';

const emptyQuestion = {
  order: 1,
  storyTitle: '',
  storyText: '',
  options: [
    { text: '', vibeImpact: 'A', imageUrl: '' },
    { text: '', vibeImpact: 'B', imageUrl: '' },
    { text: '', vibeImpact: 'C', imageUrl: '' },
    { text: '', vibeImpact: 'D', imageUrl: '' },
  ],
};

const VIBE_LABELS = { A: 'Aquatic', B: 'Earthy', C: 'Ethereal', D: 'Noir' };
const VIBE_COLORS = { A: '#6c9cec', B: '#ec6c6c', C: '#a8d86c', D: '#c78cec' };

const ManageQuestions = ({ token }) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState(null);
  const [modalMode, setModalMode] = useState(null);
  const [formData, setFormData] = useState(emptyQuestion);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  const headers = { Authorization: `Bearer ${token}` };

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchQuestions = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/api/questions`);
      setQuestions(res.data.data || []);
    } catch (err) {
      console.error('Failed to fetch questions:', err);
      showToast('Failed to load questions', 'error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  const openAdd = () => {
    const nextOrder = questions.length > 0
      ? Math.max(...questions.map(q => q.order)) + 1
      : 1;
    setFormData({
      ...emptyQuestion,
      order: nextOrder,
      options: emptyQuestion.options.map(o => ({ ...o })),
    });
    setModalMode('add');
  };

  const openEdit = (q) => {
    setFormData({
      order: q.order,
      storyTitle: q.storyTitle || '',
      storyText: q.storyText || '',
      options: (q.options || []).map(o => ({
        text: o.text || '',
        vibeImpact: o.vibeImpact || 'A',
        imageUrl: o.imageUrl || '',
      })),
    });
    setSelectedId(q._id);
    setModalMode('edit');
  };

  const openDelete = (q) => {
    setSelectedId(q._id);
    setFormData({ storyTitle: q.storyTitle || `Question ${q.order}` });
    setModalMode('delete');
  };

  const closeModal = () => {
    setModalMode(null);
    setSelectedId(null);
    setFormData(emptyQuestion);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (modalMode === 'add') {
        await axios.post(`${API}/api/questions`, formData, { headers });
        showToast('Question created!');
      } else if (modalMode === 'edit') {
        await axios.put(`${API}/api/questions/${selectedId}`, formData, { headers });
        showToast('Question updated!');
      }
      closeModal();
      fetchQuestions();
    } catch (err) {
      showToast(err.response?.data?.message || 'Save failed', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setSaving(true);
    try {
      await axios.delete(`${API}/api/questions/${selectedId}`, { headers });
      showToast('Question deleted!');
      closeModal();
      fetchQuestions();
    } catch (err) {
      showToast(err.response?.data?.message || 'Delete failed', 'error');
    } finally {
      setSaving(false);
    }
  };

  const updateOption = (idx, field, value) => {
    setFormData(prev => {
      const opts = [...prev.options];
      opts[idx] = { ...opts[idx], [field]: value };
      return { ...prev, options: opts };
    });
  };

  if (loading) {
    return <div className="admin-loading">Loading questions...</div>;
  }

  return (
    <>
      {/* Action buttons */}
      <div className="admin-subtabs" style={{ paddingTop: '12px' }}>
        <div style={{ flex: 1 }} />
        <div className="admin-action-buttons">
          <button id="add-question-btn" className="admin-btn admin-btn-add" onClick={openAdd}>
            Add
          </button>
        </div>
      </div>

      {/* Questions as cards (matching Figma) */}
      <div className="admin-table-wrap">
        {questions.length === 0 ? (
          <div className="admin-empty">No questions found. Click "Add" to create one.</div>
        ) : (
          questions.map((q) => (
            <div className="admin-question-card" key={q._id}>
              <div className="admin-question-header">
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', flex: 1 }}>
                  <span className="admin-question-order">{q.order}</span>
                  <div>
                    <h3 className="admin-question-title">{q.storyTitle}</h3>
                    <p className="admin-question-story">{q.storyText}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                  <button
                    onClick={() => openEdit(q)}
                    style={{
                      padding: '6px 16px',
                      borderRadius: '6px',
                      fontSize: '13px',
                      fontFamily: "'Inter', sans-serif",
                      cursor: 'pointer',
                      border: '1px solid #ddd',
                      background: '#fff',
                      color: '#555',
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => openDelete(q)}
                    style={{
                      padding: '6px 16px',
                      borderRadius: '6px',
                      fontSize: '13px',
                      fontFamily: "'Inter', sans-serif",
                      cursor: 'pointer',
                      border: '1px solid #e74c3c',
                      background: '#fff',
                      color: '#e74c3c',
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>

              <div className="admin-question-options">
                {(q.options || []).map((opt, i) => (
                  <div
                    key={i}
                    className={`admin-option-card vibe-${opt.vibeImpact}`}
                  >
                    <div className="admin-option-label">
                      {String.fromCharCode(65 + i)}) {VIBE_LABELS[opt.vibeImpact] || opt.vibeImpact}
                    </div>
                    {opt.text}
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add/Edit Modal */}
      {(modalMode === 'add' || modalMode === 'edit') && (
        <div className="admin-modal-overlay" onClick={closeModal}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()} style={{ width: 680 }}>
            <h3 className="admin-modal-title">
              {modalMode === 'add' ? 'Add Question' : 'Edit Question'}
            </h3>

            <div className="admin-form-row">
              <div className="admin-form-group">
                <label className="admin-form-label">Order</label>
                <input
                  type="number"
                  className="admin-form-input"
                  value={formData.order}
                  onChange={(e) => setFormData(prev => ({ ...prev, order: parseInt(e.target.value) || 1 }))}
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">Story Title</label>
                <input
                  className="admin-form-input"
                  value={formData.storyTitle}
                  onChange={(e) => setFormData(prev => ({ ...prev, storyTitle: e.target.value }))}
                  placeholder="e.g. The Awakening"
                />
              </div>
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Story Text</label>
              <textarea
                className="admin-form-textarea"
                value={formData.storyText}
                onChange={(e) => setFormData(prev => ({ ...prev, storyText: e.target.value }))}
                placeholder="The narrative prompt for this question..."
              />
            </div>

            <label className="admin-form-label" style={{ marginBottom: '12px', fontSize: '18px' }}>
              Options
            </label>

            {formData.options.map((opt, idx) => (
              <div
                key={idx}
                style={{
                  border: `2px solid ${VIBE_COLORS[opt.vibeImpact]}`,
                  borderRadius: '10px',
                  padding: '14px',
                  marginBottom: '12px',
                  background: `${VIBE_COLORS[opt.vibeImpact]}08`,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span style={{
                    fontFamily: "'Single Day', cursive",
                    fontSize: '16px',
                    color: VIBE_COLORS[opt.vibeImpact],
                    fontWeight: 600,
                  }}>
                    Option {String.fromCharCode(65 + idx)}
                  </span>
                  <select
                    className="admin-form-select"
                    value={opt.vibeImpact}
                    onChange={(e) => updateOption(idx, 'vibeImpact', e.target.value)}
                    style={{ width: '100px' }}
                  >
                    {['A', 'B', 'C', 'D'].map(v => (
                      <option key={v} value={v}>{v} – {VIBE_LABELS[v]}</option>
                    ))}
                  </select>
                </div>
                <div className="admin-form-group" style={{ marginBottom: '8px' }}>
                  <input
                    className="admin-form-input"
                    value={opt.text}
                    onChange={(e) => updateOption(idx, 'text', e.target.value)}
                    placeholder="Option text..."
                  />
                </div>
                <div className="admin-form-group" style={{ marginBottom: 0 }}>
                  <input
                    className="admin-form-input"
                    value={opt.imageUrl}
                    onChange={(e) => updateOption(idx, 'imageUrl', e.target.value)}
                    placeholder="Image URL (optional)"
                    style={{ fontSize: '12px' }}
                  />
                </div>
              </div>
            ))}

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
            <h3 className="admin-modal-title">Delete Question</h3>
            <p className="admin-confirm-text">
              Are you sure you want to delete <span className="admin-confirm-name">{formData.storyTitle}</span>?
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

export default ManageQuestions;
