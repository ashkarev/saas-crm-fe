import React from 'react'

const Dashboard = () => {
  return (
    <div className='flex h-screen bg-gray-100 text-black'>

      {/* Sidebar */}
      <div className='w-[250px] bg-white shadow-md p-4'>
        <h1 className='text-xl font-bold mb-6'>My SaaS</h1>

        <ul className='space-y-4'>
          <li className='cursor-pointer hover:text-blue-500'>Dashboard</li>
          <li className='cursor-pointer hover:text-blue-500'>Users</li>
          <li className='cursor-pointer hover:text-blue-500'>Projects</li>
          <li className='cursor-pointer hover:text-blue-500'>Audit Logs</li>
          <li className='cursor-pointer hover:text-blue-500'>Settings</li>
        </ul>
      </div>

      {/* Main Area */}
      <div className='flex-1 flex flex-col'>

        {/* Navbar */}
        <div className='bg-white shadow-sm p-4 flex justify-between items-center'>
          <h2 className='text-lg font-semibold'>Dashboard</h2>

          <div className='flex gap-4 items-center'>
            <input
              type='text'
              placeholder='Search...'
              className='border px-3 py-1 rounded-md outline-none'
            />
            <div className='w-8 h-8 bg-gray-300 rounded-full'></div>
          </div>
        </div>

        {/* Content */}
        <div className='p-4 space-y-4 overflow-y-auto'>

          {/* Stats Cards */}
          <div className='grid grid-cols-4 gap-4'>
            <div className='bg-white p-4 rounded-xl shadow'>
              <p className='text-sm text-gray-500'>Total Users</p>
              <h2 className='text-xl font-bold'>1,245</h2>
            </div>

            <div className='bg-white p-4 rounded-xl shadow'>
              <p className='text-sm text-gray-500'>Revenue</p>
              <h2 className='text-xl font-bold'>$12,340</h2>
            </div>

            <div className='bg-white p-4 rounded-xl shadow'>
              <p className='text-sm text-gray-500'>Active Projects</p>
              <h2 className='text-xl font-bold'>32</h2>
            </div>

            <div className='bg-white p-4 rounded-xl shadow'>
              <p className='text-sm text-gray-500'>Conversion</p>
              <h2 className='text-xl font-bold'>4.5%</h2>
            </div>
          </div>

          {/* Main Section */}
          <div className='grid grid-cols-3 gap-4'>

            {/* Users Table */}
            <div className='col-span-2 bg-white p-4 rounded-xl shadow'>
              <h3 className='font-semibold mb-4'>Recent Users</h3>

              <table className='w-full text-sm'>
                <thead>
                  <tr className='text-left border-b'>
                    <th className='py-2'>Name</th>
                    <th>Email</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  <tr className='border-b'>
                    <td className='py-2'>John</td>
                    <td>john@mail.com</td>
                    <td className='text-green-500'>Active</td>
                  </tr>

                  <tr className='border-b'>
                    <td className='py-2'>Sara</td>
                    <td>sara@mail.com</td>
                    <td className='text-red-500'>Inactive</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Activity Panel */}
            <div className='bg-white p-4 rounded-xl shadow'>
              <h3 className='font-semibold mb-4'>Activity</h3>

              <ul className='space-y-3 text-sm'>
                <li>John created a project</li>
                <li>Sara deleted a user</li>
                <li>Admin updated settings</li>
              </ul>
            </div>

          </div>

          {/* 🔥 Audit Logs Section */}
          <div className='bg-white p-4 rounded-xl shadow'>
            <h3 className='font-semibold mb-4'>Audit Logs</h3>

            <div className='overflow-x-auto'>
              <table className='w-full text-sm'>
                <thead>
                  <tr className='text-left border-b'>
                    <th className='py-2'>User</th>
                    <th>Action</th>
                    <th>Entity</th>
                    <th>Time</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  <tr className='border-b'>
                    <td className='py-2'>John</td>
                    <td>Create Project</td>
                    <td>Project Alpha</td>
                    <td>2 mins ago</td>
                    <td className='text-green-500'>Success</td>
                  </tr>

                  <tr className='border-b'>
                    <td className='py-2'>Sara</td>
                    <td>Delete User</td>
                    <td>User #102</td>
                    <td>10 mins ago</td>
                    <td className='text-red-500'>Failed</td>
                  </tr>

                  <tr className='border-b'>
                    <td className='py-2'>Admin</td>
                    <td>Update Settings</td>
                    <td>Organization</td>
                    <td>1 hour ago</td>
                    <td className='text-green-500'>Success</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Dashboard