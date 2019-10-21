import { RouteConfig } from 'vue-router';

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('src/layouts/basic-layout/BasicLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('src/pages/IndexPage.vue')
      }
    ]
  }
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('src/pages/Error404Page.vue')
  });
}

export default routes;
