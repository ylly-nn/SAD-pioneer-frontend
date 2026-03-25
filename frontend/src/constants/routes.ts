export const ROUTES = {

  // общие
  HOME: '/',
  
  // для владельцев автомобилей
  USER: {
    Profile:'/user',
    LOGIN:'/user/login',
    REGISTER: '/user/register',
    Verify: '/user/verify',
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
    PROFILE:'/organization',
    LOGIN: '/organization/login',
    REGISTER: '/organization/register',
    EDIT_FORM: '/organization/edit-form',
    VIEW_FORM: '/organization/view-form',
    BRANCH:{
      PROFILE: '/organization/branch',
      FORM: '/organization/branch/form',
      SERVICE: '/organization/branch/service',
    },
  },
  
  // для администраторов
  ADMIN: {
    FORMS: '/admin/forms',
    FORM_DETAIL: '/admin/form/:id'
  }
};
