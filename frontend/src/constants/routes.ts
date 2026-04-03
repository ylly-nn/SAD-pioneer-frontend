export const ROUTES = {

  // общие
  HOME: '/',
  
  // для владельцев автомобилей
  USER: {
    PROFILE:'/user',
    LOGIN:'/user/login',
    REGISTER: '/user/register',
    VERIFY: '/user/verify',
    ORDER: '/user/order',
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
    EDIT_FORM: '/organization/create-form',
    VIEW_FORM: '/organization/view-form',
    ORDERS: '/organization/orders',
    BRANCH:{
      ALL: '/organization/branches',
      PROFILE: '/organization/branch',
      FORM: '/organization/branch/form',
      SERVICE:{
        ADD: '/organization/branch/:id/service',
        DETAIL: '/organization/branch/:id/service/:serviceId',
      }
    },
    USERS:{
      FORM: '/organization/users/form',
    }
  },
  
  // для администраторов
  ADMIN: {
    FORMS: '/admin/forms',
    FORM_DETAIL: '/admin/form/:id'
  }
};
