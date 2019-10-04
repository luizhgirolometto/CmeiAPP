import { Injectable } from "@angular/core";
import {
    AdMobFree,
    AdMobFreeBannerConfig,
    AdMobFreeInterstitialConfig,
    AdMobFreeRewardVideoConfig
} from "@ionic-native/admob-free/ngx";
import { Platform } from "@ionic/angular";
import { environment } from 'src/environments/environment.prod';

@Injectable()
export class AdmobFreeService {
    UNIT_ID = environment.AD_UNIT_ID;
    isTesting = environment.IS_TESTING;

    interstitialConfig: AdMobFreeInterstitialConfig = {
        isTesting: this.isTesting,
        autoShow: false,
        id: this.UNIT_ID
    };

    RewardVideoConfig: AdMobFreeRewardVideoConfig = {
        isTesting: this.isTesting,
        autoShow: false,
        id: this.UNIT_ID
    };

    constructor(private admobFree: AdMobFree, public platform: Platform) {
        platform.ready().then(() => {
            this.admobFree.interstitial.config(this.interstitialConfig);
            this.admobFree.interstitial.prepare().then(() => { });

            this.admobFree.rewardVideo.config(this.RewardVideoConfig);
            this.admobFree.rewardVideo.prepare().then(() => { });
        });

        this.admobFree.on("admob.interstitial.events.CLOSE").subscribe(() => {
            this.admobFree.interstitial.prepare().then(() => { });
        });

        this.admobFree.on("admob.rewardvideo.events.CLOSE").subscribe(() => {
            this.admobFree.rewardVideo.prepare().then(() => { });
        });
    }

    BannerAd() {
        let bannerConfig: AdMobFreeBannerConfig = {
            isTesting: this.isTesting,
            autoShow: true,
            id: this.UNIT_ID
        };
        this.admobFree.banner.config(bannerConfig);

        this.admobFree.banner
            .prepare()
            .then(() => { })
            .catch(e => alert(e));
    }

    InterstitialAd() {
        this.admobFree.interstitial.isReady().then(() => {
            this.admobFree.interstitial.show().then(() => { });
        });
    }

    RewardVideoAd() {
        this.admobFree.rewardVideo.isReady().then(() => {
            this.admobFree.rewardVideo.show().then(() => { });
        });
    }
}