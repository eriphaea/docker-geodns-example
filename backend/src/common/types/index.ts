export interface ResponseRecord {
  qtype: string;
  qname: string;
  content: string;
  ttl: number;
}

export interface DomainInfo {
  id: number;

  zone: string;

  masters: string[];

  notified_serial: number;
  serial: number;

  last_check: number;

  kind: string;
}
