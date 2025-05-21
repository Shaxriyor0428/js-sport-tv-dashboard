import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type Store = {
  auth: boolean;
  role: string | null;
  username: string | null;
  setAuth: (auth: boolean, role: string, username: string) => void;
  logOut: () => void;
};

const useStore = create<Store>()(
  persist(
    (set) => ({
      auth: false,
      role: null,
      username: null,
      setAuth: (auth, role, username) =>
        set({ auth, role, username }),
      logOut: () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("role");
        localStorage.removeItem("username");
        set({ auth: false, role: null, username: null });
      },
    }),
    {
      name: "volleyball-admin",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useStore;
