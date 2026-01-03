import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getResult } from '../services/testService';
import { TestResult, Test } from '../types';
import { TESTS, PHQ9_THRESHOLDS, GAD7_THRESHOLDS } from '../constants';
import Button from '../components/Button';
import { Printer, Share2, AlertTriangle, ArrowLeft, CheckCircle, Target } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';

const Report: React.FC = () => {
  const { resultId } = useParams<{ resultId: string }>();
  const [result, setResult] = useState<TestResult | undefined>(undefined);
  const [test, setTest] = useState<Test | undefined>(undefined);

  useEffect(() => {
    if (resultId) {
      const res = getResult(resultId);
      if (res) {
        setResult(res);
        setTest(TESTS.find(t => t.id === res.testId));
      }
    }
  }, [resultId]);

  if (!result || !test) return <div className="p-12 text-center">Loading Report...</div>;

  const rawScore = result.rawScores['total'];
  
  // Crisis Logic check
  let isCrisis = false;
  if (test.id === 'phq9' && rawScore >= 20) isCrisis = true;

  // Chart Logic
  let chartContent = null;
  const isTypology = test.scoringMethod === 'typology';
  
  if (isTypology || Object.keys(result.rawScores).length > 2) {
      // Radar or Bar chart for Multi-trait
      // Filter out 'total'
      const data = Object.keys(result.rawScores)
        .filter(k => k !== 'total')
        .map(key => ({
            subject: key,
            A: result.rawScores[key],
            fullMark: 100 // Scale might differ, strictly speaking
        }));
      
      chartContent = (
        <div className="h-80 w-full">
             <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} layout="vertical" margin={{ left: 40 }}>
                    <XAxis type="number" hide />
                    <YAxis dataKey="subject" type="category" width={100} tick={{fontSize: 12}} />
                    <Tooltip cursor={{fill: '#f8fafc'}} />
                    <Bar dataKey="A" fill="#0d9488" radius={[0, 4, 4, 0]} barSize={20}>
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.subject === result.interpretation.split(': ')[1] ? '#0f766e' : '#2dd4bf'} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
            <p className="text-center text-xs text-slate-500 mt-2">Trait Breakdown</p>
        </div>
      );
  } else {
     // Gauge style or simple bar
     // Since Recharts doesn't do gauges easily, we use a single bar against max
     const maxScore = test.questionCount * 3; // Approx max for Likert 0-3
     const percentage = (rawScore / maxScore) * 100;
     
     chartContent = (
         <div className="py-8">
             <div className="flex justify-between text-sm font-medium text-slate-600 mb-2">
                 <span>Score: {rawScore}</span>
                 <span>Max: {maxScore}</span>
             </div>
             <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden">
                 <div 
                    className="h-full bg-gradient-to-r from-brand-400 to-brand-600" 
                    style={{width: `${Math.min(percentage, 100)}%`}}
                 ></div>
             </div>
         </div>
     );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8 print:bg-white print:py-0">
      <div className="max-w-4xl mx-auto px-4 mb-6 flex justify-between items-center no-print">
        <Link to="/dashboard" className="text-slate-500 hover:text-brand-700 flex items-center gap-2">
            <ArrowLeft size={16} /> Back to Profile
        </Link>
        <div className="flex gap-2">
            <Button variant="outline" onClick={handlePrint}>
                <Printer size={16} className="mr-2" /> Save PDF
            </Button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto bg-white shadow-xl print:shadow-none md:rounded-3xl overflow-hidden border border-slate-200">
        
        {/* Header */}
        <div className="bg-brand-900 text-white p-10 print:bg-white print:text-black print:border-b-2 print:border-slate-900 relative overflow-hidden">
            <div className="relative z-10">
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Confidential Report</h1>
                        <p className="opacity-80 text-lg">{test.title}</p>
                    </div>
                    <div className="text-right text-sm opacity-70">
                        <p>{new Date(result.date).toLocaleDateString()}</p>
                        <p className="font-mono text-xs mt-1">ID: {result.id}</p>
                    </div>
                </div>
            </div>
            {/* Decor */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
        </div>

        {/* Crisis Warning */}
        {isCrisis && (
            <div className="bg-red-50 border-l-4 border-red-600 p-6 m-8 mb-0 rounded-r-lg">
                <div className="flex items-start gap-4">
                    <AlertTriangle className="text-red-600 shrink-0" size={24} />
                    <div>
                        <h3 className="text-red-800 font-bold text-lg">Clinical Note</h3>
                        <p className="text-red-700 mt-1 leading-relaxed">
                            Your responses indicate a significant level of distress. While this is not a diagnosis, we strongly recommend sharing this report with a healthcare professional.
                        </p>
                    </div>
                </div>
            </div>
        )}

        <div className="p-10 space-y-12">
            
            {/* Primary Result */}
            <section className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Assessment Result</h2>
                    <div className="text-4xl font-extrabold text-brand-700 mb-6">{result.interpretation}</div>
                    <div className="prose prose-slate">
                        <p className="text-lg text-slate-600 leading-relaxed">
                            Based on your answers, your profile aligns with <strong>{result.interpretation}</strong>. 
                            This suggests specific patterns in how you approach {test.category.toLowerCase()}.
                        </p>
                    </div>
                </div>
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                    <h3 className="text-sm font-bold text-slate-900 mb-4 text-center">Score Visualization</h3>
                    {chartContent}
                </div>
            </section>

            {/* Detailed Analysis */}
            <section className="print:break-inside-avoid">
                <div className="grid md:grid-cols-2 gap-6">
                     <div className="bg-green-50/50 p-6 rounded-2xl border border-green-100">
                         <div className="flex items-center gap-2 mb-4 text-green-800 font-bold">
                             <CheckCircle size={20} /> Potential Strengths
                         </div>
                         <ul className="space-y-3 text-slate-700 text-sm">
                             <li>• Your awareness of these traits is the first step to growth.</li>
                             <li>• You took the time to reflect, showing commitment to self-improvement.</li>
                             <li>• (Dynamic content based on score would appear here).</li>
                         </ul>
                     </div>
                     <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
                         <div className="flex items-center gap-2 mb-4 text-blue-800 font-bold">
                             <Target size={20} /> Areas for Growth
                         </div>
                         <ul className="space-y-3 text-slate-700 text-sm">
                             <li>• Consider monitoring how these traits affect your daily relationships.</li>
                             <li>• Look for patterns in times of high stress.</li>
                             <li>• (Dynamic content based on score would appear here).</li>
                         </ul>
                     </div>
                </div>
            </section>

             {/* Methodology */}
             <section className="border-t border-slate-100 pt-8 print:break-inside-avoid text-center md:text-left">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">Scientific Basis</h4>
                <p className="text-sm text-slate-500">
                    {test.researchCitation}
                </p>
                <div className="mt-8 p-4 bg-slate-50 text-xs text-slate-400 rounded-lg text-center leading-relaxed">
                    DISCLAIMER: This analysis is for educational purposes only. It is computer-generated based on self-reported data. 
                    It is not a substitute for professional clinical diagnosis or therapy.
                </div>
            </section>

        </div>
        
        <div className="bg-slate-50 p-6 text-center border-t border-slate-200">
            <p className="text-brand-900 font-bold text-sm">Braincraft</p>
            <p className="text-slate-400 text-xs">www.braincraft.app</p>
        </div>
      </div>
    </div>
  );
};

export default Report;
