
// export const API_DOMAIN = process.env.APP_API_URL
export const API_DOMAIN = "http://localhost:3001"

const endpoints = {
    login: () => `${API_DOMAIN}/login`,
    postStudent: () => `${API_DOMAIN}/students`,
    postCourse: () => `${API_DOMAIN}/courses`,
    postResult: () => `${API_DOMAIN}/results`,
    getStudents: () => `${API_DOMAIN}/students`,
    getCourses: () => `${API_DOMAIN}/courses`,
    getResults: () => `${API_DOMAIN}/results`,
    deleteStudent: (id) => `${API_DOMAIN}/students/${id}`,
    deleteCourse: (id) => `${API_DOMAIN}/courses/${id}`,
  };
  
export default endpoints;
