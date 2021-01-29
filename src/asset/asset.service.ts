import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { AppGateWay } from '../app.gateway';
import { User } from '../auth/user.schema';
import { ImageApi } from '../image/Image.model';
import { Asset } from './asset.schema';
import { NewRateDTO } from './DTO/NewRate.dto';

@Injectable()
export class AssetService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Asset.name) private assetModel: Model<Asset>,
    @InjectModel(ImageApi.name) private imageModel: Model<ImageApi>,
    @InjectConnection() private connection: Connection,
    private gateWay: AppGateWay,
  ) {}
  private logger = new Logger('Asset Service');

  async newAsset(newAsset: Asset) {
    this.logger.log(newAsset);
    this.logger.log('Creating new asset...');
    newAsset.rate = [];
    newAsset.time_Posted = Date.now();

    const asset = new this.assetModel(newAsset);

    try {
      this.logger.log('Trying to save new asset...');
      await asset.save();
      this.logger.log(newAsset.title + ' created');
      this.gateWay.wss.emit('newAsset', 'New asset');
    } catch (error) {
      this.logger.log(error);
    }
  }

  async getAssets(): Promise<Asset[]> {
    try {
      this.logger.log('Searching for assests');
      const list = await this.assetModel.find().exec();
      this.logger.log('Found list and returning back to user');
      return list;
    } catch (error) {
      this.logger.log(error);
    }
  }
  async getUserAssets(uid: string): Promise<Asset[]> {
    this.logger.log('Looking assets of user - ' + uid);
    const list = await this.assetModel.find({ uid });
    this.logger.log(`Found ${list.length}  Assets`);
    return list;
  }
  async getAssetDetails(id: string): Promise<Asset> {
    try {
      this.logger.log('Searcing for asset...');
      const asset = await this.assetModel.findById(id);
      this.logger.log(asset);
      this.logger.log('Asset found and beeing returned to UI');
      return asset;
    } catch (error) {
      throw new BadRequestException();
    }
  }
  async findAssetByTitle(title: string): Promise<Asset[]> {
    const assetList = await this.assetModel.find({ title: { $regex: title } });
    return assetList;
  }
  async updateRate(body: NewRateDTO) {
    const { rate_number, uid, assetId } = body;
    try {
      this.logger.log('Searching for asset');
      const foundRates = await this.assetModel.findById(assetId);
      this.logger.log('Found asset. attempting update.');
      const newRatesList = [...foundRates.rate, { rate_number, uid }];
      await this.assetModel.findOneAndUpdate(
        { _id: assetId },
        { rate: newRatesList },
      );
      this.logger.log('Asset rate was update');
    } catch (error) {}
  }
}
