# Laptop Server Foundation Setup (Nginx + Cloudflare Tunnel)

This guide explains how to turn your fresh Ubuntu installation into a proper server with a Gateway (Nginx), Management (Portainer), and **Public Internet Access (Cloudflare)**.

## 1. Initial Server Setup (One-time)

Run these commands on your fresh Ubuntu laptop to install Docker:

```bash
# Update and install Docker
sudo apt-get update
sudo apt-get install -y ca-certificates curl gnupg
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

echo \
  "deb [arch=\"$(dpkg --print-architecture)\" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  \"$(. /etc/os-release && echo \"$VERSION_CODENAME\")\" stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Allow running docker without sudo
sudo groupadd docker
sudo usermod -aG docker $USER
newgrp docker
```

## 2. Launch Infrastructure

1.  Copy the `server-infrastructure` folder to your home directory: `~/server-infrastructure`.
2.  Navigate into it: `cd ~/server-infrastructure`

### Setting up Public Access (The Internet)
You need a domain name (e.g., `yourname.com`) connected to Cloudflare.
1.  Go to the [Cloudflare Zero Trust Dashboard](https://one.dash.cloudflare.com/).
2.  Navigate to **Networks > Tunnels** and click **Create a Tunnel**.
3.  Choose **Cloudflared** connector.
4.  Copy the token from the "Install and run a connector" section. It looks like `eyJhIjoi...`.
5.  Create a `.env` file in `~/server-infrastructure`:
    ```bash
TUNNEL_TOKEN=eyJhIjoi... (paste your huge token here)
    ```
6.  **Configure the Public Hostname** in the Cloudflare Dashboard:
    -   **Public Hostname:** `portfolio.yourname.com`
    -   **Service:** `http://pixel-play:3000` (Note: We use the container name `pixel-play` here, not localhost).

### Start Everything
```bash
docker compose up -d
```

## 3. Launch Pixel Play (The App)

1.  Navigate to your `pixel-play` project folder.
2.  Run the app:

```bash
docker compose up -d --build
```

### Accessing your App
-   **Public Internet:** `https://portfolio.yourname.com` (Secured with HTTPS automatically)
-   **Local Network:** `http://pixel-play.local` (Requires hosts file edit)
-   **Direct IP:** `http://<server-ip>:3000`
