package com.assadosman.Trading.App.model.Assets.Data;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@AllArgsConstructor
@Data
public class PriceDay {
    private String open, high, low, close, volume, adj_high, adj_low, adj_close, adj_open, adj_colume, split_factor, dividend, symbol, exchange, date;

}
