package com.assadosman.Trading.App.model.Assets.Data;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@AllArgsConstructor
@Data
public class Response {
    private List<PriceDay> data;
    private Pagination pagination;
}
