import type { FunctionComponent } from "react";
import { Navigate } from "react-router-dom";

// 1. Ganti nama hook yang diimpor menjadi useAuth
import { useAuth } from "#/context/auth/AuthProvider";

/**
 * A higher-order wrapper, binding the "user logged in" condition and redirect.
 * This component will render the passed Component only if the user is logged in.
 */
export const withLoggedIn = (Component: FunctionComponent) => {
  // Kembalikan sebuah komponen baru (wrapper)
  return function LoggedInWrapper(props: any) {
    // 2. Panggil hook di dalam komponen wrapper ini
    const { isLoggedIn } = useAuth();

    // 3. Tampilkan komponen atau redirect berdasarkan kondisi
    return isLoggedIn ? <Component {...props} /> : <Navigate to="/login" replace />;
  };
};

/**
 * The inverse, showing a page only if a user is logged OUT.
 * This component will render the passed Component only if the user is not logged in.
 */
export const withLoggedOut = (Component: FunctionComponent) => {
  // Kembalikan sebuah komponen baru (wrapper)
  return function LoggedOutWrapper(props: any) {
    // Panggil hook di dalam komponen wrapper ini
    const { isLoggedIn } = useAuth();

    // Tampilkan komponen atau redirect ke halaman utama jika sudah login
    return !isLoggedIn ? <Component {...props} /> : <Navigate to="/" replace />;
  };
};
