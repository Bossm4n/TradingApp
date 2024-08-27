package com.assadosman.Trading.App.model.Assets;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class AssetsService {
    private AssetRepo assetRepo;
    private ObjectMapper objectMapper;

    public AssetsService(AssetRepo assetRepo) {
        this.assetRepo = assetRepo;
        this.objectMapper = new ObjectMapper();
    }

    public static double generateRandomStockPrice(double basePrice, double volatility) {
        Random random = new Random();
        double changePercent = (random.nextDouble() * 2 - 1) * volatility;
        return Math.round((basePrice * (1 + changePercent / 100)) * 100.0) / 100.0;
    }

    public Double getCurrentPrice(String id) throws JsonProcessingException {
        Optional<AssetEntity> doc = assetRepo.findById(id);
        String json = doc.get().getPrices();
        List<Double> prices = objectMapper.readValue(json, new TypeReference<List<Double>>() {});

        if(prices.isEmpty()){
            double randomPrice = generateRandomStockPrice(100.0, 2.0);
            prices.add(randomPrice);
        }
        return prices.get(prices.size() - 1);
    }

}
