import React, { useState } from 'react';
import { TESTS } from '../constants';
import TestCard from '../components/TestCard';
import { TestCategory } from '../types';
import { Filter } from 'lucide-react';

const Catalog: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  
  const categories = ['All', ...Object.values(TestCategory)];

  const filteredTests = activeCategory === 'All' 
    ? TESTS 
    : TESTS.filter(t => t.category === activeCategory);

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
            <div>
                <h1 className="text-3xl font-bold text-slate-900">Assessment Catalog</h1>
                <p className="text-slate-600 mt-2">Explore our library of research-backed psychological tests.</p>
            </div>
            
            {/* Filter */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
                <span className="text-slate-500 text-sm flex items-center gap-1 mr-2">
                    <Filter size={14} /> Filter:
                </span>
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                            activeCategory === cat 
                            ? 'bg-brand-600 text-white shadow-md shadow-brand-500/20' 
                            : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTests.map(test => (
                <TestCard key={test.id} test={test} />
            ))}
        </div>

        {filteredTests.length === 0 && (
            <div className="text-center py-20">
                <p className="text-slate-500">No tests found in this category.</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default Catalog;