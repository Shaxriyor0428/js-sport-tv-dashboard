import { Routes, Route, Navigate } from "react-router-dom";
import { router } from "./data/router";
import MainLayout from "./layouts/MainLayout";
import useStore from "./context/store";
import SignIn from "./pages/sign-in/SignIn";
import Users from "./pages/Users";
import Dashboard from "./pages/Dashboard";

function App() {
  const { auth, role } = useStore();

  const filteredRoutes =
    role === "admin"
      ? [
          { href: "/", component: Dashboard },
          { href: "/users", component: Users },
        ]
      : router.filter((item) => item.href !== "/users");

  return (
    <Routes>
      {!auth ? (
        <>
          <Route path="/signin" element={<SignIn />} />
          <Route path="*" element={<Navigate to="/signin" replace />} />
        </>
      ) : (
        <>
          <Route path="/" element={<MainLayout />}>
            {filteredRoutes.map((item) => (
              <Route
                key={item.href}
                path={item.href}
                element={<item.component />}
              />
            ))}
          </Route>

          <Route path="/signin" element={<Navigate to="/" replace />} />
        </>
      )}
    </Routes>
  );
}

export default App;
