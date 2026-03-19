import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/shopsmart/');
  };

  return (
    <div className="min-h-screen bg-white font-sans text-neutral-900 antialiased flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-[2rem] border border-neutral-100 shadow-sm">
        <div className="text-center" data-testid="navbar">
          <Link to="/shopsmart/" data-testid="logo" className="text-2xl font-black tracking-tighter text-neutral-950 uppercase inline-block mb-8">
            SHOPSMART
          </Link>
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900">Create Account</h2>
          <p className="mt-2 text-neutral-500">Join our community today</p>
        </div>

        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1">Full Name</label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              className="w-full px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-200 focus:outline-none focus:border-neutral-900 transition-colors"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              data-testid="email-input"
              required
              className="w-full px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-200 focus:outline-none focus:border-neutral-900 transition-colors"
              placeholder="john@example.com"
            />
          </div>
          <div>
            <label htmlFor="password" name="password-label" className="block text-sm font-medium text-neutral-700 mb-1">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              data-testid="password-input"
              required
              className="w-full px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-200 focus:outline-none focus:border-neutral-900 transition-colors"
              placeholder="••••••••"
            />
          </div>
          <div>
            <label htmlFor="confirm-password" name="confirm-password-label" className="block text-sm font-medium text-neutral-700 mb-1">Confirm Password</label>
            <input
              id="confirm-password"
              name="confirm-password"
              type="password"
              autoComplete="new-password"
              required
              className="w-full px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-200 focus:outline-none focus:border-neutral-900 transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            data-testid="submit-button"
            className="w-full flex justify-center py-4 px-4 border border-transparent rounded-full shadow-lg shadow-neutral-900/10 text-sm font-bold text-white bg-neutral-900 hover:bg-neutral-800 focus:outline-none transition-all transform hover:scale-[1.02] mt-4"
          >
            Create Account
          </button>

          <div className="text-center mt-6">
            <p className="text-sm text-neutral-500">
              Already have an account?{' '}
              <Link to="/shopsmart/login/" data-testid="login-link" className="font-bold text-neutral-900 hover:text-neutral-700 transition-colors underline decoration-2 underline-offset-4">
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
