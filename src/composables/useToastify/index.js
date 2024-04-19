import { useToast } from "vue-toastification";

const useToastify = () => {
  const toast = useToast();

  /* Show Success Toast */
  const success = ({ message }) => {
    message = message || "درخواست شما با موفقیت انجام شد.";

    toast.success(message, {
      timeout: 2000,
    });
  };

  /* Show Error Toast */
  const error = ({ message }) => {
    message = message || "درخواست شما با موفقیت انجام نشد.";

    toast.error(message, {
      timeout: 2000,
    });
  };

  return { success, error };
};

export default useToastify;
