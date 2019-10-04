import { Injectable } from '@angular/core';
import { SocialSharing } from "@ionic-native/social-sharing/ngx";

@Injectable({
  providedIn: 'root'
})
export class ShareService {
  constructor(private socialSharing: SocialSharing) { }

  share(message: string, subject: string) {
    this.socialSharing
      .share(message, subject, null, "https://play.google.com/store/apps/details?id=com.equiz.app")
      .then(() => { })
      .catch(() => { });
  }
}
