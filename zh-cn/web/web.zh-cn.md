---
layout:         "default"
title:          "Mobile Web SDK 串接说明"
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       /zh-cn/web/
lang:           "zh-cn"
---

# 总览
---
Vpon Mobile Web SDK 可以让各种规模的行动网站发佈商方便的显示 Vpon 广告，并赚取收益。 <br>
<font color="red">**Note**：此广告仅支援<strong>行动装置</strong>，使用者透过 PC 浏览该网站则广告不会显示！</font>
<br>


# 需求条件
---

1. HTML 基本观念
2. 注册，申请，并取得 Vpon Mobile Web 版位 ID
3. 修改行动网站程式码的权限
<br>



# 串接广告
---

| [一般横幅广告][1]  |[置底横幅广告][2] |

<br>

# 广告格式
---
现在的 Vpon Mobile Web SDK 支援以下`一般横幅广告格式`:



| 名称             |    Size(WxH)  |
| :---------------- | :------------:|
| Banner            |    320x50     |
| Medium Rectangle  |    300x250    |


<br>

# 嵌入广告程式码
---
在网页 <body> 内预放广告的位置加上以下程式码：

```html
<body>
...
  <vpon vpon_ad_test="1"
        vpon_ad_licensy_key="your_first_vpon_banner_id_here"
        vpon_ad_format="320x50_mb"
        debug="true"></vpon>
...
  <vpon vpon_ad_test="1"
        vpon_ad_licensy_key="your_second_vpon_banner_id_here"
        vpon_ad_format="320x50_mb"
        debug="true"></vpon>
...
  <vpon vpon_ad_test="1"
        vpon_ad_licensy_key="your_third_vpon_banner_id_here"
        vpon_ad_format="300x250_mb"
        debug="true"></vpon>
...
  <script type="text/javascript"  src="//m.vpon.com/sdk/vpadn-sdk.js"> </script>
</body>
```
> **Note**:

>* 同一网页最多嵌入 3 个广告版面 (如上例)，每个版面请用不同版位 ID。
>
>* JavaScript 只需要放置一个，并且必须加在</body>前。
>
>* 完成存档后，重新读取网页，您就可以在有 \<vpon\> tag 的位置看到 `测试广告` 被拉取。(如要上线请改成不拉取测试广告 vpon_ad_test="0")
<br>

## Advanced Setup
---

名称                  |        描述                      | 必要  |  范例
:--------------------:|:---------------------------------------:|:----------:|:------------------------:
vpon\_ad\_licensy\_key| 版位 ID                               |  Y         |<font color="red">输入 Vpon License Key</font>
vpon\_ad\_format      | 广告版行：320x50\_mb, 300x250\_mb            |   Y       |     “320x50\_mb”
vpon\_ad\_test        |   是否拉取测试广告                        | N          |   1(是)/0(否)，预设为(是)
debug                 | 是否在 console 显示 debug 资讯          |  N         |   true/false，预设为 false
openTab               |是否开启新tab 显示 广告内容                 |N           |  true/false，预设为 true

<br>

# 范例网页
---

```html
<html>
  <head><meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
  </head>
  <body>
    <h1>The Test Page</h1>

    <div>
      <vpon vpon_ad_test="1"
            vpon_ad_licensy_key="Your Banner ID"
            vpon_ad_format="320x50_mb"
            debug="true"></vpon>
    </div>
    </br>
    <div>
      <vpon vpon_ad_test="1"
            vpon_ad_licensy_key="Your Banner ID"
            vpon_ad_format="300x250_mb"
            debug="true"></vpon>
    </div>
    <script type="text/javascript" src="//m.vpon.com/sdk/vpadn-sdk.js"> </script>
  </body>
```

> **Note**:

> 1. 若将 Vpon 广告嵌入在 iframe 内，请记得调整 iframe 到适当大小，以符合 Vpon 广告的长宽。
> 2. 以上的 License Key 为范例，请置换为您自己申请的 License Key 以防收益分润无法取得。
<br>


# 使用 DFP 中介服务
---
本段专为 DFP 使用者而设，主要说明 DoubleClick 联播网搭配 Web API 的方式。

## DFP 产生广告代码
勾选「启用单一请求」后将 「Google发佈商广告代码」裡产生的「标头」放在网页的HEAD元素中，将「文件内文」放在您要显示这个广告单元的网页内文中。

## 设定广告空间
在 DFP 使用者介面中 [Here]:

1. 新增广告空间
2. 在广告单元中设定名称、 大小、目标视窗后储存
3. 产生广告代码 (选取Google发佈商广告代码)

<img src="{{site.imgurl}}/UnitAdSetting_DFP1.png" alt="" class="width-600" />
<img src="{{site.imgurl}}/UnitAdSetting_DFP2.png" alt="" class="width-600" />

## 设定委刊单、委刊项及广告素材
如要透过「DFP 广告管理系统标准版」放送新的广告活动，请先建立新委刊单。建好委刊单后，您还必须建立委刊项、新增广告素材以及核准委刊单，委刊单广告才能放送。针对保留的委刊项类型 (贊助和标准)，在委刊单获得核准以前，DFP 不会保留广告空间。

### 建立委刊单
若要在执行广告空间预测之前建立委刊单，请按照下列指示进行：

1. 在「DFP 广告管理系统标准版」帐户中，按一下 `委刊单` 标籤。
2. 按一下 `新增委刊单`。
3. 在适当栏位中输入您的委刊单资讯。不可与联播网中其他的委刊单名称重複。
4. 输入委刊项资讯。
5. 按一下 `检查广告空间`，确认委刊单拥有足够的曝光供应量。
![Warning]
6. 按一下 `储存`。建好委刊单之后，您必须先予以核准，委刊项才能放送。

### 委刊项资讯
如何建立委刊项：

1. 在 DFP 广告管理系统标准版帐户中，按一下 `委刊单` 标籤。
2. 建立新委刊单，或按一下表格中的现有委刊单。
3. 按一下 `新增委刊项`
4. 输入委刊项名称，不得与联播网中其他委刊项的名称重複。
5. 输入您想要上传广告素材的广告空间大小。
6. (选用程序) 输入任何有助于委刊项投放作业的相关注释。
7. 输入委刊项类型、日期、数量和费用。
8. (选用程序) 在 `调整放送` 下方进行放送设定。
9. 选取您的目标广告空间。

您可以指定广告单元、刊登位置或同时指定两者。如要寻找要指定的广告空间，可以逐步浏览联播网的广告空间或是执行搜寻。

广告单元会沿用您的联播网名称，代表您联播网中所有的广告单元。如果您为委刊项指定这个联播网层级的广告单元，委刊项将指定联播网中的任何广告单元。

范例：
![新增指定目标_DFP]

10. (选用程序) 输入其他指定条件，指定特定目标对象。 如果您未将委刊项指定给任何广告单元或刊登位置，系统会将委刊项设成在全联播网随机放送。这表示委刊项可在您网站上的任何广告单元中放送
11. 按一下 `储存`

### 上传广告素材

1. 按一下要新增广告素材的委刊项。您也可以视需求建立新委刊项。
2. 按一下 [新增广告素材]。所有与委刊项相关联的广告素材和广告单元尺寸，都会列在左栏中。您可以将广告素材上传至清单中任何大小的广告单元。
3. 您可以将多个广告素材拖曳到委刊项，或一次只加入一个广告素材

#### 只加入一个广告素材
选取广告素材类型: 选取『所有』中的『 第三方』
<img src="{{site.imgurl}}/廣告素材類型_DFP.png" alt="" class="width-600" />


#### 基本广告素材设定
程式码片段请填入:

```html
<vpon vpon_ad_test="0"
       vpon_ad_licensy_key="Your license Key"
       vpon_ad_format="320x50_mb"
       debug="true"></vpon>
      <script type="text/javascript"  src="//m.vpon.com/sdk/vpadn-sdk.js"> </script>
```
> **Note**: vpon vpon_ad_test="1" 爲开啓测试广告， vpon vpon_ad_test="0"爲拉取正式广告。

范例：
![素材设定_DFP]


#### 轮播型素材设定
程式码片段请填入:

```html
<div id="Vpadn_tag"></div>
<script src="https://www.googletagservices.com/tag/js/gpt.js"></script>
<script type='text/javascript'>
  googletag.cmd.push(function() {
    googletag.defineSlot('your_ad_unit', [320, 50], 'Vpadn_tag').addService(googletag.pubads());
    googletag.pubads().enableSingleRequest();
    googletag.enableServices();
  });
</script>
<script>
  function vponCallBackMethod(adStatus) {
    if (adStatus != 0) {
      googletag.cmd.push(function() {
        googletag.display('Vpadn_tag');
      });
    }
  }
</script>

<vpon vpon_ad_test="1" vpon_ad_licensy_key="your_license_key" vpon_ad_format="320x50_mb" debug="true" ad_request_callback="vponCallBackMethod" is_rotate="false"></vpon>

<script type="text/javascript" src="//m.vpon.com/sdk/vpadn-sdk.js">
</script>
```
> **Note**：

>1. write_your_ad_unit：放入另一组广告空间产生的广告代码，此广告代码的格式会例如这样: /78213298/WebMediation，且此代码被指向到欲轮播的下一家广告的广告订单项，在此订单项裡上传欲轮播的素材，如: Adsense script。请避免再将无广告投递的素材包含进来，以防造成无穷迴圈。
>2. [320, 50]： 请替换成欲展示的广告大小。
>4. write_your_license_key：请填入vpon申请的Banner ID。


范例：
![DFP_WEB_CALLBACK]

欲了解更多passback运行机制，请参考 [GAM tags](https://support.google.com/dfp_sb/answer/1693146?hl=en)

# 其它诀窍
---
[DFP Small Business](https://support.google.com/dfp_sb/) <br>
[Google Developers DFP Banner Ads](https://developers.google.com/mobile-ads-sdk/docs/dfp/fundamentals#android)



# FAQ
---

## 仍然看不到广告？
请确认以下项目：

* 请试着用行动装置上的浏览器开启网站。
* 先清除浏览器快取并删除 Cookie，然后重新连线到网站。

## 仍然无法解决？
请将 debug 模式打开，重新连线网站，将 "Vpadn-" 开头的讯息截取下来并且联繫 [Vpon FAE]

[Vpon FAE]: mailto:fae@vpon.com
[UnitAdSetting_DFP1]: {{site.imgurl}}/UnitAdSetting_DFP1.png
[UnitAdSetting_DFP2]: {{site.imgurl}}/UnitAdSetting_DFP2.png
[新增指定目标_DFP]: {{site.imgurl}}/新增指定目标.png
[广告素材类型_DFP]: {{site.imgurl}}/廣告素材類型_DFP.png
[素材设定_DFP]: {{site.imgurl}}/素材設定_DFP.png
[DFP_WEB_CALLBACK]: {{site.imgurl}}/DFP_WEB_CALLBACK.png
[Warning]: {{site.imgurl}}/Warning.png
[Here]: https://www.google.com/dfp/
[1]: {{site.baseurl}}/zh-cn/web/
[2]: {{site.baseurl}}/zh-cn/web/adhesion-banner/
