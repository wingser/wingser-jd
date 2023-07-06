#!/bin/bash

#首次执行脚本，需要使用用户名登录，密码输入下面创建的PAT。

#进入要提交的目录
if [ ! -z "$2" ]; then
  git_dir="$2"
  cd "$git_dir"
fi

#以下是如何创建Personal Access Token的步骤：
#	登录Github账户并打开Settings页面。
#	在左侧边栏中选择Developer settings。
#	选择Personal access tokens选项，然后点击Generate new token按钮。
#	给Token取个名称，并勾选需要访问的资源权限。
#	点击Generate token按钮，生成一个新的Personal Access Token。

# 设置Personal Access Token作为环境变量
export GITHUB_TOKEN="$1"

# 使用Personal Access Token进行认证鉴权
git config --global credential.helper store

#防止冲突，先拉最新代码
git pull

# 添加新增文件
git add .

# 提交更改并添加注释
git commit -m "Auto-daily-commit at $(date)"

# 推送更改到远程仓库
git push origin main
