package com.assadosman.Trading.App.model.Assets;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name="assets")
public class AssetEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Double price1;
    private int marketCap;
    private String name;

    public AssetEntity() {

    }

    public AssetEntity(Integer id, Double price1, int marketCap, String name) {
        this.price1 = price1;
        this.marketCap = marketCap;
        this.id = id;
        this.name = name;
    }

    public AssetEntity(Double price1, int marketCap, String name) {
        this.price1 = price1;
        this.marketCap = marketCap;
        this.name = name;
    }

    //
//    private final String name;

    public Double getCurrentPrice(){
        return price1;
    }
}
