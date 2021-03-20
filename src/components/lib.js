function FullPageErrorFallback({ error }) {
  return (
    <div
      role="alert"
      className="text-red-500 h-full flex flex-col justify-center items-center mt-8"
    >
      <p>Uh oh... There's a problem. Try refreshing the app.</p>
      <pre>{error.message}</pre>
    </div>
  );
}

export { FullPageErrorFallback };
