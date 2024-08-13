package com.assadosman.Trading.App.model.Assets;

import org.springframework.stereotype.Service;

@Service
public class AssetsService {
    AssetRepo assetRepo;

    public AssetsService(AssetRepo assetRepo) {
        this.assetRepo = assetRepo;
    }

    public AssetEntity getAssetByISIN(String assetISIN){
        if(assetRepo.existsByISIN(assetISIN)){
            return assetRepo.getReferenceByISIN(assetISIN);
        }
        else {
            throw new IllegalStateException("No Asset with the ISIN " + assetISIN);
        }
    }
}
