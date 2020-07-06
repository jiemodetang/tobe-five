/* eslint-disable import/extensions */
import React,{ lazy } from 'react';

import BasicLayout from '@/layouts/BasicLayout';
import BlankLayout from '@/layouts/BlankLayout';
const config = [
  {
    path: '/',
    component: BlankLayout, // 空白页布局
    childRoutes: [
      // 子菜单路由
      {
        path: '/',
        component: BasicLayout, // 基本布局
        childRoutes: [
          {
            path: '/welcome',
            name: '欢迎页',
            component:  lazy(() => import('@/pages/Welcome')),
          },
          {
            path: '/fuck',
            name: '',
            component: lazy(() => import('@/pages/Fuck')),
          },
          { path: '/', exact: true, redirect: '/welcome' },
          // { path: '*', exact: true, redirect: '/exception/404' },
        ],
      },
    ],
  },
];

export default config;
