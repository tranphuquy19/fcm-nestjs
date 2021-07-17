import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { Inject, Logger } from '@nestjs/common';
import { FCM_OPTIONS } from '../fcm.constants';
import { FcmOptions } from '../interfaces/fcm-options.interface';
import * as firebaseAdmin from 'firebase-admin';

@Injectable()
export class FcmService {
  constructor(
    @Inject(FCM_OPTIONS) private fcmOptionsProvider: FcmOptions,
    private readonly logger: Logger,
  ) {
    if (firebaseAdmin.apps.length === 0) {
      firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.cert(
          this.fcmOptionsProvider.firebaseSpecsPath,
        ),
      });
    }
  }

  private readonly options = {
    priority: 'high',
    timeToLive: 60 * 60 * 24,
  };

  private readonly optionsSilent = {
    priority: 'high',
    timeToLive: 60 * 60 * 24,
    content_available: true,
  };

  async sendNotification(
    deviceIds: Array<string>,
    payload: firebaseAdmin.messaging.MessagingPayload,
    silent: boolean,
  ) {
    if (deviceIds.length == 0) {
      throw new Error('You provide an empty device ids list!');
    }

    let result = null;
    try {
      result = await firebaseAdmin
        .messaging()
        .sendToDevice(
          deviceIds,
          payload,
          silent ? this.optionsSilent : this.options,
        );
    } catch (error) {
      this.logger.error(error.message, error.stackTrace, 'fcm-nestjs');
      throw error;
    }
    return result;
  }

  /**
   *
   * @param topic `all` is send to all devices
   * @param payload ref: firebaseAdmin.messaging.MessagingPayload
   * @param silent
   * @returns
   */
  async sendToTopic(
    topic: 'all' | string,
    payload: firebaseAdmin.messaging.MessagingPayload,
    silent: boolean,
  ) {
    if (!topic && topic.trim().length === 0) {
      throw new Error('You provide an empty topic name!');
    }

    let result = null;
    try {
      result = await firebaseAdmin
        .messaging()
        .sendToTopic(
          topic,
          payload,
          silent ? this.optionsSilent : this.options,
        );
    } catch (error) {
      this.logger.error(error.message, error.stackTrace, 'fcm-nestjs');
      throw error;
    }
    return result;
  }
}
