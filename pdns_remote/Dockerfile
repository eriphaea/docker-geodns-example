FROM fedora:35

RUN sed -i '/tsflags=nodocs/d' /etc/dnf/dnf.conf \
  && dnf -y --setopt=install_weak_deps=False install \
    hostname \
    pdns \
    pdns-backend-remote \
    python3-pip \
    python3-setuptools \
  && dnf clean all

RUN pip3 install --no-cache-dir 'Jinja2<3.1' envtpl

ENV VERSION=4.6 \
  PDNS_guardian=yes \
  PDNS_setuid=pdns \
  PDNS_setgid=pdns \
  PDNS_launch=remote

EXPOSE 53 53/udp

COPY pdns.conf.tpl /
COPY docker-entrypoint.sh /

RUN chmod +x /docker-entrypoint.sh
ENTRYPOINT [ "/docker-entrypoint.sh" ]

CMD [ "/usr/sbin/pdns_server" ]
