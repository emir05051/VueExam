<template>
  <section class="addTodo">
    <form @submit.prevent="addTodo" class="add-form">
      <h3>Add Task</h3>
      <input v-model.trim="title" type="text" placeholder="Заголовок" />
      <textarea
        v-model.trim="description"
        placeholder="Описание"
        cols="30"
        rows="10"
      ></textarea>
      <input type="date" v-model="deadline" />
      <button type="submit">Add</button>
      <button>Cancel</button>
    </form>
  </section>
</template>

<script>
export default {
  name: "AddTodo",
  data: () => ({
    title: "",
    description: "",
    deadline: "",
  }),

  methods: {
    addTodo() {
      if (!this.title || !this.description || !this.deadline) return;

      console.log(this.$store);

      this.$store.commit("ADD_TODO", {
        title: this.title,
        description: this.description,
        created_at: Date.now(),
        isFinished: false,
        updated_at: null,
        deadline: new Date(this.deadline).valueOf(),
      });
      this.toHomePage();
    },
    toHomePage() {
      this.$router.push({ name: "HomePage" });
    },
  },
};
</script>
<style>
.add-form {
  width: 300px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
}
.add-form input,
textarea,
button {
  margin-top: 5px;
  border-radius: 5px;
  width: 100%;
}
.add-form textarea {
  resize: none;
}
</style>
