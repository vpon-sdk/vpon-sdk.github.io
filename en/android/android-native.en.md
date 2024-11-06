---
layout:         "android"
title:          "Android - Native Ad"
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       android/native/
lang:           "en"
---
# Overview
---
While using the Native Ad API, you will receive a group of ad properties such as a title, an image, and you will have to use them to construct a custom UIView where the ad is shown. The Native Ad, an innovated type of ad, allows you to build a customized experience for the ads you show in your app.

<img src="{{site.imgurl}}/Native_Android.png" alt="" class="width-300"/>

# Prerequisites
---
Please make sure you've imported Vpon SDK to your Xcode project. If not, please refer to our [Integration Guide]({{site.baseurl}}/android/integration-guide/) to finish your setting.

# Start To Implement Native Ad
---
Please follow the steps below to implement Vpon Native Ad to your application:

1. Import com.vpon.ads.*
2. Declare a VponNativeAd instance and indicate a License Key
3. Set up VponAdRequest object and send ad request
4. Set up custom Native Ad layout
5. Set up Native Ad with ad metadata
6. Implement VponAdListener / VponNativeAd.OnNativeAdLoadedListener

We strongly recommend that you can finish all the steps in the Activity of the application.


## Declare A VponNativeAd Instance and Send Ad Request
---
```java
import com.vpon.ads.*;

public class MainActivity extends AppCompatActivity {
    private FrameLayout adContainer;
    private VponNativeAd vponNativeAd;
    private String nativeAdId = "License Key";
    // nativeAdId: Vpon License Key to get ad, please replace with your own one
    
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        adContainer = findViewById(R.id.ad_container); 

        vponNativeAd = new VponNativeAd(this, nativeAdId);
        VponAdLoader vponAdLoader = new VponAdLoader.Builder().build();

        VponAdRequest.Builder builder = new VponAdRequest.Builder();
        builder.addTestDevice("your device advertising id");
        // Set your test device's GAID here if you're trying to get Vpon test ad
        vponAdLoader.loadAd(builder.build());
        // Set ad request and load ad
    }
}
```

>**Note:** If you want to know more about target setting, please refer to [Advanced Setting](../advanced).


## Set Up Custom Native Ad Layout {#clearNativeAd}
---
You must create layout for Native Ads before ad request. Please check our [Native Ad Spec](#nativeAdSpec) to create your own layout.

Here is an example to create Native Ad layout:

### main_activity.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <FrameLayout
        android:id="@+id/ad_container"
        android:layout_height="wrap_content"
        android:layout_width="match_parent"/>
</RelativeLayout>
```

### native_ad_layout_template.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/ad_container"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:background="@android:color/white"
    android:paddingTop="10dp"
    android:paddingBottom="10dp">

    <ImageView
        android:id="@+id/ad_app_icon"
        android:layout_width="50dp"
        android:layout_height="50dp"
        android:layout_marginStart="10dp"
        android:contentDescription="Ad icon"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        tools:ignore="HardcodedText"
        tools:src="@mipmap/ic_launcher" />

    <TextView
        android:id="@+id/ad_headline"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:layout_marginStart="5dp"
        android:ellipsize="end"
        android:lines="1"
        android:textColor="@android:color/black"
        android:textSize="18sp"
        app:layout_constraintLeft_toRightOf="@+id/ad_app_icon"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toTopOf="@+id/ad_app_icon"
        tools:text="This is HeadLine" />

    <TextView
        android:id="@+id/ad_body"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:textColor="@android:color/black"
        android:textSize="15sp"
        app:layout_constraintBottom_toBottomOf="@+id/ad_app_icon"
        app:layout_constraintLeft_toLeftOf="@+id/ad_headline"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/ad_headline"
        tools:text="This is body" />

    <com.vpon.ads.VponMediaView
        android:id="@+id/ad_media_view"
        android:layout_width="match_parent"
        android:layout_height="210dp"
        android:layout_marginTop="5dp"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/ad_app_icon"
        tools:background="?android:attr/fingerprintAuthDrawable"
        tools:layout_height="157dp"
        tools:layout_width="0dp" >
    </com.vpon.ads.VponMediaView>
    
    <TextView
        android:id="@+id/ad_label"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/ad_media_view"
        android:layout_marginStart="5dp"
        android:textSize="14sp"
        android:textStyle="bold"
        android:textColor="@color/black"
        tools:text="This is ad label" />
    
    <Button
        android:id="@+id/ad_call_to_action"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="end"
        android:text="Call to Action"
        android:textSize="12sp"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/ad_media_view" />
</androidx.constraintlayout.widget.ConstraintLayout>
```

## Set Up Native Ad with Ad Metadata
---
Implement VponAdListener and set up Native Ad with Ad metadata after `onNativeAdLoaded`. Please note that you should register the ad view to bind the click event on the ad.

```java
import com.vpon.ads.*;

public class MainActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {

        LayoutInflater.from(this).inflate(R.layout.layout_native_ad_template, adContainer, true);
        // Inflate your custom ad layout

        vponAdLoader.forNativeAd(new VponNativeAd.OnNativeAdLoadedListener() {
            @Override
            public void onNativeAdLoaded(VponNativeAd nativeAd) {
                setNativeAdDatas(nativeAd, adContainer);
                // Set ad datas to your custom ad layout
                //TODO set native ad datas to view, registerViewForInteraction
                //TODO VpadnNativeAd.Rating is change to VponNativeAd.NativeAdData.Rating
                //TODO VponMediaView.setNativeAd(vponNativeAd, localNativeAdData)
            }
        });

        VponAdRequest.Builder builder = new VponAdRequest.Builder();
        vponAdLoader.loadAd(builder.build());
        // Set ad request and load ad
    }
    
    private void setNativeAdDatas(VponNativeAd nativeAd, View adContainer) {
        ImageView nativeAdIcon = adContainer.findViewById(R.id.ad_app_icon);
        TextView nativeAdTitle = adContainer.findViewById(R.id.ad_headline);
        TextView nativeAdBody = adContainer.findViewById(R.id.ad_body);
        TextView nativeAdLabel = adContainer.findViewById(R.id.ad_label);
        VponMediaView nativeMediaView = adContainer.findViewById(R.id.ad_media_view);
        Button nativeAdCallToAction = adContainer.findViewById(R.id.ad_call_to_action);

        VponAdLoader.downloadAndDisplayImage(nativeAd.getIcon(), nativeAdIcon);
        // Use VponNativeAd.downloadAndDisplayImage to display icon in your custom ad layout

        nativeAdTitle.setText(nativeAd.getTitle());
        if (nativeAd.getBody() != null) {
            nativeAdBody.setText(nativeAd.getBody());
        } else {
            nativeAdBody.setVisibility(View.INVISIBLE);
        }
        if (nativeAd.getAdLabel() != null) {
            nativeAdLabel.setText(nativeAd.getAdLabel());
        } else {
            nativeAdLabel.setVisibility(View.INVISIBLE);
        }

        nativeMediaView.setNativeAd(nativeAd);

        if (nativeAd.getCallToAction() != null) {
            nativeAdCallToAction.setText(nativeAd.getCallToAction());
        } else {
            nativeAdCallToAction.setVisibility(View.INVISIBLE);
        }

        vponNativeAd.registerViewForInteraction(adContainer);
        // Register your view for click interaction
    }
}
```

## Implement AdListener
---
```java
vponNativeAd.setAdListener(new VponAdListener() {

    @Override
    public void onAdLoaded() {
        // Invoked if receive ad successfully
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
protected void onDestroy() {
    super.onDestroy();
    if (vponNativeAd != null) {
        vponNativeAd.destroy();
        vponNativeAd = null;
    }
}
```

<!-- # Native Ad Manager
---
The `Native Ad Manager` is supported by Vpon SDK. Use the Native Ads Manager when your user experience involves displaying multiple ads within a short amount of time, such as a vertical feed or horizontal scroll. An app can also use Native Ads Manager to automatically refresh and deliver ads. Please follow the [Sample Code] to realize how to use the Native Ads Manager. -->

# Native Ad Spec {#nativeAdSpec}
--------
Please check to table below to find the Native Ad component provided by Vpon.

* Components in red are required to show in Native Ad layout. 
* Show at least one image (CoverImage or Icon) in Native Ad layout.

Properties   |   Description
:-----------:|:-----------:|
<font color="red">AdLabel</font>      | Let user know it is ad ( Sponsor, Ad, and so on ).
:-----------:|:-----------:|
<font color="red">Title</font>  | Show at least 16 English alphabets. <br>Show `...` while it's out of space.
:-----------:|:-----------:|
CoverImage   | 1200 x 627px <br>(enable scaling in proportion, without distortion and clipping)
:-----------:|:-----------:|
Icon         | 128 x 128px <br>(enable scaling in proportion, without distortion and clipping)
:-----------:|:-----------:|
CallToAction | Show completely
:-----------:|:-----------:|
BodyText     | Show at least 20 English characters or unshow it.
:-----------:|:-----------:|


# Tips
---


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

### Mediation
Mediation is a feature that lets you serve ads to your apps from multiple sources. Please refer to the reference below to get the complete description about the Native Ad Mediation setting.

* [AdMob]
* [Mopub]

[Sample Code]: ../download/
[AdMob]: {{ site.baseurl }}/android/mediation/admob/#customevent
[MoPub]: {{ site.baseurl }}/android/mediation/mopub
[Smaato]: {{ site.baseurl }}/android/native/mediation/smaato
