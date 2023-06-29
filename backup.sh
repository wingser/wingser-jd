#!/bin/bash

# ��һ�������Ǳ���ѹ�������룬�ڶ��������Ǳ���ѹ�������Ƶ���·����

# ����Ҫѹ����Ŀ¼���ļ�·��������
source_dir="/ql/data/bak"
zip_file_name="backup_$(date +%F).zip"

# ����zip���룬��������
password="$1"

# �������ܵ�zip�ļ�
cd "$source_dir" && zip -r -e -P "$password" "$zip_file_name" /ql/data/db/* /ql/data/config/*

# ��ѹ���ļ��Ƶ�����Ŀ¼
if [ ! -z "$2" ]; then
  backup_dir="$2"
  cp "$zip_file_name" "$backup_dir"
fi
