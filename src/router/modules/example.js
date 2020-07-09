/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const exampleRouter = {
  path: '/example',
  component: Layout,
  redirect: '/example/complex-table',
  name: 'Example',
  meta: {
    title: 'Example',
    icon: 'table',
    roles: ['example']
  },
  children: [
    {
      path: 'normal-select',
      component: () => import('@/views/components-demo/drag-select'),
      name: 'NormalSelect',
      meta: {
        title: 'normal select',
        roles: ['example']
      }
    },
    {
      path: 'left-right-select',
      component: () => import('@/views/components-demo/dnd-list'),
      name: 'LeftRightSelect',
      meta: {
        title: 'left right select',
        roles: ['example']
      }
    },
    {
      path: 'table',
      component: () => import('@/views/table/complex-table'),
      name: 'ComplexTable',
      meta: {
        title: 'table',
        roles: ['example']
      }
    },
    {
      path: 'parall-table',
      component: () => import('@/views/table/parall-table'),
      name: 'ParallTable', // 面包屑展示
      meta: {
        title: 'parall-table',
        roles: ['example']
      }
    },
    {
      path: 'newtask',
      component: () => import('@/views/table/newtask'),
      name: 'NewTask',
      meta: {
        title: 'newtask',
        roles: ['example']
      }
    },
    {
      path: 'tree',
      component: () => import('@/components/tree/index'),
      name: 'Tree',
      meta: {
        title: 'tree',
        roles: ['example']
      }
    },
    {
      path: 'chart',
      component: () => import('@/views/charts/mix-chart'),
      name: 'Chart',
      meta: {
        title: 'chart',
        roles: ['example']
      }
    },
    {
      path: 'upload-excel',
      component: () => import('@/components/UploadExcel/index'),
      name: 'UploadExcel',
      meta: {
        title: 'upload excel',
        roles: ['example']
      }
    },
    {
      path: 'export-excel',
      component: () => import('@/views/excel/export-excel'),
      name: 'ExportExcel',
      meta: {
        title: 'export excel',
        roles: ['example']
      }
    }
  ]
}
export default exampleRouter
