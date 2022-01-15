import { RouteRecordRaw,  } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/Blank.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: ':name',
        component: () => import('pages/Profile.vue'),
        props: true
        /*
        props: (router)=>{
          person: router.query.person
        }
        */
      }
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
