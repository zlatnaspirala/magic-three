#!/bin/bash
# Magic three dev tool
echo "----------------------";
echo "Magic Three compressor";
echo "----------------------";

function compressFolder () {
  yourfilenames=$1;
  echo "Compressing $yourfilenames";
  for entry in $yourfilenames
  do
    basename "$entry";
    f="$(basename -- $entry)";
    dir="$(dirname "${entry}")";
    echo "Filename : $f";

    prodcName="${f%.*}.prod.js"
    arrIN=(${f//.prod/ })
    echo "What0 is arrIN ${arrIN[0]}"
    echo "What1 is arrIN ${arrIN[1]}"

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

# Threejs level scripts
magicDir=`ls ./public/jsm/animation/*.js`;
compressFolder "${magicDir}"

magicDir=`ls ./public/jsm/cameras/*.js`;
compressFolder "${magicDir}"

magicDir=`ls ./public/jsm/capabilities/*.js`;
compressFolder "${magicDir}"

magicDir=`ls ./public/jsm/controls/*.js`;
compressFolder "${magicDir}"

magicDir=`ls ./public/jsm/csm/*.js`;
compressFolder "${magicDir}"

magicDir=`ls ./public/jsm/curves/*.js`;
compressFolder "${magicDir}"

sleep 10000;