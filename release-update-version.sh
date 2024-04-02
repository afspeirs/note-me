#!/bin/bash

# Define the new version
new_version=$1

# Read the package.json file
content=$(cat package.json)

# Find the line with "version" and replace its value with the new version
new_content=$(echo "$content" | awk -v new_version="$new_version" '/"version"/{$2="\""new_version"\";"} 1')

# Write the updated content back to package.json
echo "$new_content" > package.json

echo "Version updated to $new_version"
