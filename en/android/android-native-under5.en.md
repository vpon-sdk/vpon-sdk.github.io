---
layout:         "android"
title:          "Android - Native Ad"
lead:           "Compatible with Vpon SDK v4.9 and below"
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       android/native-under5/
lang:           "en"
---
# Overview
---
While using the Native Ad API, you will receive a group of ad properties such as a title, an image, and you will have to use them to construct a custom UIView where the ad is shown. The Native Ad, an innovated type of ad, allows you to build a customized experience for the ads you show in your app.

<img src="{{site.imgurl}}/Native_Android.png" alt="" class="width-300"/>

# Prerequisites
---
Please make sure you've imported Vpon SDK to your Xcode project. If not, please refer to our [Integration Guide]({{site.baseurl}}/android/integration-guide/) to finish your setting.

# Start To Implement Native Ad
---
Please follow the steps below to implement Vpon Native Ad to your application:

1. Import `com.vpadn.ads.*`
2. Declare a `VpadnNativeAd` instance
3. Set up VpadnNativeAd instance and indicate a License Key
4. Create layout for Native Ad
5. Set up Native Ad with ad metadata
6. Register ad view with VpadnNativeAd instance
7. Implement VpadnAdListener

We strongly recommend that you can finish all the steps in the Activity of the application.

## Import Vpon SDK And Declare A VpadnNativeAd Instance
---
```java
import com.vpadn.ads.*;

public class MainActivity extends Activity implements VpadnAdListener {
    // Declare VpadnNativeAd instance
    private VpadnNativeAd nativeAd;
    
    // Please fill in with your License Key
    private String licenseKey = "License Key" ;
    
    private LinearLayout native_Ad_Container;
    private LinearLayout nativeAdView;
    ...
}
```

## Set Up VpadnNativeAd Instance And Indicate A License Key
---
Set up VpadnNativeAd instance and indicate a license key to request Native Ad. Please follow [Create Layout for Native Ad](#createNativeUI) to create your own layout to present Native Ad.

```java
public class MainActivity extends Activity implements VpadnAdListener {
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        // Set up Native Ad layout
        loadNativeUI();

        nativeAd = new VpadnNativeAd(this, licenseKey, "TW");
        nativeAd.setAdListener(this);
        VpadnAdRequest adRequest = new VpadnAdRequest();
        nativeAd.loadAd(adRequest);
    }
}
```

## Create Layout for Native Ad {#clearNativeAd}
---
You must create layout for Native Ads before ad request. Please check our [Native Ad Spec](#nativeAdSpec) to create your own layout.

Here is an example to create Native Ad layout in layout.xml:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:id = "@+id/native_ad_unit"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="@android:color/white"
    android:orientation="vertical">

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="horizontal"
        android:paddingTop="10dp"
        android:paddingBottom="10dp">

        <ImageView
            android:id="@+id/nativeAdIcon"
            android:layout_width="50dp"
            android:layout_height="50dp"
            android:contentDescription="Ad icon"/>

        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:orientation="vertical"
            android:paddingLeft="5dp" >

            <TextView
                android:id="@+id/nativeAdTitle"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:ellipsize="end"
                android:lines="1"
                android:textColor="@android:color/black"
                android:textSize="18sp" />

            <TextView
                android:id="@+id/nativeAdBody"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:textColor="@android:color/black"
                android:textSize="15sp" />
        </LinearLayout>

    </LinearLayout>

    <!--Vpon Inc. original method, feel free to use VpadnMediaView tag below-->
    <!--<ImageView-->
        <!--android:id="@+id/nativeAdImage"-->
        <!--android:layout_width="match_parent"-->
        <!--android:layout_height="wrap_content"-->
        <!--android:gravity="center"-->
        <!--android:contentDescription="Ad image" />-->

    <!--Vpon Inc. New layout-->
    <com.vpadn.ads.VpadnMediaView
        android:id="@+id/native_ad_media"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:gravity="center"/>

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:padding="5dp"
        android:orientation="horizontal">

        <LinearLayout
            android:layout_width="0dp"
            android:layout_height="match_parent"
            android:layout_weight="3"
            android:paddingRight="5dp"
            android:orientation="vertical" >

            <RatingBar
                android:id="@+id/nativeAdStarRating"
                style="?android:attr/ratingBarStyleSmall"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:isIndicator="true"
                android:stepSize="0.1" />

            <TextView
                android:id="@+id/nativeAdSocialContext"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:textColor="@android:color/black"
                android:textSize="15sp" />
        </LinearLayout>

        <Button
            android:id="@+id/nativeAdCallToAction"
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_weight="2"
            android:background="#ff8bc615"
            android:gravity="center"
            android:textSize="16sp" />
    </LinearLayout>

</LinearLayout>
```

## Set Up Native Ad
---
Implement VpadnAdListener and set up Native Ad with `inflateAd()` after ad receiving.

The sample below shows the CallBack function of clicking CallToAction button, image and other components. Please refer to [Register Ad View](#registerView) to define which components are clickable.

```java
public class MainActivity extends Activity implements VpadnAdListener {
    ...
    @Override
        public void onVpadnReceiveAd(VpadnAd ad) {
            if (nativeAd == null || nativeAd != ad) {
                Log.e("Native", "Race condition, load() called again before last ad was displayed");
                return;
            }

            if (ad == nativeAd) {

                nativeAd.unregisterView();
                inflateAd(nativeAd, nativeAdView, this);
                nativeAd.setOnTouchListener(new View.OnTouchListener() {
                    @Override
                    public boolean onTouch(View view, MotionEvent event) {
                        if (event.getAction() == MotionEvent.ACTION_DOWN) {
                            switch (view.getId()) {
                                case R.id.nativeAdCallToAction:
                                    Log.e(LT, "nativeAdCallToAction");
                                    Toast.makeText(getBaseContext(), "nativeAdCallToAction Clicked", Toast.LENGTH_SHORT).show();
                                    break;
                                case R.id.nativeAdImage:
                                    Log.e(LT, "nativeAdImage");
                                    Toast.makeText(getBaseContext(), "nativeAdCallToAction Clicked", Toast.LENGTH_SHORT).show();
                                    break;
                                default:
                                    Log.d(LT, "Other ad component clicked");
                                    Toast.makeText(getBaseContext(), "Other ad component Clicked", Toast.LENGTH_SHORT).show();
                            }
                        }
                        return false;
                    }
                });

                native_Ad_Container.setVisibility(View.VISIBLE);
            }
        }
}
```

## Set Up Native Ad With Ad Metadata {#importNativeData}
---
Please refer to the sample below to implement `inflateAd()` to set up Native Ad.

```java
    protected static void inflateAd(VpadnNativeAd nativeAd, View nativeAdView, Activity mContext) {
        //Create native UI using the ad metadata.
        ImageView nativeAdIcon = (ImageView) nativeAdView.findViewById(R.id.nativeAdIcon);
        TextView nativeAdTitle = (TextView) nativeAdView.findViewById(R.id.nativeAdTitle);
        TextView nativeAdBody = (TextView) nativeAdView.findViewById(R.id.nativeAdBody);

        // Original method to use ImageView
        // ImageView nativeAdImage = (ImageView) nativeAdView.findViewById(R.id.nativeAdImage);
        // Or you can use VpadnMediaView as below
        VpadnMediaView nativeAdMedia = (VpadnMediaView) nativeAdView.findViewById(R.id.native_ad_media);

        RatingBar nativeAdStarRating = (RatingBar) nativeAdView.findViewById(R.id.nativeAdStarRating);
        TextView nativeAdSocialContext = (TextView) nativeAdView.findViewById(R.id.nativeAdSocialContext);
        Button nativeAdCallToAction = (Button) nativeAdView.findViewById(R.id.nativeAdCallToAction);

        // Setting the Text
        nativeAdSocialContext.setText(nativeAd.getAdSocialContext());
        nativeAdCallToAction.setText(nativeAd.getAdCallToAction());
        nativeAdTitle.setText(nativeAd.getAdTitle());
        nativeAdBody.setText(nativeAd.getAdBody());
        VpadnNativeAd.Rating rating = nativeAd.getAdStarRating();
        if (rating != null) {
            nativeAdStarRating.setNumStars((int) rating.getScale());
            nativeAdStarRating.setRating((float) rating.getValue());
        } else {
            nativeAdStarRating.setVisibility(View.GONE);
        }

        // Downloading and setting the ad icon.
        VpadnNativeAd.Image adIcon = nativeAd.getAdIcon();
        VpadnNativeAd.downloadAndDisplayImage(adIcon, nativeAdIcon);

        // Downloading and setting the cover image.
        VpadnNativeAd.Image adCoverImage = nativeAd.getAdCoverImage();
        int bannerWidth = adCoverImage.getWidth();
        int bannerHeight = adCoverImage.getHeight();
        WindowManager wm = (WindowManager) mContext.getSystemService(Context.WINDOW_SERVICE);
        Display display = wm.getDefaultDisplay();
        DisplayMetrics metrics = new DisplayMetrics();
        display.getMetrics(metrics);
        int screenWidth = metrics.widthPixels;

        // If you use nativeAdImage
        // nativeAdImage.setLayoutParams(new LinearLayout.LayoutParams(screenWidth, (int) (((double) screenWidth / (double) bannerWidth) * bannerHeight)));
        // VpadnNativeAd.downloadAndDisplayImage(adCoverImage, nativeAdImage);
        // If you use VpadnMediaView
        nativeAdMedia.setLayoutParams(new LinearLayout.LayoutParams(screenWidth, (int) (((double) screenWidth / (double) bannerWidth) * bannerHeight)));
        nativeAdMedia.setNativedAd(nativeAd);

        ...
      }
```

## Ad View Registration {#registerView}
---
Vpon SDK will log the impression and click. You must register ad view with VpadnNativeAd instance.

* To make entire Native Ad layout clickable, please use `registerViewForInteraction(View view)`
* To make part of Native Ad layout clickable, please use `registerViewForInteraction(View view, List<View> clickableViews)`

Please refer to the smaple below:

```java
public class MainActivity extends Activity implements VpadnAdListener {
    ...
      protected static void inflateAd(VpadnNativeAd nativeAd, View nativeAdView, Activity mContext) {
        ...
        // Make the whole nativeAdContainer clickable
        // nativeAd.registerViewForInteraction(nativeAdView);

        // Specify clickable areas of the natvieAdContainer
        // If you use ImageView
        // nativeAd.registerViewForInteraction(nativeAdView, Arrays.asList(nativeAdCallToAction, nativeAdImage));
        // If you use VpadnMediaView
        nativeAd.registerViewForInteraction(nativeAdView, Arrays.asList(nativeAdCallToAction, nativeAdMedia));
    }
}
```

# Clear Native Ad {#clearNativeAd}
---
If you want to re-use the view to show different ads over time, call `unregisterView()` before registering the same view with a different VpadnNativeAd instance.

```java
public class MainActivity extends Activity implements VpadnAdListener {
    ...
    @Override
    public void onVpadnReceiveAd(VpadnAd ad) {
        ...
        if (ad == nativeAd) {
            nativeAd.unregisterView();
            ...
        }
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

# Native Ad Manager
---
The `Native Ad Manager` is supported by Vpon SDK. Use the Native Ads Manager when your user experience involves displaying multiple ads within a short amount of time, such as a vertical feed or horizontal scroll. An app can also use Native Ads Manager to automatically refresh and deliver ads. Please follow the [Sample Code] to realize how to use the Native Ads Manager.

# Navive Ad Spec {#nativeAdSpec}
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
BodyText     | Show at least 20 English alphabets or unshow it.
:-----------:|:-----------:|
SocialContext| Show completely
:-----------:|:-----------:|
RatingScale  | 5
:-----------:|:-----------:|
Rating Min/Max| 1/5
:-----------:|:-----------:|

# Tips
---

### Sample Code
Please refer to our [Sample Code] for a complete integration sample.

### More Ad Formats
Please refer to the link below to learn more about other ad types:

* [Banner Ad](../banner)
* [Interstitial Ad](../interstitial)
* [Out-sream Video Ad](../outstream)
* [Advanced](../advanced)

### Mediation
Mediation is a feature that lets you serve ads to your apps from multiple sources. Please refer to the reference below to get the complete description about the Native Ad Mediation setting.

* [AdMob]
* [Mopub]

[Sample Code]: ../download/
[AdMob]: {{ site.baseurl }}/android/mediation/admob/#customevent
[MoPub]: {{ site.baseurl }}/android/mediation/mopub
[Smaato]: {{ site.baseurl }}/android/native/mediation/smaato
