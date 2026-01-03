import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import Button from '../components/Button';
import { Brain } from 'lucide-react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const { login } = useUser();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      login(email);
      navigate(-1); // Go back to previous page
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-slate-100">
        <div className="text-center mb-8">
           <div className="inline-block bg-brand-600 text-white p-2 rounded-xl mb-4">
             <Brain size={32} />
           </div>
           <h2 className="text-2xl font-bold text-slate-900">Welcome back</h2>
           <p className="text-slate-500 mt-2">Enter your email to access your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email address</label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <Button fullWidth type="submit" size="lg">Sign In</Button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
             <p className="text-xs text-slate-400">
                 For this demo, enter any email. Try <strong>admin@braincraft.com</strong> for admin features.
             </p>
        </div>
      </div>
    </div>
  );
};

export default Login;