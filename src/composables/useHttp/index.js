import { computed } from "vue";
import axios from "axios";
import router from "@/router";
import store from "@/store";
import useToastify from "@/composables/useToastify";

const useHttp = () => {
  const toast = useToastify();

  const userToken = computed(() => store.state?.user?.token || " ");

  const logout = () => {
    store.dispatch("logout");
    router.push("/login");
  };

  return () => {
    const instance = axios.create({
      baseURL: "http://127.0.0.1:3000/api",
      headers: {
        "X-Platform": "WEB",
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
        Authorization: `Bearer ${userToken.value}`,
      },
    });

    instance.interceptors.request.use(
      (config) => {
        return config;
      },
      (error) => {
        //Logout User
        if (error?.response?.status === 401) {
          logout();
        } else {
          return Promise.reject(error);
        }
      }
    );

    instance.interceptors.response.use(
      (res) => {
        const response = res.data || {};
        const successMessage = res.data?.message || "";

        //Show Toast Success
        if (successMessage) {
          toast.success({ message: successMessage });
        }

        return response;
      },
      (error) => {
        //Logout User
        if (error?.response?.status === 401) {
          logout();
        }
        const errorMessage =
          error?.response?.data?.message || error?.message || " ";

        //Show Toast Error
        if (errorMessage) {
          toast.error({ message: errorMessage });
        }

        return Promise.reject(error);
      }
    );

    return instance;
  };
};

export default useHttp;
