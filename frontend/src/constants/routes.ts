export const ROUTES = {

  // общие
  HOME: '/',
  
  // для владельцев автомобилей
  USER: {
    LOGIN:'/user/login',
    REGISTER: '/user/register',
    SERVICE: {
        SELECT: '/user/service',
        ORGANIZATION: '/user/service/select-organization',
        DETAILS: '/user/service/details',
        TIME: '/user/service/select-time',
        CONFIRM: '/user/service/confirm',
    },
  },

  // для организаций
  ORGANIZATION: {
    LOGIN: '/organization/login',
    REGISTER: '/organization/register',
    VIEW_FORM: '/organization/view-form',
  },
  
  // для администраторов
  ADMIN: {
    FORMS: '/admin/forms',
    FORM_DETAIL: '/admin/form/:id'
  }
};
