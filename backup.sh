#!/bin/bash
date=`date +"%Y%m%d_%H"` 
zip -r /ql/wingsercfg/ql/db/bak/$date.bak.zip /ql/wingsercfg/ql/db/*.db /ql/wingsercfg/ql/config/config.sh