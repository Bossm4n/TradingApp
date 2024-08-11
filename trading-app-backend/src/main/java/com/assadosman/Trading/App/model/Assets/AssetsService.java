package com.assadosman.Trading.App.model.Assets;

import org.springframework.stereotype.Service;

@Service
public class AssetsService {
    AssetRepo assetRepo;

    public AssetsService(AssetRepo assetRepo) {
        this.assetRepo = assetRepo;
    }

    public AssetEntity getAssetByID(Integer assetID){
        if(assetRepo.existsById(assetID)){
            return assetRepo.getReferenceById(assetID);
        }
        else {
            throw new IllegalStateException("No Asset with the ID " + assetID);
        }
    }
}
