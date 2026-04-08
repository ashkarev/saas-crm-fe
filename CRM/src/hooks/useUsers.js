import { useState, useEffect } from 'react';
import { getUsers } from '../services/allApi';
import { toast } from 'react-toastify';

export default function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await getUsers();
      setUsers(response.users || []);
    } catch (error) {
      console.log('API ERROR (useUsers):', error);
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return { users, loading, refetch: fetchUsers };
}
