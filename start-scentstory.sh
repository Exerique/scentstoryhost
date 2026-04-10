#!/bin/bash

# Ensure NVM is loaded so we can find npm
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

echo "🌸 Starting ScentStory Development Servers..."

# Start Backend
echo "Starting Backend on Port 5000..."
cd backend
npm run dev &
BACKEND_PID=$!

# Start Frontend
echo "Starting Frontend using Vite..."
cd ../frontend
npm run dev &
FRONTEND_PID=$!

echo "Both servers are running! Press [CTRL+C] to stop."

# Wait for process exit
trap "kill $BACKEND_PID $FRONTEND_PID" SIGINT
wait
