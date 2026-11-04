<template>
  <div>
    <h1>Task Manager</h1>

    <h2 id="student-id">71571</h2>

    <p><a id="contribution-link" href="contribution.html">[[Team Contribution]]</a></p>

    <!-- Status / Error Message -->
    <div id="status-message">{{ statusMessage }}</div>

    <!-- Task Form -->
    <form id="task-form" @submit.prevent="handleSubmit">
      <div>
        <label for="task-title">Title:</label><br />
        <input id="task-title" type="text" v-model="form.title" required />
      </div>
      <div>
        <label for="task-description">Description:</label><br />
        <textarea id="task-description" v-model="form.description"></textarea>
      </div>
      <button id="task-submit" type="submit">
        {{ editingId ? 'Update Task' : 'Add Task' }}
      </button>
      <button type="button" v-if="editingId" @click="cancelEdit">Cancel</button>
    </form>

    <hr />

    <!-- Task List -->
    <div id="task-list">
      <div
        v-for="task in tasks"
        :key="task.id"
        class="task-item"
        :data-id="task.id"
      >
        <h3 class="task-title" :class="{ completed: task.completed }">{{ task.title }}</h3>
        <p class="task-description">{{ task.description || '' }}</p>
        <p class="task-status">
          Status: <strong>{{ task.completed ? 'Completed' : 'Incomplete' }}</strong>
        </p>

        <button class="toggle-task" @click="toggleTask(task)">
          {{ task.completed ? 'Mark Incomplete' : 'Mark Completed' }}
        </button>
        <button class="edit-task" @click="startEdit(task)">Edit</button>
        <button class="delete-task" @click="deleteTask(task.id)">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  name: 'App',
  setup() {
    const tasks = ref([]);
    const statusMessage = ref('Loading configuration...');
    const editingId = ref(null);
    const form = ref({
      title: '',
      description: ''
    });

    let supabaseClient = null;
    let tableName = 'tasks';

    // 1. Initialize Supabase from config.json
    const initApp = async () => {
      try {
        const response = await fetch('config.json');
        if (!response.ok) throw new Error('Could not load config.json');

        const config = await response.json();
        tableName = config.tableName || 'tasks';

        const { createClient } = window.supabase;
        supabaseClient = createClient(config.supabaseUrl, config.supabasePublishableKey);

        statusMessage.value = '';
        await fetchTasks();
      } catch (err) {
        statusMessage.value = `Error initializing app: ${err.message}`;
      }
    };

    // 2. Fetch all tasks
    const fetchTasks = async () => {
      try {
        const { data, error } = await supabaseClient
          .from(tableName)
          .select('*')
          .order('id', { ascending: true });

        if (error) throw error;
        tasks.value = data || [];
      } catch (err) {
        statusMessage.value = `Error loading tasks: ${err.message}`;
      }
    };

    // 3. Create / Update task
    const handleSubmit = async () => {
      if (!form.value.title.trim()) return;

      statusMessage.value = 'Saving...';
      try {
        if (editingId.value) {
          const { error } = await supabaseClient
            .from(tableName)
            .update({
              title: form.value.title,
              description: form.value.description
            })
            .eq('id', editingId.value);

          if (error) throw error;
          statusMessage.value = 'Task updated successfully.';
        } else {
          const { error } = await supabaseClient
            .from(tableName)
            .insert([{
              title: form.value.title,
              description: form.value.description,
              completed: false
            }]);

          if (error) throw error;
          statusMessage.value = 'Task added successfully.';
        }

        resetForm();
        await fetchTasks();
      } catch (err) {
        statusMessage.value = `Error saving task: ${err.message}`;
      }
    };

    // 4. Toggle completion status
    const toggleTask = async (task) => {
      statusMessage.value = 'Updating status...';
      try {
        const { error } = await supabaseClient
          .from(tableName)
          .update({ completed: !task.completed })
          .eq('id', task.id);

        if (error) throw error;
        statusMessage.value = '';
        await fetchTasks();
      } catch (err) {
        statusMessage.value = `Error updating status: ${err.message}`;
      }
    };

    // 5. Delete task
    const deleteTask = async (id) => {
      statusMessage.value = 'Deleting...';
      try {
        const { error } = await supabaseClient
          .from(tableName)
          .delete()
          .eq('id', id);

        if (error) throw error;
        statusMessage.value = 'Task deleted.';
        await fetchTasks();
      } catch (err) {
        statusMessage.value = `Error deleting task: ${err.message}`;
      }
    };

    const startEdit = (task) => {
      editingId.value = task.id;
      form.value.title = task.title;
      form.value.description = task.description || '';
    };

    const cancelEdit = () => {
      resetForm();
    };

    const resetForm = () => {
      editingId.value = null;
      form.value = { title: '', description: '' };
    };

    onMounted(() => {
      initApp();
    });

    return {
      tasks,
      form,
      editingId,
      statusMessage,
      handleSubmit,
      toggleTask,
      deleteTask,
      startEdit,
      cancelEdit
    };
  }
};
</script>
