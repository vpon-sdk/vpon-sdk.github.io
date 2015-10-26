---
layout:         "android"
title:          "Android - ATS"
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       /zh-cn/android/ats/
lang:            "zh-cn"
---

# ATS SDK 整合
---
请用以下方式整合 ATS SDK，在每次应用程式载入时，将转换资讯传给 Vpon

# 下载
---
请在整合 SDK 前先准备好 SDK，您可点选下载 SDK 包，下载後解压缩档案并开始整合步骤

* [下载(上架至 Google Play store)][1]
* [下载(上架至非 Google Play store)][2]


# 整合步骤
---
## 1. 汇入 Libs:
在专案中建立新资料夹，将 `VponAts.jar` 汇入 `libs` 资料夹中

## 2. 授权
在 Vpon ATS SDK 中，需要存取「网路」丶「位置」丶「手机状态」，因此需要新增下列的程式码至 `AndroidManifest.xml`


```xml
 <uses-permission android:name="android.permission.READ_PHONE_STATE" />
 <uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
 <uses-permission android:name="android.permission.INTERNET" />
 <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>
 <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION"/>
 ```

## 3. 新增 VponATS 至您程式码

``` java
package com.ats;
import com.vpon.ats.VponAts;
import com.vpon.ats.VponAtsListener;
import android.app.Activity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.TextView;
public class ATSActivity extends Activity
{
    /* Called when the activity is first created. */
    VponAts vponAts;
    @Override
    public void onCreate(Bundle savedInstanceState)
    {
      super.onCreate(savedInstanceState);
      setContentView(R.layout.main);
      vponAts = new VponAts(this, " change here to your goal ID ", vponAtsListener);
      if(vponAts != null)
      vponAts.tracker();
    }
    VponAtsListener vponAtsListener = new VponAtsListener() {
       @Override
       public void onVponAtsSuccess(String successMessage) {
           /* handle success */
       }
       @Override
       public void onVponAtsFail(String errorMessage) {
          /* handle fail */
       }
       @Override
       public void onVponAtsWarning(String warningMessage) {
           /* handle warning */
       }
     };
}
```
> **Note:** 请记得在此换上您的 Goal ID

> vponAts = new VponAts(this, "change here to your goal ID ", vponAtsListener);



[1]: http://m.vpon.com/sdk/Android_ATS/vpadn-sdk-ats-obf102-01704102.jar
[2]: http://m.vpon.com/sdk/Android_ATS/vpadn-sdk-ats-obf101-40604102.jar
