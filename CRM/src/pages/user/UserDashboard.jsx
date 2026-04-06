import { useEffect, useState } from "react";
import {
  markAttendance,
  getMyAttendance,
} from "../../services/attendanceServices";

export default function UserDashboard() {
  const [attendance, setAttendance] = useState([]);

  const handleMark = async () => {
    await markAttendance();
    loadAttendance();
  };

  const loadAttendance = async () => {
    const data = await getMyAttendance();
    setAttendance(data);
  };

  useEffect(() => {
    loadAttendance();
  }, []);

  return (
    <div>
      <h1>My Dashboard</h1>

      <button onClick={handleMark}>Mark Attendance</button>

      <h3>My Attendance</h3>

      <ul>
        {attendance.map((a) => (
          <li key={a.id}>
            {a.date} - {a.status}
          </li>
        ))}
      </ul>
    </div>
  );
}