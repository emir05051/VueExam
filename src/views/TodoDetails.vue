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
    <div class="footer" @click="animationDiv">
      <div class="icon-1"></div>
      <div class="footer-body"></div>
      <div class="options">
        <div>
          <p>Background</p>
          <input type="color" value="#FFFFFF" v-model="backgroundColor" />
        </div>
        <div>
          <p>Font-Color</p>
          <input type="color" value="#FFFFFF" v-model="fontColor" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "TodoDetailsPage",

  data: () => ({
    todo: null,
    shift: 47.34375,
    backgroundColor: "#ffffff",
    fontColor: "#000000",
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
  watch: {
    backgroundColor: (newValue) => {
      document.body.style.backgroundColor = newValue;
    },
    fontColor: function (newValue) {
      this.$store.commit("SET_COLOR", newValue);
    },
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
    animationDiv(e) {
      e.target.parentNode.style.top = "90%";
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
* {
  margin: 0;
  padding: 0;
}
p,
h4,
input {
  margin: 10px;
}
#app {
  margin: 0;
}
body {
  overflow: hidden;
}
.todo-details {
  height: 100vh;
}
.footer {
  position: absolute;
  top: 95%;
  left: 50%;
  transition: top 1s linear;
  cursor: pointer;
  p {
    margin: 0;
  }
  input {
    margin: 0;
  }
}
.icon-1 {
  border: 10px solid transparent;
  border-bottom: 10px solid red;
}
.footer-body {
  height: 30px;
  width: 20px;
  background-color: red;
}
.options {
  height: 50px;
  position: absolute;
  left: -571px;
  width: 1142px;
  background-color: rgb(67, 133, 255);
  align-items: center;
  display: flex;
  p {
    color: #fff;
  }
}
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
