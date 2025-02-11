import PropTypes from "prop-types";

export const LoginForm = ({
  witchers,
  selectedWitcher,
  setSelectedWitcher,
  handleSubmit,
}) => {
  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-8">
            Witcher Login
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="witcher"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Select a Witcher
              </label>
              <div className="flex items-center gap-4">
                <select
                  id="witcher"
                  value={selectedWitcher}
                  onChange={(e) => setSelectedWitcher(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 py-2.5 px-4 shadow-sm text-slate-800 transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none"
                  required
                >
                  <option value="">Choose a witcher...</option>
                  {witchers.map((witcher) => (
                    <option key={witcher.id} value={witcher.id}>
                      {witcher.name}
                    </option>
                  ))}
                </select>
                {selectedWitcher && (
                  <img
                    src={
                      witchers.find((w) => w.id === parseInt(selectedWitcher))
                        ?.avatar
                    }
                    alt="Selected witcher avatar"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                )}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2.5 px-4 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
            >
              Login as Witcher
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

LoginForm.propTypes = {
  witchers: PropTypes.array.isRequired,
  selectedWitcher: PropTypes.string.isRequired,
  setSelectedWitcher: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
