import { Injectable, HttpService } from '@nestjs/common';

import { AxiosRequestConfig, AxiosResponse } from 'axios';

import { Logger } from '../../logger/logger';

@Injectable()
export class CustomHttpService {
  private readonly logNameSpace = `Service.${CustomHttpService.name}`;
  private readonly logger = Logger.getInstance();

  constructor(private readonly httpService: HttpService) {}

  async post(url: string, payload: any, requestConfig?: AxiosRequestConfig) {
    this.logger.info(
      `${this.logNameSpace}.post.started`,
      '',
      'url:',
      url,
      'payload:',
      payload,
      'requestConfig:',
      requestConfig,
    );

    return await this.httpService
      .post(url, payload, requestConfig)
      .toPromise()
      .then((response: AxiosResponse) => {
        this.logger.info(
          `${this.logNameSpace}.post.success`,
          '',
          'url:',
          url,
          'payload:',
          payload,
          'requestConfig:',
          requestConfig,
          'response:',
          response,
        );

        return response.data;
      });
  }

  async get(url: string, requestConfig?: AxiosRequestConfig) {
    this.logger.info(
      `${this.logNameSpace}.get.started`,
      '',
      'url:',
      url,
      'requestConfig:',
      requestConfig,
    );

    return await this.httpService
      .get(url, requestConfig)
      .toPromise()
      .then((response: AxiosResponse) => {
        this.logger.info(
          `${this.logNameSpace}.get.success`,
          '',
          'url:',
          url,
          'requestConfig:',
          requestConfig,
          'response:',
          response,
        );

        return response.data;
      });
  }

  async delete(url: string, requestConfig?: AxiosRequestConfig) {
    this.logger.info(
      `${this.logNameSpace}.delete.started`,
      '',
      'url:',
      url,
      'requestConfig:',
      requestConfig,
    );

    return await this.httpService
      .delete(url, requestConfig)
      .toPromise()
      .then((response: AxiosResponse) => {
        this.logger.info(
          `${this.logNameSpace}.delete.success`,
          '',
          'url:',
          url,
          'requestConfig:',
          requestConfig,
          'response:',
          response,
        );

        return response.data;
      });
  }
}
