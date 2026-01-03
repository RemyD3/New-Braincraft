
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TESTS } from '../constants';
import Button from '../components/Button';
import { calculateScore, saveResult } from '../services/testService';
import { useUser } from '../context/UserContext';
import { ChevronRight, ChevronLeft, Check, Clock, AlertCircle, RefreshCw, Zap, Eye, EyeOff } from 'lucide-react';
import { Question } from '../types';

const TestRunner: React.FC = () => {
  const { testId } = useParams<{ testId: string }>();
  const navigate = useNavigate();
  const { user } = useUser();
  
  const test = TESTS.find(t => t.id === testId);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isStarted, setIsStarted] = useState(false);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (!test) return;
    window.scrollTo(0, 0);
  }, [test]);

  if (!test) return <div className="p-8 text-center">Test not found</div>;

  const currentQuestion = test.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex) / test.questions.length) * 100;

  const handleStart = () => {
    if (!user) {
        navigate('/login');
        return;
    }
    setIsStarted(true);
  };

  const changeQuestion = (newIndex: number) => {
      setAnimating(true);
      setTimeout(() => {
          setCurrentQuestionIndex(newIndex);
          setAnimating(false);
      }, 300); 
  };

  const handleAnswer = (value: number) => {
    if (!currentQuestion) return;

    setAnswers(prev => ({ ...prev, [currentQuestion.id]: value }));
    
    // Auto advance mostly for likert/choice
    if ((currentQuestion.type === 'likert' || currentQuestion.type === 'binary' || currentQuestion.type === 'multiple_choice') && currentQuestionIndex < test.questions.length - 1) {
        setDirection('next');
        setTimeout(() => {
            changeQuestion(currentQuestionIndex + 1);
        }, 250);
    }
  };

  const handleNext = () => {
      if (currentQuestionIndex < test.questions.length - 1) {
          setDirection('next');
          changeQuestion(currentQuestionIndex + 1);
      }
  };

  const handlePrev = () => {
      if (currentQuestionIndex > 0) {
          setDirection('prev');
          changeQuestion(currentQuestionIndex - 1);
      }
  };

  const handleSubmit = () => {
      const result = calculateScore(test, answers);
      saveResult(result);
      navigate(`/report/${result.id}`);
  };

  // Keyboard navigation for Likert/Choice only
  useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
          if (!isStarted) return;
          // Prevent auto-skipping on interactive tests
          const isInteractive = ['pattern_memory', 'reaction_time', 'slider'].includes(currentQuestion?.type || '');
          if (isInteractive) return;

          if (e.key === 'ArrowRight' && answers[currentQuestion?.id] !== undefined) handleNext();
          if (e.key === 'ArrowLeft') handlePrev();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isStarted, answers, currentQuestionIndex, currentQuestion]);

  if (!isStarted) {
      return (
          <div className="max-w-4xl mx-auto px-4 py-12 md:py-20">
              <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden flex flex-col md:flex-row">
                  <div className="md:w-1/2 h-64 md:h-auto relative">
                      <img src={test.imageUrl} className="w-full h-full object-cover" alt={test.title} />
                      <div className="absolute inset-0 bg-brand-900/30"></div>
                  </div>
                  <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                      <div className="inline-flex items-center gap-2 text-brand-600 font-bold tracking-wide uppercase text-xs mb-4">
                          <span className="bg-brand-50 px-2 py-1 rounded">{test.category}</span>
                      </div>
                      <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{test.title}</h1>
                      
                      {/* Updated Description Rendering */}
                      <div className="text-slate-600 mb-8 leading-relaxed whitespace-pre-wrap text-sm md:text-base space-y-4 border-l-4 border-brand-200 pl-4">
                        {test.fullDescription}
                      </div>

                      <div className="flex flex-wrap gap-4 text-sm text-slate-500 mb-8">
                          <div className="flex items-center gap-1"><Clock size={16} /> {test.durationMinutes} min</div>
                          <div className="flex items-center gap-1"><AlertCircle size={16} /> {test.questionCount} Tasks</div>
                      </div>
                      <div className="mt-auto">
                           <Button size="lg" fullWidth onClick={handleStart} className="shadow-lg shadow-brand-500/30">
                              Start Assessment
                          </Button>
                          <p className="text-center text-xs text-slate-400 mt-4">
                             {user?.isFirstTestFree ? 'Your first test is free.' : `$${test.price} to unlock full report.`}
                          </p>
                      </div>
                  </div>
              </div>
          </div>
      );
  }

  // Defensive check for currentQuestion right before rendering its content
  if (!currentQuestion) {
    console.error("Critical Error: currentQuestion is undefined. Test ID:", testId, "Index:", currentQuestionIndex, "Questions length:", test.questions.length);
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8">
        <AlertCircle size={48} className="text-red-500 mb-4" />
        <h2 className="text-2xl font-bold text-slate-900 mb-2">An unexpected error occurred.</h2>
        <p className="text-slate-600 mb-6">It seems the current question data could not be loaded. Please try again or choose another test.</p>
        <div className="flex gap-4">
          <Button onClick={() => window.location.reload()} variant="primary">Restart Test</Button>
          <Button onClick={() => navigate('/tests')} variant="outline">Back to Catalog</Button>
        </div>
      </div>
    );
  }

  const slideClass = animating 
    ? (direction === 'next' ? '-translate-x-full opacity-0' : 'translate-x-full opacity-0')
    : 'translate-x-0 opacity-100';

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 min-h-screen flex flex-col">
        <div className="mb-10">
            <div className="flex justify-between items-end mb-4">
                <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Question {currentQuestionIndex + 1}/{test.questions.length}</h2>
                <button onClick={() => navigate('/tests')} className="text-slate-400 hover:text-red-500 text-sm font-medium transition-colors">Exit</button>
            </div>
            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <div 
                    className="h-full bg-brand-600 transition-all duration-500 ease-out" 
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
        </div>

        <div className="flex-1 relative overflow-hidden min-h-[400px]">
             <div className={`transition-all duration-300 transform ease-in-out ${slideClass}`}>
                <h3 className="text-2xl md:text-3xl font-medium text-slate-900 mb-10 leading-snug">
                    {currentQuestion.text}
                </h3>

                {/* Render Logic based on Question Type */}
                <QuestionRenderer 
                    key={currentQuestion.id} // Forces reset of internal state on change
                    question={currentQuestion} 
                    currentAnswer={answers[currentQuestion.id]} 
                    onAnswer={handleAnswer} 
                />
             </div>
        </div>

        <div className="mt-8 flex justify-between items-center pt-8 border-t border-slate-100">
             <Button 
                variant="outline" 
                onClick={handlePrev} 
                disabled={currentQuestionIndex === 0}
                className="text-slate-400 hover:text-slate-600 border-transparent hover:bg-slate-50"
             >
                <ChevronLeft size={20} className="mr-1" /> Previous
             </Button>

            {currentQuestionIndex === test.questions.length - 1 ? (
                <Button 
                    onClick={handleSubmit} 
                    disabled={answers[currentQuestion.id] === undefined} // Ensure there's an answer for the last question
                    className="px-8 shadow-xl shadow-brand-500/20"
                >
                    Complete Assessment
                </Button>
            ) : (
                <Button 
                    onClick={handleNext}
                    disabled={answers[currentQuestion.id] === undefined} // Ensure there's an answer before going next
                >
                    Next <ChevronRight size={20} className="ml-1" />
                </Button>
            )}
        </div>
    </div>
  );
};

// --- Sub-components for interactive questions ---

const QuestionRenderer: React.FC<{
    question: Question;
    currentAnswer: number | undefined;
    onAnswer: (val: number) => void;
}> = ({ question, currentAnswer, onAnswer }) => {

    // Slider Type
    if (question.type === 'slider') {
        return (
            <div className="py-8 px-4 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="flex justify-between text-slate-500 text-sm mb-8 font-medium">
                    <span>{question.minLabel || 'Low'}</span>
                    <span>{question.maxLabel || 'High'}</span>
                </div>
                <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-600"
                    value={currentAnswer ?? 50}
                    onChange={(e) => onAnswer(parseInt(e.target.value))}
                />
                <div className="text-center mt-6 text-2xl font-bold text-brand-700">
                    {currentAnswer ?? 50}
                </div>
            </div>
        );
    }

    // Pattern Memory Type
    if (question.type === 'pattern_memory') {
        const size = question.gridSize || 3;
        const correctPattern = question.patternSequence || [];
        const [stage, setStage] = useState<'memorize' | 'recall' | 'result'>('memorize');
        const [userSelection, setUserSelection] = useState<number[]>([]);
        const [timeLeft, setTimeLeft] = useState(2); // 2 seconds to memorize

        useEffect(() => {
            if (stage === 'memorize') {
                const timer = setInterval(() => {
                    setTimeLeft((prev) => {
                        if (prev <= 1) {
                            clearInterval(timer);
                            setStage('recall');
                            return 0;
                        }
                        return prev - 1;
                    });
                }, 1000);
                return () => clearInterval(timer);
            }
        }, [stage]);

        const toggleCell = (index: number) => {
            if (stage !== 'recall') return;
            const newSel = userSelection.includes(index) 
                ? userSelection.filter(i => i !== index)
                : [...userSelection, index];
            setUserSelection(newSel);

            // Check if done (selection matches length)
            if (newSel.length === correctPattern.length) {
                // Determine correctness immediately for simple UX
                // Sort both to compare
                const sortedSel = [...newSel].sort();
                const sortedCorr = [...correctPattern].sort();
                const isCorrect = JSON.stringify(sortedSel) === JSON.stringify(sortedCorr);
                onAnswer(isCorrect ? 1 : 0); // 1 = Pass, 0 = Fail
                // Optional: Show feedback
            }
        };

        return (
            <div className="flex flex-col items-center">
                <div className="mb-4 font-medium text-brand-600 flex items-center gap-2">
                    {stage === 'memorize' && <><Eye size={20} /> Memorize Pattern ({timeLeft}s)</>}
                    {stage === 'recall' && <><EyeOff size={20} /> Reproduce Pattern</>}
                </div>
                
                <div 
                    className="grid gap-2 bg-slate-200 p-2 rounded-xl"
                    style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}
                >
                    {Array.from({ length: size * size }).map((_, idx) => {
                        const isHighlighted = stage === 'memorize' ? correctPattern.includes(idx) : userSelection.includes(idx);
                        return (
                            <button
                                key={idx}
                                onClick={() => toggleCell(idx)}
                                disabled={stage !== 'recall'}
                                className={`w-20 h-20 rounded-lg transition-all duration-200 ${
                                    isHighlighted 
                                        ? 'bg-brand-500 shadow-inner' 
                                        : 'bg-white hover:bg-slate-50'
                                }`}
                            />
                        );
                    })}
                </div>
                <div className="mt-4 text-sm text-slate-400">
                    {stage === 'recall' ? `Select ${correctPattern.length} blocks` : 'Wait...'}
                </div>
            </div>
        );
    }

    // Reaction Time Type
    if (question.type === 'reaction_time') {
        const [status, setStatus] = useState<'idle' | 'waiting' | 'ready' | 'clicked'>('idle');
        const [ms, setMs] = useState<number | null>(null);
        const startTimeRef = useRef<number>(0);
        const timeoutRef = useRef<any>(null);

        const startTest = () => {
            setStatus('waiting');
            setMs(null);
            // Random delay between 2-5s
            const delay = 2000 + Math.random() * 3000;
            timeoutRef.current = setTimeout(() => {
                setStatus('ready');
                startTimeRef.current = performance.now();
            }, delay);
        };

        const handleClick = () => {
            if (status === 'waiting') {
                // Too early
                clearTimeout(timeoutRef.current);
                setStatus('idle');
                alert("Too early! Wait for green.");
            } else if (status === 'ready') {
                const end = performance.now();
                const diff = Math.round(end - startTimeRef.current);
                setMs(diff);
                setStatus('clicked');
                onAnswer(diff);
            }
        };

        useEffect(() => {
            return () => clearTimeout(timeoutRef.current);
        }, []);

        return (
            <div className="flex flex-col items-center justify-center min-h-[300px]">
                {status === 'idle' && (
                    <Button size="lg" onClick={startTest} className="h-32 w-32 rounded-full text-lg">Start</Button>
                )}
                {status === 'waiting' && (
                    <div 
                        onMouseDown={handleClick}
                        className="w-full h-64 bg-slate-100 rounded-3xl flex items-center justify-center cursor-pointer border-4 border-slate-200"
                    >
                        <span className="text-slate-400 font-bold text-xl uppercase tracking-widest">Wait for Green...</span>
                    </div>
                )}
                {status === 'ready' && (
                     <div 
                        onMouseDown={handleClick}
                        className="w-full h-64 bg-green-500 rounded-3xl flex items-center justify-center cursor-pointer animate-pulse shadow-lg shadow-green-500/50"
                     >
                        <span className="text-white font-bold text-3xl uppercase tracking-widest flex items-center gap-2"><Zap /> CLICK NOW!</span>
                    </div>
                )}
                {status === 'clicked' && (
                    <div className="text-center">
                        <div className="text-6xl font-black text-slate-900 mb-2">{ms} ms</div>
                        <p className="text-slate-500 mb-6">Reaction Time</p>
                        <Button variant="outline" onClick={startTest} className="gap-2"><RefreshCw size={16}/> Try Again</Button>
                    </div>
                )}
            </div>
        );
    }

    // Fallback to Standard Options (Likert / MC)
    return (
        <div className="grid gap-3">
            {question.options?.map((opt, idx) => {
                const isSelected = currentAnswer === opt.value;
                return (
                    <button
                        key={idx}
                        onClick={() => onAnswer(opt.value)}
                        className={`
                            w-full text-left p-5 rounded-2xl border-2 transition-all duration-200 flex items-center justify-between group
                            ${isSelected 
                                ? 'border-brand-500 bg-brand-50 shadow-md transform scale-[1.01]' 
                                : 'border-slate-100 bg-white hover:border-brand-200 hover:bg-slate-50 hover:shadow-sm'
                            }
                        `}
                    >
                        <span className={`font-medium text-lg ${isSelected ? 'text-brand-900' : 'text-slate-600'}`}>
                            {opt.label}
                        </span>
                        {isSelected && (
                            <span className="bg-brand-500 text-white rounded-full p-1">
                                <Check size={16} />
                            </span>
                        )}
                    </button>
                )
            })}
        </div>
    );
};

export default TestRunner;