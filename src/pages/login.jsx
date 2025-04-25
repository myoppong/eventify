// src/pages/Login.jsx
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import InputField from '../components/ui/Input';
import Button from '../components/ui/Button';
import { saveToken } from '../utils/authHelpers';

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async ({ contact, password }) => {
    // Determine which identifier to send
    let payload;
    if (contact.includes('@')) {
      payload = { email: contact, password };
    } else if (/^\d+$/.test(contact)) {
      payload = { phone: contact, password };
    } else {
      payload = { username: contact, password };
    }

    try {
      const res = await api.post('/login', payload);
      saveToken(res.data.accessToken);
      navigate('/organizer/dashboard');
    } catch (err) {
      console.error('Login error payload:', err.response?.data);
      alert(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <InputField
          id="contact"
          label="Username / Email / Phone"
          {...register('contact', { required: 'This field is required' })}
          error={errors.contact?.message}
        />
        <InputField
          id="password"
          label="Password"
          type="password"
          {...register('password', { required: 'Password is required' })}
          error={errors.password?.message}
        />
        <Button type="submit">Login</Button>
      </form>
      <p className="mt-4 text-sm">
        Don&apos;t have an account?{' '}
        <Link to="/register" className="text-blue-600">
          Sign up
        </Link>
      </p>
    </div>
  );
}

export default Login;
