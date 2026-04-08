import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, RotateCcw, Search } from 'lucide-react';
import { getRoles, createRole, updateRole, deleteRole } from '../../services/allApi';
import axiosConfig from '../../services/axiosConfig'; // Used for the restore endpoint directly
import { toast } from 'react-toastify';

export default function Roles() {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState({
    name: '',
  });

  useEffect(() => {
    fetchRolesList();
  }, [searchTerm]);

  const fetchRolesList = async () => {
    try {
      setLoading(true);
      const response = await getRoles({ search: searchTerm });
      console.log('ROLES RESPONSE:', response);
      setRoles(response.data || []);
    } catch (err) {
      console.log("API ERROR:", err);
      toast.error('Failed to load roles');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateRole(editingId, {
          name: formData.name,
        });
        toast.success('Role updated successfully');
      } else {
        await createRole({
          name: formData.name,
        });
        toast.success('Role created successfully');
      }
      setShowForm(false);
      setEditingId(null);
      setFormData({ name: '' });
      fetchRolesList();
    } catch (err) {
      console.log("API ERROR:", err);
      toast.error(err.response?.data?.message || 'Operation failed');
    }
  };

  const handleEdit = (role) => {
    setFormData({ name: role.name });
    setEditingId(role.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this role? All users with this role will be affected.')) {
      try {
        await deleteRole(id);
        toast.success('Role deleted');
        fetchRolesList();
      } catch (err) {
        console.log("API ERROR:", err);
        toast.error(err.response?.data?.message || 'Failed to delete role');
      }
    }
  };

  const handleRestore = async (id) => {
    try {
      await axiosConfig('PUT', `/api/roles/${id}/restore`);
      toast.success('Role restored');
      fetchRolesList();
    } catch (error) {
      toast.error('Failed to restore role');
    }
  };

  return (
    <div className="space-y-6">
      {/* HEADER & CONTROLS */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Roles</h1>
        <button
          onClick={() => {
            setShowForm(true);
            setEditingId(null);
            setFormData({ name: '' });
          }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
        >
          <Plus size={20} />
          Create Role
        </button>
      </div>

      {/* SEARCH */}
      <div className="relative">
        <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search roles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
        />
      </div>

      {/* FORM MODAL */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-900 rounded-lg max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              {editingId ? 'Edit Role' : 'Create New Role'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Role Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Manager, Developer, Support"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-slate-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
                >
                  {editingId ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ROLES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <div className="col-span-full p-8 text-center text-gray-500">Loading roles...</div>
        ) : roles.length === 0 ? (
          <div className="col-span-full p-8 text-center text-gray-500">No roles found</div>
        ) : (
          roles.map((role) => (
            <div
              key={role.id}
              className="bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-800 p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{role.name}</h3>
                <span
                  className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                    role.is_active
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                      : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                  }`}
                >
                  {role.is_active ? 'Active' : 'Inactive'}
                </span>
              </div>

              <div className="mb-4 p-3 bg-gray-50 dark:bg-slate-800 rounded">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <strong>Role ID:</strong> #{role.id}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(role)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 hover:bg-blue-100 dark:hover:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg transition-colors font-medium text-sm"
                  title="Edit Role"
                >
                  <Edit2 size={16} />
                  Edit
                </button>
                {role.is_active ? (
                  <button
                    onClick={() => handleDelete(role.id)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 hover:bg-red-100 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg transition-colors font-medium text-sm"
                    title="Delete Role"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                ) : (
                  <button
                    onClick={() => handleRestore(role.id)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 hover:bg-green-100 dark:hover:bg-green-900/20 text-green-600 dark:text-green-400 rounded-lg transition-colors font-medium text-sm"
                    title="Restore Role"
                  >
                    <RotateCcw size={16} />
                    Restore
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}