<h1 align="center"></h1>

<div align="center">
  <a href="http://nestjs.com/" target="_blank">
    <img src="https://nestjs.com/img/logo_text.svg" width="150" alt="Nest Logo" />
  </a>
</div>

<h3 align="center">NestJS FCM push notifications module</h3>

<div align="center">
  <a href="https://nestjs.com" target="_blank">
    <img src="https://img.shields.io/badge/built%20with-NestJs-red.svg" alt="Built with NestJS">
  </a>
</div>

_This project forked from [CostianuRazvan/nestjs-fcm](https://github.com/CostianuRazvan/nestjs-fcm)_

### Installation

```bash
npm install --save @doracoder/fcm-nestjs
```

### FcmModule

To user FcmService you must add the module first. **The `FcmModule` has a `@Global()` attribute so you should only import it once**.

```typescript
import { Module } from '@nestjs/common';
import { FcmModule } from '@doracoder/fcm-nestjs';
import * as path from 'path';

@Module({
  imports: [
    FcmModule.forRoot({
      firebaseSpecsPath: path.join(__dirname, '../firebase.spec.json'),
    }),
  ],
  controllers: [],
})
export class AppModule {}
```

### `FcmService` use firebase.spec.json file to send notifications using firebase-admin dependency.

```typescript
@Injectable()
export class SampleService {
  constructor(private readonly fcmService: FcmService) {}

  async sendToDevices() {
    await this.fcmService.sendNotification([
      'device_token_1',
      'device_token_2',
      ]
      payload,
      silent,
    );
  }

  async sendToTopic(topic: string) {
    await this.fcmService.sendToTopic(
      topic,
      payload,
      silent,
    );
  }
}
```

## Change Log

See [Changelog](CHANGELOG.md) for more information.

## Contributing

Contributions welcome! See [Contributing](CONTRIBUTING.md).

## Author

**Tran Quy**

## License

Licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
