#!/bin/bash
#date=`date +"%Y%m%d_%H"` 
#zip -r /ql/wingsercfg/ql/db/bak/$date.bak.zip /ql/wingsercfg/ql/db/*.db /ql/wingsercfg/ql/config/config.sh


# ����Ҫѹ����Ŀ¼���ļ�·��������
source_dir="/ql/data/bak"
zip_file_name="backup_$(date +%F).zip"

# ����zip���룬��������
password="$1"

# �������ܵ�zip�ļ�
cd "$source_dir" && zip -r -e -P "$password" "$zip_file_name" /ql/data/db/* /ql/data/config/*

# ��ѹ���ļ��Ƶ�����Ŀ¼
#backup_dir="/path/to/backup/directory"
#mv "$zip_file_name" "$backup_dir"
