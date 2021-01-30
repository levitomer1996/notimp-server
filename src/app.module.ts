import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AssetModule } from './asset/asset.module';
import { AppGateWay } from './app.gateway';
import { FileModule } from './file/file.module';
import { ImageModule } from './image/image.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forRoot(
      'mongodb+srv://tomer:junkerms1@cluster0.vj77n.mongodb.net/notimp?retryWrites=true&w=majority',
    ),
    AssetModule,
    FileModule,
    ImageModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppGateWay],
})
export class AppModule {}
