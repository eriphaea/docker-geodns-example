import {
  Controller,
  Get,
  Headers,
  HttpCode,
  Param,
  Query,
} from '@nestjs/common';
import { CommonService } from './common.service';

@Controller()
export class CommonController {
  constructor(private readonly commonService: CommonService) {}

  @Get('lookup/:qname/:qtype')
  async lookup(
    @Param('qname') qname: string,
    @Param('qtype') qtype: string,
    @Headers() headers,
    @Headers('X-RemoteBackend-remote') ip: string,
  ) {
    console.log(qname.slice(0, -1).toLowerCase(), qtype);
    console.log(headers);

    const result = await this.commonService.lookup(
      qname.slice(0, -1).toLowerCase(),
      qtype === 'ANY' ? void 0 : qtype,
      ip,
    );

    return { result };
  }

  @Get('getAllDomains')
  getAllDomains(@Query('includeDisabled') includeDisabled: string) {
    return this.commonService.getAllDomains(includeDisabled === 'true');
  }

  @Get('getDomainMetadata')
  getDomainMetadata() {
    return { result: [] };
  }

  @Get('*')
  @HttpCode(200)
  response() {
    return { result: false };
  }
}
