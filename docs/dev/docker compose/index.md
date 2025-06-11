---
prev: false
next: false
---

# 🐙 Docker Compose 常用命令

## 🚀 基础操作

```bash
# 启动所有服务（后台模式）
docker-compose up -d

# 停止并移除容器、网络（保留卷和镜像）
docker-compose down

# 强制重建容器（即使配置未更改）
docker-compose up -d --force-recreate

# 仅构建/重建服务镜像（不启动）
docker-compose build
```

## 🔍 状态监控

```bash
# 查看运行中的服务状态
docker-compose ps

# 实时查看所有服务日志 (-f 跟随模式)
docker-compose logs -f

# 查看指定服务的日志（如 web 服务）
docker-compose logs -f web

# 查看服务资源使用情况
docker-compose top
```

## ⚙️ 服务管理

```bash
# 启动已存在的服务容器
docker-compose start

# 停止运行中的服务（不删除）
docker-compose stop

# 重启所有服务（先stop再start）
docker-compose restart

# 重启单个服务（如 nginx）
docker-compose restart nginx
```

## 🧹 清理维护

```bash
# 停止并移除所有资源（包括匿名卷）
docker-compose down -v

# 删除所有未使用的镜像
docker-compose down --rmi all

# 拉取服务所需的最新镜像
docker-compose pull

# 验证 compose 文件格式
docker-compose config
```

## 🛠️ 实用技巧

```bash
# 在指定服务上执行命令（如数据库备份）
docker-compose exec db sh -c 'mysqldump -u root -p$MYSQL_ROOT_PASSWORD $MYSQL_DATABASE' > backup.sql

# 扩展服务实例数量（如启动3个worker实例）
docker-compose up -d --scale worker=3

# 查看服务端口映射
docker-compose port web 80
```