import RoleForm from "../../components/dashboardItems/RoleForm";
import RoleList from "../../components/dashboardItems/RoleList";
import { useRoles } from "../../contexts/RoleContext";

export default function Roles() {
  const { roles, addRole } = useRoles();

  return (
    <div>
      <h1>Roles Page</h1>

      <RoleForm onAdd={addRole} />

      <RoleList roles={roles} />
    </div>
  );
}