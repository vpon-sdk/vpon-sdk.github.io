---
layout:         "android"
title:          "Android - 原生廣告 "
lead:           "Android - Native"
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       /zh-tw/android/native/
lang:           "zh-tw"
---
# 概要
---
原生廣告不同於以往橫幅廣告、插頁廣告會直接提供可立即呈現的廣告內容，原生廣告 API 提供了標題、圖像等廣告內容的組合，您可以透過這些屬性的編排打造出最理想的原生廣告風格。原生廣告更打破以往對於廣告的刻板印象，以最自然的方式呈現，提供更符合需求的廣告體驗。

<img src="{{site.imgurl}}/Native_Android.png" alt="" class="width-300"/>

# 完成串接準備
---
在開始串接廣告之前，請確認您已經將 Vpon SDK 導入您的專案中。若您尚未完成，請先參考[串接說明]完成相關設定。

# 開始串接原生廣告
---
在應用程式中建立原生廣告需要執行以下五個步驟：

1. 匯入 `com.vpadn.ads.*`
2. 宣告 `VpadnNativeAd` 物件
3. 建立 VpadnNativeAd 物件，並指定 License Key
4. 建立自訂原生廣告 Layout
5. 廣告請求成功後利用回傳的資料建置原生廣告
6. 註冊廣告檢視
7. 實作 VpadnAdListener

建議您在應用程式的 Activity 內進行上述步驟。

## Import Vpon SDK 並宣告 VpadnNativeAd
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

## 建立廣告物件，並指定 License Key
---
建立 VpadnNativeAd 物件並指定 License Key 後即可請求廣告，在請求廣告之前，請參考[建立原生廣告 Layout](#createNativeUI) 建立原生廣告 UI。

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

## 建立原生廣告 Layout {#createNativeUI}
---
在擷取到原生廣告資料之前，您需要建置原生廣告 Layout，關於原生廣告呈現元件規範請參照 [Native Ad Spec](#nativeAdSpec)。

您可以在 layout 中建立檢視，或在程式碼中加入元素。以 layout 為例：

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

## 建置原生廣告
---
完成原生廣告請求後，您可以透過 VpadnAdListener 監聽廣告請求的狀態，在廣告請求成功之後，利用 `inflateAd()` 將回傳的素材建構成自訂義的原生廣告樣式。

此外，在以下的範例中也實作了點擊 CallToAction、Image、OtherComponent 的 CallBack，這取決於您要註冊哪些元件是可檢視的。關於註冊元件可參考[註冊廣告檢視](#registerView)。

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

## 將廣告資料匯入原生廣告 Layout {#importNativeData}
--------
請參考以下範例，實作 `inflateAd()`，將回傳的素材建構成自訂義的原生廣告樣式：

```java
public class MainActivity extends Activity implements VpadnAdListener {
    ...
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
}
```

## 註冊廣告檢視 {#registerView}
--------
由於 Vpon SDK 會自動記錄曝光次數並處理點擊事件，您必須使用 VpadnNativeAd 物件註冊廣告檢視，才能啟用檢視。

* 若要使整個檢視都可點擊，請使用 `registerViewForInteraction(View view)`
* 若僅要使部份檢視可點擊，請使用 `registerViewForInteraction(View view, List<View> clickableViews)`

請參考以下程式碼：

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

## 清除原生廣告 {#clearNativeAd}
--------
若要重複使用檢視，並在不同時間顯示不同廣告，請在請求新的原生廣告之前先呼叫 `unregisterView()` 將原先的廣告清空。

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

## 測試廣告
---
如果你的 License Key 還未通過審核的話，您可以使用下列的方式取得測試廣告：

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

1. 于 log 中搜寻 "advertising_id" (4.8.3 版后，请搜寻 "advertisingId")
2. 直接操作手機：設定 → Google → 廣告 → 您的廣告 ID (Advertising ID)

## 實作 VpadnAdListener
---
```java
public class MainActivity extends Activity implements VpadnAdListener {
        @Override
        public void onVpadnReceiveAd(VpadnAd ad){
                Log.d("Native", "VpadnReceiveAd");
        }

        @Override
        public void onVpadnFailedToReceiveAd(VpadnAd ad, VpadnAdRequest.VpadnErrorCode errCode){
                Log.d("Native", "fail to receive ad (" + errCode + ")");
        }

        @Override
        public void onVpadnPresentScreen(VpadnAd ad){
                Log.d("Native", "VpadnPresentScreen");
        }

        @Override
        public void onVpadnDismissScreen(VpadnAd ad){
                Log.d("Native", "vpadnDismissScreen");
        }

        @Override
        public void onVpadnLeaveApplication(VpadnAd ad){
                Log.d("Native", "VpadnLeaveApplication");
        }
}
```

# 原生廣告管理器
--------
Vpon SDK 提供原生廣告管理器 (Native Ads Manager)，如果您想在短時間內在應用程式同一頁面下的數個位置顯示原生廣告，原生廣告管理器可以協助您一次請求並管理多筆原生廣告。

關於原生廣告管理器的使用方式，請直接參考 [Sample Code]。


# Navive Ad Spec {#nativeAdSpec}
--------
下表為 Vpon 提供的原生廣告元件列表，`紅字`部份表示您必須顯示的原生廣告元件，其中 CoverImage 與 Icon 必須至少顯示其中一個。

Properties   |   Description
:-----------:|:-----------:|
<font color="red">AdLabel</font>      | 讓使用者了解此為廣告 (例如：贊助、廣告 等等)
:-----------:|:-----------:|
<font color="red">Title</font>  | 最少需顯示8個中文字, 放不下時須顯示`...`
:-----------:|:-----------:|
<font color="red">CoverImage</font>   | 1200 x 627px (可等比例縮放，不可變形，不可裁切)
:-----------:|:-----------:|
<font color="red">Icon</font>     | 128 x 128px (可等比例縮放，不可變形，不可裁切)
:-----------:|:-----------:|
CallToAction | 需要完整顯示
:-----------:|:-----------:|
BodyText     | 最少顯示20個中文字，或不要顯示
:-----------:|:-----------:|
SocialContext| 需要完整顯示
:-----------:|:-----------:|
RatingScale  | 5
:-----------:|:-----------:|
Rating Min/Max| 1/5
:-----------:|:-----------:|

# Tips
---

### Sample Code
如果您想看到完整的串接實例，請參考我們的 [Sample Code]

### 其它廣告形式
如果您想了解其它廣告形式的串接，請參考以下內容：

* [橫幅廣告](../banner)
* [插頁廣告](../interstitial)
* [Out-stream 影音廣告](../outstream)
* [進階設定](../advanced)

### 中介服務
透過中介服務，您的應用程式就能放送眾多廣告來源的廣告，詳細請見說明：

* [使用 MoPub]

[串接說明]: {{site.baseurl}}/zh-tw/android/integration-guide/
[Sample Code]: {{ site.baseurl }}/zh-tw/android/download/
[使用 MoPub]: {{ site.baseurl }}/zh-tw/android/mediation/mopub
[使用 Smaato]: {{ site.baseurl }}/zh-tw/android/native/mediation/smaato