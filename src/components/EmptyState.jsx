export default function EmptyState({ title, message }) {
  return (
    <div className="mt-4" role="alert">
      <strong>{title}</strong> {message}
    </div>
  );
}
