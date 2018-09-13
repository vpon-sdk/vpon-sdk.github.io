---
layout:         "android"
title:          "Android - 原生廣告 "
lead:           "Android - Native"
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       /zh-tw/android/native/
lang:           "zh-tw"
---
## 完成串接指示
---
若您尚未完成串接廣告形式前的串接說明，請先前往[串接說明]完成相關設定

# 概要
--------
原生廣告不同於以往橫幅廣告、插頁廣告會直接提供可立即呈現的廣告內容，原生廣告 API 提供了標題、圖像等廣告內容的組合，您可以透過這些屬性的編排打造出最理想的原生廣告風格。原生廣告更打破以往對於廣告的刻板印象，以最自然的方式呈現，提供更符合需求的廣告體驗。

<img src="{{site.imgurl}}/Native_Android.png" alt="" class="width-300"/>

# 如何撰寫 Native Ad
--------
在應用程式中建立原生廣告需要執行以下五個步驟：

1. 匯入 Vpon SDK
2. 宣告並建立 VpadnNativeAd 物件
3. 建立自訂原生 UI 並請求廣告
4. 請求廣告成功後利用回傳的資料建置自訂的原生 UI
5. 使用 nativeAd 執行個體註冊廣告檢視

最簡易的方式是在應用程式的 Activity 內進行上述所有步驟。

# 開始撰寫 Native Ad
--------
首先匯入 SDK ，同時也宣告了欲在原生廣告中呈現的各種元件，Mainfest 的相關設定請參考[串接說明]。( 原生廣告呈現元件規範請參照[這裡](#nativeAdSpec) )

```java
import com.vpadn.ads.*
```

## 建立 VpadnNativeAd 物件並請求廣告
--------
初始化 VpadnNativeAd 物件並給定 License Key，完成指定 License Key 後即可請求廣告， loadNativeUI 可參考[建立自訂原生 UI ](#createNativeUI)。( 尚未申請 License Key 請先參考此[說明] )

```java
protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        loadNativeUI();
        nativeAd = new VpadnNativeAd(this, "請填入 License Key ", "TW");
        nativeAd.setAdListener(this);

        /** Request Test Ad Start **/
        VpadnAdRequest adRequest = new VpadnAdRequest();
        HashSet<String> testDeviceImeiSet = new HashSet<String>();
        testDeviceImeiSet.add("請填入測試機 GAID ");
        adRequest.setTestDevices(testDeviceImeiSet);
        /** Request Test Ad End **/
        /** 如需抓取正式廣告可省略以上四行程式碼，同時搭配 nativeAd.loadAd(); **/

        nativeAd.loadAd(adRequest);
        //nativeAd.loadAd();
    }
```

## 建立自訂原生 UI {#createNativeUI}
--------
當擷取到原生廣告資料之前，您需要建立自訂的原生廣告 UI。您可在配置 .xml 中建立自訂檢視，或在程式碼中加入元素。
以 .xml 為例 ( 原生廣告呈現元件規範請參照 [Native Ad Spec](#nativeAdSpec) )：

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

## 監聽廣告請求及顯示的狀態 {#setAdListener}
--------
完成請求原生廣告後，下述五個函數可回傳目前廣告的各式狀態，包含：

1. 請求成功
2. 請求失敗
3. 原生廣告成功顯示
4. 解除原生廣告
5. 執行 OutApp 應用程式

當廣告`請求成功`時可利用 `inflateAd` 將回傳的素材建構成自訂的原生廣告型態。此外在請求成功裡實作了點擊 CallToAction、Image、OtherComponent 的 CallBack，這取決於您要註冊哪些元件為可檢視的。關於註冊元件可參考[註冊廣告檢視](#registerView)。

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
```

## 廣告資料匯入原生 UI {#importNativeData}
--------
實作 `inflateAd`，將回傳的素材建構成自訂的原生廣告型態，細節可參考以下程式碼：

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

## 註冊廣告檢視 {#registerView}
--------
由於 Vpon SDK 會自動記錄曝光次數並處理點擊事件，您必須使用 nativeAd 註冊廣告檢視，才能啟用檢視。<br>
若要使整個檢視都可點擊，請使用 `registerViewForInteraction(View view)`<br>
如需更細微的控制，您可使用 `registerViewForInteraction(View view, List<View> clickableViews)`<br>
使用方式請參考以下程式碼：

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

# 清除原生廣告 {#clearNativeAd}
--------
若要重複使用檢視，並在不同時間顯示不同廣告，則在請求新的原生廣告之前必須先呼叫 `unregisterView()` 將原先的廣告清空。

# 原生廣告管理器
--------
Vpon SDK 提供原生廣告管理器( Native Ads Manager )。當您設計的 App 中會在短時間內在數個地方顯示原生廣告，原生廣告管理器可以協助您一次請求並管理多筆原生廣告。如何使用原生廣告管理器請直接參考 [Sample Code]。


# Navive Ad Spec {#nativeAdSpec}
--------
`紅色`表示您必須顯示的原生廣告元件，其中 CoverImage 與 Icon 必須至少顯示其中一個。


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

# 下載範例
--------
本頁以基本的 Native Ad 為例進行說明， [Sample Code] 中另有 `Table View` 的範例以供參考。<br>

# 中介服務
--------
透過中介服務，您的應用程式就能放送眾多廣告來源的廣告，詳細請見說明：<br>
- [使用 MoPub] <br>

[串接說明]: {{site.baseurl}}/zh-tw/android/integration-guide/
[說明]: {{ site.baseurl }}/zh-tw/android/registration/
[Sample Code]: {{ site.baseurl }}/zh-tw/android/download/
[使用 MoPub]: {{ site.baseurl }}/zh-tw/android/mediation/mopub
[使用 Smaato]: {{ site.baseurl }}/zh-tw/android/native/mediation/smaato
