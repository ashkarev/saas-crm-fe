import React, { useEffect, useState } from 'react';
import { getRecords, createRecord, updateRecord, deleteRecord, restoreRecord } from '../../services/allApi';
import { toast } from 'react-toastify';
import { Plus, Edit2, Trash2, RotateCcw, Search, FileText, Filter } from 'lucide-react';

export default function Records() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('active'); // 'active' or 'inactive'

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    data: {}
  });

  const fetchRecordsData = async () => {
    try {
      setLoading(true);
      // We pass the viewMode or filters if supported by backend
      const res = await getRecords({ 
        search: searchTerm,
        // If your backend getRecords doesn't support an 'inactive' flag yet, 
        // you might need to adjust the backend query
      });
      console.log("RECORDS FETCH RESPONSE:", res);
      setRecords(res.data || []);
    } catch (err) {
      console.log("API ERROR (FETCH):", err);
      toast.error("Failed to load records");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecordsData();
  }, [searchTerm, viewMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateRecord(editingId, formData);
        toast.success("Record updated successfully");
      } else {
        await createRecord(formData);
        toast.success("Record created successfully");
      }
      setShowForm(false);
      setEditingId(null);
      setFormData({ title: '', description: '', data: {} });
      fetchRecordsData();
    } catch (err) {
      console.log("API ERROR (SUBMIT):", err);
      toast.error(err.response?.data?.message || "Operation failed");
    }
  };

  const handleEdit = (record) => {
    setFormData({
      title: record.title,
      description: record.description,
      data: record.data || {}
    });
    setEditingId(record.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        await deleteRecord(id);
        toast.success("Record deleted");
        fetchRecordsData();
      } catch (err) {
        console.log("API ERROR (DELETE):", err);
        toast.error("Failed to delete record");
      }
    }
  };

  const handleRestore = async (id) => {
    try {
      await restoreRecord(id);
      toast.success("Record restored");
      fetchRecordsData();
    } catch (err) {
      console.log("API ERROR (RESTORE):", err);
      toast.error("Failed to restore record");
    }
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Records Management</h1>
        <div className="flex gap-2">
           <button
            onClick={() => {
              setEditingId(null);
              setFormData({ title: '', description: '', data: {} });
              setShowForm(true);
            }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            <Plus size={20} />
            Create Record
          </button>
        </div>
      </div>

      {/* CONTROLS */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search records by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg text-gray-900 dark:text-white"
          />
        </div>
      </div>

      {/* FORM MODAL */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-900 rounded-lg max-w-md w-full p-6 shadow-xl">
            <h2 className="text-xl font-bold mb-4">{editingId ? 'Edit Record' : 'Add New Record'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                  rows="3"
                ></textarea>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                  }}
                  className="flex-1 px-4 py-2 border rounded-lg dark:border-slate-700 dark:text-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium"
                >
                  {editingId ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* RECORDS LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <div className="col-span-full p-8 text-center text-gray-500">Loading records...</div>
        ) : records.length === 0 ? (
          <div className="col-span-full p-8 text-center text-gray-500">No records found.</div>
        ) : (
          records.map((record) => (
            <div
              key={record.id}
              className={`bg-white dark:bg-slate-900 rounded-lg border p-4 transition-all ${
                record.is_active 
                  ? 'border-gray-200 dark:border-slate-800 shadow-sm' 
                  : 'border-red-200 dark:border-red-900/30 opacity-75 bg-red-50/10'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${record.is_active ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'bg-gray-100 dark:bg-gray-800 text-gray-400'}`}>
                    <FileText size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate max-w-[150px]">
                      {record.title}
                    </h3>
                    <span className={`text-[10px] font-bold uppercase ${record.is_active ? 'text-green-500' : 'text-red-500'}`}>
                      {record.is_active ? '• Active' : '• Inactive'}
                    </span>
                  </div>
                </div>
                <div className="flex gap-1">
                  {record.is_active ? (
                    <>
                      <button
                        onClick={() => handleEdit(record)}
                        className="p-1.5 hover:bg-blue-100 dark:hover:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg transition-colors"
                        title="Edit Record"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(record.id)}
                        className="p-1.5 hover:bg-red-100 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg transition-colors"
                        title="Delete Record"
                      >
                        <Trash2 size={16} />
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => handleRestore(record.id)}
                      className="p-1.5 hover:bg-green-100 dark:hover:bg-green-900/20 text-green-600 dark:text-green-400 rounded-lg transition-colors"
                      title="Restore Record"
                    >
                      <RotateCcw size={16} />
                    </button>
                  )}
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
                {record.description || "No description provided."}
              </p>
              <div className="flex justify-between items-center text-[10px] text-gray-400">
                <span>Created: {new Date(record.created_at).toLocaleDateString()}</span>
                {record.updated_at && record.updated_at !== record.created_at && (
                  <span>Edited</span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
