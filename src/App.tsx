import { Routes, Route } from "react-router-dom";
import { router } from "./data/router";
import MainLayout from "./layouts/MainLayout";
import Notfound from "./pages/Notfound";

function App() {

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        {router.map((item) => (
          <Route
            key={item.href}
            path={item.href}
            element={<item.component />}
          />
        ))}
      </Route>

      <Route path="/forbidden" element={<Notfound />} />
    </Routes>
  );
}

export default App;
