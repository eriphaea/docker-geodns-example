#!/bin/sh

set -euo pipefail

envtpl < /pdns.conf.tpl > /etc/pdns/pdns.conf

exec "$@"
