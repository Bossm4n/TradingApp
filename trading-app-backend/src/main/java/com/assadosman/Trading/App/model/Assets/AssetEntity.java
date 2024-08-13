package com.assadosman.Trading.App.model.Assets;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor(force = true)
@Builder
@Table(name="assets")
public class AssetEntity {

    @Id
    private String ISIN;

    private Double price1;
    private int marketCap;
    private String name;

    //
//    private final String name;

    public Double getCurrentPrice(){
        return price1;
    }
}
