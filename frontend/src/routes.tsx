import { Route, createBrowserRouter, createRoutesFromElements, defer } from "react-router-dom";

import { AppLayout, PublicLayout, RootLayout } from "./layouts";
import { AuthLayout } from "./layouts/auth-layout";
import { Login, Register } from "./pages/auth";
import Home from "./pages/home";
import { UserDashboard } from "./pages/users";
import { PremiDashboard } from "./pages/premi";

// Ideally this would be an API call to server to get logged in user data
const getUserData = () => {
  return new Promise((resolve, _reject) =>
    setTimeout(() => {
      const user = window.localStorage.getItem("user");
      resolve(user);
      // reject('Error')
    }, 3000)
  );
};

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayout />} loader={() => defer({ userPromise: getUserData() })}>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="/register" element={<Register />} />
      </Route>

      <Route path="/dashboard" element={<AppLayout />}>
        <Route path="overview" element={<UserDashboard />} />
        <Route path="premi" element={<PremiDashboard />} />
      </Route>
    </Route>
  )
);
