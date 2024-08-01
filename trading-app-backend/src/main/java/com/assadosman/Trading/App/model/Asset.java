package com.assadosman.Trading.App.model;

public class Asset {
    private int price;
    private int marketCap;

    public Asset(int price, int marketCap) {
        this.price = price;
        this.marketCap = marketCap;
    }

    public int getPrice() {
        return price;
    }

    public int getMarketCap() {
        return marketCap;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public void setMarketCap(int marketCap) {
        this.marketCap = marketCap;
    }
    
}
