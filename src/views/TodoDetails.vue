<template>
  <section class="todo-details">
    <h2>Детали</h2>
    <p class="todo__title">{{ todo.title }}</p>
    <p class="todo__description">{{ todo.description }}</p>
    <p class="todo__deadline">
      Deadline: <span>{{ todo.deadline | formatDate }}</span>
    </p>
    <p class="todo__created">
      Created: <span>{{ todo.created_at | formatDate }}</span>
    </p>
    <p class="todo__updated">
      Updated: <span>{{ formatDateMethod() }}</span>
    </p>
  </section>
</template>

<script>
export default {
  name: "TodoDetailsPage",

  data: () => ({
    todo: null,
  }),
  computed: {
    todoId() {
      return this.$route.params.id;
    },
    todoList() {
      return this.$store.state.todoList;
    },
  },
  created() {
    const todo = this.todoList.find((el) => el.created_at === this.todoId);
    if (!todo) {
      this.$router.push({ path: "/" });
    }
    this.todo = todo;
  },
  methods: {
    formatDateMethod() {
      if (!this.todo.updated_at) return "-";
      return new Intl.DateTimeFormat("ru-RU", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      }).format(new Date(this.todo.updated_at));
    },
  },
  filters: {
    formatDate(value) {
      console.log(value);
      return new Intl.DateTimeFormat("ru-RU", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      }).format(new Date(value));
    },
  },
};
</script>

<style></style>
