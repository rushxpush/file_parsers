images_folder_relative=../bmp_files/only_changing_x_111111_filled_templates
destination_file=../../personal_docs/hex_dumps_111111_only_changing_x.md
images_folder_path=/src/bmp_files/only_changing_x_111111_filled_templates
IFS='/' read -ra file_names_array <<< "$images_folder_relative"

for entry in "${file_names_array[2]}"; do
  echo "$entry"
done

for entry in "$images_folder_relative"/*; do
  IFS='/' read -ra file_name <<< "$entry"
  echo "\`\`\`bash" >> $destination_file
  echo "# path: ${images_folder_path}/${file_name[3]}" >> $destination_file
  echo "" >> $destination_file

  echo "# hexdump:" >> $destination_file
  hexdump -C -v "$entry" >> $destination_file
  echo "\`\`\`" >> $destination_file
  echo "" >> $destination_file
done