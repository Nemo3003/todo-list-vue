<template>
    <div class="container">
      <div class="error-message">{{ errorMessage }}</div>
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
            <th :class="{ 'finished-task': task.status === 'finished', 'in-progress-task': task.status === 'in-progress' }"> 
              <span class="pointer">{{task.name}}</span>
              <span v-if="task.status === 'finished'" class="finished-marker"></span>
            </th>
            <td> <span class="pointer status" @click="changeStatus(index)">{{ task.status }}</span></td>
            <td>
              <div class="text-center" @click="editTask(index)">
                <span class="fa fa-pen pointer"></span>
              </div>
            </td>
            <td>
              <div class="text-center" @click="deleteTask(index)">
                <span class="fa fa-trash pointer"></span>
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
      task:'',
      availableStatus: ['to-do','in-progress', 'finished'],
      tasks : []
    }
  },
  methods: {
    submitTask(){
      if(this.task.length === 0) {
        this.errorMessage = 'Task name cannot be empty';
        return;
      }

      // Check for duplicate task names
      const duplicateTask = this.tasks.find(t => t.name === this.task);
      if (duplicateTask) {
        this.errorMessage = 'Task name already exists';
        return;
      }

      // Reset error message if there were no errors
      this.errorMessage = '';

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
    editTask(index){
      this.task = this.tasks[index].name;
      this.editedTask = index;
    },
    deleteTask(index) {
  // Remove the task at the specified index from the tasks array
  this.tasks.splice(index, 1);
  
  // Save the updated tasks array to local storage
  localStorage.setItem('tasks', JSON.stringify(this.tasks));
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
   html{
    max-height: 100vh;
   }
   .pointer {
     cursor: pointer;
   }
   .finished-task {
  text-decoration: line-through;
  color: red;
  }
  .in-progress-task {
    font-style: italic;
    color: orange;
  }
  .error-message {
    color: red;
    margin-top: 10px;
  }
   </style>