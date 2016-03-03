---
layout:         "android"
title:          "Android - 橫幅廣告 "
lead:           "Android - Banner"
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       /zh-tw/android/banner/
lang:           "zh-tw"
---
## 完成串接指示
---
若您尚未完成串接廣告形式前的串接說明，請先前往[串接說明]完成相關設定

# 概要
--------
Vpon 橫幅廣告 (banner) 利用畫面的一小部分來吸引使用者點擊，即可打開全螢幕享受更豐富的瀏覽體驗，例如網站或應用程式商店網頁。
若要在 Android 應用程式中顯示橫幅廣告，只要在您的 Eclipse 專案中導入 SDK，然後在使用者介面上加入 com.vpadn.ads.VpadnBanner 即可。

# 開始撰寫 Banner
---
Android 應用程式由 View 物件所組成，也就是以文字區域和按鈕等控制項的形式向使用者呈現的 Java 執行個體。VpadnBanner 只是另一種 View 子類別，用來顯示由使用者點擊觸發的小型 HTML5 廣告。
和所有的 View 一樣，AdView 可以單用程式碼撰寫，也可以絕大部分用 XML 寫成。

加入橫幅廣告會用到程式碼：

1. 匯入 `com.vpadn.ads.*`
2. 宣告 VpadnBanner 執行個體
3. 建立例項，指定 BannerId，也就是 Vpon 申請的 BannerId
4. 將該檢視加進使用者介面
5. 透過廣告載入例項

最簡易的方式是在應用程式的 Activity 內進行上述所有步驟。

```java
  import com.vpadn.ads.*
  public class MainActivity extends Activity {
  	private RelativeLayout adBannerLayout;
  	private VpadnBanner vponBanner = null;
  	//TODO: Vpon Banner ID
  	private String bannerId = CHANGE ME ;

         @Override
  	protected void onCreate(Bundle savedInstanceState) {
  		super.onCreate(savedInstanceState);
  		setContentView(R.layout.activity_main);
  		//get your layout view for Vpon banner
  		adBannerLayout = (RelativeLayout) findViewById(R.id.adLayout);
  		//create VpadnBanner instance
                  vponBanner = new VpadnBanner(this, bannerId, VpadnAdSize.SMART_BANNER, "TW");
  		VpadnAdRequest adRequest = new VpadnAdRequest();
  		//set auto refresh to get banner
  		adRequest.setEnableAutoRefresh(true);
                  //load vpon banner
  		vponBanner.loadAd(adRequest);
                  //add vpon banner to your layout view
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
  <br>

# 使用 layout xml 設定
---
也可以直接使用 xml 定義 Banner 這樣你就不需要寫任何 java code

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

          <com.vpadn.ads.VpadnBanner
              android:id="@+id/vpadnBannerXML"
              android:layout_width="wrap_content"
              android:layout_height="wrap_content"
              vpadn:adSize="SMART_BANNER"
              vpadn:autoFresh="true"
              vpadn:bannerId= CHANGE_ME
              vpadn:loadAdOnCreate="true"
              vpadn:platform="TW" />
      </RelativeLayout>
  </LinearLayout>
```
<br>

> **Note:**
記得將上面的 vpon:bannerId 填入你真實的 banner ID


# 測試廣告
---
如果你的 banner ID 還未經過審核可以使用下列的方式取得測試廣告
<br>

```java
      VpadnAdRequest adRequest =  new VpadnAdRequest();
      HashSet<String> testDeviceImeiSet = new HashSet<String>();
      testDeviceImeiSet.add("your device advertising id");
      //TODO: put Android device advertising id
      adRequest.setTestDevices(testDeviceImeiSet);
      vponBanner.loadAd(adRequest);
```

## Advertising ID
可以使用下列任一方式取得 device 上的 Advertising ID

1. 於 log 搜尋"advertising_id"
2. 直接操作手機: 設定 → Google → 廣告 → 您的廣告 ID (Advertising ID)

# 橫幅廣告大小
---
除了支援手機上的 320x50 大小外，Vpon 還支援各種不同的橫幅廣告：

大小 (寬度x高度)             |     說明       |  VponAdSize 常數值
:------------------------: | :-------------:| :-----------------------------:
320x50                     | 標準橫幅廣告     | VpadnAdSize.BANNER
468x60                     | IAB 全橫幅廣告   | VpadnAdSize.IAB\_BANNER
728x90                     | IAB 超級橫幅廣告 |  VpadnAdSize.IAB\_LEADERBOARD
device width x auto height | Smart Banner    |  VpadnAdSize.SMART\_BANNER

如無特定需求，我們建議您直接使用上面最後一項 `smart banner` 即可 (目前不支援VpadnAdSize.IAB_WIDE_SKYSCRAPER)


#  更新廣告
---
如果您在伺服器的 Vpon 帳戶中指定了更新速率，則需要使用下面的 sample 才會啟動 banner 自動更新

```java
 VpadnAdRequest adRequest = new VpadnAdRequest();
 //設定成 true 才會自動更新
 adRequest.setEnableAutoRefresh(true);
 adShowBanner.loadAd(adRequest);
```


# 下載 Sample code
---
[Go to download page]
<br>

# 結果
---
現在只要執行這個應用程式，您應該就會在畫面上方看到橫幅廣告：
<img class="width-400" src="{{site.imgurl}}/A-sdk330-03.png" alt="successful result example">

# 其他訣竅
> 請參閱[插頁廣告](../Interstitial)、[中介服務](../mediation)、[進階設定](../advanced)中獲取更多簡介。

[串接說明]: {{site.baseurl}}/zh-tw/android/integration-guide/
[Go to download page]: {{site.baseurl}}/zh-tw/download/
