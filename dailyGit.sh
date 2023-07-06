#!/bin/bash

#�״�ִ�нű�����Ҫʹ���û�����¼�������������洴����PAT��

#����Ҫ�ύ��Ŀ¼
if [ ! -z "$2" ]; then
  git_dir="$2"
  cd "$git_dir"
fi

#��������δ���Personal Access Token�Ĳ��裺
#	��¼Github�˻�����Settingsҳ�档
#	����������ѡ��Developer settings��
#	ѡ��Personal access tokensѡ�Ȼ����Generate new token��ť��
#	��Tokenȡ�����ƣ�����ѡ��Ҫ���ʵ���ԴȨ�ޡ�
#	���Generate token��ť������һ���µ�Personal Access Token��

# ����Personal Access Token��Ϊ��������
export GITHUB_TOKEN="$1"

# ʹ��Personal Access Token������֤��Ȩ
git config --global credential.helper store

#��ֹ��ͻ���������´���
git pull

# ��������ļ�
git add .

# �ύ���Ĳ����ע��
git commit -m "Auto-daily-commit at $(date)"

# ���͸��ĵ�Զ�ֿ̲�
git push origin main
