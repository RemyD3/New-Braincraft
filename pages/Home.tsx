import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, FileText, Zap } from 'lucide-react';
import Button from '../components/Button';
import TestCard from '../components/TestCard';
import { TESTS } from '../constants';

const Home: React.FC = () => {
  const featuredTests = TESTS.slice(0, 3);

  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <section className="relative bg-brand-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6 leading-tight">
              Understand yourself with <span className="text-brand-600">validated science</span>.
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl leading-relaxed">
              Braincraft provides professional-grade psychological assessments. 
              Get instant, detailed insights into your personality, mood, and cognition 
              with private, downloadable PDF reports.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/tests">
                <Button size="lg" className="shadow-lg shadow-brand-200">
                  Start Your Free Trial
                </Button>
              </Link>
              <Link to="/tests">
                <Button variant="outline" size="lg" className="bg-white">
                  Explore Catalog
                </Button>
              </Link>
            </div>
            <p className="mt-4 text-sm text-slate-500 flex items-center gap-2">
              <ShieldCheck size={16} className="text-brand-600" />
              <span>First assessment included in Free Trial. No credit card required.</span>
            </p>
          </div>
        </div>
        
        {/* Abstract decoration */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/4 w-[800px] h-[800px] bg-brand-200/50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
      </section>

      {/* Value Props */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-12 text-center">
                <div className="flex flex-col items-center">
                    <div className="bg-blue-50 p-4 rounded-2xl mb-6 text-brand-600">
                        <ShieldCheck size={32} />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Clinically Validated</h3>
                    <p className="text-slate-600">We use the same standard measures used by psychologists and researchers worldwide.</p>
                </div>
                <div className="flex flex-col items-center">
                    <div className="bg-purple-50 p-4 rounded-2xl mb-6 text-purple-600">
                        <FileText size={32} />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Detailed PDF Reports</h3>
                    <p className="text-slate-600">Download comprehensive reports with visualized data, percentiles, and actionable insights.</p>
                </div>
                <div className="flex flex-col items-center">
                    <div className="bg-orange-50 p-4 rounded-2xl mb-6 text-orange-600">
                        <Zap size={32} />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Instant Results</h3>
                    <p className="text-slate-600">No waiting. Get your scored analysis immediately after completing the assessment.</p>
                </div>
            </div>
        </div>
      </section>

      {/* Featured Tests */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Featured Assessments</h2>
              <p className="text-slate-600">Start with our most popular research-backed tests.</p>
            </div>
            <Link to="/tests" className="hidden md:flex items-center text-brand-700 font-semibold hover:text-brand-800">
              View all <ArrowRight size={18} className="ml-2" />
            </Link>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {featuredTests.map(test => (
              <TestCard key={test.id} test={test} />
            ))}
          </div>
          
          <div className="mt-12 text-center md:hidden">
            <Link to="/tests">
               <Button variant="outline">View all tests</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-brand-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold mb-4">How Braincraft Works</h2>
                <p className="text-brand-100 max-w-2xl mx-auto">Simple, scientific, and secure.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 relative">
                {/* Connector Line */}
                <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-brand-800 -z-0 -translate-y-1/2"></div>
                
                {[
                    { step: 1, title: 'Choose a Test', desc: 'Browse our catalog of validated measures for personality, mood, or cognition.' },
                    { step: 2, title: 'Answer Honestly', desc: 'Take 5-10 minutes to answer questions based on your recent experiences.' },
                    { step: 3, title: 'Get Insights', desc: 'Instantly download your personalized PDF report with actionable advice.' }
                ].map((item) => (
                    <div key={item.step} className="relative z-10 bg-brand-900 md:bg-transparent p-4 flex flex-col items-center text-center">
                        <div className="w-12 h-12 bg-accent-500 rounded-full flex items-center justify-center text-white font-bold text-xl mb-6 shadow-lg shadow-accent-500/30">
                            {item.step}
                        </div>
                        <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                        <p className="text-brand-200 text-sm">{item.desc}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>
      
      {/* CTA Footer */}
      <section className="py-24 bg-white text-center">
          <div className="max-w-3xl mx-auto px-4">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Ready to learn more about yourself?</h2>
              <p className="text-lg text-slate-600 mb-8">Join thousands of users who use Braincraft to track their mental wellness and personal growth.</p>
              <Link to="/tests">
                  <Button size="lg" className="shadow-xl shadow-brand-200/50">
                      Start Your Free Trial
                  </Button>
              </Link>
              <p className="mt-6 text-xs text-slate-400">First test is free on us. No credit card required to start.</p>
          </div>
      </section>
    </div>
  );
};

export default Home;