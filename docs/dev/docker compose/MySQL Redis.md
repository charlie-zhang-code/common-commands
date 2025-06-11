# MySQL & Redis Docker Compose 环境配置

使用 Docker Compose 快速搭建 MySQL 和 Redis 开发环境。

## 🌐 网络配置

首先创建一个 Docker 网络，使容器间可以互相通信：

```bash
docker network create dev-net
```

## 🐙 Docker Compose 配置

创建 docker-compose.yml 文件：

```yaml
services:
  # =============== 基础环境 ===============
  dev-db-mysql:
    image: mysql:latest
    networks:
      - dev-net
    container_name: dev-db-mysql
    environment:
      MYSQL_ROOT_PASSWORD: 123456
    volumes:
      - mysql-data:/var/lib/mysql # 持久化数据
    ports:
      - "3306:3306"
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
      interval: 5s
      timeout: 10s
      retries: 5
    
  dev-db-redis:
    image: redis:latest
    container_name: dev-db-redis
    volumes:
      - redis-data:/data           # 持久化数据
    networks:
      - dev-net
    command: redis-server --requirepass 123456
    ports:
      - "6379:6379"
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 5s
      timeout: 10s
      retries: 5

networks:
  dev-net:
    external: true  # 声明这是一个外部网络，Compose 不会尝试创建它

volumes:
  mysql-data:
  redis-data:
```