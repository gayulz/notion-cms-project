#!/bin/bash

# Get the task ID from the first argument
TASK_ID=$1

# Check if a task ID was provided
if [ -z "$TASK_ID" ]; then
  echo "Error: No task ID provided."
  echo "Usage: ./scripts/complete-task.sh <task-id>"
  exit 1
fi

echo "Starting pre-completion checks for task: $TASK_ID"

# Step 1: Run npm run build
echo "Running 'npm run build'..."
if ! npm run build; then
  echo "Error: 'npm run build' failed. Aborting task completion."
  exit 1
fi
echo "'npm run build' completed successfully."

# Step 2: Run npm run check-all
echo "Running 'npm run check-all'..."
if ! npm run check-all; then
  echo "Error: 'npm run check-all' failed. Aborting task completion."
  exit 1
fi
echo "'npm run check-all' completed successfully."

# Step 3: Update the task status to 'completed'
echo "All checks passed. Updating task status to 'completed'..."
node scripts/update-task-status.mjs "$TASK_ID" "completed"

# Final confirmation
echo "Task completion process finished for task: $TASK_ID"

exit 0
