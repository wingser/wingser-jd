#!/bin/bash

# 第一个参数是备份压缩包密码，第二个参数是备份压缩包复制到的路径。

# 设置要压缩的目录或文件路径和名称
source_dir="/ql/data/bak"
zip_file_name="backup_$(date +%F).zip"

# 设置zip密码，参数传入
password="$1"

# 创建加密的zip文件
cd "$source_dir" && zip -r -e -P "$password" "$zip_file_name" /ql/data/db/* /ql/data/config/*

# 将压缩文件移到备份目录
if [ ! -z "$2" ]; then
  backup_dir="$2"
  cp "$zip_file_name" "$backup_dir"
fi
