---
layout:         "android"
title:          "Android - Banner Ad"
lead:           "Compatible with Vpon SDK v4.9 and below"
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       android/banner-under5/
lang:           "en"
---
# Overview
---
Vpon Banner can be embedded to part of your app layout. It consists of a multimedia object which can attract user. The ads will expand to show much richer content after clicking.

<img class="width-300" src="{{site.imgurl}}/Android_Banner.png" alt="successful result example">

# Prerequisites
---
Please make sure you've imported Vpon SDK to your Xcode project. If not, please refer to our [Integration Guide]({{site.baseurl}}/android/integration-guide/) to finish your setting.

# Start To Implement Banner Ad
---
Android apps are composed of View objects, such as text areas, buttons and other components. VpadnBanner is simply another View subclass displaying HTML5 ads that triggered by user's touch.

Please follow the steps below to implement Vpon Banner Ad to your application:

1. Import `com.vpadn.ads.*`
2. Declare a `VpadnBanner` instance
3. Set up VpadnBanner instance and indicate a License Key
4. Request for a banner ad
5. Implement VpadnAdListener

We strongly recommend that you can finish all the steps in the Activity of the application.

## Implement Banner in MainActivity
---
Please follow the instruction below to add Banner Ad in your MainActivity.

### Import Vpon SDK And Declare A VpadnBanner Instance
---
```java
import com.vpadn.ads.*;

public class MainActivity extends Activity implements VpadnAdListener {
    private RelativeLayout adBannerLayout;
        
    // Declare VpadnBanner instance
  	private VpadnBanner vponBanner = null;

  	// Please fill in with your License Key
  	private String bannerId = "License Key" ;
    ...
}
```

### Set Up VpadnBanner Instance And Indicate A License Key
---
```java
public class MainActivity extends Activity implements VpadnAdListener {
        ...
        @Override
  	protected void onCreate(Bundle savedInstanceState) {
  		super.onCreate(savedInstanceState);
  		setContentView(R.layout.activity_main);
  		// Get your layout view for Vpon banner
  		adBannerLayout = (RelativeLayout) findViewById(R.id.adLayout);

  		// In SDK 4.8.0 and below, create VpadnBanner instance
                vponBanner = new VpadnBanner(this, bannerId, VpadnAdSize.SMART_BANNER, "TW");
                // In SDK 4.8.1 and above, create VpadnBanner instance
                vponBanner = new VpadnBanner(this, bannerId, VpadnAdSize.SMART_BANNER);
                vponBanner.setAdListener(this);
  		VpadnAdRequest adRequest = new VpadnAdRequest();
  		// Set "true" to enable banner ad auto refresh
  		adRequest.setEnableAutoRefresh(true);
                // Load vpon banner
  		vponBanner.loadAd(adRequest);
                // Add vpon banner to your layout view
  		adBannerLayout.addView(vponBanner);
  	}

  	@Override
  	protected void onDestroy() {
  		super.onDestroy();
  		if (vponBanner != null) {
  			//remember to call destroy method
  			vponBanner.destroy();
  			vponBanner = null;
  		}
  	}
    }
```

## Implement Banner Ad In Layout
---
``` xml
  <LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
      xmlns:vpadn="http://schemas.android.com/apk/lib/com.vpadn.ads"
      android:id="@+id/mainLayout"
      android:layout_width="match_parent"
      android:layout_height="match_parent"
      android:orientation="vertical" >

  <RelativeLayout
          android:id="@+id/adLayout"
          android:layout_width="match_parent"
          android:layout_height="wrap_content" >

          <!-- Implement Vpon Banner Ad As Below -->
          <com.vpadn.ads.VpadnBanner
              android:id="@+id/vpadnBannerXML"
              android:layout_width="wrap_content"
              android:layout_height="wrap_content"
              vpadn:adSize="SMART_BANNER"
              vpadn:autoFresh="true"
              vpadn:bannerId= "License Key"
              vpadn:loadAdOnCreate="true"
              vpadn:platform="TW" />
      </RelativeLayout>
  </LinearLayout>
```
> **Not:e** Please replace the parameter of vpon:bannerId with your License Key

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


# Vpon Banner Size
---
Vpon Banner supports three tablet-only banner sizes in addition to the 320x50 shown on phones:

|      Size (WxH)            | Description    |  VponAdSize Constant            |
  :------------------------: | :-------------:| :-----------------------------:
  320x50                     | Standard Banner| VpadnAdSize.BANNER
  300x250                    |IAB Medium Recangle| VpadnAdSize.IAB\_MRECT
  468x60                     |IAB Full-Size Banner| VpadnAdSize.IAB\_BANNER
  728x90                     | IAB Leaderboard|  VpadnAdSize.IAB\_LEADERBOARD
  device width x auto height | Smart Banner    |  VpadnAdSize.SMART\_BANNER

  We recommend that you can use the `Smart Banner` constant. (VpadnAdSize.IAB_WIDE_SKYSCRAPER is not available currently)


# Tips
---

### Sample Code
Please refer to our [Sample Code] for a complete integration sample.

### More Ad Formats
Please refer to the link below to learn more about other ad types:

* [Interstitial Ad](../interstitial)
* [Native Ad](../native)
* [Out-sream Video Ad](../outstream)
* [Mediation](../mediation)
* [Advanced](../advanced)

[Sample Code]: ../download/
