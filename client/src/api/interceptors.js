import axios from "axios";

const getAxiosInstance = (baseUrl) => {
  const getAccessToken = () => localStorage.getItem("accessToken");

  const updateTokens = (accessToken, refreshToken) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  };

  const axiosInstance = axios.create({
    baseURL: baseUrl,
  });

  axiosInstance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${getAccessToken()}`;
    return config;
  });

  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response.status !== 200 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const refreshResponse = await axios.post(
            "http://localhost:3001/api/auth/refresh",
            {
              refreshToken: localStorage.getItem("refreshToken"),
            }
          );

          updateTokens(
            refreshResponse.data.accessToken,
            refreshResponse.data.refreshToken
          );

          return axiosInstance(originalRequest);
        } catch (refreshError) {
          // console.error("Ошибка при обновлении токена:", refreshError);
        }
      }

      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default getAxiosInstance;
//
