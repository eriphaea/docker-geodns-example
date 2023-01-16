import { Injectable } from '@nestjs/common';
import {Like, Not} from 'typeorm';
import * as geoIp from 'fast-geoip';

import * as continentList from '../../assets/continents.json';
import { Record } from '../entities/record.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Domain } from '../entities/domain.entity';
import { DomainInfo } from './types';
import { DomainMetaData } from '../entities/domain-metadata.entity';

@Injectable()
export class CommonService {
  continentsList = continentList;

  constructor(
    @InjectRepository(Record)
    private readonly recordRepository: Repository<Record>,
    @InjectRepository(Domain)
    private readonly domainRepository: Repository<Domain>,
    @InjectRepository(DomainMetaData)
    private readonly domainMetaDataRepository: Repository<DomainMetaData>,
  ) {}

  async lookup(name: string, type: string | undefined, ip: string) {
    const isAllRecords = name.indexOf('*.') === 0;

    if (isAllRecords)
      name = name.replace(/\*\./, '');

    const records = await this.recordRepository.find({
      where: { type, name: Like('%' + name), disabled: false },
    });

    let country = await this.getCountryCode(ip);

    if (!country) country = 'US';

    const continent = this.getContinent(country);

    const responseRecords = records
      .filter(
        (i) =>
          i.name.split('.')[0] === continent.toLowerCase() ||
          i.name.split('.')[0] === country.toLowerCase() ||
          i.name.split('.')[0] === 'default' ||
          i.name.split('.')[0] === '@' ||
          i.name.split('.').length === 2,
      ).sort((i) => +(i.name.split('.')[0] === 'default') - 1);

    if (responseRecords.length) {
      return this.transformRecordToResponse(responseRecords, name, isAllRecords);
    }

    return false;
  }

  getContinent(countryCode: string) {
    return this.continentsList[countryCode];
  }

  async getCountryCode(ip: string) {
    const geoResponse = await geoIp.lookup(ip);

    return geoResponse?.country;
  }

  getSubdomain(hostname: string) {
    return hostname.split('.').slice(0, -2).join('.');
  }

  transformRecordToResponse(records: Record[], name: string, isAllRecords: boolean) {
    return records.map((i) => {
      return {
        qtype: i.type,
        qname: isAllRecords ? i.name : name,
        content: i.content,
        ttl: i.ttl,
      };
    });
  }

  async getAllDomains(includeDisabled: boolean) {
    const domains = await this.domainRepository.find();

    const domainsMetadata = await this.domainMetaDataRepository.find();

    const domainsMetadataObject = domainsMetadata.reduce(
      (obj, i) => Object.assign(obj, { [i.domain_id]: i }, {}),
      0,
    );

    const result = domains.map(
      (i) =>
        <DomainInfo>{
          id: i.id,
          zone: i.name,
          notified_serial: i.notified_serial,
          kind: domainsMetadataObject[i.id].kind,
        },
    );

    return {
      result,
    };
  }
}
