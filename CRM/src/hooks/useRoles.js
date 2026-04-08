import { useState, useEffect } from 'react';
import { getRoles } from '../services/allApi';
import { toast } from 'react-toastify';

export default function useRoles() {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRoles = async () => {
    setLoading(true);
    try {
      const response = await getRoles();
      setRoles(response.roles || []);
    } catch (error) {
      console.log('API ERROR (useRoles):', error);
      toast.error('Failed to load roles');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  return { roles, loading, refetch: fetchRoles };
}
