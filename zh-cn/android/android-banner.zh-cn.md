---
layout:         "android"
title:          "Android - 横幅广告 "
lead:           "Android - Banner"
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       /zh-cn/android/banner/
lang:           "zh-cn"
---
## 完成串接指示
---
若您尚未完成串接广告形式前的串接说明，请先前往[串接说明]完成相关设定

# 概要
--------
Vpon 横幅广告 (banner) 利用画面的一小部分来吸引使用者点击，即可打开全萤幕享受更丰富的浏览体验，例如网站或应用程式商店网页。
若要在 Android 应用程式中显示横幅广告，只要在您的 Eclipse 专案中导入 SDK，然后在使用者介面上加入 com.vpadn.ads.VpadnBanner 即可。

# 开始撰写 Banner
---
Android 应用程式由 View 物件所组成，也就是以文字区域和按钮等控制项的形式向使用者呈现的 Java 执行个体。VpadnBanner 只是另一种 View 子类别，用来显示由使用者点击触发的小型 HTML5 广告。
和所有的 View 一样，AdView 可以单用程式码撰写，也可以绝大部分用 XML 写成。

加入横幅广告会用到程式码：

1. 汇入 `com.vpadn.ads.*`
2. 宣告 VpadnBanner 执行个体
3. 建立例项，指定 BannerId，也就是 Vpon 申请的 BannerId
4. 将该检视加进使用者介面
5. 透过广告载入例项

最简易的方式是在应用程式的 Activity 内进行上述所有步骤。

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
                  vponBanner = new VpadnBanner(this, bannerId, VpadnAdSize.SMART_BANNER, "CN");
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

# 使用 layout xml 设定
---
也可以直接使用 xml 定义 Banner 这样你就不需要写任何 java code

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
              vpadn:platform="CN" />
      </RelativeLayout>
  </LinearLayout>
```
<br>

> **Note:**
记得将上面的 vpon:bannerId 填入你真实的 banner ID


# 测试广告
---
如果你的 banner ID 还未经过审核可以使用下列的方式取得测试广告
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

1. 于 log 搜寻"advertising_id"
2. 直接操作手机: 设定 → Google → 广告 → 您的广告 ID (Advertising ID)

# 横幅广告大小
---
除了支援手机上的 320x50 大小外，Vpon 还支援各种不同的横幅广告：

大小 (宽度x高度)             |     说明       |  VponAdSize 常数值
:------------------------: | :-------------:| :-----------------------------:
320x50                     | 标准横幅广告     | VpadnAdSize.BANNER
468x60                     | IAB 全横幅广告   | VpadnAdSize.IAB\_BANNER
728x90                     | IAB 超级横幅广告 |  VpadnAdSize.IAB\_LEADERBOARD
device width x auto height | Smart Banner    |  VpadnAdSize.SMART\_BANNER

如无特定需求，我们建议您直接使用上面最后一项 `smart banner` 即可 (目前不支援VpadnAdSize.IAB_WIDE_SKYSCRAPER)


#  更新广告
---
如果您在伺服器的 Vpon 帐户中指定了更新速率，则需要使用下面的 sample 才会启动 banner 自动更新

```java
 VpadnAdRequest adRequest = new VpadnAdRequest();
 //设定成 true 才会自动更新
 adRequest.setEnableAutoRefresh(true);
 adShowBanner.loadAd(adRequest);
```



# 下载 Sample code
---
[前往下载][1]
<br>

# 结果
---
现在只要执行这个应用程式，您应该就会在画面上方看到横幅广告：
<img class="width-400" src="{{site.imgurl}}/A-sdk330-03.png" alt="successful result example">

# 其他诀窍
> 请参阅[插页广告](../Interstitial)、[中介服务](../mediation)、[进阶设定](../advanced)中获取更多简介。

[串接说明]: ../integration-guide/
[1]:../../android/download/
