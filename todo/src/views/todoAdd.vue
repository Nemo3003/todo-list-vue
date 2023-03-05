<template>
    <div class="container">
         <h2 class="text-center mt-5">My VUE todo app</h2>
         <form  class="d-flex">
           <input type="text" placeholder="Enter Text" v-model="task" class="form-control">
           <button class="btn btn-warning rounded-0" @click="submitTask">Submit</button>
         </form>
   
         <!--Here comes the table for our tasks-->
         <table class="table table-bordered mt-5">
           <thead>
             <tr>
               <th scope="col">Task</th>
               <th scope="col">Status</th>
               <th scope="col">Edit</th>
               <th scope="col">Delete</th>
             </tr>
           </thead>
           <tbody>
             <tr v-for="(task, index) in tasks" :key="index">
               <th> <span class="pointer">{{task.name}}</span></th>
               <td> <span class="pointer status" @click="changeStatus(index)">{{ task.status }}</span></td>
               <td>
                 <div class="text-center" @click="editTask(index)">
                     <span class="fa fa-pen"></span>
                 </div>
               </td>
               <td>
                 <div class="text-center" @click="deleteTask(index)">
                   <span class="fa fa-trash"></span>
                 </div>
               </td>
             </tr>
           </tbody>
         </table>
    </div>
   </template>
   
   <script>
   export default {
  name: "TodoApp",
  props: {
    msg: String,
  },
  data(){
    return {
      editedTask: null,
      task:'Hello ma friend',
      availableStatus: ['to-do','in-progress', 'finished'],
      tasks : []
    }
  },
  methods: {
    submitTask(){
      if(this.task.length === 0) return;

      //BEGIN Check whether the user wants to edit or create a new task
      this.editedTask === null ?
      this.tasks.push({
        name: this.task,
        status: 'to-do'
      })
      : this.tasks[this.editedTask].name = this.task,this.editedTask = null;
      // END
      this.task = '';

      // Save tasks to local storage
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    },
    deleteTask(index){
      this.tasks.splice(index, 1);
      // Save tasks to local storage
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    },
    editTask(index){
      this.task = this.tasks[index].name;
      this.editedTask = index;
    },
    changeStatus(index){
      let newIndex = this.availableStatus.indexOf(this.tasks[index].status);
      if (++newIndex > 2) newIndex = 0;
      this.tasks[index].status = this.availableStatus[newIndex];

      // Save tasks to local storage
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
  },
  mounted() {
    // Load tasks from local storage
    if (localStorage.getItem('tasks')) {
      this.tasks = JSON.parse(localStorage.getItem('tasks'));
    }
  }
};
   </script>
   
   <style>
   .pointer {
     cursor: pointer;
   }
   html{
    max-height: 100vh;
   }
   </style>