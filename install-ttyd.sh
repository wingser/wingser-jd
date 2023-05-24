#!/bin/bash

# Download ttyd binary from GitHub
wget https://github.com/tsl0922/ttyd/releases/download/1.7.3/ttyd.x86_64 -O /tmp/ttyd

# Move it to /usr/bin and make it executable
sudo mv /tmp/ttyd /usr/bin/ttyd
sudo chmod +x /usr/bin/ttyd

# Create systemd service file
cat <<EOF | sudo tee /etc/systemd/system/ttyd.service
[Unit]
Description=ttyd - Share your terminal over the web
After=network.target

[Service]
User=root
ExecStart=/usr/bin/ttyd -p 7681 -c wingser:wingser bash
Restart=always

[Install]
WantedBy=multi-user.target
EOF

# Reload systemd daemon and start ttyd service
sudo systemctl daemon-reload
sudo systemctl enable ttyd.service
sudo systemctl start ttyd.service

# Check status of ttyd service
sudo systemctl status ttyd.service
