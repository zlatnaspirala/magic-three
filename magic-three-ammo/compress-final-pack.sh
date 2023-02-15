#!/bin/bash

# Magic three dev tool

ECHO "----------------------";
ECHO "Magic Three compressor";
ECHO "----------------------";

yourfilenames=`ls ./public/magic/*.js`;

ECHO "compressing ./public/magic/*.js";
for entry in $yourfilenames
do
  basename "$entry";
  f="$(basename -- $entry)";
  dir="$(dirname "${entry}")";
  echo "Filename : $f";
  prodcName="${f%.*}.prod.js"
  minify "$entry" > ${dir}/$prodcName;
  echo "${dir}/$prodcName Done.";
done


sleep 10000;