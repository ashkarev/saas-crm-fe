import { useState } from "react";

export default function MemberForm({ onAdd, roles }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = () => {
    if (!name || !email || !role) return;

    onAdd({ name, email, role });

    setName("");
    setEmail("");
    setRole("");
  };

  return (
    <div>
      <h3>Add Member</h3>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="">Select Role</option>
        {roles.map((r, i) => (
          <option key={i}>{r}</option>
        ))}
      </select>

      <button onClick={handleSubmit}>Add Member</button>
    </div>
  );
}