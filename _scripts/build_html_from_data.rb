#! /usr/bin/env ruby
#
# Builds HTML files containing the product lists for different languages form the data files.
#
# How to run:
#
#   ./_scripts/build_html_from_data.rb
#

require 'cgi'

def project_root
  File.expand_path('../..', __FILE__)
end

def html_data(name:, synonyms:, footprint_value:)
%{<div class="List-item" data-synonyms="#{CGI.escapeHTML(synonyms)}">
  <div class="List-itemName">#{CGI.escapeHTML(name)}</div>
  <div>#{footprint_value}</div>
</div>}
end

def html_from_single_line(line)
  fields = line.split("\t")

  if fields.count != 3
    puts("ERROR: Incorrect data line #{line}. Should have 3 fields separated with tabs.")
    return
  end

  (name, synonyms, footprint_value) = fields
  footprint_value.tr!("\n\r", '')
  html_data(name: name, synonyms: synonyms, footprint_value: footprint_value)
end

def language_code(file)
  file_part = File.basename(file).split('data_').reject(&:empty?).first
  file_part.split('.tsv').first
end

def html_file(language_code)
  destination_dir_path = File.join(project_root, '_includes', 'lists')
  return nil unless File.directory?(destination_dir_path)
  File.join(destination_dir_path, "#{language_code}.html")
end

def process_single_file(file)
  language = language_code(file)

  if language.length != 2
    puts("ERROR: Incorrect data file name #{file}. Should be: 'data_en.tsv'")
    return
  end

  destination_file_path = html_file(language)

  unless destination_file_path
    puts("ERROR: Directory #{destination_dir_path} does not exist")
    return
  end

  html = File.readlines(file).map do |line|
    html_from_single_line(line)
  end

  File.open(destination_file_path, 'w') do |output_file|
    output_file.write(html.join("\n"))
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
