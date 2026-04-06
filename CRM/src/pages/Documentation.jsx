"use client";

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, ChevronLeft } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function DeveloperDocs() {
  return (
    <>
    <Navbar />
    
    {/* BACK TO HOME BUTTON */}
    <div className="fixed top-24 right-6 z-50">
      <Link to="/">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-full font-bold text-sm shadow-xl shadow-blue-500/20 hover:bg-blue-700 transition-all"
        >
          <Home size={16} />
          <span>Back to Home</span>
        </motion.button>
      </Link>
    </div>

    <div className="min-h-screen bg-[#070A10] text-[#E2E8F0] px-6 py-26 font-['Sora',sans-serif]">
      <div className="max-w-4xl mx-auto relative">
        


        {/* HEADER */}
        <h1 className="text-4xl text-blue-500 font-bold tracking-tight">
          SaaS CRM – Developer Documentation
        </h1>
        <p className="text-gray-500 mt-3 mb-12 text-sm">
          System architecture, API design, and full-stack implementation overview.
        </p>

        {/* OVERVIEW */}
        <section className="mb-14">
          <h2 className="text-xl font-semibold mb-3">Overview</h2>
        <p className="text-gray-400 leading-relaxed">
          Helix is a multi-tenant SaaS CRM backend designed for managing organizations,
          users, and access control within a single system. Each request is scoped using
          organization-level context, ensuring strict isolation of tenant data across the system.

          The backend follows a layered architecture where validation, authorization,
          and business logic are handled independently. All interactions are exposed
          through a RESTful API designed for consistency, scalability, and predictable behavior.
          The system is built to handle real-world production scenarios.
        </p>
        </section>

        {/* STACK */}
        <section className="mb-14">
          <h2 className="text-xl font-semibold mb-4">Tech Stack</h2>

          <div className="grid md:grid-cols-2 gap-6">

             <div className="bg-[#0D1117] border border-gray-800 rounded-lg p-4">
               <p className="text-blue-500 font-semibold mb-2">Frontend</p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>React (Vite)</li>
                <li>Tailwind CSS</li>
                <li>Framer Motion</li>
              </ul>
            </div>

             <div className="bg-[#0D1117] border border-gray-800 rounded-lg p-4">
               <p className="text-blue-500 font-semibold mb-2">Backend</p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>Node.js + Express</li>
                <li>PostgreSQL</li>
                <li>JWT Authentication</li>
                <li>Bcrypt</li>
                <li>Joi Validation</li>
                <li>Razorpay Integration</li>
              </ul>
            </div>

          </div>
        </section>

        {/* ARCHITECTURE */}
        <section className="mb-14">
          <h2 className="text-xl font-semibold mb-3">Architecture</h2>

           <pre className="bg-[#0D1117] border border-gray-800 p-4 rounded-lg text-sm text-gray-300">
{`Frontend (React)
      ↓
API Layer (Express)
      ↓
Middleware (Auth, RBAC, Validation)
      ↓
Controllers (Business Logic)
      ↓
Database (PostgreSQL)`}
          </pre>

          <pre className="mt-4 bg-[#0D1117] border border-gray-800 p-4 rounded-lg text-sm text-gray-300">
{`src/
 ├── controller/
 ├── middleware/
 ├── routes/
 ├── utils/
 ├── validation/
 ├── db.js
 ├── index.js`}
          </pre>
        </section>

        {/* AUTH */}
        <section className="mb-14">
          <h2 className="text-xl font-semibold mb-3">Authentication</h2>

           <div className="bg-blue-600/5 border border-blue-500/10 p-4 rounded-lg text-sm">
             <p className="text-blue-500 font-medium mb-2">JWT Payload</p>
            <pre>
{`{
  userId,
  organization_id,
  role_id,
  is_super_admin
}`}
            </pre>
          </div>
        </section>

        {/* MULTI TENANT */}
        <section className="mb-14">
          <h2 className="text-xl font-semibold mb-3">Multi-Tenant Design</h2>
          <p className="text-gray-700 leading-relaxed">
            All data operations are scoped using{" "}
             <code className="bg-gray-900 px-1 rounded text-blue-400">organization_id</code>.
            Queries are filtered at the database level to prevent cross-tenant access.
            Each organization runs in an isolated context while sharing infrastructure.
          </p>
        </section>

        {/* FEATURES */}
        <section className="mb-14">
          <h2 className="text-xl font-semibold mb-4">Core Features</h2>

          <div className="space-y-3 text-sm text-gray-700">

            <p>
              <strong>User Management:</strong> Handles user lifecycle including creation,
              updates, and soft deletion within organization scope.
            </p>

            <p>
              <strong>Role-Based Access Control:</strong> Permissions enforced at middleware
              level before reaching controllers.
            </p>

            <p>
              <strong>Organization Management:</strong> Supports multiple tenants with strict
              isolation.
            </p>

            <p>
              <strong>Subscription & Payments:</strong> Razorpay integration for billing,
              plan upgrades, and subscription handling.
            </p>

            <p>
              <strong>Validation Layer:</strong> Joi-based schema validation before processing requests.
            </p>

            <p>
              <strong>Analytics & Dashboard:</strong> Aggregated system metrics via optimized APIs.
            </p>

          </div>
        </section>

        {/* API */}
        <section className="mb-14">
          <h2 className="text-xl font-semibold mb-4">API</h2>

           <div className="bg-blue-600/5 border border-blue-500/10 p-4 rounded-lg text-sm mb-6">
             <p className="text-blue-500 font-medium mb-2">Authorization</p>
             <code className="text-blue-400">Authorization: Bearer &lt;token&gt;</code>
          </div>

           <div className="bg-[#0D1117] border border-gray-800 p-4 rounded-lg text-sm">
             <p className="text-gray-500 mb-2 font-mono">GET /api/users</p>
             <pre className="text-gray-300">
{`[
  {
    "id": "usr_001",
    "email": "user@example.com",
    "role": "admin"
  }
]`}
            </pre>
          </div>

          <div className="mt-6 space-y-2 text-sm">
             <p><code className="text-blue-500">POST /api/users/login</code></p>
             <p><code className="text-blue-500">GET /api/users</code></p>
             <p><code className="text-blue-500">GET /api/organizations/me</code></p>
             <p><code className="text-blue-500">POST /api/payments</code></p>
             <p><code className="text-blue-500">GET /api/analytics</code></p>
          </div>
        </section>

        {/* SECURITY */}
        <section className="mb-14">
          <h2 className="text-xl font-semibold mb-3">Security</h2>
        <ul className="text-gray-700 text-sm space-y-3">

  <li>
    <strong>Authentication:</strong> All protected routes require a valid JWT token.
    Tokens are verified on every request to ensure secure access.
  </li>

  <li>
    <strong>Authorization:</strong> Role-based access control is enforced through
    middleware, preventing unauthorized access to restricted resources.
  </li>

  <li>
    <strong>Tenant Isolation:</strong> All queries are scoped using
    <code className="bg-gray-100 px-1 rounded ml-1">organization_id</code>,
    ensuring complete separation of data between organizations.
  </li>

  <li>
    <strong>Input Validation:</strong> Incoming requests are validated using Joi
    schemas before reaching business logic, reducing the risk of malformed or
    malicious data.
  </li>

  <li>
    <strong>Password Security:</strong> User passwords are hashed using bcrypt
    before storage, ensuring they are never stored in plain text.
  </li>

  <li>
    <strong>API Protection:</strong> Unauthorized or invalid requests return
    proper HTTP status codes (401, 403), maintaining predictable API behavior.
  </li>

</ul>
        </section>

        {/* FOOTER */}
        <div className="border-t pt-6 text-sm text-gray-400">
          Helix – Production-ready SaaS CRM system.
        </div>

      </div>
     
    </div>
    <Footer />
   </>
  );
}