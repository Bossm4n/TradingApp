package com.assadosman.Trading.App.model.Assets;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor(force = true)
@Builder
@Table(name="assets")
public class AssetEntity {

    private List<Double> prices;
    private int marketCap;

    @Id
    private final String name;

    public Double getCurrentPrice(){
        return prices.get(prices.size()-1);
    }
}
