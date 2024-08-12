package com.assadosman.Trading.App.model.Assets;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path="api/assets")
public class AssetController {

    private AssetRepo assetRepo;

    public AssetController(AssetRepo assetRepo) {
        this.assetRepo = assetRepo;
    }

//    @GetMapping(path="/api/assets/{name}")
//    public ResponseEntity<AssetEntity> respondGetRequest(@PathVariable("name") String name){
//        Optional<AssetEntity> optionalAsset = assetRepo.findById(name);
//        if (optionalAsset.isPresent()){
//            return new ResponseEntity<>(optionalAsset.get(), HttpStatus.FOUND);
//        }else{
//            AssetEntity asset = AssetEntity.builder()
//                    .price1(1.0)
//                    .marketCap(0)
//                    .name(name)
//                    .build();
//            assetRepo.save(asset);
//            return new ResponseEntity<>(asset, HttpStatus.CREATED);
//        }
//    }
}
