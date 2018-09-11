<template>
  <div>
    <h2>New Project</h2>
    <ProjectForm />
  </div>
</template>

<script>
  import ProjectForm from './_Form'

  export default {
    name: 'NewProject',
    components: {
      ProjectForm
    }
  }
</script>