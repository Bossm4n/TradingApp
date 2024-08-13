package com.assadosman.Trading.App.model.Assets;

import com.assadosman.Trading.App.model.Assets.Data.PriceDay;
import com.assadosman.Trading.App.model.Assets.Data.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path="api/assets")
public class AssetController {

    private AssetRepo assetRepo;
    private RestTemplate restTemplate;

    public AssetController(AssetRepo assetRepo, RestTemplate restTemplate) {
        this.assetRepo = assetRepo;
        this.restTemplate = restTemplate;
    }

    @GetMapping
    public ResponseEntity<AssetEntity> respondGetRequest(@PathVariable("name") String name){
        List<Double> prices = fetchDataFromApi(name);
        Optional<AssetEntity> optionalAsset = assetRepo.findByName(name);
        if (optionalAsset.isPresent()){
            assetRepo.save(AssetEntity.builder()
//                    .prices(prices.toString())
                    .price1(prices.get(prices.size()-1))
                    .marketCap(0)
                    .name(name)
                    .build());
            return new ResponseEntity<>(optionalAsset.get(), HttpStatus.FOUND);
        }else{
            AssetEntity asset = AssetEntity.builder()
//                    .prices(prices.toString())
                    .price1(prices.get(prices.size()-1))
                    .marketCap(0)
                    .name(name)
                    .build();
            assetRepo.save(asset);
            return new ResponseEntity<>(asset, HttpStatus.CREATED);
        }
    }


    public List<Double> fetchDataFromApi(String name){
        String apiUrl = "http://api.marketstack.com/v1/eod?access_key=a154987bdb72eb3a9315cba8015f210b&symbols=" + name;
        Response response= restTemplate.getForObject(apiUrl, Response.class);
        assert response != null;
        List<PriceDay> data = response.getData();
        List<Double> prices = new ArrayList<>();
        for(PriceDay day: data){
            prices.add(Double.parseDouble(day.getOpen()));
            prices.add(Double.parseDouble(day.getClose()));
        }
        return prices;
    }
}
