<template>
  <div class="header">
    <div class="add-button" @click="sort">Sort by date</div>
    <div class="add-button" @click="addTask">Add task</div>
  </div>
</template>

<script>
export default {
  name: "AppHeader",
  methods: {
    addTask() {
      this.$router.push({ path: "/add" });
    },
    sort() {
      this.$emit("sort-div");
    },
  },
};
</script>

<style>
.header {
  text-align: center;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0.3rem;
}
.add-button {
  background-color: white;
  border: 1px solid black;
  padding: 0.4rem;
  border-radius: 8px;
  width: 100px;
  cursor: pointer;
}
</style>
