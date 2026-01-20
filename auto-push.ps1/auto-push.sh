#!/bin/bash
# A script to automatically commit and push changes to a Git repository
# Usage: ./auto-push.sh "Your commit message"
# If no commit message is provided, a default message will be used
#AUTO_UPDATE=${1:-"Auto-update: $(date +"%Y-%m-%d %H:%M:%S")"}
# Navigate to the repository directory (optional, uncomment if needed)
# cd /path/to/your/repo
# Add all changes to staging
#git add .
# Commit the changes with the provided or default message
#git commit -m "$AUTO_UPDATE"
# Push the changes to the remote repository
#git push origin main
# Note: Ensure that you have the necessary permissions and SSH keys set up for pushing to the repository
# You can set up a cron job to run this script at regular intervals if desired

#!/bin/bash
git add .
git commit -m "auto update"
git push
