package com.assadosman.Trading.App.model.Assets;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


import java.util.List;

@Configuration
public class AssetConfig {

    @Bean
    CommandLineRunner commandLineRunnerAsset(AssetRepo repository){
        return args -> {
            AssetEntity asset1 = new AssetEntity(1d,30,"apple");
            AssetEntity asset2 = new AssetEntity(2d,50,"samsung");

            repository.saveAll(List.of(asset1,asset2));
        };
    }

}
