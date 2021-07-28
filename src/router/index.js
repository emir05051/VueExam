import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import AddTodo from "../views/AddTodo.vue";
import TodoDetails from "../views/TodoDetails.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "HomePage",
    component: Home,
  },
  {
    path: "/add",
    name: "AddPage",
    component: AddTodo,
  },
  {
    path: "/todo/:id",
    name: "TodoDetailsPage",
    component: TodoDetails,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
