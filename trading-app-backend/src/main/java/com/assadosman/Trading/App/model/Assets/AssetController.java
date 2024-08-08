package com.assadosman.Trading.App.model.Assets;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Optional;

@RestController
public class AssetController {
    private AssetRepo assetRepo;

    public AssetController(AssetRepo assetRepo) {
        this.assetRepo = assetRepo;
    }

    @GetMapping(path="/api/assets/{name}")
    public ResponseEntity<AssetEntity> respondGetRequest(@PathVariable("name") String name){
        Optional<AssetEntity> optionalAsset = assetRepo.findById(name);
        if (optionalAsset.isPresent()){
            return new ResponseEntity<>(optionalAsset.get(), HttpStatus.FOUND);
        }else{
            AssetEntity asset = AssetEntity.builder()
                    .prices(new ArrayList<>())
                    .marketCap(0)
                    .name(name)
                    .build();
            assetRepo.save(asset);
            return new ResponseEntity<>(asset, HttpStatus.CREATED);
        }
    }
}
