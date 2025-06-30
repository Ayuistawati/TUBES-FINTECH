import { useForm, Controller } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast"; // Replaced useState with react-hot-toast
import api from "#/lib/axios";
import CompanyLogo from "../../assets/images/logo.svg";

// The form data types remain the same
interface RegisterTypes {
  nama: string;
  email: string;
  no_telepon: string;
  provinsi: string;
  kabupaten: string;
  kecamatan: string;
  alamat_lengkap: string;
  password: string;
  konfirmasi_password: string;
  foto_ktp: FileList;
}

// A simple SVG spinner for the loading state on the button
const Spinner = () => (
  <svg
    className="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);

export default function Register() {
  const navigate = useNavigate();
  // The 'apiFeedback' state is no longer needed

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors, isSubmitting },
  } = useForm<RegisterTypes>({
    defaultValues: {
      nama: "",
      email: "",
      no_telepon: "",
      provinsi: "",
      kabupaten: "",
      kecamatan: "",
      alamat_lengkap: "",
      password: "",
      konfirmasi_password: "",
    },
  });

  const password = watch("password");

  const handleRegister = async (data: RegisterTypes) => {
    const formData = new FormData();
    // Simplified FormData population
    Object.entries(data).forEach(([key, value]) => {
      if (key === "foto_ktp") {
        if (value && value.length > 0) {
          formData.append(key, value[0]);
        }
      } else {
        formData.append(key, value);
      }
    });

    try {
      const response = await api.post("/auth/register", formData);
      const result = response.data;
      toast.success(result.message || "Registrasi berhasil! Anda akan dialihkan.");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || "Registrasi gagal.";
      toast.error(errorMessage);
    }
  };

  const inputStyles =
    "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-100";
  const errorInputStyles = "border-red-500 focus:border-red-500 focus:ring-red-500";
  const labelStyles = "block text-sm font-medium text-gray-700";
  const errorMessageStyles = "mt-1 text-sm text-red-600";

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-gray-50 p-4">
      {/* Toaster component will render all toast notifications */}
      <Toaster position="top-center" reverseOrder={false} />

      <div className="w-full max-w-lg rounded-xl bg-white p-10 shadow-lg">
        <div className="mb-8 text-center">
          <img src={CompanyLogo} alt="Company Logo" className="mx-auto mb-4 h-24 w-24" />
          <h1 className="text-4xl font-bold" style={{ color: "#2E7D32" }}>
            Register
          </h1>
        </div>

        {/* The old Alert component is removed from here */}

        <form autoComplete="off" onSubmit={handleSubmit(handleRegister)}>
          <div className="grid gap-y-4">
            {/* --- Nama Lengkap --- */}
            <Controller
              name="nama"
              control={control}
              rules={{ required: "Nama wajib diisi" }}
              render={({ field, fieldState }) => (
                <div>
                  <label htmlFor="nama" className={labelStyles}>
                    Nama Lengkap
                  </label>
                  <input
                    id="nama"
                    type="text"
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

            {/* --- Email --- */}
            <Controller
              name="email"
              control={control}
              rules={{ required: "Email wajib diisi" }}
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

            {/* --- No. Telepon --- */}
            <Controller
              name="no_telepon"
              control={control}
              rules={{ required: "No. Telepon wajib diisi" }}
              render={({ field, fieldState }) => (
                <div>
                  <label htmlFor="no_telepon" className={labelStyles}>
                    No. Telepon
                  </label>
                  <input
                    id="no_telepon"
                    type="tel"
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

            {/* --- Address Fields (Provinsi, Kabupaten, etc.) --- */}
            {/* You can repeat the pattern for all other text fields */}
            <Controller
              name="provinsi"
              control={control}
              rules={{ required: "Provinsi wajib diisi" }}
              render={({ field, fieldState }) => (
                <div>
                  <label htmlFor="provinsi" className={labelStyles}>
                    Provinsi
                  </label>
                  <input
                    id="provinsi"
                    type="text"
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
              name="kabupaten"
              control={control}
              rules={{ required: "Kabupaten wajib diisi" }}
              render={({ field, fieldState }) => (
                <div>
                  <label htmlFor="kabupaten" className={labelStyles}>
                    Kabupaten
                  </label>
                  <input
                    id="kabupaten"
                    type="text"
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
              name="kecamatan"
              control={control}
              rules={{ required: "Kecamatan wajib diisi" }}
              render={({ field, fieldState }) => (
                <div>
                  <label htmlFor="kecamatan" className={labelStyles}>
                    Kecamatan
                  </label>
                  <input
                    id="kecamatan"
                    type="text"
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
              name="alamat_lengkap"
              control={control}
              rules={{ required: "Alamat wajib diisi" }}
              render={({ field, fieldState }) => (
                <div>
                  <label htmlFor="alamat_lengkap" className={labelStyles}>
                    Alamat Lengkap
                  </label>
                  <input
                    id="alamat_lengkap"
                    type="text"
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

            {/* --- Password --- */}
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

            {/* --- Konfirmasi Password --- */}
            <Controller
              name="konfirmasi_password"
              control={control}
              rules={{
                required: "Konfirmasi password wajib diisi",
                validate: (value) => value === password || "Password tidak sama",
              }}
              render={({ field, fieldState }) => (
                <div>
                  <label htmlFor="konfirmasi_password" className={labelStyles}>
                    Konfirmasi Password
                  </label>
                  <input
                    id="konfirmasi_password"
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

            {/* --- Foto KTP --- */}
            <div>
              <label htmlFor="foto_ktp" className={labelStyles}>
                Upload Foto KTP
              </label>
              <input
                id="foto_ktp"
                type="file"
                className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-l-lg file:border-0 file:text-sm file:font-semibold file:bg-gray-200 file:text-gray-700 hover:file:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50"
                {...register("foto_ktp", { required: "Foto KTP wajib diunggah" })}
                disabled={isSubmitting}
                aria-invalid={errors.foto_ktp ? "true" : "false"}
              />
              {errors.foto_ktp && (
                <p role="alert" className={errorMessageStyles}>
                  {errors.foto_ktp.message}
                </p>
              )}
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4">
            {/* --- Back Button --- */}
            <Link
              to="/login"
              className={`w-full text-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 ${
                isSubmitting ? "pointer-events-none opacity-50" : ""
              }`}
            >
              Back
            </Link>

            {/* --- Register Button --- */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full items-center justify-center rounded-md border border-transparent bg-green-700 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-green-700/60"
            >
              {isSubmitting ? (
                <>
                  <Spinner />
                  <span>Mendaftar...</span>
                </>
              ) : (
                "Register"
              )}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
