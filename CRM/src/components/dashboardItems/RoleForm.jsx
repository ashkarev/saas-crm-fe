import { useState } from "react";

export default function RoleForm({ onAdd }) {
  const [role, setRole] = useState("");

  const handleAdd = () => {
    if (!role) return;

    onAdd(role);
    setRole("");
  };

  return (
    <div>
      <h3>Add Role</h3>

      <input
        placeholder="Role name"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />

      <button onClick={handleAdd}>Add Role</button>
    </div>
  );
}