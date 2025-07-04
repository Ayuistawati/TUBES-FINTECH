import { useForm, Controller } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import api from "#/lib/axios";
import CompanyLogo from "../../assets/images/logo.svg";

interface FormData {
  email: string;
  password: string;
}

const Spinner = () => (
  <svg
    className="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2-647z"
    />
  </svg>
);

export default function Login() {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ defaultValues: { email: "", password: "" } });

  const inputStyles =
    "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-100";
  const errorInputStyles = "border-red-500 focus:border-red-500 focus:ring-red-500";
  const labelStyles = "block text-sm font-medium text-gray-700";
  const errorMessageStyles = "mt-1 text-sm text-red-600";

  const onSubmit = async (data: FormData) => {
    try {
      const { data: resp } = await api.post("/auth/login", data);
      const { token, user } = resp;
      localStorage.setItem("authToken", token);
      localStorage.setItem("authUser", JSON.stringify(user));
      toast.success("Login berhasil!");
      navigate("/dashboard/premi", { replace: true });
    } catch (err: any) {
      toast.error(err.response?.data?.message || err.message || "Login gagal.");
    }
  };

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-gray-50 p-4">
      <Toaster position="top-center" />
      <div className="w-full max-w-md rounded-xl bg-white p-10 shadow-lg">
        <div className="mb-8 text-center">
          <img src={CompanyLogo} alt="Company Logo" className="mx-auto mb-4 h-24 w-24" />
          <h1 className="text-4xl font-bold text-green-700">Login</h1>
        </div>
        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <Controller
              name="email"
              control={control}
              rules={{
                required: "Email wajib diisi",
                pattern: { value: /^[^@]+@[^@]+\.[^@]+$/, message: "Email tidak valid" },
              }}
              render={({ field, fieldState }) => (
                <div>
                  <label htmlFor="email" className={labelStyles}>
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    {...field}
                    disabled={isSubmitting}
                    className={`${inputStyles} ${fieldState.error ? errorInputStyles : ""}`}
                  />
                  {fieldState.error && (
                    <p className={errorMessageStyles}>{fieldState.error.message}</p>
                  )}
                </div>
              )}
            />
            <Controller
              name="password"
              control={control}
              rules={{ required: "Password wajib diisi" }}
              render={({ field, fieldState }) => (
                <div>
                  <label htmlFor="password" className={labelStyles}>
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    {...field}
                    disabled={isSubmitting}
                    className={`${inputStyles} ${fieldState.error ? errorInputStyles : ""}`}
                  />
                  {fieldState.error && (
                    <p className={errorMessageStyles}>{fieldState.error.message}</p>
                  )}
                </div>
              )}
            />
          </div>
          <div className="mt-6 flex justify-between gap-2">
            <Link
              to="/"
              className={`w-full text-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 ${
                isSubmitting ? "pointer-events-none opacity-50" : ""
              }`}
            >
              Kembali
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center rounded-md bg-green-700 px-6 py-2 text-base font-medium text-white shadow-sm hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-green-700/60"
            >
              {isSubmitting ? (
                <>
                  <Spinner />
                  <span>Login...</span>
                </>
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
