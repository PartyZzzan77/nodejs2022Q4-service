import { Injectable, Scope, ConsoleLogger } from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class Logger extends ConsoleLogger {
  requestLog({
    url,
    params,
    body,
    statusCode,
  }: {
    url: any;
    params: any;
    body: any;
    statusCode: any;
  }) {
    this.log(
      `➡️ url: ${url} params: ${JSON.stringify(params)} body: ${JSON.stringify(
        body,
      )} CODE: ${statusCode}`,
    );
  }
}
