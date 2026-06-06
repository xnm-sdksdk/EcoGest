import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('layouts/BlankLayout.vue'),
    children: [{ path: '', component: () => import('pages/auth/LoginPage.vue') }],
  },
  {
    path: '/',
    component: () => import('layouts/SideBar.vue'),
    meta: { requiresAuth: true },
    children: [{ path: '', component: () => import('pages/dashboard/DashboardPage.vue') }],
  },
  {
    path: '/activities',
    component: () => import('layouts/SideBar.vue'),
    meta: { requiresAuth: true },
    children: [{ path: '', component: () => import('pages/activities/ActivityPage.vue') }],
  },
  {
    path: '/meetings',
    component: () => import('layouts/SideBar.vue'),
    meta: { requiresAuth: true },
    children: [{ path: '', component: () => import('pages/meetings/MeetingsPage.vue') }],
  },
  {
    path: '/gamification',
    component: () => import('layouts/SideBar.vue'),
    meta: { requiresAuth: true },
    children: [{ path: '', component: () => import('pages/gamification/GamificationPage.vue') }],
  },
  {
    path: '/proceedings',
    component: () => import('layouts/SideBar.vue'),
    meta: { requiresAuth: true },
    children: [{ path: '', component: () => import('pages/proceedings/ProceedingsPage.vue') }],
  },
  {
    path: '/reports',
    component: () => import('layouts/SideBar.vue'),
    meta: { requiresAuth: true },
    children: [{ path: '', component: () => import('pages/report/ReportPage.vue') }],
  },
  {
    path: '/settings',
    component: () => import('layouts/SideBar.vue'),
    meta: { requiresAuth: true },
    children: [{ path: '', component: () => import('pages/settings/SettingsPage.vue') }],
  },
  {
    path: '/profile',
    component: () => import('layouts/SideBar.vue'),
    meta: { requiresAuth: true },
    children: [{ path: '', component: () => import('pages/profile/ProfilePage.vue') }],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
