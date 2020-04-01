---
layout:         "android"
title:          "Android - 橫幅廣告 "
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       /zh-tw/android/banner/
lang:           "zh-tw"
---
# 概要
---
Vpon 橫幅廣告 (Banner) 是利用畫面的一小部分展示廣告來吸引使用者點擊，廣告被點擊後即可打開全螢幕呈現更豐富的內容，例如網站或應用程式商店網頁。

<img class="width-300" src="{{site.imgurl}}/Android_Banner.png" alt="successful result example">

# 完成串接準備
---
在開始串接廣告之前，請確認您已經將 Vpon SDK 導入您的專案中。若您尚未完成，請先參考[串接說明]完成相關設定。

# 開始串接橫幅廣告
---
Android 應用程式由 View 物件所組成，也就是以文字區域和按鈕等控制項的形式向使用者呈現的 Java 執行個體。VponBanner 是一種 View 子類別，用來顯示由使用者點擊觸發的小型 HTML5 廣告。

和所有的 View 一樣，VpadnBanner 可以使用 Java 撰寫，也可以用 XML 編寫。以下為所需步驟：

1. 匯入 com.vpon.ads.*
2. 宣告 VponBanner，並指定 License Key
3. 建立 VponAdRequest，並請求廣告
4. 實作 AdListener

建議您在應用程式的 Activity 內進行上述步驟。

## 在 MainActivity 中編寫橫幅廣告
---
請參考以下步驟，在您的 MainActivity 中完成橫幅廣告。

### 宣告 VponBanner，並請求廣告
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

>**Note:** 如果您想要指定更多投放條件，請參考[進階設定](../advanced)

### 在 layout 中編寫橫幅廣告
---
您也可以直接在 layout 中定義橫幅廣告：

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

>**Note**：請記得將 ads:bannerId 改為您的 License Key



## 實作 AdListener
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

## 廣告生命週期
---

為使廣告正常運作，並在適當的時機釋放資源，我們建議可以在 Activity 生命週期中加入以下程式碼：

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


# 橫幅廣告尺吋
---
除了支援標準橫幅廣告的尺吋外，Vpon Android SDK 還支援下列幾種尺吋的橫幅廣告：

大小 (寬度x高度)             |     說明       |  VponAdSize 常數值
:------------------------: | :-------------:| :-----------------------------:
320x50                     | 標準橫幅廣告     | VponAdSize.BANNER
300x250                    | IAB 中矩形廣告   | VponAdSize.IAB\_MRECT
468x60                     | IAB 全橫幅廣告   | VponAdSize.IAB\_BANNER
728x90                     | IAB 超級橫幅廣告 | VponAdSize.IAB\_LEADERBOARD
device width x auto height | Smart Banner   | VponAdSize.SMART\_BANNER

>**Note:** Smart Banner 在不同解析度的手機上會產生不同的展示效果，如果您希望展示標準橫幅廣告，我們建議您直接使用 `VponAdSize.BANNER`



# Tips
---

### Sample Code
如果您想看到完整的串接實例，請參考我們的 [Sample Code]

### 適用於 Vpon SDK v4.9 的串接方法
如果您想了解 Vpon SDK v4.9.1 或以下版本的串接方法，請參考[橫幅廣告](../banner-under5)


[串接說明]: {{site.baseurl}}/zh-tw/android/integration-guide/
[Sample Code]:../../android/download/
