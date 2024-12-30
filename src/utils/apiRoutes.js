const BASE_URL = "http://localhost:8080";

export const API_ROUTES = {
  CREATE_USER: `${BASE_URL}/createUser`,
  LOGIN: `${BASE_URL}/login`,
  GET_TASKS_BY_USER_ID: `${BASE_URL}/getTasksByUserId?userId=`,
  GET_BOARDS: `${BASE_URL}/getBoards`,
  GET_USERS: `${BASE_URL}/getUsers`,
  CREATE_TASK: `${BASE_URL}/createTask`,
  CREATE_BOARD: `${BASE_URL}/createBoard`
};