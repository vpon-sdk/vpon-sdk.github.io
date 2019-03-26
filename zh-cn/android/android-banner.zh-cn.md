---
layout:         "android"
title:          "Android - 横幅广告 "
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       /zh-cn/android/banner/
lang:           "zh-cn"
---
# 概要
---
Vpon 横幅广告 (banner) 是利用画面的一小部分展示广告来吸引使用者点击，广告被点击后即可打开全萤幕呈现更丰富的浏览内容，例如网站或应用程式商店网页。

<img class="width-300" src="{{site.imgurl}}/Android_Banner.png" alt="successful result example">

# 完成串接准备
---
在开始串接广告之前，请确认您已经将 Vpon SDK 导入您的 Xcode 专案中。若您尚未完成，请先参考[串接说明]完成相关设定。

# 开始串接横幅广告
---
Android 应用程式由 View 物件所组成，也就是以文字区域和按钮等控制项的形式向使用者呈现的 Java 执行个体。VpadnBanner 是一种 View 子类别，用来显示由使用者点击触发的小型 HTML5 广告。

和所有的 View 一樣，VpadnBanner 可以使用 Java 撰写，也可以用 XML 编写。以下为所需步骤：

1. 汇入 `com.vpadn.ads.*`
2. 宣告 `VpadnBanner`
3. 建立 VpadnBanner 物件，并指定 License Key
4. 拉取广告
5. 实作 VpadnAdListener

建议您在应用程式的 Activity 内进行上述步骤。

## 在 MainActivity 中编写横幅广告
---
请参考以下步骤，在您的 MainActivity 中完成横幅广告。

### Import Vpon SDK 并完告 VpadnBanner
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

### 建立 VpadnBanner 物件，并指定 License Key
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

  		// In SDK 4.8.0 and below, create VpadnBanner instance
                vponBanner = new VpadnBanner(this, bannerId, VpadnAdSize.SMART_BANNER, "TW");
                // In SDK 4.8.1 and above, create VpadnBanner instance
                vponBanner = new VpadnBanner(this, bannerId, VpadnAdSize.SMART_BANNER);
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

# 在 layout 中编写横幅广告
---
您也可以直接在 layout 中定义横幅广告：

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
          <com.vpadn.ads.VpadnBanner
              android:id="@+id/vpadnBannerXML"
              android:layout_width="wrap_content"
              android:layout_height="wrap_content"
              vpadn:adSize="SMART_BANNER"
              vpadn:autoFresh="true"
              vpadn:bannerId= "License Key"
              vpadn:loadAdOnCreate="true"
              vpadn:platform="CN" />
      </RelativeLayout>
  </LinearLayout>
```

> **Note**：请记得将上面的 vpon:bannerId 改为您的 License Key


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

1. 于 log 中搜寻 "advertising_id" (4.8.3 版后，请搜寻 "advertisingId")
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

# 横幅广告尺吋
---
除了支援标准横幅广告的尺吋外，Vpon Android SDK 还支援下列几种尺吋的横幅广告：

大小 (宽度x高度)             |     说明       |  VponAdSize 常数值
:------------------------: | :-------------:| :-----------------------------:
320x50                     | 标准横幅广告     | VpadnAdSize.BANNER
300x250                    | IAB 中矩形广告     | VpadnAdSize.IAB\_MRECT
468x60                     | IAB 全横幅广告   | VpadnAdSize.IAB\_BANNER
728x90                     | IAB 超级横幅广告 |  VpadnAdSize.IAB\_LEADERBOARD
device width x auto height | Smart Banner    |  VpadnAdSize.SMART\_BANNER

如无特定需求，我们建议您直接使用 `Smart Banner` 即可 (目前不支援VpadnAdSize.IAB_WIDE_SKYSCRAPER)


# Tips
---
### Sample Code
如果您想看到完整的串接实例，请参考我们的 [Sample Code]

### 其它广告形式
如果您想了解其它广告形式的串接，请参考以下内容：

* [插页广告](../interstitial)
* [原生广告](../native)
* [Out-stream 影音广告](../outstream)
* [中介服务](../mediation)
* [进阶设定](../advanced)

[串接说明]: ../integration-guide/
[Sample Code]:../../android/download/