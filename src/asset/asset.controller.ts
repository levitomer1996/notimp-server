import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
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
  @Get(':id')
  getUserAssets(@Param('id') id: string): Promise<Asset[]> {
    return this.assetService.getUserAssets(id);
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
}
