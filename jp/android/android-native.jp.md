---
layout:         "android"
title:          "Android - Native Ad"
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       jp/android/native/
lang:           "jp"
---

## Finished Integration Guide
---
If you haven't finished the previous integration guide, please check all the [settings here].

# Overview
---
While using the Native Ad API, you will receive a group of ad properties such as a title, an image, and you will have to use them to construct a custom UIView where the ad is shown. The Native Ad, an innovated type of ad, allows you to build a customized experience for the ads you show in your app.

<img src="{{site.imgurl}}/Native_Android.png" alt="" class="width-300"/>

# How to Implement Native Ad
---
There are five actions you will need to take to implement this in your app:

1. Import Vpon SDK
2. Declare a VpadnNativeAd instance
3. Construct a native UI and request an ad
4. Use the returned ad metadata to build a custom native UI
5. Register the ad's view with the nativeAd instance

Be sure perform the above steps in the Activity of you Application.

# Coding for Showing Native Ad
---
First, import Vpon SDK as well as declare and connect instance variables to your UI. You will also need to configure your app's manifest file [as follows]({{site.baseurl}}/zh-tw/android/integration-guide/).

```java
import com.vpadn.ads.*
```

## Declare a VpadnNativeAd Instance & Request an Ad
---
Initializes VpadnNativeAd and request an ad. Function `loadNativeUI` can follow [Create Native UI](#clearNativeAd). (Please click [here] if you still do not get the Native Ad ID)

```java
protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        loadNativeUI();
        nativeAd = new VpadnNativeAd(this, "Input NativeAd ID ", "TW");
        nativeAd.setAdListener(this);

        /** Request Test Ad Start **/
        VpadnAdRequest adRequest = new VpadnAdRequest();
        HashSet<String> testDeviceImeiSet = new HashSet<String>();
        testDeviceImeiSet.add("Input device's GAID ");
        adRequest.setTestDevices(testDeviceImeiSet);
        /** Request Test Ad End
        Skip the above 4 line codes if you want to request an actual ad **/

        nativeAd.loadAd(adRequest);
        //nativeAd.loadAd();
    }
```

## Create Native UI {#clearNativeAd}
---
Before adding the code to load the ad, you need to build your customized native UI. You can either create your custom view in a layout .xml, or you can add elements in code. Here use .xml as an example (Please follow the [Natie Ad Spec](#nativeAdSpec)):

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
        android:layout_width="fill_parent"
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

## Use the Returned Ad Metadata to Build a Custom Native UI {#importNativeData}
---
After adding the code to load the ad, the following 5 functions can handle loading failures, and callback the ad status:

1. onVpadnReceiveAd
2. onVpadnFailedToReceiveAd
3. onVpadnPresentScreen
4. onVpadnDismissScreen
5. onVpadnLeaveApplication

While the Native ad is received successfully, the function `inflateAd` will also construct the ad into a custom UI. In addition, the implementation of the callback functions in onVpadnReceiveAd are depend on which view is registered. [Here](#registerView) shows more detail about view registration.

```java
@Override
    public void onVpadnReceiveAd(VpadnAd ad) {
        if (nativeAd == null || nativeAd != ad) {
            Log.e(LT, "Race condition, load() called again before last ad was displayed");
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

    @Override
    public void onVpadnFailedToReceiveAd(VpadnAd vpadnAd, VpadnAdRequest.VpadnErrorCode vpadnErrorCode) {
        Log.e(LT, "CALL NativeAd onVpadnFailedToReceiveAd, " + "errorCode : " + vpadnErrorCode );
    }

    @Override
    public void onVpadnPresentScreen(VpadnAd vpadnAd) {
        Log.e(LT, "CALL NativeAd onVpadnPresentScreen");
    }

    @Override
    public void onVpadnDismissScreen(VpadnAd vpadnAd) {
        Log.e(LT, "CALL NativeAd onVpadnDismissScreen");
    }

    @Override
    public void onVpadnLeaveApplication(VpadnAd vpadnAd) {
        Log.e(LT, "CALL NativeAd onVpadnLeaveApplication");
    }

    protected static void inflateAd(VpadnNativeAd nativeAd, View nativeAdView, Activity mContext) {
        //Create native UI using the ad metadata.
        ImageView nativeAdIcon = (ImageView) nativeAdView.findViewById(R.id.nativeAdIcon);
        TextView nativeAdTitle = (TextView) nativeAdView.findViewById(R.id.nativeAdTitle);
        TextView nativeAdBody = (TextView) nativeAdView.findViewById(R.id.nativeAdBody);
        // Vpon Inc. original method, feel free to use VpadnMediaView below
        //ImageView nativeAdImage = (ImageView) nativeAdView.findViewById(R.id.nativeAdImage);
        VpadnMediaView nativeAdMedia = (VpadnMediaView)
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
        // Vpon Inc. original method, feel free to use VpadnMediaView tag below
        //nativeAdImage.setLayoutParams(new LinearLayout.LayoutParams(screenWidth, (int) (((double) screenWidth / (double) bannerWidth) * bannerHeight)));
        //VpadnNativeAd.downloadAndDisplayImage(adCoverImage, nativeAdImage);
        nativeAdMedia.setLayoutParams(new LinearLayout.LayoutParams(screenWidth, (int) (((double) screenWidth / (double) bannerWidth) * bannerHeight)));
        nativeAdMedia.setNativedAd(nativeAd);

        // Wire up the View with the native ad, the whole nativeAdContainer will be clickable.
        // nativeAd.registerViewForInteraction(nativeAdView);

        // You can replace the above call with the following call to specify the clickable areas.
        // Vpon Inc. original method, feel free to use VpadnMediaView tag below
        // nativeAd.registerViewForInteraction(nativeAdView, Arrays.asList(nativeAdCallToAction, nativeAdImage));
        nativeAd.registerViewForInteraction(nativeAdView, Arrays.asList(nativeAdCallToAction, nativeAdMedia));

    }
```

## Ad View Registration {#registerView}
---
In order to enable the the SDK to log the impression and handle the click automatically you must register the ad's view with the nativeAd instance. Additionally, registering the view using `registerViewForInteraction(View view)` will make the whole view clickable. If you are looking for finer control you can specify the clickable subviews using `registerViewForInteraction(View view, List<View> clickableViews)`. Please follow [the  sample code above](#importNativeData) to use it.

# Clear Native Ad {#clearNativeAd}
---
If you want to re-use the view to show different ads over time, make sure to call `unregisterView()` before registering the same view with a different instance of VpadnNativeAd.

# Native Ads Manager
---
The `Native Ad Manager` is supported by Vpon SDK. Use the Native Ads Manager when your user experience involves displaying multiple ads within a short amount of time, such as a vertical feed or horizontal scroll. An app can also use Native Ads Manager to automatically refresh and deliver ads. Please follow the [Sample Code] to realize how to use the Native Ads Manager.

# Navive Ad Spec {#nativeAdSpec}
--------
`Red Color` indicates the required element in the Native Ad. CoverImage and Icon, at least one of them must be shown.

Properties   |   Description
:-----------:|:-----------:|
<font color="red">AdLabel</font>      | Let user know it is ad ( Sponsor, Ad, and so on ).
:-----------:|:-----------:|
<font color="red">Title</font>  | Show at least 16 English alphabets. <br>Show `...` while it's out of space.
:-----------:|:-----------:|
<font color="red">CoverImage</font>   | 1200 x 627px <br>(enable scaling in proportion, without distortion and clipping)
:-----------:|:-----------:|
<font color="red">Icon</font>     | 128 x 128px <br>(enable scaling in proportion, without distortion and clipping)
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

# Download Sample Code
---
Here we use basic Native ad as an example. A Native Ad sample in table view is also in the [Sample Code] <br>

# Mediation
---
Mediation is a feature that lets you serve ads to your apps from multiple sources. Please refer to the reference below to get the complete description about the Native Ad Mediation setting.<br>
- [Mopub]<br>
- [Smaato]

[settings here]: ../integration-guide/
[here]: {{ site.baseurl }}/jp/android/registration/
[Sample Code]: {{ site.baseurl }}/jp/android/download/
[MoPub]: {{ site.baseurl }}/jp/android/mediation/mopub
[Smaato]: {{ site.baseurl }}/jp/android/native/mediation/smaato
