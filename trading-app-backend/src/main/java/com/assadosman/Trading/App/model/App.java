package com.assadosman.Trading.App.model;

import java.util.Collection;

public class App {
    private User user;
    private Collection<Asset> assets;
    public App(User user, Collection<Asset> assets){
        this.user = user;
        this.assets = assets;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Collection<Asset> getAssets() {
        return assets;
    }

    public Asset getAsset(String assetName){
        // Loops through all assets to see if there is an asset with that name and returns it else returns null
        for(Asset asset: this.assets){
            if(asset.getName().equals(assetName)){
                return asset;
            }
        }
        return null;
    }

    public void addAsset(Asset asset) {
        this.assets.add(asset);
    }
}
