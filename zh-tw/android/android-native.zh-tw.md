---
layout:         "android"
title:          "Android - 原生廣告 "
lead:           ""
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

1. 匯入 com.vpon.ads.*
2. 宣告 VponNativeAd 物件，並指定 License Key
3. 建立 VponAdRequest，並請求廣告
4. 建立原生廣告 Layout
5. 建置原生廣告
6. 實作 AdListener

建議您在應用程式的 Activity 內進行上述步驟。


## 宣告 VponNativeAd，並請求廣告
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

        VponAdRequest.Builder builder = new VponAdRequest.Builder();
        builder.addTestDevice("your device advertising id");
        // Set your test device's GAID here if you're trying to get Vpon test ad
        vponNativeAd.loadAd(builder.build());
        // Set ad request and load ad
    }
}
```
>**Note:** 如果您想要指定更多投放條件，請參考[進階設定](../advanced)

## 建立原生廣告 Layout {#createNativeUI}
---
在擷取到原生廣告資料之前，您需要建置原生廣告 Layout，關於原生廣告呈現元件規範請參照 [Native Ad Spec](#nativeAdSpec)。

您也可以參考以下 Sample 完成 Layout 的設計：


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
    
    <RatingBar
        android:id="@+id/ad_stars"
        style="?android:attr/ratingBarStyleSmall"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginStart="10dp"
        android:layout_marginTop="5dp"
        android:isIndicator="true"
        android:numStars="5"
        android:stepSize="0.5"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/ad_media_view"
        tools:rating="3" />
    
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

## 建置原生廣告
---
完成原生廣告請求後，您可以透過 VponAdListener 監聽廣告請求的狀態，在 `onAdLoaded` 之後，將回傳的素材建構成自定義的原生廣告樣式，並在完成設定後註冊檢視元件來綁定點擊事件。


```java
import com.vpon.ads.*;

public class MainActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {

        LayoutInflater.from(this).inflate(R.layout.layout_native_ad_template, adContainer, true);
        // Inflate your custom ad layout

        vponNativeAd.withNativeAdLoadedListener(new VponNativeAd.OnNativeAdLoadedListener() {
            @Override
            public void onNativeAdLoaded(VponNativeAd.NativeAdData nativeAdData) {
                setNativeAdDatas(nativeAdData, adContainer);
                // Set ad datas to your custom ad layout
                //TODO set native ad datas to view, registerViewForInteraction
                //TODO VpadnNativeAd.Rating is change to VponNativeAd.NativeAdData.Rating
                //TODO VponMediaView.setNativeAd(vponNativeAd, localNativeAdData)
            }
        });

        VponAdRequest.Builder builder = new VponAdRequest.Builder();
        vponNativeAd.loadAd(builder.build());
        // Set ad request and load ad
    }
    
    private void setNativeAdDatas(VponNativeAd.NativeAdData adData, View adContainer) {
        ImageView nativeAdIcon = adContainer.findViewById(R.id.ad_app_icon);
        TextView nativeAdTitle = adContainer.findViewById(R.id.ad_headline);
        TextView nativeAdBody = adContainer.findViewById(R.id.ad_body);
        VponMediaView nativeMediaView = adContainer.findViewById(R.id.ad_media_view);
        Button nativeAdCallToAction = adContainer.findViewById(R.id.ad_call_to_action);
        RatingBar nativeAdStarRating = adContainer.findViewById(R.id.ad_stars);

        VponNativeAd.downloadAndDisplayImage(adData.getIcon(), nativeAdIcon);
        // Use VponNativeAd.downloadAndDisplayImage to display icon in your custom ad layout

        nativeAdTitle.setText(adData.getTitle());
        if (adData.getBody() != null) {
            nativeAdBody.setText(adData.getBody());
        } else {
            nativeAdBody.setVisibility(View.INVISIBLE);
        }

        nativeMediaView.setNativeAd(vponNativeAd ,adData);

        if (adData.getCallToAction() != null) {
            nativeAdCallToAction.setText(adData.getCallToAction());
        } else {
            nativeAdCallToAction.setVisibility(View.INVISIBLE);
        }

        VponNativeAd.NativeAdData.Rating rating = adData.getRating();
        if (rating != null) {
            nativeAdStarRating.setNumStars((int) rating.getScale());
            nativeAdStarRating.setRating((float) rating.getValue());
        } else {
            nativeAdStarRating.setVisibility(View.INVISIBLE);
        }

        vponNativeAd.registerViewForInteraction(adContainer);
        // Register your view for click interaction
    }
}
```

## 實作 AdListener
---
```java
vponNativeAd.setAdListener(new VponAdListener() {

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

## 廣告生命週期
---

為使廣告正常運作，並在適當的時機釋放資源，我們建議可以在 Activity 生命週期中加入以下程式碼：

```java
@Override
protected void onResume() {
    super.onResume();

    if (vponNativeAd != null) {
        vponNativeAd.resume();
    }
}

@Override
protected void onPause() {
    super.onPause();

    if (vponNativeAd != null) {
        vponNativeAd.pause();
    }
}

@Override
protected void onDestroy() {
    super.onDestroy();
    if (vponNativeAd != null) {
        vponNativeAd.destroy();
        vponNativeAd = null;
    }
}
```

<!-- # 原生廣告管理器
--------
Vpon SDK 提供原生廣告管理器 (Native Ads Manager)，如果您想在短時間內在應用程式同一頁面下的數個位置顯示原生廣告，原生廣告管理器可以協助您一次請求並管理多筆原生廣告。

關於原生廣告管理器的使用方式，請直接參考 [Sample Code]。 -->


# Navive Ad Spec {#nativeAdSpec}
--------
下表為 Vpon 提供的原生廣告元件列表，`紅字`部份表示您必須顯示的原生廣告元件，其中 CoverImage 與 Icon 必須至少顯示其中一個。

Properties   |   Description
:-----------:|:-----------:|
<font color="red">AdLabel</font>      | 讓使用者了解此為廣告 (例如：贊助、廣告 等等)
:-----------:|:-----------:|
<font color="red">Title</font>  | 最少需顯示8個中文字, 放不下時須顯示`...`
:-----------:|:-----------:|
CoverImage   | 1200 x 627px (可等比例縮放，不可變形，不可裁切)
:-----------:|:-----------:|
Icon         | 128 x 128px (可等比例縮放，不可變形，不可裁切)
:-----------:|:-----------:|
CallToAction | 需要完整顯示
:-----------:|:-----------:|
BodyText     | 最少顯示20個中文字，或不要顯示
:-----------:|:-----------:|
SocialContext| 需要完整顯示 <br> *適用於 SDK v4.9.1 及以下版本*
:-----------:|:-----------:|
RatingScale  | 5，可能為空值
:-----------:|:-----------:|
Rating Min/Max| 1/5，可能為空值
:-----------:|:-----------:|

# Tips
---

### 確認廣告曝光是否成功發送
請注意，Vpon SDK 不允許廣告以以下方式呈現，致使廣告在畫面上可能不可見：

* 將 AdView 設為 Invisible
* 將 AdView 的 Alpha 值設為 < 100%
* AdView 被其它 View(s) 遮蓋住

當廣告露出在頁面上並達到曝光標準後，會印出以下的 Log 代表有送出廣告曝光：

```
I/VPON: [::Impression::]  response.code : 200
```


### Sample Code
如果您想看到完整的串接實例，請參考我們的 [Sample Code]

### 適用於 Vpon SDK v4.9 的串接方法
如果您想了解 Vpon SDK v4.9.1 或以下版本的串接方法，請參考[原生廣告](../native-under5)

### 中介服務
透過中介服務，您的應用程式就能放送眾多廣告來源的廣告，詳細請見說明：

* [使用 AdMob]
* [使用 MoPub]

[串接說明]: {{site.baseurl}}/zh-tw/android/integration-guide/
[Sample Code]: {{ site.baseurl }}/zh-tw/android/download/
[使用 AdMob]: {{ site.baseurl }}/zh-tw/android/mediation/admob/#customevent
[使用 MoPub]: {{ site.baseurl }}/zh-tw/android/mediation/mopub
[使用 Smaato]: {{ site.baseurl }}/zh-tw/android/native/mediation/smaato