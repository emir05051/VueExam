<template>
  <div
    class="todo"
    :class="{
      expired: todo.isExpired,
      finished: todo.isFinished,
      important: todo.isImportant,
    }"
  >
    <div class="todo__header">
      <span @click="deleteTask" class="todo__button">УДалить</span>
      <span @click="open" class="todo__button">Открыть</span>
    </div>
    <h4 class="todo__title">{{ todo.title }}</h4>
    <p class="todo__description">{{ todo.description }}</p>
    <p class="todo__deadline">
      Deadline: <span>{{ todo.deadline | formatDate }}</span>
    </p>
    <p style="color: red" v-show="todo.isExpired">Expired</p>
    <h1 style="color: blue" v-show="todo.isImportant">Важно</h1>
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
    idx: {
      type: Number,
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
  mounted() {
    if (this.todo.deadline < Date.now() && !this.todo.isFinished) {
      this.todo.isExpired = true;
    }
  },
  methods: {
    open() {
      this.$router.push({
        name: "TodoDetailsPage",
        params: { id: this.todo.created_at },
      });
    },
    deleteTask() {
      let thisElementId = this.todo.created_at;

      let element = this.$store.state.todoList.findIndex(
        (el) => el.created_at == thisElementId
      );

      this.$store.state.todoList.splice(element, 1);
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
  margin: 5px auto;
}
.expired {
  border: 1px solid red;
}
.finished {
  border: 2px solid green;
}
.important {
  order: -1;
}
.finished h4,
.finished p {
  text-decoration: line-through;
}

.todo__header {
  display: flex;
  justify-content: space-around;
  width: 100%;
}
.todo__button {
  cursor: pointer;
  font-style: italic;
  text-transform: uppercase;
}
.todo h4 {
  font-weight: bold;
}
</style>
