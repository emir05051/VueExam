<template>
  <section class="changeTodo">
    <form @submit.prevent="changeTodo" class="add-form">
      <h3>Сhange Task</h3>
      <input v-model.trim="title" type="text" />
      <textarea v-model.trim="description" cols="30" rows="10"></textarea>
      <input type="date" v-model="deadline" />
      <p>Закончено ?</p>
      <div class="radiobutton">
        <input
          type="radio"
          v-model="isFinished"
          value="true"
          name="Finished"
          id="true"
        />
        <label for="true">Да</label>
        <input
          type="radio"
          v-model="isFinished"
          value="false"
          name="Finished"
          id="false"
        />
        <label for="false">Нет</label>
      </div>
      <button type="submit">Change</button>
      <button @click="toHomePage">Cancel</button>
    </form>
  </section>
</template>

<script>
export default {
  name: "ChangeTodo",

  data: () => ({
    title: "",
    description: "",
    deadline: "",
    date: "",
    isFinished: false,
  }),
  mounted() {
    this.title = this.todoRoute.title;
    this.description = this.todoRoute.description;
    this.date = new Date(this.todoRoute.deadline);

    let year = this.date.getFullYear();
    let month = this.appendNull(this.date.getMonth() + 1);
    let day = this.appendNull(this.date.getDate());

    this.deadline = `${year}-${month}-${day}`;
  },
  computed: {
    todoRoute() {
      return this.$route.params.todo;
    },
    todoList() {
      return this.$store.state.todoList;
    },
  },

  methods: {
    appendNull(time) {
      if (time < 10) {
        return "0" + time;
      }
      return time;
    },
    changeTodo() {
      const todoIdx = this.todoList.findIndex(
        (el) => el.created_at === this.todoRoute.created_at
      );

      let changeTodo = this.$store.state.todoList[todoIdx];

      if (!this.title || !this.description || !this.deadline) return;

      let deadlineTime = new Date(this.deadline).setHours(23, 59, 59);

      if (deadlineTime < Date.now()) {
        alert("Некорректно изменено");
        return;
      }

      changeTodo.isFinished = this.isFinished;
      changeTodo.title = this.title;
      changeTodo.description = this.description;
      changeTodo.deadline = this.deadline;
      changeTodo.updated_at = Date.now().valueOf();

      this.toHomePage();
    },

    toHomePage() {
      this.$router.push({ name: "HomePage" });
    },
  },
};
</script>
<style lang="scss">
.radiobutton {
  border: none;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  & input {
    width: 10px;
  }
}
</style>
