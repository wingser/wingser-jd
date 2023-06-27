#!/bin/bash
#date=`date +"%Y%m%d_%H"` 
#zip -r /ql/wingsercfg/ql/db/bak/$date.bak.zip /ql/wingsercfg/ql/db/*.db /ql/wingsercfg/ql/config/config.sh


# 设置要压缩的目录或文件路径和名称
source_dir="/ql/data/bak"
zip_file_name="backup_$(date +%F).zip"

# 设置zip密码，参数传入
password="$1"

# 创建加密的zip文件
cd "$source_dir" && zip -r -e -P "$password" "$zip_file_name" /ql/data/db/* /ql/data/config/*

# 将压缩文件移到备份目录
#backup_dir="/path/to/backup/directory"
#mv "$zip_file_name" "$backup_dir"
