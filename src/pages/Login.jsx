import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../context/ToastContext';

const Login = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simular login
      await new Promise((resolve) => setTimeout(resolve, 1000));
      showToast('Login successful!', 'success');
      navigate('/');
    } catch (error) {
      console.error(error);
      showToast('Invalid credentials', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-md">
        <h1 className="mb-8 text-center text-3xl font-bold">Login</h1>

        <form
          onSubmit={handleSubmit}
          className="rounded-lg bg-white p-6 shadow-lg"
        >
          <div className="mb-4">
            <label className="mb-2 block font-bold text-gray-700">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 p-2 focus:border-[#495E57] focus:outline-none"
            />
          </div>

          <div className="mb-6">
            <label className="mb-2 block font-bold text-gray-700">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 p-2 focus:border-[#495E57] focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-[#495E57] px-6 py-3 font-bold text-white transition-all hover:bg-[#3e504a] disabled:bg-gray-400"
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>

          <div className="mt-4 text-center text-sm text-gray-600">
            <a href="#" className="hover:text-[#495E57]">
              Forgot your password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
