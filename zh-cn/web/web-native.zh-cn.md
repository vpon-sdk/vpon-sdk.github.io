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
        vpon_ad_licensy_key="License Key"
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



## 原生广告版型 {#layout}
Vpon Mobile Web SDK 提供三种包含不同广告素材元件的原生广告版型，只要将\<vpon\> tag 中的 `vpon_na_layout` 参数改为您选择要使用的版型，即会回传包含对应广告素材的素材组合，您可以透过`CSS`控制这些广告素材呈现的样式。<br><br>关于广告素材的显示规范，请参考[Native ad Spec]。

![Web_Native_Layout]

## Callback {#callback}
---
Vpon Mobile Web SDK 提供没有广告回传时的 Callback Function，让您能在没有广告回传时，仍可以有效利用流量。

```html
<body>
...
  <vpon vpon_ad_test="0"
        vpon_ad_licensy_key="License Key"
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
vpon\_ad\_licensy\_key| 广告版位 ID                                 | Y          | <font color="red">输入 Vpon License Key</font>
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
        position: relative;
        padding-top: 0;
        }

        .vpon-native-ad .vpon-cover-image{
        position: relative;
        width: calc(100vw - 40px);        
        height: calc((100vw - 40px) * .6);
        }

        .vpon-native-ad .vpon-cover-image img{
          position: absolute;
          top: 0;
          left: -6.25vw;
          bottom: 0;
          right: 0;
          background-position: center;
          background-size: cover;
          background-repeat: no-repeat;
          width: auto;
          height: 100%;
        }

        .vpon-native-ad .vpon-icon-image{
        display: none;
        }

        .vpon-native-ad .vpon-title{
        position: absolute;
        max-height: 3em;
        font-size: 13px;
        font-weight: 500;
        line-height: 1.5;
        color: #151717;
        font-family: NotoSansCJKtc-Regular, "Helvetica Neue", Helvetica,Vaedana;
        text-decoration: none;
        overflow: hidden;
        display: -webkit-box;
        text-overflow: ellipsis;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        top: 84%;
        }

        .vpon-native-ad .vpon-body-text{
        position: relative;
        max-height: 3em;
        margin-top: 16%;
        font-size: 13px;
        font-weight: 500;
        line-height: 1.5;
        color: #151717;
        font-family: NotoSansCJKtc-Regular, "Helvetica Neue", Helvetica,Vaedana;
        text-decoration: none;
        overflow: hidden;
        display: -webkit-box;
        text-overflow: ellipsis;
        -webkit-line-clamp: 0;
        -webkit-box-orient: vertical;
visibility: hidden;
        }

        .vpon-native-ad .vpon-action{
        display: none;
        }

        .vpon-native-ad .vpon-attribution{
        display: inline-block;
        margin-right: 10px;
        padding: 7px 8px;
        color: #6e7071;
        font-family: NotoSansCJKtc-Regular, "Helvetica Neue", Helvetica,Vaedana;
        font-size: 13px;
        background-color: #f3f4f5;
        border-radius: 0px;
        position:absolute;
        top: 71%;
        }              
        </style>
  </head>
  <body>
    <h1>The Test Page</h1>

    <div>
      <vpon vpon_ad_test="1"
            vpon_ad_licensy_key="License Key"
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
> 2. 以上的 License Key 为范例，请置换为您自己申请的 License Key 以防收益分润无法取得。

<br>


# 使用 Google Ad Manager 中介服务
---
本段专为 Google Ad Manager 使用者而设，主要说明 Google Ad Manager 搭配 Web API 的设定方式。

## 新增广告单元，并生成广告代码
在 [Google Ad Manager] 使用者介面中：

1. 评估 Native Ad 在网页上显示的大小，新增相符的广告单元
2. 在广告单元中完成名称、 大小等设定后储存
3. 生成广告代码

新增广告单元后，选择广告单元，并点击「生成代码」
<img src="{{site.imgurl}}/WebAdManager_10.png" alt="" class="width-600" />
选取代码类型为「Google 发布商代码」
<img src="{{site.imgurl}}/WebAdManager_11.png" alt="" class="width-600" />
选择「启用单一请求」
<img src="{{site.imgurl}}/WebAdManager_12.png" alt="" class="width-600" />
请将产生的代码结果中的「文档标头」放在网站的 <head> 中、将「文档正文」放在网站的 <body> 中
<img src="{{site.imgurl}}/WebAdManager_13.png" alt="" class="width-600" />

## 设定委刊单、委刊项及广告素材
---
如要透过 Google Ad Manager 放送新的广告活动，请先建立新委刊单。建好委刊单后，您还必须建立委刊项、新增广告素材以及核准委刊单，委刊单广告才能放送。

### 建立委刊单
若要在执行广告空间预测之前建立委刊单，请按照下列指示进行：

1. 在 「Google Ad Manager」 帐户中，点击 `委刊单` 标签
2. 点击 `新增委刊单`
3. 在适当栏位中输入您的委刊单资讯。不可与联播网中其他的委刊单名称重复
4. 输入委刊项资讯
5. 点击 `检查广告空间`，确认委刊单拥有足够的曝光供应量
6. 点击 `储存`，建好委刊单之后，您必须先予以核准，委刊项才能放送

### 建立委刊项

1. 在 Google Ad Manager 帐户中，点击 `委刊单` 标签
2. 建立新委刊单，或点击表格中的现有委刊单
3. 点击 `新增委刊项`
4. 输入委刊项名称，不得与联播网中其他委刊项的名称重复
5. 输入您想要上传广告素材的广告空间大小
6. (选用程序) 输入任何有助于委刊项投放作业的相关注释
7. 输入委刊项类型、日期、数量和费用
8. (选用程序) 在 `调整放送` 下方进行放送设定
9. 选取您的目标广告空间，指定广告单元、刊登位置或同时指定两者

![新增指定目标_DFP]

此外，您可以输入其他指定条件，指定特定目标对象。 如果您未将委刊项指定给任何广告单元或刊登位置，系统会将委刊项设成在全联播网随机放送。这表示委刊项可在您网站上的任何广告单元中放送。

完成编辑后，请点击 `储存`保存委刊项设定。

### 新增广告素材

1. 点击要新增广告素材的委刊项，或视需求建立新委刊项
2. 点击 [新增广告素材]。所有与委刊项相关联的广告素材和广告单元尺寸，都会列在左栏中。您可以将广告素材上传至清单中任何大小的广告单元
3. 您可以将多个广告素材拖曳到委刊项，或一次只加入一个广告素材

#### 广告素材设定
选取广告素材类型: 选取`所有`中的`第三方`
<img src="{{site.imgurl}}/WebAdManager_14.png" alt="" class="width-600" />

程式码片段请填入 Vpon 广告程式码及用来控制 Native Ad Layout 的 CSS 样式:

```html
<vpon vpon_ad_test="0"
       vpon_ad_licensy_key="Your License Key for Banner"
       vpon_ad_format="320x50_mb"
       debug="true"></vpon>
      <script type="text/javascript"  src="//m.vpon.com/sdk/vpadn-sdk.js"> </script>
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

      ...
</style>
```
> **Note**: vpon vpon_ad_test="1" 为开启测试广告， vpon vpon_ad_test="0"为拉取正式广告。

广告素材设定如下图所示，注意，请勿勾选`投放到 SafeFrame`：
<img src="{{site.imgurl}}/WebAdManager_38.png" alt="" class="width-600" />

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
[Google Ad Manager]: https://admanager.google.com/
[新增指定目标_DFP]: {{site.imgurl}}/新增指定目标.png
[DFP_WEB_CALLBACK]: {{site.imgurl}}/DFP_WEB_CALLBACK.png