import axios, { AxiosResponse, AxiosError, InternalAxiosRequestConfig } from "axios";
import useStore from "../context/store";
import { DOMAIN } from "@/constants";

interface ErrorResponse {
    message: string;
}
const request = axios.create({
    baseURL: `${DOMAIN}/admin`,
    headers: {
        "Content-Type": "application/json",
    },
});

request.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem("access_token");
        // let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjhmYWU2MmI2LWE5OTctNDkzZS04NTVmLWM5N2Q3MDE1MmM4ZCIsInJvbGUiOiJzdXBlcmFkbWluIiwibmFtZSI6InNoYXhyaXlvciIsImlhdCI6MTc0NTEyNTM0NCwiZXhwIjoxNzQ1NzMwMTQ0fQ.p6ICK1Od0KJNw8h2IxMn4D8qy68d_sqQETtvOjSgk-o";

        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error: AxiosError) => Promise.reject(error)
);

request.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
        const errorMessage = (error.response?.data as ErrorResponse)?.message;
        console.log(errorMessage);

        if (errorMessage === "Admin not found" || error.status === 401 || errorMessage === "Invalid or expired token" || error.response?.status === 401 || errorMessage === 'Unauthorized') {
            const { logOut } = useStore.getState();
            logOut();
            window.location.href = "/signin";
        }

        return Promise.reject(error);
    }
);

export default request;
