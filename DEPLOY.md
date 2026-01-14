# Deployment Guide for Pixel Play

This guide explains how to host the Pixel Play web portfolio on a personal Ubuntu server using Docker.

## Prerequisites

- **Ubuntu Server** (Laptop or VPS)
- **SSH Access** to the server
- **Git** (optional, for pulling code) or a way to transfer files.

## 1. Install Docker & Docker Compose on Ubuntu

Run the following commands on your Ubuntu server to install Docker:

```bash
# Update package index
sudo apt-get update
sudo apt-get install ca-certificates curl gnupg

# Add Docker's official GPG key
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

# Set up the repository
echo \
  "deb [arch=\"$(dpkg --print-architecture)\" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  \"$(. /etc/os-release && echo \"$VERSION_CODENAME\")\" stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker Engine
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Verify installation
sudo docker run hello-world
```

**Manage Docker as a non-root user (Recommended):**

```bash
sudo groupadd docker
sudo usermod -aG docker $USER
newgrp docker
```

## 2. Transfer Project Files

You need to copy the project files to your server. You can use `git clone` if your repo is remote, or `scp` / `rsync` from your local machine.

**Important:** You do NOT need to copy `node_modules` or `.next` folders.

Files/Folders to copy:
- `src/`
- `public/`
- `package.json`
- `package-lock.json`
- `next.config.mjs`
- `Dockerfile`
- `docker-compose.yml`
- `Makefile`
- `tsconfig.json`
- `tailwind.config.ts`
- `postcss.config.js`
- `.eslintrc.json`
- `components.json`

## 3. Configuration

Create a `.env` file in the project root on your server if you have API keys (like OpenAI):

```bash
# .env
OPENAI_API_KEY=your_key_here
```

## 4. Run the Application

Navigate to the project directory on your server and run:

```bash
# Build and start the container
make build
make up
```

Or using plain Docker Compose:

```bash
docker compose up -d --build
```

The application should now be running at `http://localhost:3000` (or your server\'s IP address:3000).

## 5. Maintenance

- **View Logs:** `make logs`
- **Stop Server:** `make down`
- **Restart:** `make restart`
