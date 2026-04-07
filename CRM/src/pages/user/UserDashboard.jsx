import { useEffect, useState } from "react";
import { markAttendance, getMyAttendance } from "../../services/attendanceServices";

export default function UserDashboard() {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(false);
  const [marking, setMarking] = useState(false);

  const loadAttendance = async () => {
    setLoading(true);
    try {
      const data = await getMyAttendance();
      console.log("ATTENDANCE DATA:", data);
      if (Array.isArray(data)) setAttendance(data);
      else if (Array.isArray(data?.data)) setAttendance(data.data);
      else setAttendance([]);
    } catch (err) {
      setAttendance([]);
    } finally {
      setLoading(false);
    }
  };

  const handleMark = async () => {
    setMarking(true);
    try {
      await markAttendance();
      await loadAttendance();
    } finally {
      setMarking(false);
    }
  };

  useEffect(() => {
    loadAttendance();
  }, []);

  return (
    <div>
      <h1>My Dashboard</h1>
      <button onClick={handleMark} disabled={marking}>
        {marking ? "Marking..." : "Mark Attendance"}
      </button>
      <h3>My Attendance</h3>
      {loading ? (
        <p>Loading...</p>
      ) : attendance.length === 0 ? (
        <p>No attendance records found.</p>
      ) : (
        <ul>
          {attendance.map((a) => (
            <li key={a.id}>{a.date} - {a.status}</li>
          ))}
        </ul>
      )}
    </div>
  );
}