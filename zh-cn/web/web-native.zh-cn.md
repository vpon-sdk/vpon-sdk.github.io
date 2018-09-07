---
layout: "web"
title: "Web - 原生广告"
lead: ""
description:
keywords: 'Keywords for this page, in the meta data'
permalink: /zh-cn/web/native/
lang: "zh-cn"
---

# 总览
---
Vpon Mobile Web SDK 提供`原生广告`。有别于横幅广告、插页广告会直接提供可立即呈现的广告内容，Vpon 提供了三种包含标题、图像等广告内容的原生广告组合，您可以自订 `CSS` 样式，将广告内容打造成符合您网页内容的风格，让您以最自然的方式呈现广告。<br>

> **Note**：
>此广告仅支援<strong>`行动装置`</strong>，使用者透过 PC 浏览该网站则广告不会显示！


# 嵌入广告程式码
---
在行动网页的 <body> 中填入 \<vpon\> tag，与横幅广告不同点在于当 \<vpon\> tag 中的属性 `vpon_ad_format` 为 `na`时，会请求原生广告。

在网页 <body> 内欲显示广告的位置加上以下程式码：

```html
<body>
...
  <vpon vpon_ad_test="1"
        vpon_ad_licensy_key="License ID"
        vpon_ad_format="na"
        vpon_na_layout="0"
        vpon_na_min="1200x627"
        debug="true"></vpon>
...
  <script type="text/javascript"  src="//m.vpon.com/sdk/vpadn-sdk.js"> </script>
...
</body>
```

> **Note**:
>
>* Vpon Web SDK 支援 `HTTP` & `HTTPS`，在将 SDK 档案引入时请如如范例所示使用 `//m.vpon.com/sdk/vpadn-sdk.js` 让浏览器在载入页面时可依照当前页面自动判断并引用适当资源，每个页面只需引入一次，必须加在 </body> 前。
>
>* 您可以利用 vpon_na_min 的参数指定广告图片尺吋，如不指定，系统会依使用者的屏幕尺吋回传相应大小的图片。vpon_na_min 的参数选择，请参考 [Advanced Setup]。
>
>* 存档后，重新读取网页，您就可以在有 \<vpon\> tag 的位置看到 `测试广告` 被拉取。
>
>* 如要将网站正式上线，请将 vpon_ad_test 的参数改为 `"0"` 以拉取正式广告。

<br>

## 原生广告版型 {#layout}
---
Vpon Mobile Web SDK 提供三种原生广告版型，只要将\<vpon\> tag 中的 `vpon_na_layout` 参数改为您选择要使用的版型，即会回传相对应的广告素材，您可以透过`CSS`控制这些广告素材呈现的样式。<br><br>关于广告素材的显示规范，请参考[Native ad Spec]。

![Web_Native_Layout]

## Callback {#callback}
---
Vpon Mobile Web SDK 提供没有广告回传时的 Callback Function，让您能在没有广告回传时，仍可以有效利用流量。

```html
<body>
...
  <vpon vpon_ad_test="0"
        vpon_ad_licensy_key="License ID"
        vpon_ad_format="na"
        vpon_na_layout="0"
        vpon_na_min="1200x627"
        debug="true"
        ad_request_callback="vponCallBackMethod"></vpon>
...
  <script type="text/javascript"  src="//m.vpon.com/sdk/vpadn-sdk.js"> </script>
...
  <script>
        function vponCallBackMethod(adStatus) {
          if (adStatus != 0) {
            // 没有广告回传，执行其它操作
          } else {
            // 有广告回传
          }
        }
  </script>
...
</body>
```
<br>

<br>

## Advanced Setup {#advanced}
---

名称                  |        描述                      | 必要  |  范例
:--------------------:|:---------------------------------------:|:----------:|:------------------------:
vpon\_ad\_licensy\_key| 广告版位 ID                                 | Y          | <font color="red">输入 Vpon License ID</font>
vpon\_ad\_format      | 原生广告格式<br>na                       | Y          | "na"
vpon\_ad\_test        | 是否拉取测试广告                          | N          | 1(是)/0(否)，预设为 "1"
vpon\_na\_layout      | 原生广告版型                             | N          | 请参考[原生广告版型]<br> 预设为"0"
vpon\_na_\_min        | Main Image 尺吋<br>(1) 1200x627 <br>(2) 627x627 | N          | "1200x627"
debug                 | 是否在 console 显示 debug 资讯            | N          | true/false，预设为 "false"
openTab               | 是否开启新tab 显示 广告内容                | N          | true/false，预设为 "true"
ad\_request\_callback | 没有广告回传时的 Callback Function        | N          | 请参考 [Callback]

<br>


## Navive Ad Spec {#nativeAdSpec}
--------
系统会根据您选择的原生广告版型回传对应的原生广告素材，下表`红字`表示您必须显示的原生广告元件。

Properties   |Class Name   | Description
:-----------:|:-----------:|:-----------:|
<font color="red">Title</font> | vpon-title | 原生广告标题文字，文字内容需清晰可见 <br> 最长为30个英文字或15个中文字
:-----------:|:-----------:|:-----------:|
<font color="red">Main Image</font> | vpon-cover-image| 1200 x 627px <br> 627 x 627px<br> (可等比例缩放，或裁切为16:9、4:3)
:-----------:|:-----------:|:-----------:|
<font color="red">AD Badge</font> | vpon-attribution | 让使用者了解此为广告<br> (例如： 赞助商名称、赞助、广告 等等) <br> 最长为15个英文字或8个中文字
:-----------:|:-----------:|:-----------:|
Icon  | vpon-icon-image| 128 x 128px<br> (可等比例缩放，不可变形，不可裁切)
:-----------:|:-----------:|:-----------:|
Description  | vpon-body-text| 原生广告内容文字，文字内容需清晰可见 <br> 最长为100个英文字或50个中文字
:-----------:|:-----------:|:-----------:|
CallToAction | vpon-action| 需要完整显示<br>最长为20个英文字或10个中文字
:-----------:|:-----------:|:-----------:|

# 结果
---
<img src="{{site.imgurl}}/Web_Native_Sample.png" alt="" class="width-300"/>

# 范例网页
---

```html
<html>
  <head><meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
  <title>Vpon Native Ad</title>
  <!-- Native Ad Style -->
  <style>
      .vpon-native-ad{
        border: 1px solid #dcdcdc;
        position: relative;
      }

      .vpon-native-ad .vpon-title{
        display: block;
        padding: 5px;
        font-size: 20px;

      }

      .vpon-native-ad .vpon-cover-image{
        float: left;
        width: 33%;
        margin: 10px;
      }
      .vpon-native-ad .vpon-cover-image img{
        width: 100%;
      }

      .vpon-native-ad .vpon-icon-image{
      }

      .vpon-native-ad .vpon-body-text{
        font-size: 14px;
      }

      .vpon-native-ad .vpon-action{
        display: none;   
      }

      .vpon-native-ad .vpon-attribution{
        position: absolute;
        color: #9a9a9a;
        right: 5px;
        bottom: 5px;
        font-size: 13px;
      }
    </style>
  </head>
  <body>
    <h1>The Test Page</h1>

    <div>
      <vpon vpon_ad_test="1"
            vpon_ad_licensy_key="License ID"
            vpon_ad_format="na"
            vpon_na_layout="0"
            vpon_na_min="1200x627"
            debug="true"></vpon>
    </div>

    <script type="text/javascript" src="//m.vpon.com/sdk/vpadn-sdk.js"> </script>
  </body>
</html>
```

> **Note**:
>
> 1. 若将 Vpon 广告嵌入在 iframe 内，请记得调整 iframe 到适当大小，以符合 Vpon 广告的长宽。
> 2. 以上的 License ID 为范例，请置换为您自己申请的 License ID 以防收益分润无法取得。

<br>

# FAQ
---

## 仍然看不到广告？
请确认以下项目：

* 请试着用行动装置上的浏览器开启网站。
* 先清除浏览器快取并删除 Cookie，然后重新连线到网站。

## 仍然无法解决？
请将 debug 模式打开，重新连线网站，将 "Vpadn-" 开头的讯息截取下来并且联系 [Vpon FAE]

[原生广告版型]: {{site.baseurl}}/zh-cn/web/native/#layout
[Advanced Setup]: {{site.baseurl}}/zh-cn/web/native/#advanced
[Callback]: {{site.baseurl}}/zh-cn/web/native/#callback
[Web_Native_Layout]: {{site.imgurl}}/Web_Native_Layout.png
[Native Ad Spec]: {{site.baseurl}}/zh-cn/web/native/#nativeAdSpec
[Vpon FAE]: mailto:fae@vpon.com
