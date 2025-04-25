// src/components/Breadcrumbs.jsx
import { Link, useLocation } from 'react-router-dom';

export default function Breadcrumbs() {
  const { pathname } = useLocation();
  const parts = pathname.split('/').filter(Boolean);

  return (
    <nav className="text-sm mb-4">
      <ol className="list-reset flex text-gray-600">
        <li><Link to="/">Home</Link></li>
        {parts.map((part, idx) => {
          const url = `/${parts.slice(0, idx + 1).join('/')}`;
          return (
            <li key={url} className="flex items-center">
              <span className="mx-2">/</span>
              {idx < parts.length - 1 ? (
                <Link to={url}>{part}</Link>
              ) : (
                <span className="font-semibold">{part}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
