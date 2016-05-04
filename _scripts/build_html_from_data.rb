#! /usr/bin/env ruby
#
# Builds HTML files containing the product lists for different languages form the data files.
#
# How to run:
#
#   ./_scripts/build_html_from_data.rb
#

def project_root
  File.expand_path('../..',__FILE__)
end

def process_single_line(line)
  puts line.split("\t")
end

def process_single_file(file)
  File.readlines(file).each do |line|
    process_single_line line
  end
end

def process_files(files)
  files.each do |file|
    process_single_file file
  end
end

def run
  data_path = File.join(project_root, '_data')

  unless File.directory?(data_path)
    puts("ERROR: Directory #{data_path} does not exist")
  end

  data_files = Dir["#{data_path}/*.tsv"]

  process_files data_files
end

run
