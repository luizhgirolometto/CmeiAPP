import { Component } from "@angular/core";
import { Platform, AlertController } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { OneSignal } from "@ionic-native/onesignal/ngx";
import { environment } from "src/environments/environment.prod";
import { AdmobFreeService } from './services/admobfree.service';

@Component({
  selector: "app-root",
  templateUrl: "app.component.html"
})
export class AppComponent {
  public appPages = [
    {
      title: "Home",
      url: "/home",
      icon: "home"
    },
    {
      title: "Favoritos",
      url: "/bookmark",
      icon: "bookmark"
    },
    {
      title: "Contato",
      url: "/contact",
      icon: "mail-open"
    },
    {
      title: "Sobre",
      url: "/about",
      icon: "information-circle"
    },
    {
      title: "Termos e condição",
      url: "/term",
      icon: "construct"
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private oneSignal: OneSignal,
    private alertCtrl: AlertController,
    private admobFreeService: AdmobFreeService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.admobFreeService.BannerAd();
      this.showInterstitial();

      if (this.platform.is("cordova")) {
        this.setupPush();
      }
    });
  }

  setupPush() {
    this.oneSignal.startInit(environment.ONESIGNAL_APP_ID, "com.equiz.app"); //YOUR ANDROID ID
    this.oneSignal.inFocusDisplaying(
      this.oneSignal.OSInFocusDisplayOption.None
    );

    // Notifcation was received in general
    this.oneSignal.handleNotificationReceived().subscribe(data => {
      let msg = data.payload.body;
      let title = data.payload.title;
      let additionalData = data.payload.additionalData;
      this.showAlert(title, msg, additionalData.task);
    });

    // Notification was really clicked/opened
    this.oneSignal.handleNotificationOpened().subscribe(data => {
      // Just a note that the data is a different place here!
      let additionalData = data.notification.payload.additionalData;

      this.showAlert(
        "Notificação aberta",
        "Você já leu isso antes",
        additionalData.task
      );
    });

    this.oneSignal.endInit();
  }

  async showAlert(title, msg, task) {
    const alert = await this.alertCtrl.create({
      header: title,
      subHeader: msg,
      buttons: [
        {
          text: `Action: ${task}`,
          handler: () => {
            // E.g: Navigate to a specific screen
          }
        }
      ]
    });
    alert.present();
  }

  showInterstitial() {
    this.admobFreeService.InterstitialAd();
  }
}
