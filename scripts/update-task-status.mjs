
import fs from 'fs/promises';
import path from 'path';

const tasksFilePath = path.resolve(process.cwd(), 'shrimp_data/tasks.json');

async function updateTaskStatus(taskId, newStatus) {
  try {
    const data = await fs.readFile(tasksFilePath, 'utf8');
    const tasksData = JSON.parse(data);

    const taskIndex = tasksData.tasks.findIndex(task => task.id === taskId);

    if (taskIndex === -1) {
      console.error(`Error: Task with ID "${taskId}" not found.`);
      process.exit(1);
    }

    tasksData.tasks[taskIndex].status = newStatus;
    if (newStatus === 'completed') {
        tasksData.tasks[taskIndex].completedAt = new Date().toISOString();
    }
    tasksData.tasks[taskIndex].updatedAt = new Date().toISOString();

    await fs.writeFile(tasksFilePath, JSON.stringify(tasksData, null, 2), 'utf8');
    console.log(`Task "${taskId}" has been updated to "${newStatus}".`);

  } catch (error) {
    console.error('Error updating task status:', error);
    process.exit(1);
  }
}

const [taskId, newStatus] = process.argv.slice(2);

if (!taskId || !newStatus) {
  console.error('Usage: node scripts/update-task-status.mjs <taskId> <newStatus>');
  process.exit(1);
}

updateTaskStatus(taskId, newStatus);
