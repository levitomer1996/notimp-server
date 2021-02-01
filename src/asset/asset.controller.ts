import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { GetUser } from '../auth/get-user.decorator';
import { Asset } from './asset.schema';
import { AssetService } from './asset.service';

@Controller('asset')
export class AssetController {
  constructor(private assetService: AssetService) {}
  private logger = new Logger('Asset controller');
  @Post('/new')
  newAsset(@Body() newAsset) {
    this.logger.log(newAsset);
    return this.assetService.newAsset(newAsset);
  }
  @Get()
  getAssets(): Promise<Asset[]> {
    return this.assetService.getAssets();
  }
  @Get('userassets')
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  getUserAssets(@GetUser() user): Promise<Asset[]> {
    const { _id } = user;
    return this.assetService.getUserAssets(_id);
  }

  @Get('getasset/:id')
  getAssetDetails(@Param('id') id: string): Promise<Asset> {
    return this.assetService.getAssetDetails(id);
  }
  @Post('find')
  async findAsset(@Body() body): Promise<Asset[]> {
    const { title } = body;
    return this.assetService.findAssetByTitle(title);
  }
  @Post('updaterate')
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  updateRate(@GetUser() user, @Body() body) {
    console.log(user);
    const { assetId, rate_number } = body;
    return this.assetService.updateRate({
      assetId,
      rate_number,
      uid: user._id,
    });
  }
}
