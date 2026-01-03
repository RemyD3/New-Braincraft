import React from 'react';
import { useUser } from '../context/UserContext';
import { getUserResults } from '../services/testService';
import { TESTS } from '../constants';
import { Link, Navigate } from 'react-router-dom';
import Button from '../components/Button';
import { FileText, Calendar, TrendingUp, Activity, Heart, Brain } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard: React.FC = () => {
  const { user } = useUser();
  
  if (!user) {
      return <Navigate to="/login" />;
  }

  const results = getUserResults().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // --- Prepare Trend Data for the most taken test ---
  const counts: Record<string, number> = {};
  results.forEach(r => { counts[r.testId] = (counts[r.testId] || 0) + 1 });
  
  // Find test with most results (min 2 for trend)
  const frequentTestId = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b, '');
  const hasTrend = counts[frequentTestId] >= 2;
  const frequentTest = TESTS.find(t => t.id === frequentTestId);
  
  const trendData = hasTrend ? results
      .filter(r => r.testId === frequentTestId)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .map(r => ({
          date: new Date(r.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
          score: r.rawScores['total']
      })) : [];

  return (
    <div className="min-h-screen bg-slate-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
            
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Your Profile</h1>
                    <p className="text-slate-600 mt-1">Track your mental wellness and relationship growth.</p>
                </div>
                <div className="flex gap-3">
                     <Link to="/tests">
                        <Button>Browse Assessments</Button>
                    </Link>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid md:grid-cols-4 gap-6 mb-12">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Activity size={20} /></div>
                        <span className="text-slate-500 font-medium text-sm">Total Tests</span>
                    </div>
                    <div className="text-3xl font-bold text-slate-900">{results.length}</div>
                </div>
                
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                     <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-pink-50 text-pink-600 rounded-lg"><Heart size={20} /></div>
                        <span className="text-slate-500 font-medium text-sm">Relationships</span>
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                        {results.filter(r => TESTS.find(t=>t.id === r.testId)?.category === 'Relationships').length}
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 col-span-2">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg"><Brain size={20} /></div>
                        <span className="text-slate-500 font-medium text-sm">Latest Insight</span>
                    </div>
                    <div className="font-medium text-slate-900">
                        {results.length > 0 ? (
                             <span>Your {TESTS.find(t=>t.id===results[0].testId)?.title} result was <strong>{results[0].interpretation}</strong>.</span>
                        ) : "No insights yet."}
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                
                {/* Main Content: History */}
                <div className="lg:col-span-2 space-y-8">
                     {/* Trend Chart */}
                     {hasTrend && (
                         <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                             <div className="flex items-center justify-between mb-6">
                                 <h3 className="font-bold text-slate-900">Progress: {frequentTest?.title}</h3>
                                 <span className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-500">Last {trendData.length} attempts</span>
                             </div>
                             <div className="h-64 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={trendData}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                        <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                                        <Tooltip 
                                            contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                                        />
                                        <Line 
                                            type="monotone" 
                                            dataKey="score" 
                                            stroke="#0d9488" 
                                            strokeWidth={3} 
                                            dot={{r: 4, fill: '#0d9488', strokeWidth: 2, stroke: '#fff'}} 
                                            activeDot={{r: 6}}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                             </div>
                         </div>
                     )}

                     <h2 className="text-xl font-bold text-slate-900">Recent Reports</h2>
                     
                     {results.length === 0 ? (
                        <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center border-dashed">
                            <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                                <FileText size={32} />
                            </div>
                            <h3 className="text-lg font-medium text-slate-900 mb-2">No results yet</h3>
                            <p className="text-slate-500 mb-6">Start your journey of self-discovery today.</p>
                            <Link to="/tests">
                                <Button>Browse Catalog</Button>
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {results.map(res => {
                                const test = TESTS.find(t => t.id === res.testId);
                                return (
                                    <div key={res.id} className="bg-white p-5 rounded-xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between hover:border-brand-300 transition-colors group">
                                        <div className="flex items-start gap-4 mb-4 md:mb-0">
                                            <img src={test?.imageUrl} className="w-16 h-16 rounded-lg object-cover bg-slate-100 hidden sm:block" alt="" />
                                            <div>
                                                <h4 className="font-bold text-slate-900 group-hover:text-brand-700 transition-colors">{test?.title || 'Unknown Test'}</h4>
                                                <div className="flex gap-4 text-sm text-slate-500 mt-1">
                                                    <span className="flex items-center gap-1"><Calendar size={14} /> {new Date(res.date).toLocaleDateString()}</span>
                                                </div>
                                                <div className="mt-2 inline-block bg-slate-100 px-2 py-0.5 rounded text-xs font-semibold text-slate-700">
                                                    Result: {res.interpretation}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex gap-3">
                                            <Link to={`/report/${res.id}`}>
                                                <Button variant="secondary" size="sm">View Report</Button>
                                            </Link>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Sidebar: Recommendations */}
                <div className="space-y-6">
                    <div className="bg-brand-900 text-white p-6 rounded-2xl relative overflow-hidden">
                        <div className="relative z-10">
                            <h3 className="font-bold text-lg mb-2">Premium Member</h3>
                            <p className="text-brand-200 text-sm mb-4">Unlock unlimited tests and advanced reports.</p>
                            <Button size="sm" className="bg-white text-brand-900 hover:bg-brand-50">Upgrade Now</Button>
                        </div>
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-brand-800 rounded-full blur-3xl opacity-50"></div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                        <h3 className="font-bold text-slate-900 mb-4">Recommended for You</h3>
                        <ul className="space-y-4">
                            {TESTS.slice(0,3).map(t => (
                                <li key={t.id} className="flex gap-3 items-start">
                                    <div className="mt-1 text-brand-500"><TrendingUp size={16} /></div>
                                    <div>
                                        <Link to={`/test/${t.id}`} className="text-sm font-medium text-slate-800 hover:text-brand-600 block">
                                            {t.title}
                                        </Link>
                                        <span className="text-xs text-slate-500">{t.category}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    </div>
  );
};

export default Dashboard;
