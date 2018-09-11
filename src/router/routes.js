import TheEditor from '../components/Layout/Authorized/TheEditor'
import TheProfile from '../components/Layout/Authorized/TheProfile'

const routes = [
  {
    name: 'editor',
    path: '/project/:projectId/:chartId',
    component: TheEditor,
    meta: {
      headerTabs: [{name: 'Tab 1', id: 1}, {name: 'Tab 2', id: 2}],
      headerMoreMenu: [{name: 'MenuItem 1', id: 1}]
    }
  },
  {
    name: 'profile',
    path: '/profile',
    component: TheProfile,
  }
]

export default routes