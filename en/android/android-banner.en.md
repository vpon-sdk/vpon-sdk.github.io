---
layout:         "android"
title:          "Android - Banner Ad"
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       android/banner/
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

1. Import com.vpon.ads.*
2. Declare a VponBanner instance and indicate a License Key
3. Set up VponAdRequest object and send ad request
4. Implement AdListener

We strongly recommend that you can finish all the steps in the Activity of the application.

## Implement Banner Ad In MainActivity
---
Please follow the instruction below to add Banner Ad in your MainActivity.

## Declare A VponBanner Instance and Send Ad Request
---
```java
import com.vpon.ads.*;

public class MainActivity extends AppCompatActivity {
        
        private RelativeLayout mainLayout;
        private VponBanner vponBanner;
        private String bannerId = "License Key" ;
        // bannerId: Vpon License Key to get ad, please replace with your own one

        @Override
  	    protected void onCreate(Bundle savedInstanceState) {
            setContentView(R.layout.activity_main);
            mainLayout = findViewById(R.id.main_layout);

            VponBanner vponBanner = new VponBanner(context, bannerId, adSize);
            // adSize: The Banner Ad size that will be displayed

            VponAdRequest.Builder builder = new VponAdRequest.Builder();
            builder.setAutoRefresh(true);
            // Only available for Banner Ad, will auto refresh ad if set true
            builder.addTestDevice("your device advertising id");
            // Set your test device's GAID here if you're trying to get Vpon test ad
            vponBanner.loadAd(builder.build());
            // Set ad request and load ad

            mainLayout.addView(vponBanner);
  	}
}
```

>**Note:** If you want to know more about target setting, please refer to [Advanced Setting](../advanced).


## Implement Banner Ad In Layout
---
You can alse implement Banner Ad in layout.xml

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
          <com.vpon.ads.VponBanner
            xmlns:ads="http://schemas.android.com/apk/res-auto"
            android:id="@+id/banner"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            vpon:adSize="SMART_BANNER"
            vpon:bannerId= "License Key"/>
  </LinearLayout>
```

> **Not:e** Please replace the parameter of ads:bannerId with your License Key


## Implement AdListener
---
```java
vponBanner.setAdListener(new VponAdListener() {

    @Override
    public void onAdLoaded() {
        // Invoked if receive ad successfully
    }
    
    @Override
    public void onAdFailedToLoad(int errorCode) {
        // Invoked if received ad fail, check this callback to indicates what type of failure occurred
    }

    @Override
    public void onAdOpened() {
        // Invoked if the ad was clicked
    }

    @Override
    public void onAdLeftApplication() {
        // Invoked if user leave the app and the current app was backgrounded
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

    if (vponBanner != null) {
        vponBanner.resume();
    }
}

@Override
protected void onPause() {
    super.onPause();

    if (vponBanner != null) {
        vponBanner.pause();
    }
}

@Override
protected void onDestroy() {
    super.onDestroy();
    if (vponBanner != null) {
        vponBanner.destroy();
        vponBanner = null;
    }
}
```

# Vpon Banner Size
---
Vpon Banner supports three tablet-only banner sizes in addition to the 320x50 shown on phones:

|      Size (WxH)            | Description    |  VponAdSize Constant            |
  :------------------------: | :-------------:| :-----------------------------:
  320x50                     | Standard Banner| VponAdSize.BANNER
  300x250                    |IAB Medium Rectangle| VponAdSize.IAB\_MRECT
  320x480                    | Large Rectangle Banner| VponAdSize.LARGE\_RECTANGLE
  468x60                     |IAB Full-Size Banner| VponAdSize.IAB\_BANNER
  728x90                     | IAB Leaderboard|  VponAdSize.IAB\_LEADERBOARD
  device width x auto height | Smart Banner    |  VponAdSize.SMART\_BANNER


>**Note:** The resolution of the device might impact the layout of Smart Banner. If you are trying to display Standard, it is recommend to use `VponAdSize.BANNER` for request.



# Tips  
---

### Make Sure If The Ad Display Successfully

Please help to check if below log printed after the ad display and match the viewability standard:

```
I/VPON: [::Impression::]  response.code : 200
```


### Sample Code
Please refer to our [Sample Code] for a complete integration sample.

### Integration Guide For Vpon SDK v4.9
Please refer to [Banner Ad Integration Guide](../banner-under5) if you want to know more about the integration that compatible with Vpon SDK v4.9 and below version.

[Sample Code]: ../download/
