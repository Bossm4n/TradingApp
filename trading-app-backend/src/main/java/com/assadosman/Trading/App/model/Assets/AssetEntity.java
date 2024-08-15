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
    @Column(length = 4000)
    private String prices;
    private int marketCap;

    @Id
    private final String name;
}