export const ROUTES = {

  // общие
  HOME: '/',
  LOGIN:'/login',
  REGISTER: '/register',
  VERIFY: '/verify',
  RESET_PASSWORD: "/forgot-password",


  
  // для владельцев автомобилей
  USER: {
    PROFILE:'/user',
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
      FORM: '/organization/add-user',
    }
  },
  
  // для администраторов
  ADMIN: {
    PROFILE: '/admin',
    FORM_DETAIL: '/admin/form/id',
  }
};
