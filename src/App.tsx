import { useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { router } from "./data/router";
import MainLayout from "./layouts/MainLayout";
import Notfound from "./pages/Notfound";
import Partners from "./pages/media/Partners";
import Stats from "./pages/media/Stats";
import Rating from "./pages/media/Rating";
import Participants from "./pages/media/Participants";
import Leadership from "./pages/media/Leadership";
import News from "./pages/media/News";
import Gallery from "./pages/media/Gallery";
import request from "@/services";
import useStore from "@/context/store";

function App() {
  const { setAuth } = useStore();
  const navigate = useNavigate();
  const location = useLocation();

  const getProfile = async (token: string) => {
    try {
      const res = await request.get("/admin/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { name, id, role } = res.data.admin;
      if (name && id) {
        setAuth(true, role, name);
      } else {
        throw new Error("Invalid token");
      }
    } catch (err) {
      localStorage.removeItem("access_token");
      navigate("/forbidden");
    }
  };

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const tokenFromUrl = query.get("token");
    const token = tokenFromUrl || localStorage.getItem("access_token");
    
    if (tokenFromUrl) {
      localStorage.setItem("access_token", tokenFromUrl);
    }

    if (!token) {
      navigate("/forbidden");
    } else {
      getProfile(token);
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        {router.filter((item) => item.component).map((item) => (
          <Route
            key={item.href}
            path={item.href}
            element={item.component ? <item.component /> : null}
          />
        ))}

        <Route path="media/gallery" element={<Gallery />} />
        <Route path="media/news" element={<News />} />
        <Route path="media/stats" element={<Stats />} />
        <Route path="media/leadership" element={<Leadership />} />
        <Route path="media/participants" element={<Participants />} />
        <Route path="media/partners" element={<Partners />} />
        <Route path="media/rating" element={<Rating />} />
      </Route>

      <Route path="/forbidden" element={<Notfound />} />
    </Routes>
  );
}

export default App;
