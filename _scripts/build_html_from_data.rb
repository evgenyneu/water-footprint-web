#! /usr/bin/env ruby
#
# Builds HTML files containing the product lists for different languages form the data files.
#
# How to run:
#
#   ./_scripts/build_html_from_data.rb
#

def process_single_file(file)
  puts file
end

def process_files(files)
  files.each do |file|
    process_single_file file
  end
end

def run
  project_root = File.expand_path('../..',__FILE__)
  data_path = File.join(project_root, '_data')

  unless File.directory?(data_path)
    puts("ERROR: Directory #{data_path} does not exist")
  end

  data_files = Dir["#{data_path}/*.tsv"]

  process_files data_files
end

run
