import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center w-full">
          <h1 className="w-full text-4xl font-bold bg-clip-text text-transparent bg-blue-500 sm:text-5xl md:text-6xl text-center tracking-tight">
            My Contract App
          </h1>
          <p className="mt-4 text-xl text-gray-600 text-center max-w-2xl">
            Create and manage your contracts with ease
          </p>
          <div className="mt-12 w-full max-w-md">
            <div className="rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Link
                to="/contract"
                className="w-full flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-white bg-blue-500 transform hover:scale-[1.02] transition-all duration-200 md:py-5 md:text-xl md:px-12"
              >
                <span className="text-white">View Contract</span>
                <svg
                  className="ml-2 h-5 w-5"
                  fill="none"
                  stroke="white"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
