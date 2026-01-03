import React from 'react';
import { Test } from '../types';
import { Link } from 'react-router-dom';
import { Clock, CheckCircle } from 'lucide-react';
import Button from './Button';

interface TestCardProps {
  test: Test;
}

const TestCard: React.FC<TestCardProps> = ({ test }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col h-full">
      <div className="h-40 bg-slate-200 overflow-hidden relative">
        <img src={test.imageUrl} alt={test.title} className="w-full h-full object-cover" />
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold text-brand-800 uppercase tracking-wide">
          {test.category}
        </div>
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-bold text-slate-900 mb-2">{test.title}</h3>
        <p className="text-slate-600 text-sm mb-4 flex-1">{test.shortDescription}</p>
        
        <div className="flex items-center gap-4 text-xs text-slate-500 mb-6">
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{test.durationMinutes} min</span>
          </div>
          <div className="flex items-center gap-1 text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
            <CheckCircle size={14} />
            <span>Validated</span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-auto">
            <div className="text-sm font-semibold text-slate-900">
               {test.price === 0 ? 'Free' : `$${test.price}`}
            </div>
            <Link to={`/test/${test.id}`}>
                <Button variant="secondary" size="sm">
                    View Details
                </Button>
            </Link>
        </div>
      </div>
    </div>
  );
};

export default TestCard;