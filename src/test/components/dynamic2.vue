<template>
    <div>
      <h1 style="color:blue;">dynamic component 2</h1>
    </div>
  </template>

  <script>
      export default{
        name:'dynamic2',
        created() {
          console.log('---2 created---')
        },
        beforeDestroy() {
          console.log('---2 beforeDestroy---')
        },
      }
    </script>
