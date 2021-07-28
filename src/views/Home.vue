<template>
  <div class="home">
    <AppHeader @sort-div="sortDivs" />
    <h2 class="title">Список</h2>
    <div v-if="todoList.length" class="todos"></div>
    <div v-else class="empty">Список пуст</div>
    <div class="main">
      <Todo
        v-for="(todo, idx) in todoList"
        :key="todo.created_at"
        :todo="todo"
        :idx="idx"
      />
    </div>
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
  methods: {
    sortDivs() {
      let itemsArray = [];
      let divs = document.querySelectorAll(".todo");
      let parent = divs[0].parentNode;
      for (var i = 0; i < divs.length; i++) {
        itemsArray.push(parent.removeChild(divs[i]));
      }
      itemsArray
        .sort((divA, divB) => {
          let textA = this.getText(divA);
          let textB = this.getText(divB);

          let numberA = parseInt(textA);
          let numberB = parseInt(textB);

          if (numberA < numberB) return -1;
          if (numberA > numberB) return 1;

          return;
        })
        .forEach(function (node) {
          parent.appendChild(node);
        });
    },
    getText(div) {
      let textDate = div.children[3].innerText.match(/\d+.{8}/g)[0];
      textDate = textDate.split(".");

      let normalDate = new Date(textDate[2], textDate[1] - 1, textDate[0]);

      return normalDate.getTime();
    },
  },
};
</script>
<style>
.main {
  display: flex;
  flex-direction: column;
}
</style>
