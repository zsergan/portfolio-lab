import { Link, useRouteError } from 'react-router';

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return 'Something went wrong.';
}

export function RouteError() {
  const error = useRouteError();

  return (
    <div>
      <h2>Something went wrong</h2>
      <p>{getErrorMessage(error)}</p>
      <p>
        <Link to="/">Back home</Link>
      </p>
    </div>
  );
}
