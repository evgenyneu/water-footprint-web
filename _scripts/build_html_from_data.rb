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

def language_code(file)
  file_part = File.basename(file).split('data_').reject { |c| c.empty? }.first
  file_part.split('.tsv').first
end

def html_file(language_code)
  destination_dir_path = File.join(project_root, '_includes', 'lists')

  unless File.directory?(destination_dir_path)
    puts("ERROR: Directory #{destination_dir_path} does not exist")
  end

  File.join(destination_dir_path, "#{language_code}.html")
end

def process_single_file(file)
  language = language_code(file)

  if language.length != 2
    puts("ERROR: Incorrect data file name #{file}. Should be in format 'data_en.tsv'")
  end

  destination_file_path = html_file(language)

  # file_parts = file_parts.map { |c|  }

  # .split('.tsv')

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
