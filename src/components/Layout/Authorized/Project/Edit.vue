<template>
  <div>
    <h2>Edit Project</h2>
    <ProjectForm />
  </div>
</template>

<script>
  import ProjectForm from './_Form'

  export default {
    name: 'EditProject',
    components: {
      ProjectForm
    }
  }
</script>