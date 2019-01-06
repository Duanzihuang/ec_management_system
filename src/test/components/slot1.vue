<template>
  <div>
    我是slot1组件<br/>

    <slot_common>
      我是slot1中的内容
    </slot_common>
  </div>
</template>

<script>
import slot_common from './slot_common'
export default {
  components: {
    slot_common
  }
}
</script>
