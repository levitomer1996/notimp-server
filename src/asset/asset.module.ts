import { HttpException, HttpStatus, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { MulterModule } from '@nestjs/platform-express';
import { extname } from 'path';
import { AppGateWay } from '../app.gateway';
import { JwtStrategy } from '../auth/jwt.strategy';
import { User, UserSchema } from '../auth/user.schema';
import { ImageApi, ImageApiSchema } from '../image/Image.model';
import { AssetController } from './asset.controller';
import { Asset, AssetSchema } from './asset.schema';
import { AssetService } from './asset.service';
const imageFilter = function(req, file, cb) {
  // accept image only

  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    cb(
      new HttpException(
        `Unsupported file type ${extname(file.originalname)}`,
        HttpStatus.BAD_REQUEST,
      ),
      false,
    );
  }
  cb(null, true);
};
@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Asset.name, schema: AssetSchema }]),
    MongooseModule.forFeature([
      { name: ImageApi.name, schema: ImageApiSchema },
    ]),
    MulterModule.registerAsync({
      useFactory: () => ({
        fileFilter: imageFilter,
      }),
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'tomer',
      signOptions: {
        expiresIn: 3600,
      },
    }),
  ],
  controllers: [AssetController],
  providers: [AssetService, AppGateWay],
})
export class AssetModule {}
