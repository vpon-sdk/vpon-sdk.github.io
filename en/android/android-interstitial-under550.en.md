---
layout:         "android"
title:          "Android - Interstitial Ad"
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       android/interstitial-under550/
lang:           "en"
---
# Overview
---
Interstitials, on the other hand, immediately present rich HTML5 experiences or "web apps" at natural app transition points such as launch, video pre-roll or game level load. Web apps are in-app browsing experiences with a simple close button rather than any navigation bar—the content provides its own internal navigation scheme. Interstitial ads are typically more expensive and subject to impression constraints.
![]({{site.imgurl}}/Interstitial.png)

> **Note**: We suggest that you should put the interstitial ads in the portrait mode for the best visual performance.

# Prerequisites
---
Please make sure you've imported Vpon SDK to your Xcode project. If not, please refer to our [Integration Guide]({{site.baseurl}}/andoird/integration-guide/) to finish your setting.


# Start To Implement Interstitial Ad
---
The richer, more heavyweight nature of Vpadn interstitial is reflected by its definition not as a UIView but rather an NSObject requiring more distinct instantiation, load and display steps.

Usage is nevertheless very similar to Vpadn banner:

1. Import com.vpon.ads.*
2. Declare a VponInterstitialAd instance and indicate a License Key
3. Set up VponAdRequest object and send ad request
4. Show Interstitial Ad
5. Implement AdListener

We strongly recommend that you can finish all the steps in the Activity of the application.

## Declare A VponInterstitialAd Instance and Send Ad Request
---
```java
import com.vpon.ads.*;

public class MainActivity extends AppCompatActivity {

    private String interstitialId = "License Key";
    // interstitialId: Vpon License Key to get ad, please replace with your own one

    private VponInterstitialAd vponInterstitialAd;
    
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        vponInterstitialAd = new VponInterstitialAd(this, interstitialId);

        VponAdRequest.Builder builder = new VponAdRequest.Builder();
        builder.addTestDevice("your device advertising id");
        // Set your test device's GAID here if you're trying to get Vpon test ad
        vponInterstitialAd.loadAd(builder.build()); 
        // Set ad request and load ad
    }
```

>**Note:**
>
>* A VponInterstitialAd object can request and display for couples of Interstitial Ad repeatedly. It would be fine if you only declare one.
>* Please notice that you can only display Interstitial Ad after the ad received successfully.
>* If you want to know more about target setting, please refer to [Advanced Setting](../advanced).


## Show Interstitial Ad
---
Please avoid to show Interstitial Ad right away after ad request. We recommend that you can request Interstitial Ad first and show it in a specific moment. For example, you can implement VponAdListener and show ad when onAdLoaded triggered.

```java
public class MainActivity extends AppCompatActivity {

@Override
public void onAdLoaded() {
    if (vponInterstitialAd.isReady()) {
        // Show Interstitial Ad
        vponIntersitialAd.show();
        }
    }
}
```

>**Note:** You can loadAd() to get new ad after you call show().

## Implement AdListener
---
```java
vponIntersitialAd.setAdListener(new VponAdListener() {
    
    @Override
    public void onAdLoaded() {
        // Invoked if receive Interstitial Ad successfully
        if (vponInterstitialAd.isReady()) {
            // Show Interstitial Ad
            vponIntersitialAd.show();
            }
        }

    @Override
    public void onAdFailedToLoad(int errorCode) {
        // Invoked if received ad fail, check this callback to indicates what type of failure occurred
        }

    @Override
    public void onAdOpened() {
        // Invoked if the Interstitial Ad was clicked
        }

    @Override
    public void onAdLeftApplication() {
        // Invoked if user leave the app and the current app was backgrounded
        }

    @Override
    public void onAdClosed() {
        // Invoked if the Interstitial Ad was closed

        vponInterstitialAd.loadAd(new VponAdRequest.Builder().build());
        // Load next ad if needed
        }
});
```

## Ad Lifecycle Handling
---
To make the Ads work more smoothly and release resource appropriately, we recommend that you can add below code snippets in the Activity Lifecycle.

```java
@Override
protected void onResume() {
    super.onResume();

    if (vponInterstitialAd != null) {
        vponInterstitialAd.resume();
    }
}

@Override
protected void onPause() {
    super.onPause();

    if (vponInterstitialAd != null) {
        vponInterstitialAd.pause();
    }
}

@Override
protected void onDestroy() {
    super.onDestroy();
    if (vponInterstitialAd != null) {
        vponInterstitialAd.destroy();
        vponInterstitialAd = null;
    }
}
```

# Tips
---

* We recommend that it would be better to request ad first and show it when a specific event triggered.
* Please avoid calling show() before sending ad request.
* Please follow our [Integration Guide]({{site.baseurl}}/andoird/integration-guide/) to add VponAdActivity in your AndroidManifest.xml.


### Make Sure If The Ad Display Successfully

Please note that following settings which might cause the ad invisible on the screen are not allowed:

* Set AdView as Invisible
* Set the Alpha value of AdView < 100%
* Overlays that cover the AdView


Please help to check if below log printed after the ad display and match the viewability standard:

```
I/VPON: [::Impression::]  response.code : 200
```


### Sample Code
Please refer to our [Sample Code] for a complete integration sample.

### Integration Guide For Vpon SDK v4.9
Please refer to [Interstitial Ad Integration Guide](../interstitial-under5) if you want to know more about the integration that compatible with Vpon SDK v4.9 and below version.

[Sample Code]: ../download/
