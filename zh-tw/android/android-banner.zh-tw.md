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
Android 應用程式由 View 物件所組成，也就是以文字區域和按鈕等控制項的形式向使用者呈現的 Java 執行個體。VpadnBanner 是一種 View 子類別，用來顯示由使用者點擊觸發的小型 HTML5 廣告。

和所有的 View 一樣，VpadnBanner 可以使用 Java 撰寫，也可以用 XML 編寫。以下為所需步驟：

1. 匯入 `com.vpadn.ads.*`
2. 宣告 `VpadnBanner`
3. 建立 VpadnBanner 物件，並指定 License Key
4. 拉取廣告
5. 實作 VpadnAdListener

建議您在應用程式的 Activity 內進行上述步驟。

## 在 MainActivity 中編寫橫幅廣告
---
請參考以下步驟，在您的 MainActivity 中完成橫幅廣告。

### Import Vpon SDK 並宣告 VpadnBanner
---
```java
import com.vpadn.ads.*;

public class MainActivity extends Activity implements VpadnAdListener {
        private RelativeLayout adBannerLayout;
        
        // Declare VpadnBanner instance
  	private VpadnBanner vponBanner = null;

  	// Please fill in with your License Key
  	private String bannerId = "License Key" ;
        ...
}
```

### 建立 VpadnBanner 物件，並指定 License Key
---
```java
public class MainActivity extends Activity implements VpadnAdListener {
        ...
        @Override
  	protected void onCreate(Bundle savedInstanceState) {
  		super.onCreate(savedInstanceState);
  		setContentView(R.layout.activity_main);
  		// Get your layout view for Vpon banner
  		adBannerLayout = (RelativeLayout) findViewById(R.id.adLayout);

  		// Create VpadnBanner instance
                vponBanner = new VpadnBanner(this, bannerId, VpadnAdSize.SMART_BANNER, "TW");
                vponBanner.setAdListener(this);
  		VpadnAdRequest adRequest = new VpadnAdRequest();
  		// Set "true" to enable banner ad auto refresh
  		adRequest.setEnableAutoRefresh(true);
                // Load vpon banner
  		vponBanner.loadAd(adRequest);
                // Add vpon banner to your layout view
  		adBannerLayout.addView(vponBanner);
  	}

  	@Override
  	protected void onDestroy() {
  		super.onDestroy();
  		if (vponBanner != null) {
  			//remember to call destroy method
  			vponBanner.destroy();
  			vponBanner = null;
  		}
  	}
    }
```

## 在 layout 中編寫橫幅廣告
---
您也可以直接在 layout 中定義橫幅廣告：

``` xml
  <LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
      xmlns:vpadn="http://schemas.android.com/apk/lib/com.vpadn.ads"
      android:id="@+id/mainLayout"
      android:layout_width="fill_parent"
      android:layout_height="fill_parent"
      android:orientation="vertical" >

      <RelativeLayout
          android:id="@+id/adLayout"
          android:layout_width="fill_parent"
          android:layout_height="wrap_content" >

          <!-- Implement Vpon Banner Ad As Below -->
          <com.vpadn.ads.VpadnBanner
              android:id="@+id/vpadnBannerXML"
              android:layout_width="wrap_content"
              android:layout_height="wrap_content"
              vpadn:adSize="SMART_BANNER"
              vpadn:autoFresh="true"
              vpadn:bannerId= "License Key"
              vpadn:loadAdOnCreate="true"
              vpadn:platform="TW" />
      </RelativeLayout>
  </LinearLayout>
```

> **Note**：請記得將上面的 vpon:bannerId 改為您的 License Key


## 測試廣告
---
如果您的 License Key 還未通過審核的話，您可以使用下列的方式取得測試廣告：

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

1. 於 log 中搜尋 "advertising_id" (4.8.3 版後，請搜尋 "advertisingId")
2. 直接操作手機：設定 → Google → 廣告 → 您的廣告 ID (Advertising ID)

## 實作 VpadnAdListener
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

# 橫幅廣告尺吋
---
除了支援標準橫幅廣告的尺吋外，Vpon Android SDK 還支援下列幾種尺吋的橫幅廣告：

大小 (寬度x高度)             |     說明       |  VponAdSize 常數值
:------------------------: | :-------------:| :-----------------------------:
320x50                     | 標準橫幅廣告     | VpadnAdSize.BANNER
300x250                    | IAB 中矩形廣告   | VpadnAdSize.IAB\_MRECT
468x60                     | IAB 全橫幅廣告   | VpadnAdSize.IAB\_BANNER
728x90                     | IAB 超級橫幅廣告 | VpadnAdSize.IAB\_LEADERBOARD
device width x auto height | Smart Banner   | VpadnAdSize.SMART\_BANNER

如無特定需求，我們建議您直接使用 `Smart Banner` 即可 (目前不支援VpadnAdSize.IAB_WIDE_SKYSCRAPER)

# Tips
---

### Sample Code
如果您想看到完整的串接實例，請參考我們的 [Sample Code]

### 其它廣告形式
如果您想了解其它廣告形式的串接，請參考以下內容：

* [插頁廣告](../interstitial)
* [原生廣告](../native)
* [Out-stream 影音廣告](../outstream)
* [中介服務](../mediation)
* [進階設定](../advanced)

[串接說明]: {{site.baseurl}}/zh-tw/android/integration-guide/
[Sample Code]:../../android/download/
