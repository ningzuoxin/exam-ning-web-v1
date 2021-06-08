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
      meta: { title: '微服务考试平台', icon: 'dashboard' }
    }]
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
        path: 'previewTestPaper',
        name: 'PreviewTestPaper',
        component: () => import('@/views/testPaper/previewTestPaper'),
        meta: { title: '预览试卷', level: 2, noCache: true },
        hidden: true
      },
      {
        path: 'listQuestion',
        name: 'ListQuestion',
        component: () => import('@/views/testPaper/listQuestion'),
        meta: { title: '试题列表', icon: 'el-icon-tickets' }
      },
      {
        path: 'addQuestion',
        name: 'AddQuestion',
        component: () => import('@/views/testPaper/addQuestion'),
        meta: { title: '添加试题', level: 2, noCache: true },
        hidden: true
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
        path: 'markExam',
        name: 'markExam',
        component: () => import('@/views/exam/listExam'),
        meta: { title: '试卷批阅', icon: 'el-icon-tickets' }
      },
      {
        path: 'showTestPaperResultDetail',
        name: 'ShowTestPaperResultDetail',
        component: () => import('@/views/exam/showTestPaperResultDetail'),
        meta: { title: '查看试卷', level: 2, noCache: true },
        hidden: true
      }
    ]
  },
  // 开始考试
  {
    path: '/startExam',
    name: 'StartExam',
    component: () => import('@/views/exam/startExam'),
    hidden: true
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
