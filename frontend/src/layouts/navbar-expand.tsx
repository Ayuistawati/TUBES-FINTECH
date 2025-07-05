
import { useAuth } from "#/context/auth/AuthProvider";
import CompanyLogo from "../assets/images/logo.svg"
export function NavBarExpand() {
   const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
    window.location.href = "/login?loggedOut=true";
  };
  return (
    <div className="flex h-full min-h-screen w-56 flex-col items-center overflow-hidden rounded-r bg-white text-gray-600 shadow-sm dark:border-gray-800 dark:border-r dark:bg-gray-900 dark:text-gray-400">
      <a className="mt-3 gap-2 flex justify-start items-center" href="/dashboard/premi">
        <img src={CompanyLogo} alt="Company Logo" className="w-12" />
        <span className="text-green-700 font-bold text-sm">Agrisure</span>
      </a>
      <div className="w-full px-2">
        <div className="mt-3 flex w-full flex-col items-center border-gray-200 border-t dark:border-gray-700">
          <a
            className="mt-2 flex h-12 w-full items-center rounded px-3 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-300"
            href="/"
          >
            <svg width="24px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5 9H19M15 18V15M9 18H9.01M12 18H12.01M12 15H12.01M9 15H9.01M15 12H15.01M12 12H12.01M9 12H9.01M8.2 21H15.8C16.9201 21 17.4802 21 17.908 20.782C18.2843 20.5903 18.5903 20.2843 18.782 19.908C19 19.4802 19 18.9201 19 17.8V6.2C19 5.0799 19 4.51984 18.782 4.09202C18.5903 3.71569 18.2843 3.40973 17.908 3.21799C17.4802 3 16.9201 3 15.8 3H8.2C7.0799 3 6.51984 3 6.09202 3.21799C5.71569 3.40973 5.40973 3.71569 5.21799 4.09202C5 4.51984 5 5.07989 5 6.2V17.8C5 18.9201 5 19.4802 5.21799 19.908C5.40973 20.2843 5.71569 20.5903 6.09202 20.782C6.51984 21 7.07989 21 8.2 21Z" stroke="#383838" stroke-width="2" stroke-linecap="round" strokeLinejoin="round"></path> </g></svg>
            <span className="ml-2 font-medium text-sm">Hitung Premi</span>
          </a>
        </div>
    
      </div>

      <div className="mt-auto mb-2 w-full px-2">
        <div className="mt-3 flex w-full flex-col items-center border-gray-200 border-t dark:border-gray-700">
          <a
            className="mt-2 flex h-12 w-full items-center rounded px-3 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-300"
            href="/"
          >
            <svg
              className="h-6 w-6 stroke-current"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="ml-2 font-medium text-sm">My Account</span>
          </a>
                 <button
            onClick={logout}
            className="mt-2 flex h-12 w-full items-center bg-red-50 justify-left rounded px-3 text-red-600 hover:bg-red-100 dark:hover:bg-red-700 dark:hover:text-red-400"
          >
            <svg
              className="h-6 w-6 stroke-current"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-9V7"
              />
            </svg>
            <span className="ml-2 font-medium text-sm">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}
