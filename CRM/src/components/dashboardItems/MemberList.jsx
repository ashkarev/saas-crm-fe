export default function MemberList({ members }) {
  return (
    <div>
      <h3>Members List</h3>

      <ul>
        {members.map((m, i) => (
          <li key={i}>
            {m.name} - {m.email} - {m.role}
          </li>
        ))}
      </ul>
    </div>
  );
}