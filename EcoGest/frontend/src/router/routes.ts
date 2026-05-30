import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('layouts/SideBar.vue'),
    children: [{ path: '', component: () => import('pages/auth/LoginPage.vue') }],
  },
  {
    path: '/',
    component: () => import('layouts/SideBar.vue'),
    children: [{ path: '', component: () => import('pages/dashboard/DashboardPage.vue') }],
  },
  {
    path: '/activities',
    component: () => import('layouts/SideBar.vue'),
    children: [
      { path: '/activities', component: () => import('pages/activities/ActivityPage.vue') },
    ],
  },
  {
    path: '/meetings',
    component: () => import('layouts/SideBar.vue'),
    children: [{ path: '/meetings', component: () => import('pages/meetings/MeetingsPage.vue') }],
  },
  {
    path: '/gamification',
    component: () => import('layouts/SideBar.vue'),
    children: [
      { path: '/gamification', component: () => import('pages/gamification/GamificationPage.vue') },
    ],
  },
  {
    path: '/proceedings',
    component: () => import('layouts/SideBar.vue'),
    children: [
      { path: '/proceedings', component: () => import('pages/proceedings/ProceedingsPage.vue') },
    ],
  },
  {
    path: '/reports',
    component: () => import('layouts/SideBar.vue'),
    children: [{ path: '/reports', component: () => import('pages/report/ReportPage.vue') }],
  },
  {
    path: '/settings',
    component: () => import('layouts/SideBar.vue'),
    children: [{ path: '/settings', component: () => import('pages/settings/SettingsPage.vue') }],
  },
  {
    path: '/profile',
    component: () => import('layouts/SideBar.vue'),
    children: [{ path: '/profile', component: () => import('pages/profile/ProfilePage.vue') }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
