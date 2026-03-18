export default function ValidationErrorsMessage({ validationErrors }) {
  return (
    <ul>
      {validationErrors.map((error, index) => (
        <li key={index}>{error.msg}</li>
      ))}
    </ul>
  );
}
