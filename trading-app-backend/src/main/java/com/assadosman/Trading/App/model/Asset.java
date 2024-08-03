package com.assadosman.Trading.App.model;

public class Asset {
    private int price;
    private int marketCap;
    private final String name;
    private final String ISIN;

    public Asset(int price, int marketCap, String name, String ISIN) {
        this.price = price;
        this.marketCap = marketCap;
        this.name = name;
        this.ISIN = ISIN;
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

    public String getName() {
        return name;
    }

    public String getISIN() {
        return ISIN;
    }
}
