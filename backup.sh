#!/bin/sh 
date=`date +"%Y%m%d_%H"` 
zip -r /ql/db/bak/$date.bak.zip /ql/db/*.db
#tar -czvf /opt/ftp/soft_$date.tar.gz /usr/soft
