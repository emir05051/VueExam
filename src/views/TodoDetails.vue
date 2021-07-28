<template>
  <section class="todo-details">
    <h2>Детали</h2>
    <div class="todo__header">
      <span class="todo__button" @click="toHomePage"> Back</span>
      <span class="todo__button" @click="changeTask"> Изменить</span>
    </div>
    <div class="wrapper">
      <h3 class="todo__title">{{ todo.title }}</h3>
      <h4 class="todo__description">{{ todo.description }}</h4>
      <p class="todo__deadline">
        Deadline: <span>{{ todo.deadline | formatDate }}</span>
      </p>
      <p class="todo__created">
        Created: <span>{{ todo.created_at | formatDate }}</span>
      </p>
      <p class="todo__updated">
        Updated: <span>{{ formatDateMethod() }}</span>
      </p>
    </div>
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
    toHomePage() {
      this.$router.push({ name: "HomePage" });
    },
    formatDateMethod() {
      if (!this.todo.updated_at) return "-";
      return new Intl.DateTimeFormat("ru-RU", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      }).format(new Date(this.todo.updated_at));
    },
    changeTask() {
      this.$router.push({ name: "ChangePage", params: { todo: this.todo } });
    },
  },
  filters: {
    formatDate(value) {
      return new Intl.DateTimeFormat("ru-RU", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      }).format(new Date(value));
    },
  },
};
</script>

<style lang="scss">
.wrapper {
  display: flex;
  flex-direction: column;
  h4 {
    margin: 3px;
  }
  p {
    margin: 2px;
    span {
      color: red;
    }
  }
}
</style>
