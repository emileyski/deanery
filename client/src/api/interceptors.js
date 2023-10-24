import axios from "axios";

const getAxiosInstance = (baseUrl) => {
  // Функция для получения Access Token из localStorage
  const getAccessToken = () => localStorage.getItem("accessToken");

  // Функция для сохранения новых токенов в localStorage
  const updateTokens = (accessToken, refreshToken) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  };

  // Создаем экземпляр Axios с базовой конфигурацией
  const axiosInstance = axios.create({
    baseURL: baseUrl, // Замените на ваш базовый URL
  });

  // Добавляем перехватчик запросов
  axiosInstance.interceptors.request.use((config) => {
    // Вставляем Access Token в заголовок Authorization
    config.headers.Authorization = `Bearer ${getAccessToken()}`;
    return config;
  });

  // Добавляем перехватчик ответов
  axiosInstance.interceptors.response.use(
    (response) => response, // Возвращаем успешный ответ без изменений
    async (error) => {
      const originalRequest = error.config;

      // Если статус 401 (Unauthorized), пробуем обновить токен
      if (error.response.status !== 200 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          // Получаем новые токены с помощью refreshToken
          const refreshResponse = await axios.post(
            "http://localhost:3001/api/auth/refresh",
            {
              refreshToken: localStorage.getItem("refreshToken"),
            }
          );

          // Обновляем токены в localStorage
          updateTokens(
            refreshResponse.data.accessToken,
            refreshResponse.data.refreshToken
          );

          // Повторяем изначальный запрос с обновленным токеном
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          // console.error("Ошибка при обновлении токена:", refreshError);
          // Обработайте ошибку обновления токена по вашему усмотрению
        }
      }

      // Возвращаем ошибку, если не удалось обновить токен или другая ошибка
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

// Используйте axiosInstance для ваших запросов
export default getAxiosInstance;
