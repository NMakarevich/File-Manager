# File-Manager
**NOTE:**
- if one of paths in command includes spaces, you need wrap both paths in double quotes
- allowed to use absolute and relative paths
## Command list
- up - move to upper directory
- cd path_to_directory - move to dedicated folder
- ls - show list of files and folder in current directory
---
- cat path_to_file - show content of file
- add new_file_name - create empty file in the current directory
- rn path_to_file new_filename - rename file
- cp path_to_file path_to_new_directory - copy file to entered directory
- mv path_to_file path_to_new_directory - move file to entered directory (in original directory file will be deleted)
- rm path_to_file - delete file
---
- os --EOL - get default End of Line for user's OS
- os --cpus - get total count of machine cpus and info about each cpu (model and speed in GHz)
- os --homedir - get user's home directory
- os --username - get current system user name
- os --architecture - get architecture for which Node.js binary has compiled
---
- hash path_to_file - calculate hash for file
---
- compress path_to_file path_to_destination - compress file using Brotly algorithm (path_to_destination mustn't include file name)
- decompress path_to_file path_to_destination - decompress file using Brotly algorithm (path_to_destination mustn't include file name)