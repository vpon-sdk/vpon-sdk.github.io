---
layout:         "android"
title:          "Android - 原生广告 "
lead:           "Android - Native"
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       /zh-cn/android/native/
lang:           "zh-cn"
---
# 概要
--------
原生广告不同于以往横幅广告、插页广告会直接提供可立即呈现的广告内容，原生广告 API 提供了标题、图像等广告内容的组合，您可以透过这些属性的编排打造出最理想的原生广告风格。原生广告更打破以往对于广告的刻板印象，以最自然的方式呈现，提供更符合需求的广告体验。

<img src="{{site.imgurl}}/Native_Android.png" alt="" class="width-300"/>

# 完成串接准备
---
在开始串接广告之前，请确认您已经将 Vpon SDK 导入您的 Xcode 专案中。若您尚未完成，请先参考[串接说明]完成相关设定。

# 開始串接原生廣告
--------
在应用程式中建立原生广告需要执行以下五个步骤：

1. 汇入 `com.vpadn.ads.*`
2. 宣告 `VpadnNativeAd` 物件
3. 建立 VpadnNativeAd 物件，并指定 License Key
4. 建立自订原生广告 Layout
5. 广告请求成功后利用回传的资料建置原生广告
6. 注册广告检视
7. 实作 VpadnAdListener

建议您在应用程式的 Activity 内进行上述步骤。

## Import Vpon SDK 并宣告 VpadnNativeAd
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

## 建立广告物件，并指定 License Key
---
建立 VpadnNativeAd 物件并指定 License Key 后即可请求广告，在请求广告之前，请参考[建立原生广告 Layout](#createNativeUI) 建立原生广告 UI。

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
        nativeAd.loadAd();
    }
}
```

## 建立原生广告 Layout {#createNativeUI}
--------
当撷取到原生广告资料之前，您需要建置原生广告 Layout。关于原生广告呈现元件规范请参照 [Native Ad Spec](#nativeAdSpec) )：

您可以在 layout 中建立检视，或在程式码中加入元素。以 layout 为例：

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

## 建置原生广告
---
完成原生广告请求后，您可以透过 VpadnAdListener 监听广告请求的状态，在广告请求成功之后，利用 `inflateAd()` 将回传的素材建构成自订的原生广告样式。

此外，在以下的范例中也实作了点击 CallToAction、Image、OtherComponent 的 CallBack，这取决于您要注册哪些元件是可检视的。关于注册元件可参考[注册广告检视](#registerView)。

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

## 将广告资料汇入原生广告 Layout {#importNativeData}
---
请参考以下范例，实作`inflateAd()`，将回传的素材建构成自订义的原生广告样式：

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

## 注册广告检视 {#registerView}
--------
由于 Vpon SDK 会自动记录曝光次数并处理点击事件，您必须使用 VpadnNativeAd 物件注册广告检视，才能启用检视。

* 若要使整个检视都可点击，请使用 `registerViewForInteraction(View view)`
* 若仅要使部份检视可点击，请使用 `registerViewForInteraction(View view, List<View> clickableViews)`

请参考以下程式码：

```java
      protected static void inflateAd(VpadnNativeAd nativeAd, View nativeAdView, Activity mContext) {
        ...

        // Make the whole nativeAdContainer clickable.
        // nativeAd.registerViewForInteraction(nativeAdView);

        // Specify clickable areas of the natvieAdContainer.
        // If you use ImageView
        // nativeAd.registerViewForInteraction(nativeAdView, Arrays.asList(nativeAdCallToAction, nativeAdImage));
        // If you use VpadnMediaView
        nativeAd.registerViewForInteraction(nativeAdView, Arrays.asList(nativeAdCallToAction, nativeAdMedia));
    }
```

# 清除原生广告 {#clearNativeAd}
--------
若要重复使用检视，并在不同时间显示不同广告，请在请求新的原生广告之前先呼叫 `unregisterView()` 将原先的广告清空。

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

# 测试广告
---
如果您的 License Key 还未通过审核的话，您可以使用下列的方式取得测试广告：

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
您可以使用下列方式取得 device 上的 Advertising ID：

1. 于 log 搜寻"advertising_id"
2. 直接操作手机: 设定 → Google → 广告 → 您的广告 ID (Advertising ID)

## 实作 VpadnAdListener
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

# 原生广告管理器
--------
Vpon SDK 提供原生广告管理器 (Native Ads Manager)。当您想在知时间内在应用程式同一个页面下的数个位置显示原生广告，原生广告管理器可以协助您一次请求并管理多笔原生广告。

关于原生广告管理器的使用方式，请直接参考 [Sample Code]。

# Navive Ad Spec {#nativeAdSpec}
--------
下表为 Vpon 提供的原生广告元件列表，`红字`部份表示您必须显示的原生广告元件，其中 CoverImage 与 Icon 必须至少显示其中一个。

Properties   |   Description
:-----------:|:-----------:|
<font color="red">AdLabel</font>      | 让使用者了解此为广告 (例如： 赞助、广告 等等)
:-----------:|:-----------:|
<font color="red">Title</font>  | 最少需显示8个中文字, 放不下时须显示`...`
:-----------:|:-----------:|
<font color="red">CoverImage</font>   | 1200 x 627px (可等比例缩放，不可变形，不可裁切)
:-----------:|:-----------:|
<font color="red">Icon</font>     | 128 x 128px (可等比例缩放，不可变形，不可裁切)
:-----------:|:-----------:|
CallToAction | 需要完整显示
:-----------:|:-----------:|
BodyText     | 最少显示20个中文字，或不要显示
:-----------:|:-----------:|
SocialContext| 需要完整显示
:-----------:|:-----------:|
RatingScale  | 5
:-----------:|:-----------:|
Rating Min/Max| 1/5
:-----------:|:-----------:|

# Tips
---

### Sample Code
如果您想看到完整的串接实例，请参考我们的 [Sample Code]

### 其它广告形式
如果您想了解其它广告形式的串接，请参考以下内容：

* [横幅广告](../banner)
* [插页广告](../interstitial)
* [Out-stream 影音广告](../outstream)
* [进阶设定](../advanced)

### 中介服务
透过中介服务，您的应用程式就能放送众多广告来源的广告，详细请见说明：

* [使用 MoPub]


[串接说明]: {{site.baseurl}}/zh-cn/android/integration-guide/
[Sample Code]:../../android/download/
[使用 MoPub]: {{ site.baseurl }}/zh-cn/android/mediation/mopub
[使用 Smaato]: {{ site.baseurl }}/zh-cn/android/native/mediation/smaato
