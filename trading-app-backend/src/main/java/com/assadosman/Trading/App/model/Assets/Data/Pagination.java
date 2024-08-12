package com.assadosman.Trading.App.model.Assets.Data;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class Pagination {
    private int limit,offset, count,total;
}
