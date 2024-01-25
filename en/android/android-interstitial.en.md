---
layout:         "android"
title:          "Android - Interstitial Ad"
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       android/interstitial/
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
5. Implement VponInterstitialAdLoadCallback / VponFullScreenContentCallback

We strongly recommend that you can finish all the steps in the Activity of the application.

## Declare A VponInterstitialAd Instance and Send Ad Request
---
```java
import com.vpon.ads.*;

public class MainActivity extends AppCompatActivity {

    private String interstitialId = "License Key";
    // interstitialId: Vpon License Key to get ad, please replace with your own one

    
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);


        VponAdRequest.Builder builder = new VponAdRequest.Builder();
        builder.addTestDevice("your device advertising id");
        // Set your test device's GAID here if you're trying to get Vpon test ad
        VponInterstitialAd.loadAd(this, interstitialId, builder.build());
        // Set ad request and load ad
    }
}
```

>**Note:**
>
>* A VponInterstitialAd object can request and display for couples of Interstitial Ad repeatedly. It would be fine if you only declare one.
>* Please notice that you can only display Interstitial Ad after the ad received successfully.
>* If you want to know more about target setting, please refer to [Advanced Setting](../advanced).


## Show Interstitial Ad
---
Please avoid to show Interstitial Ad right away after ad request. We recommend that you can request Interstitial Ad first and show it in a specific moment. For example, you can implement VponInterstitialAdLoadCallback and show ad when onAdLoaded triggered.

```java
public class MainActivity extends AppCompatActivity {

@Override
public void onAdLoaded(VponInterstitialAd ad) {
        // Show Interstitial Ad
        ad.show();
}
}
```

>**Note:** You can VponInterstitialAd.loadAd() to get new ad after you call show().

## Implement VponInterstitialAdLoadCallback and VponFullScreenContentCallback
---
```java
VponFullScreenContentCallback fullScreenContentCallback = new VponFullScreenContentCallback(){
    @Override
    public void onAdClicked() {
        // Invoked while ad has been clicked
    }
    @Override
    public void onAdDismissedFullScreenContent() {
        // Invoked while ad has been closed
    }
    @Override
    public void onAdFailedToShowFullScreenContent(int errorCode) {
        // Invoked if received ad fail, check this callback to indicates what type of failure occurred
    }
    @Override
    public void onAdImpression() {
        // Invoked while ad has been determined as impression
    }
    @Override
    public void onAdShowedFullScreenContent() {
        // Invoked while ad has been shown
    }
};

VponInterstitialAdLoadCallback adLoadCallback = new VponInterstitialAdLoadCallback(){
    @Override
    public void onAdLoaded(VponInterstitialAd ad) {
        ad.setFullScreenContentCallback(fullScreenContentCallback);
        // Show Interstitial Ad
        ad.show();
    }

    @Override
    public void onAdFailedToLoad(@NonNull VponAdRequest.VponErrorCode adError) {
        // Invoked if received ad fail, check this callback to indicates what type of failure occurred
    }
};
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

### Integration Guide For Vpon SDK v5.5
Please refer to [Interstitial Ad Integration Guide](../interstitial-under550) if you want to know more about the integration that compatible with Vpon SDK v5.5 and below version.

[Sample Code]: ../download/
