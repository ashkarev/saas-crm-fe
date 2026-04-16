import React, { useEffect, useState } from "react";
import { attendanceServices } from "../../services/allApi";

function Attendance() {
  const [data, setData] = useState([]);

  const fetchAttendance = async () => {
    try {
      const res = await attendanceServices.getAllAttendance();
      // Since our axiosConfig returns res.data, res here IS { success: true, data: [...] }
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleMark = async (user_id, status) => {
    try {
      await attendanceServices.markAttendance({ user_id, status });
      fetchAttendance();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Attendance Management</h2>

      <div className="bg-[#1e1e1e] rounded-xl overflow-hidden shadow-xl border border-white/5">
        <table className="w-full text-left">
          <thead className="bg-white/5 text-gray-400 text-sm uppercase">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Status Today</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-gray-300">
            {data.map((item) => (
              <tr key={item.user_id} className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4">{item.name}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    item.status === 'present' ? 'bg-green-500/20 text-green-400' :
                    item.status === 'absent' ? 'bg-red-500/20 text-red-400' :
                    'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {item.status || "Not Marked"}
                  </span>
                </td>
                <td className="px-6 py-4 flex gap-2">
                  <button 
                    onClick={() => handleMark(item.user_id, "present")}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm"
                  >
                    Present
                  </button>
                  <button 
                    onClick={() => handleMark(item.user_id, "absent")}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm"
                  >
                    Absent
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {data.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            No users found in this organization.
          </div>
        )}
      </div>
    </div>
  );
}

export default Attendance;
