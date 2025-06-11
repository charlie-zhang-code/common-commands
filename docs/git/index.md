---
prev: false
next: false
---

# 🚀 Git 常用命令

## 📂 仓库操作

```bash
git init                        # 初始化本地仓库
git clone <url>                 # 克隆远程仓库
git remote -v                   # 查看远程仓库信息
git remote add origin <url>     # 添加远程仓库
git remote remove origin        # 移除远程仓库
```

## 🔄 提交与修改

```bash
git status                      # 查看状态
git add <file>                  # 添加文件到暂存区
git add .                       # 添加所有修改到暂存区
git commit -m "message"         # 提交到本地仓库
git commit -am "message"        # 添加并提交所有已跟踪文件
git reset HEAD <file>           # 取消暂存
git checkout -- <file>          # 丢弃工作区修改
```

## 🌿 分支管理

```bash
git branch                      # 查看本地分支
git branch -a                   # 查看所有分支(包括远程)
git branch <name>               # 创建新分支
git checkout <branch>           # 切换分支
git checkout -b <branch>        # 创建并切换分支
git merge <branch>              # 合并分支到当前分支
git branch -d <branch>          # 删除本地分支
git push origin --delete <branch> # 删除远程分支
```

## 📜 日志与历史

```bash
git log                         # 查看提交历史
git log --oneline               # 简洁版提交历史
git log --graph                 # 图形化显示分支
git blame <file>                # 查看文件修改历史
git diff                        # 查看未暂存的修改
git diff --cached               # 查看已暂存的修改
```

## ☁️ 远程协作

```bash
git fetch                       # 从远程获取最新信息
git pull                        # 拉取并合并远程更改
git push                        # 推送本地提交到远程
git push -u origin <branch>     # 推送并设置上游分支
git push --force                # 强制推送(谨慎使用)
```

## 🏷️ 标签管理

```bash
git tag                         # 列出所有标签
git tag <tagname>               # 创建轻量标签
git tag -a <tagname> -m "msg"   # 创建带注释标签
git push origin <tagname>       # 推送标签到远程
git push origin --tags          # 推送所有标签
git checkout <tagname>          # 检出标签
```

## 🔧 配置与帮助

```bash
git config --list               # 查看配置
git config --global user.name "name"  # 设置用户名
git config --global user.email "email" # 设置邮箱
git help <command>              # 获取命令帮助
```

## ♻️ 撤销与重置

```bash
git reset --soft HEAD~1         # 撤销commit但保留更改
git reset --hard HEAD~1         # 彻底撤销commit和更改
git revert <commit>             # 创建撤销某次提交的新提交
```

## 🧹 清理与维护

```bash
git clean -n                    # 查看将被清理的文件(预览)
git clean -f                    # 删除未跟踪的文件
git gc                          # 清理不必要的文件并优化仓库
```
