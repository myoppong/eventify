// src/pages/Register.jsx
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import InputField from '../components/ui/Input';
import SelectField from '../components/ui/Select';
import Button from '../components/ui/Button';

function Register() {
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();
  const navigate = useNavigate();
  const password = watch('password');

  const onSubmit = async (data) => {
    console.log('form payload:', data);
    try {
      await api.post('/register', data);
      navigate('/login');
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <InputField
          label="Username"
          {...register('username', { required: 'Username is required' })}
          error={errors.username?.message}
        />

        <InputField
          label="Phone"
          {...register('phone', { required: 'Phone number is required' })}
          error={errors.phone?.message}
        />

        <InputField
          label="Email"
          type="email"
          {...register('email', { required: 'Email is required' })}
          error={errors.email?.message}
        />

        <InputField
          label="Password"
          type="password"
          {...register('password', { required: 'Password is required' })}
          error={errors.password?.message}
        />

        <InputField
          label="Confirm Password"
          type="password"
          {...register('confirmPassword', {
            required: 'Please confirm your password',
            validate: (value) =>
              value === password || 'Passwords do not match'
          })}
          error={errors.confirmPassword?.message}
        />

        {/* Controller for Role */}
        <Controller
          name="role"
          control={control}
          rules={{ required: 'Role is required' }}
          render={({ field }) => (
            <SelectField
              label="Role"
              options={[
                { value: 'attendee', label: 'Attendee' },
                { value: 'organizer', label: 'Organizer' }
              ]}
              error={errors.role?.message}
              {...field} // includes name, value, onChange, onBlur, ref
            />
          )}
        />

        <Button type="submit">Register</Button>
      </form>
      <p className="mt-4 text-sm">
        Already have an account?{' '}
        <Link to="/login" className="text-blue-600">
          Sign in
        </Link>
      </p>
    </div>
  );
}

export default Register;
