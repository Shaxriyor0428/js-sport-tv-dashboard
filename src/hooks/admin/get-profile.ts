import request from "@/services";
import useStore from "@/context/store";

const getProfile = async (token: string) => {
    const { setAuth } = useStore.getState();

    try {
        const res = await request.get("/admin/profile", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        console.log(res.data);
        

        const { name, id, role } = res.data;

        if (name && id) {
            setAuth(true, role, name);
        } else {
            throw new Error("Invalid token");
        }
    } catch (err) {
        localStorage.removeItem("access_token");
        throw err;
    }
};

export default getProfile;
