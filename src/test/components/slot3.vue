<template>
  <div>
    我是slot3<br/><br/><br/>
    <todo_slot :todos="todos">
        <!-- 将 `slotProps` 定义为插槽作用域的名字 -->
        <!-- <template slot-scope="slotProps"> -->
          <!-- 为待办项自定义一个模板，-->
          <!-- 通过 `slotProps` 定制每个待办项。-->
          <div slot-scope="slotProps" >
            <span style="color:red;" v-if="slotProps.todo.isComplete">✓</span>&nbsp;&nbsp;
            <span>{{ slotProps.todo.text }}</span>
          </div>
        <!-- </template> -->
      </todo_slot>
  </div>
</template>

<script>
import todo_slot from './todo_slot'

export default {
  components: {
    todo_slot
  },
  data () {
    return {
      todos: [
        { id: 1, text: '吃饭', isComplete: true },
        { id: 2, text: '睡觉', isComplete: false },
        { id: 3, text: '打豆豆', isComplete: true }
      ]
    }
  }
}
</script>
