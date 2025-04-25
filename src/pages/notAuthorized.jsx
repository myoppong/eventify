// pages/NotAuthorized.jsx
import { useNavigate } from "react-router-dom";

export default function NotAuthorized() {
  const navigate = useNavigate();
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1> Not Authorized</h1>
      <p>You don't have permission to view this page.</p>
      <button onClick={() => navigate(-1)} style={{ marginTop: "1rem" }}>
        Go Back
      </button>
    </div>
  );
}
