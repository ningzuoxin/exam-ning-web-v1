import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        name: 'Menu2',
        meta: { title: 'menu2' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },
  // 用户模块路由
  {
    path: '/user',
    component: Layout,
    redirect: '/user/index',
    name: 'User',
    meta: { title: '用户管理', icon: 'el-icon-user-solid' },
    children: [
      {
        path: 'index',
        name: 'IndexUser',
        component: () => import('@/views/user/index'),
        meta: { title: '用户列表', icon: 'el-icon-tickets' }
      },
      {
        path: 'add',
        name: 'AddUser',
        component: () => import('@/views/user/addUser'),
        meta: { title: '添加用户', icon: 'el-icon-document-add' }
      },
      {
        path: 'update/:id',
        name: 'UpdateUser',
        component: () => import('@/views/user/updateUser'),
        meta: { title: '编辑用户', icon: 'el-icon-document-add' },
        hidden: true
      }
    ]
  },
  // 试卷模块路由
  {
    path: '/testPaper',
    component: Layout,
    redirect: '/testPaper/listTestPaper',
    name: 'TestPaper',
    meta: { title: '试卷管理', icon: 'el-icon-document' },
    children: [
      {
        path: 'listTestPaper',
        name: 'ListTestPaper',
        component: () => import('@/views/testPaper/listTestPaper'),
        meta: { title: '试卷列表', icon: 'el-icon-tickets' }
      },
      {
        path: 'addTestPaper',
        name: 'AddTestPaper',
        component: () => import('@/views/testPaper/addTestPaper'),
        meta: { title: '添加试卷', icon: 'el-icon-document-add' }
      },
      {
        path: 'listQuestion',
        name: 'ListQuestion',
        component: () => import('@/views/testPaper/listQuestion'),
        meta: { title: '试题列表', icon: 'el-icon-tickets' }
      },
      {
        path: 'addQuestion',
        component: () => import('@/views/testPaper/addQuestion'),
        name: 'AddQuestion',
        hidden: true,
        meta: { title: '添加试题', level: 2, noCache: true }
      }
    ]
  },
  // 考试模块路由
  {
    path: '/exam',
    component: Layout,
    redirect: '/exam/listExam',
    name: 'Exam',
    meta: { title: '考试中心', icon: 'el-icon-s-data' },
    children: [
      {
        path: 'listExam',
        name: 'ListExam',
        component: () => import('@/views/exam/listExam'),
        meta: { title: '考试列表', icon: 'el-icon-tickets' }
      },
      {
        path: 'listExamRecord',
        name: 'ListExamRecord',
        component: () => import('@/views/exam/listExamRecord'),
        meta: { title: '考试成绩', icon: 'el-icon-tickets' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
