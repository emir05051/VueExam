<template>
  <div class="todo">
    <div class="todo__header">
      <span @click="open">Открыть</span>
    </div>
    <h4 class="todo__title">{{ todo.title }}</h4>
    <p class="todo__description">{{ todo.description }}</p>
    <p class="todo__deadline">
      Deadline: <span>{{ todo.deadline | formatDate }}</span>
    </p>
  </div>
</template>

<script>
export default {
  name: "Todo",
  props: {
    todo: {
      type: Object,
      required: true,
      default: () => ({}),
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
  methods: {
    open() {
      this.$router.push({
        name: "TodoDetailsPage",
        params: { id: this.todo.created_at },
      });
    },
  },
};
</script>

<style>
.todo {
  padding: 0.7rem;
  border: 1px solid black;
  border-radius: 8px;
  width: 400px;
  margin: 0 auto;
}

.todo__header {
  text-align: right;
  width: 100%;
  font-style: italic;
}
.todo__header span {
  cursor: pointer;
}
.todo h4 {
  font-weight: bold;
}
</style>
