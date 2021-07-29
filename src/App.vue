<template>
  <div id="app" :style="`color:${this.$store.state.fontColor}`">
    <MainLayout>
      <router-view />
    </MainLayout>
  </div>
</template>

<script>
export default {
  name: "App",

  components: {
    MainLayout: () => import("@/layouts/MainLayout.vue"),
  },

  computed: {
    todoList() {
      return this.$store.state.todoList;
    },
    fontColor() {
      return this.$store.state.fontColor;
    },
  },

  created() {
    const todos = localStorage.getItem("todos");
    const fontColor = localStorage.getItem("fontColor");

    if (todos) {
      this.$store.commit("SET_TODOS", JSON.parse(todos));
      this.$store.commit("SET_COLOR", fontColor);
    }
    window.addEventListener("beforeunload", this.saveDatas);
  },

  methods: {
    saveDatas() {
      localStorage.setItem("todos", JSON.stringify(this.todoList));
      localStorage.setItem("fontColor", this.fontColor);
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: "Cascadia Mono PL SemiLight", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
input,
button {
  padding: 0.4rem;
  border: 1px solid #000;
  outline: none;
}
</style>
