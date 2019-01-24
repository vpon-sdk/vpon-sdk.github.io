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
Please make sure you've imported Vpon SDK to your Xcode project. If not, please refer to our [Integration Guide]({{site.baseurl}}/andoird/integration-guide/) to finish your setting.


# Start To Implement Interstitial
---
The richer, more heavyweight nature of Vpadn interstitial is reflected by its definition not as a UIView but rather an NSObject requiring more distinct instantiation, load and display steps.

Usage is nevertheless very similar to Vpadn banner:

1. Import `com.vpadn.ads.*`
2. Declare a `VpadnInterstitialAd` instance
3. Set up VpadnInterstitialAd instance and indicate a License Key
4. Request for an Interstitial Ad
5. Show Interstitial Ad
6. Implement VpadnAdListener

We strongly recommend that you can finish all the steps in the Activity of the application.

## Import Vpon SDK And Declare A VpadnInterstitialAd Instance
---
```java
import com.vpadn.ads.*;

public class MainActivity extends Activity implements VpadnAdListener {
    // Declare VpadnInterstitialAd instance
  	private VpadnInterstitialAd interstitialAd;

  	// Please fill in with your License Key
  	private String interstitialBannerId = "License Key";
        ...
}
```

## Set Up VpadnInterstitialAd Instance And Indicate A License Key
---
```java
public class MainActivity extends Activity implements VpadnAdListener {
  ...
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);

    // Create VpadnInterstitialAd instance
    interstitialAd = new VpadnInterstitialAd(this, interstitialBannerId, "TW");
    interstitialAd.setAdListener(this);
    VpadnAdRequest request = new VpadnAdRequest();
    // Start to load Interstitial Ad
    interstitialAd.loadAd(request);
  }

  @Override
  protected void onDestroy() {
    super.onDestroy();
    if (interstitialAd != null) {
      interstitialAd.destroy();
      interstitialAd = null;
    }
  }
```

You can only show Interstitial Ad after the ad request success.

## Show Interstitial Ad
---
Please avoid to show Interstitial Ad right away after ad request. We recommend that you can request Interstitial Ad first and show it in a specific moment. For example, you can implment VpadnAdListener and show ad when onVpadnReceiveAd be triggered.

```java
public class MainActivity extends Activity implements VpadnAdListener {
  ...

    @Override
    public void onVpadnReceiveAd(VpadnAd ad) {
      if (ad == this.interstitialAd) {
        // Show Interstitial Ad
        interstitialAd.show();
      }
    }
    ...
}
```

## Request for Test Ad
---
Please add the code snippet to your application and fill in with your test device's UUID as below to request for test ads.

```java
public class MainActivity extends Activity implements VpadnAdListener {
        ...
        VpadnAdRequest adRequest =  new VpadnAdRequest();

        HashSet<String> testDeviceImeiSet = new HashSet<String>();
        // Add Android device advertising id
        testDeviceImeiSet.add("your device advertising id");
        adRequest.setTestDevices(testDeviceImeiSet);

        vponBanner.loadAd(adRequest);
        ...
}
```


### Advertising ID
---
Here are some tips for you to get your advertising id:

1. Find "advertising_id" from the log (Find "advertisingId" instead if you are using 4.8.3 or above)
2. Check the advertising id in the Setting of your device


## Implement VpadnAdListener
---
```java
public class MainActivity extends Activity implements VpadnAdListener {
        @Override
        public void onVpadnReceiveAd(VpadnAd ad){
                Log.d("Banner", "VpadnReceiveAd");
        }

        @Override
        public void onVpadnFailedToReceiveAd(VpadnAd ad, VpadnAdRequest.VpadnErrorCode errCode){
                Log.d("Banner", "fail to receive ad (" + errCode + ")");
        }

        @Override
        public void onVpadnPresentScreen(VpadnAd ad){
                Log.d("Banner", "VpadnPresentScreen");
        }

        @Override
        public void onVpadnDismissScreen(VpadnAd ad){
                Log.d("Banner", "vpadnDismissScreen");
        }

        @Override
        public void onVpadnLeaveApplication(VpadnAd ad){
                Log.d("Banner", "VpadnLeaveApplication");
        }
}
```

# Tips
---

* We recommend that you can get Interstitial Ad first and show it after a specific event happened instead of load ad and show it immediately.

* Please follow our [Integration Guide]({{site.baseurl}}/andoird/integration-guide/) to add VpadnActivity in your AndroidManifest.xml. If you didn't add `android:configChanges=“orientation|screenSize”` in VpadnActivity, please avoid to loadAd() and show Interstitial Ad in onCreate section.

### Sample Code
Please refer to our [Sample Code] for a complete integration sample.

### More Ad Formats
Please refer to the link below to learn more about other ad types:

* [Banner Ad](../banner)
* [Native Ad](../native)
* [Out-sream Video Ad](../outstream)
* [Mediation](../mediation)
* [Advanced](../advanced)

[Sample Code]: ../download/
