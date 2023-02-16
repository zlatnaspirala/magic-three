#!/bin/bash
# Magic three dev tool
echo "----------------------";
echo "Magic Three compressor";
echo "-Compress all        -";
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

magicDir=`ls ./public/jsm/effects/*.js`;
compressFolder "${magicDir}"

magicDir=`ls ./public/jsm/environments/*.js`;
compressFolder "${magicDir}"

magicDir=`ls ./public/jsm/geometries/*.js`;
compressFolder "${magicDir}"

magicDir=`ls ./public/jsm/exporters/*.js`;
compressFolder "${magicDir}"

magicDir=`ls ./public/jsm/helpers/*.js`;
compressFolder "${magicDir}"

magicDir=`ls ./public/jsm/libs/*.js`;
compressFolder "${magicDir}"

magicDir=`ls ./public/jsm/lights/*.js`;
compressFolder "${magicDir}"

magicDir=`ls ./public/jsm/lines/*.js`;
compressFolder "${magicDir}"

magicDir=`ls ./public/jsm/loaders/*.js`;
compressFolder "${magicDir}"

magicDir=`ls ./public/jsm/materials/*.js`;
compressFolder "${magicDir}"

magicDir=`ls ./public/jsm/math/*.js`;
compressFolder "${magicDir}"

magicDir=`ls ./public/jsm/misc/*.js`;
compressFolder "${magicDir}"

magicDir=`ls ./public/jsm/modifiers/*.js`;
compressFolder "${magicDir}"

magicDir=`ls ./public/jsm/node-editor/*.js`;
compressFolder "${magicDir}"

magicDir=`ls ./public/jsm/nodes/*.js`;
compressFolder "${magicDir}"

magicDir=`ls ./public/jsm/objects/*.js`;
compressFolder "${magicDir}"

magicDir=`ls ./public/jsm/offscreen/*.js`;
compressFolder "${magicDir}"

magicDir=`ls ./public/jsm/physics/*.js`;
compressFolder "${magicDir}"

magicDir=`ls ./public/jsm/postprocessing/*.js`;
compressFolder "${magicDir}"

magicDir=`ls ./public/jsm/renderers/*.js`;
compressFolder "${magicDir}"

magicDir=`ls ./public/jsm/shaders/*.js`;
compressFolder "${magicDir}"

magicDir=`ls ./public/jsm/textures/*.js`;
compressFolder "${magicDir}"

magicDir=`ls ./public/jsm/utils/*.js`;
compressFolder "${magicDir}"

magicDir=`ls ./public/jsm/webxr/*.js`;
compressFolder "${magicDir}"

echo "Job complited."
sleep 10000;