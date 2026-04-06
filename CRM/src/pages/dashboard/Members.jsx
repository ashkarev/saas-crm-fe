import { useState } from "react";
import MemberForm from "../../components/dashboardItems/MemberForm";
import MemberList from "../../components/dashboardItems/MemberList";
import { useRoles } from "../../contexts/RoleContext";

export default function Members() {
  const [members, setMembers] = useState([]);
  const { roles } = useRoles();

  const handleAddMember = (newMember) => {
    setMembers([...members, newMember]);
  };

  return (
    <div>
      <h1>Members Page</h1>

      <MemberForm onAdd={handleAddMember} roles={roles} />

      <MemberList members={members} />
    </div>
  );
}