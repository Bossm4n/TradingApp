package com.assadosman.Trading.App.model.Assets;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AssetRepo extends JpaRepository<AssetEntity, Integer> {
    Optional<AssetEntity> findByName(String name);
    AssetEntity getReferenceByISIN(String ISIN);
    Boolean existsByISIN(String ISIN);
}
