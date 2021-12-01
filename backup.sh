#!/bin/bash
date=`date +"%Y%m%d_%H"` 
zip -r /ql/db/bak/$date.bak.zip /ql/db/*.db
