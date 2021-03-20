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

function CircleButton(props) {
  return (
    <button
      className="flex justify-center items-center h-10 w-10 rounded-full cursor-pointer border border-gray-200"
      {...props}
    />
  );
}

function FormGroup(props) {
  return <div className="flex flex-col" {...props} />;
}

function Input(props) {
  return <input className="px-3 py-2 rounded-sm bg-gray-100" {...props} />;
}

export { FullPageErrorFallback, CircleButton, Input, FormGroup };
