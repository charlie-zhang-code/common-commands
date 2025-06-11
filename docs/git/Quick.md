# 🚀 Git 上传三剑客

## 1️⃣ `git add` - 添加文件到暂存区

```bash
git add .                       # 添加所有修改的文件
# 或
git add <文件名>                # 添加特定文件
```

## 2️⃣ `git commit` - 提交到本地仓库

```bash
git commit -m "提交描述信息"     # 提交并添加描述
git commit --allow-empty -m "空的提交信息" # 提交一个空的 Git Commit
```

## 3️⃣ `git push` - 推送到远程仓库

```bash
git push origin <分支名>         # 推送到指定分支
# 如果是第一次推送，可以加-u参数建立追踪
git push -u origin <分支名>
```

## 💡 组合使用

```bash
git add .
git commit -m "修复了登录页面bug"
git push origin main
```
