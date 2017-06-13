---
layout:         "android"
title:          "Android - 原生广告 "
lead:           "Android - Native"
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       /zh-cn/android/native/
lang:           "zh-cn"
---
## 完成串接指示
---
若您尚未完成串接广告形式前的串接说明，请先前往[串接说明]完成相关设定

# 概要
--------
原生广告不同于以往横幅广告、插页广告会直接提供可立即呈现的广告内容，原生广告 API 提供了标题、图像等广告内容的组合，您可以透过这些属性的编排打造出最理想的原生广告风格。原生广告更打破以往对于广告的刻板印象，以最自然的方式呈现，提供更符合需求的广告体验。

在应用程式中建立原生广告需要执行以下五个步骤：

1. 汇入 Vpon SDK
2. 宣告并建立 VpadnNativeAd 物件
3. 建立自订原生 UI 并请求广告
4. 请求广告成功后利用回传的资料建置自订的原生 UI
5. 使用 nativeAd 执行个体注册广告检视

最简易的方式是在应用程式的 Activity 内进行上述所有步骤。

# 开始撰写 Native Ad
--------
首先汇入 SDK ，同时也宣告了欲在原生广告中呈现的各种元件，Mainfest 的相关设定请参考[串接说明]。( 原生广告呈现元件规范请参照[这里](#nativeAdSpec) )

```java
import com.vpadn.ads.*
```

## 建立 VpadnNativeAd 物件并请求广告
--------
初始化 VpadnNativeAd 物件并给定 NativeAd ID，完成指定 NativeAd ID 后即可请求广告， loadNativeUI 可参考[建立自订原生 UI ](#createNativeUI)。( 尚未申请 NativeAd ID 请先参考此[说明] )

```java
protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        loadNativeUI();
        nativeAd = new VpadnNativeAd(this, "请填入 NativeAd ID ", "TW");
        nativeAd.setAdListener(this);

        /** Request Test Ad Start **/
        VpadnAdRequest adRequest = new VpadnAdRequest();
        HashSet<String> testDeviceImeiSet = new HashSet<String>();
        testDeviceImeiSet.add("请填入测试机 GAID ");
        adRequest.setTestDevices(testDeviceImeiSet);
        /** Request Test Ad End **/
        /** 如需抓取正式广告可省略以上四行程式码，同时搭配 nativeAd.loadAd(); **/

        nativeAd.loadAd(adRequest);
        //nativeAd.loadAd();
    }
```

## 建立自订原生 UI {#createNativeUI}
--------
当撷取到原生广告资料之前，您需要建立自订的原生广告 UI。您可在配置 .xml 中建立自订检视，或在程式码中加入元素。
以 .xml 为例 ( 原生广告呈现元件规范请参照 [Native Ad Spec](#nativeAdSpec) )：

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

    <ImageView
        android:id="@+id/nativeAdImage"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:gravity="center"
        android:contentDescription="Ad image" />

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

## 广告资料汇入原生 UI {#importNativeData}
--------
完成请求原生广告后，下述五个函数可回传目前广告的各式状态，包含：

1. 请求成功
2. 请求失败
3. 原生广告成功显示
4. 解除原生广告
5. 执行 OutApp 应用程式

当广告`请求成功`时可利用 `inflateAd` 将回传的素材建构成自订的原生广告型态，细节可参考以下程式码。此外在请求成功里实作了点击  CallToAction、Image、OtherComponent 的 CallBack，这取决于您要注册哪些元件为可检视的。关于注册元件可参考[注册广告检视](#registerView)。

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
        ImageView nativeAdImage = (ImageView) nativeAdView.findViewById(R.id.nativeAdImage);
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
        nativeAdImage.setLayoutParams(new LinearLayout.LayoutParams(screenWidth, (int) (((double) screenWidth / (double) bannerWidth) * bannerHeight)));
        VpadnNativeAd.downloadAndDisplayImage(adCoverImage, nativeAdImage);

        // Wire up the View with the native ad, the whole nativeAdContainer will be clickable.
        // nativeAd.registerViewForInteraction(nativeAdView);

        // You can replace the above call with the following call to specify the clickable areas.
        nativeAd.registerViewForInteraction(nativeAdView, Arrays.asList(nativeAdCallToAction, nativeAdImage));

    }
```

## 注册广告检视 {#registerView}
--------
由于 Vpon SDK 会自动记录曝光次数并处理点击事件，您必须使用 nativeAd 注册广告检视，才能启用检视。若要使整个检视都可点击，请使用 `registerViewForInteraction(View view)`，如需更细微的控制，您可使用 `registerViewForInteraction(View view, List<View> clickableViews)`，使用方式可参考[上述的程式码](#importNativeData)。

# 清除原生广告 {#clearNativeAd}
--------
若要重复使用检视，并在不同时间显示不同广告，则在请求新的原生广告之前必须先呼叫 `unregisterView()` 将原先的广告清空。

# 原生广告管理器
--------
Vpon SDK 提供原生广告管理器( Native Ads Manager )。当您设计的 App 中会在短时间内在数个地方显示原生广告，原生广告管理器可以协助您一次请求并管理多笔原生广告。如何使用原生广告管理器请直接参考 [Sample Code]。

# Navive Ad Spec {#nativeAdSpec}
--------
`红色`表示您必须显示的原生广告元件，其中 CoverImage 与 Icon 必须至少显示其中一个。

Properties   |   Description
:-----------:|:-----------:|
<font color="red">AdLabel</font>      | 让使用者了解此为广告
:-----------:|:-----------:|
<font color="red">Title</font>  | 最少需显示8个中文字, 放不下时须显示`...`
:-----------:|:-----------:|
<font color="red">CallToAction</font> | 需要完整显示
:-----------:|:-----------:|
<font color="red">CoverImage</font>   | 1200 x 627px (可等比例缩放，不可变形，不可裁切)
:-----------:|:-----------:|
<font color="red">Icon</font>     | 128 x 128px (可等比例缩放，不可变形，不可裁切)
:-----------:|:-----------:|
BodyText     | 最少显示20个中文字，或不要显示
:-----------:|:-----------:|
SocialContext| 需要完整显示
:-----------:|:-----------:|
RatingScale  | 5
:-----------:|:-----------:|
Rating Min/Max| 1/5
:-----------:|:-----------:|

# 下载范例
--------
本页以基本的 Native Ad 为例进行说明， [Sample Code] 中另有 `Table View` 的范例以供参考。<br>

# 中介服务
--------
透过中介服务，您的应用程式就能放送众多广告来源的广告，详细说明[请参阅]。

[串接说明]: {{site.baseurl}}/zh-cn/android/integration-guide/
[说明]: {{ site.baseurl }}/zh-cn/android/registration/
[Sample Code]: {{ site.baseurl }}/zh-cn/android/download/
[请参阅]: {{ site.baseurl }}/zh-cn/android/mediation/mopub
