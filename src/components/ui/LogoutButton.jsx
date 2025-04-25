import { logout } from '../../utils/authHelpers'; // Ensure the logout function is imported from the utility
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout(); // Call the logout utility function
      navigate('/login'); // Redirect to login page after logging out
    } catch (error) {
      console.error('Error during logout', error);
      alert('Logout failed');
    }
  };

  return (
    <button onClick={handleLogout} className="text-red-600 font-semibold">
      Logout
    </button>
  );
};

export default LogoutButton;
