#!/bin/bash

# Quick commit and push script
# Usage: ./quickpush.sh [commit message] [optional file/path]
# If no file specified, adds all changes

msg=$1
file=${2:-.}

if [ -z "$msg" ]; then
    echo "Error: Commit message is required!"
    echo "Usage: ./quickpush.sh \"commit message\" [file]"
    echo "Example: ./quickpush.sh \"Fix component\" component.jsx"
    echo "Example: ./quickpush.sh \"Update all files\""
    exit 1
fi

echo "Adding: $file"
git add "$file"

echo "Committing with message: '$msg'"
git commit -m "$msg"

echo "Pushing to origin main..."
git push origin main

echo "Done!"