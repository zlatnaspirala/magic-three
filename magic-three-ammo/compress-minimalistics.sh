#!/bin/bash
# Magic three dev tool
echo "----------------------";
echo "Magic Three compressor";
echo "Minimalistics        -";
echo " Folders:            -";
echo " public/magic/*/*.js -";
echo "----------------------";

function compressFolder () {
  yourfilenames=$1;
  echo "Compressing $yourfilenames";
  for entry in $yourfilenames
  do
    basename "$entry";
    f="$(basename -- $entry)";
    dir="$(dirname "${entry}")";
    #echo "Filename : $f";
    prodcName="${f%.*}.prod.js"
    arrIN=(${f//.prod/ })
    #echo "What0 is arrIN ${arrIN[0]}"
    #echo "What1 is arrIN ${arrIN[1]}"
    if [[ ${arrIN[1]} == ".js" ]];
    then
      echo "ignore this file....";
    else
      minify "$entry" > ${dir}/$prodcName;
      echo "${dir}/$prodcName Done.";
    fi
  done

}

# Top level Magic level scripts
magicDir=`ls ./public/magic/*.js`;
compressFolder "${magicDir}"

magicDir=`ls ./public/magic/networking/*.js`;
compressFolder "${magicDir}"

magicDir=`ls ./public/magic/networking/rtc-multi-connection/*.js`;
compressFolder "${magicDir}"

echo "Job complited."
sleep 10000;