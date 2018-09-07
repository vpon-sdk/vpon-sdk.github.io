---
layout:         "android"
title:          "Android - Interstitial Ad"
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       android/interstitial/
lang:           "en"
---

## Finished Integration Guide
---
If you haven't finished the previous integration guide, please check all the [settings here](../integration-guide/).

# Overview
---
Interstitials, on the other hand, immediately present rich HTML5 experiences or "web apps" at natural app transition points such as launch, video pre-roll or game level load. Web apps are in-app browsing experiences with a simple close button rather than any navigation bar—the content provides its own internal navigation scheme. Interstitial ads are typically more expensive and subject to impression constraints.
![]({{site.imgurl}}/Interstitial.png)

> **Note**:
> We suggest that the interstitial ads running in portrait mode for the best visual effects.


# Vpon Interstitial Ad
---
The richer, more heavyweight nature of Vpadn interstitial is reflected by its definition not as a UIView but rather an NSObject requiring more distinct instantiation, load and display steps.

Usage is nevertheless very similar to Vpadn banner:

* Import lib file and head file
* Declare instance
* Create the object and set your License ID (do not use the same ID as banner)


Be sure perform the above steps in the Activity of you Application.

```java
public class MainActivity extends Activity implements VpadnAdListener {
  //TODO: The InterstitialBannerId which is you apply form Vpon.(Remind: This interstitial License ID is different with normal License ID).
	private String interstitialBannerId = "License ID";
	private VpadnInterstitialAd interstitialAd;

  @Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);
		// Create interstitial instance
		interstitialAd = new VpadnInterstitialAd(this, interstitialBannerId, "TW");
		//Add listener
		interstitialAd.setAdListener(this);
		// Create ad request
		VpadnAdRequest request = new VpadnAdRequest();
		//Begin loading your interstitial
		interstitialAd.loadAd(request);
	}

  @Override
	protected void onDestroy() {
		super.onDestroy();
		// Remember to call the destory() when your app is destroying.
		if (interstitialAd != null) {
           interstitialAd.destroy();
           interstitialAd = null;
		}
	}
```

Alternatively, you can hold onto the interstitial until you are ready to display it.
Here we implement AdListener and immediately show the interstitial upon callbacks to onReceiveAd(), or checking with isReady().

See the Intermediate guide for further details on using AdListener `(In order to maintain the quality of user experience, we recommend that you can load an ad first. Hold it until a certain event is triggered. Please try to avoid showing interstitial ad directly while getting it)`.

```java
  @Override
  public void onVpadnReceiveAd(VpadnAd ad) {
    if (ad == this.interstitialAd) {
      //show interstitial ad or hold onto the interstitial untill ready to display it.
      //interstitialAd.show();
      //in order to maintain the quality of user experience, please try to avoid showing interstitial ad directly while getting it.
    }
  }

  ...

  if ( certain event is triggered ) {
    if ( interstitialAd.isReady()) {
      interstitialAd.show();
    }
  }

```

The interstitial then takes over the screen until the user dismisses it, at which point control returns to your app and the view controller passes to this method.
Vpadn Interstitial Delegate [advanced setting] provides many callback methods for you.

# Download Sample Code
---
You can download an example project containing SDK 4 lib file in VpadnAd folder:

[Go to Download Page]

# Note
 ---
 > 1. We do not recommend trying to fetch and show immediately ad at app-open time. It would take users through a long wait screen as the interstitial tried to load. For this reason, we recommend fetching an interstitial and holding it until appropriate event happened. e.g. passing the game, staying in the same screen beyond specific time, pressing the button or before leaving app.
 > 2. Please do not load interstitial and show it immediately in onCreate method if you do not add this line `android:configChange="orientation|screenSize"` in manifest file.




[Go to Download Page]:../../android/download
[advanced setting]: ../advanced/
