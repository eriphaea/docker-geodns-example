sudo systemctl stop systemd-resolved
sudo systemctl disable systemd-resolved

ls -lh /etc/resolv.conf
sudo unlink /etc/resolv.conf

echo "nameserver 8.8.8.8" | sudo tee /etc/resolv.conf
