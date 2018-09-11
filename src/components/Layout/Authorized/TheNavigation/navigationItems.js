import router from '../../../../router'

const navigationItems = [
  {
    name: 'New Project',
    icon: 'add'
  },
  {
    name: 'Projects',
    icon: 'assignment',
    items: [
      {
        name: 'Project 1',
        callback: () => {
          const projectId = 1,
                chartId = 2
          router.push({name: 'editor', params: {projectId, chartId}})
        }
      }
    ]
  },
  {
    name: 'Profile',
    icon: 'person',
    callback: () => {
      router.push({name: 'profile'})
    }
  },
  {
    name: 'Sign Out',
    icon: 'exit_to_app'
  }
]

export default navigationItems