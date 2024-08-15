package com.assadosman.Trading.App.model.Assets;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AssetsService {
    private AssetRepo assetRepo;
    private ObjectMapper objectMapper;

    public AssetsService(AssetRepo assetRepo) {
        this.assetRepo = assetRepo;
        this.objectMapper = new ObjectMapper();
    }

    public Double getCurrentPrice(String id) throws JsonProcessingException {
        Optional<AssetEntity> doc = assetRepo.findById(id);
        String json = doc.get().getPrices();
        List<Double> prices = objectMapper.readValue(json, new TypeReference<List<Double>>() {});
        return prices.get(prices.size() - 1);
    }

}
