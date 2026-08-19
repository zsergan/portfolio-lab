import { Link } from 'react-router';

export function NotFound() {
  return (
    <div>
      <h2>Page not found</h2>
      <p>
        <Link to="/">Back home</Link>
      </p>
    </div>
  );
}
