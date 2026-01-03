import React from 'react';
import { useUser } from '../context/UserContext';
import { Navigate } from 'react-router-dom';
import { TESTS } from '../constants';
import Button from '../components/Button';
import { Settings, Users, Database } from 'lucide-react';

const Admin: React.FC = () => {
  const { user } = useUser();

  // Simple protection
  if (!user || !user.email.includes('admin')) {
      return (
        <div className="min-h-screen flex items-center justify-center flex-col p-4">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
            <p className="mb-4">You do not have administrative privileges.</p>
            <Button onClick={() => window.history.back()}>Go Back</Button>
        </div>
      );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
                 <h1 className="text-3xl font-bold text-slate-900">Admin Console</h1>
                 <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-bold">Admin Mode</span>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
                 <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-3 mb-4 text-slate-500">
                        <Users />
                        <span className="font-bold uppercase tracking-wider text-xs">Total Users</span>
                    </div>
                    <div className="text-3xl font-bold text-slate-900">1,248</div>
                    <div className="text-green-600 text-sm mt-1">+12% this week</div>
                 </div>
                 <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-3 mb-4 text-slate-500">
                        <Database />
                        <span className="font-bold uppercase tracking-wider text-xs">Assessments Completed</span>
                    </div>
                    <div className="text-3xl font-bold text-slate-900">5,892</div>
                 </div>
                 <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-3 mb-4 text-slate-500">
                        <Settings />
                        <span className="font-bold uppercase tracking-wider text-xs">Revenue (MTD)</span>
                    </div>
                    <div className="text-3xl font-bold text-slate-900">$12,450</div>
                 </div>
            </div>

            <h2 className="text-xl font-bold text-slate-900 mb-6">Manage Tests</h2>
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <table className="w-full text-left text-sm text-slate-600">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="p-4 font-bold text-slate-900">Test Name</th>
                            <th className="p-4 font-bold text-slate-900">Category</th>
                            <th className="p-4 font-bold text-slate-900">Price</th>
                            <th className="p-4 font-bold text-slate-900">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {TESTS.map(test => (
                            <tr key={test.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                                <td className="p-4 font-medium text-slate-900">{test.title}</td>
                                <td className="p-4">{test.category}</td>
                                <td className="p-4">${test.price}</td>
                                <td className="p-4">
                                    <button className="text-brand-600 hover:text-brand-800 font-medium mr-3">Edit</button>
                                    <button className="text-slate-400 hover:text-slate-600">Stats</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  );
};

export default Admin;