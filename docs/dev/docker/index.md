---
prev: false
next: false
---

# 🐳 Docker 基础命令

## 🏗️ 容器管理

```bash
# 查看运行中的容器
docker ps

# 查看所有容器（包括停止的）
docker ps -a

# 启动/停止容器
docker start <container_id>
docker stop <container_id>

# 进入容器交互终端
docker exec -it <container_id> /bin/bash

# 删除容器
docker rm <container_id>
```

## 🖼️ 镜像管理

```bash
# 列出本地镜像
docker images

# 拉取镜像
docker pull <image_name>:<tag>

# 删除镜像
docker rmi <image_id>
```

### 📊 日志与监控

```bash
# 查看容器日志
docker logs -f <container_id>

# 查看资源使用情况
docker stats
```

## 🌐 网络管理

```bash
# 创建自定义网络
docker network create <network_name>

# 列出所有网络
docker network ls

# 检查网络详情
docker network inspect <network_name>

# 删除未使用网络
docker network prune
```

## 💾 数据卷管理

```bash
# 列出数据卷
docker volume ls

# 检查数据卷详情
docker volume inspect <volume_name>

# 删除未使用数据卷
docker volume prune
```

## 🚀 实用组合命令

```bash
# 一键停止并删除所有容器
docker stop $(docker ps -aq) && docker rm $(docker ps -aq)

# 清理所有未使用的镜像、容器、网络
docker system prune -a --volumes

# 查看容器IP地址
docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' <container_name>
```