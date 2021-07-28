<template>
  <div class="home">
    <AppHeader />
    <h2 class="title">Список</h2>
    <div v-if="todoList.length" class="todos"></div>
    <div v-else class="empty">Список пуст</div>
    <Todo v-for="todo in todoList" :key="todo.created_at" :todo="todo" />
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";
export default {
  name: "Home",
  components: {
    AppHeader,
    Todo: () => import("@/components/Todo.vue"),
  },
  computed: {
    todoList() {
      return this.$store.state.todoList;
    },
  },
};
</script>
