import PropTypes from "prop-types";

export const Error = ({ message }) => {
  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col items-center justify-center gap-4">
      <div className="text-red-500 text-xl font-semibold">Error: {message}</div>
    </div>
  );
};

Error.propTypes = {
  message: PropTypes.string.isRequired,
};
