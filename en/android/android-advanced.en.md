---
layout:         "android"
title:          "Android - Advanced"
lead:           "Optimizing your ads performance from advanced skills here."
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       android/advanced/
lang:           "en"
---
# VpadnAdRequest
  -----------------------------
Before being passed to `VpadnBanner.loadAd`, a `VpadnAdRequest` may be customized to allow Vpon to better target banners.

## Assign Ads for devices

You can use these properties to specify a device or set of devices that will receive test banner.
You should utilize this property during development to avoid generating false impressions.
To verify that you've integrated the SDK correctly, add your test device, run your application, and click on the displayed test banner.

```java
  VpadnAdRequest request = new VpadnAdRequest();
  request.addTestDevice("your test device advertising id");
  //TODO: fill in your device advertising id
```

## Targeting

Location and demographic targeting information may also be specified. Out of respect for user privacy, please only specify location and demographic data if the information is already required by your app.

```java
  VpadnAdRequest request = new VpadnAdRequest();
  request.setGender(VpadnAdRequest.Gender.FEMALE);
  request.setBirthday("1977-08-23");
```
where the user's location is obtained by a suitable method.


# VpadnAdListener
---

You may optionally track ad lifecycle events like request failures or "click-through" by implementing `com.vpadn.ads.VpadnAdListener` in an object you pass to `VpadnBanner.setAdListener`.

```java
   public interface VpadnAdListener {
     void onVpadnReceiveAd(VpadnAd ad);
     void onVpadnFailedToReceiveAd(VpadnAd ad, VpadnAdRequest.VpadnErrorCode errorCode);
     void onVpadnPresentScreen(VpadnAd ad);
     void onVpadnDismissScreen(VpadnAd ad);
     void onVpadnLeaveApplication(VpadnAd ad);
   }
```

This interface may be implemented by your activity or any other object:

```java
  import com.vpadn.ads.*;
  public class VpadnBannerExample extends Activity implements VpadnAdListener {
  //TODO: Implements all interface methods }
}
```

and then passed to the `VponBanner`:

```java
  vponBanner.setAdListener(this);
```

`public void onVpadnReceiveAd(VpadnAd ad)`
  Sent when VpadnBanner.loadAd has succeeded.
`public void onFailedToReceiveAd(VpadnAd ad, VpadnAdRequest.VpadnErrorCode error)`
  Sent when loadAd has failed, typically because of network failure, an application configuration error, or a lack of ad inventory.

  You may wish to log these events for debugging:


```java
  @Override public void onFailedToReceiveAd(VpadnAd ad, VpadnAdRequest.VpadnErrorCode errorCode) { Log.d(MY_LOG_TAG, "failed to receive ad (" + errorCode + ")"); }
```

`public void onVpadnPresentScreen(VpadnAd ad)`
   Called when an Activity is created in front of your app, presenting the user with a full-screen ad UI in response to their touching banner.
`public void onVpadnDismissScreen(VpadnAd ad)`
   Called when the full-screen Activity presented with onPresentScreen has been dismissed and control is returning to your app.
`public void onVpadnLeaveApplication(VpadnAd ad)`
   Called when a banner touch will launch a new application.




# Corona User
---
1. Please refer to [Vpon Web SDK Integration Guide]({{site.baseurl}}/web/) to prepare a HTML file with ad request
2. Load the HTML file in WebView, for example, webView:request("localfile.html", system.ResourceDirectory)

> **Note:** To know more about Corona, please refer to [Corona Document](http://docs.coronalabs.com/api/library/native/newWebView.html)

[Register as a Vpon Publisher]: {{ site.baseurl }}/android/registration/