export default function RoleList({ roles }) {
  return (
    <div>
      <h3>Roles List</h3>

      <ul>
        {roles.map((r, i) => (
          <li key={i}>{r}</li>
        ))}
      </ul>
    </div>
  );
}