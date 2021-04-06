---
layout:         "web"
title:          "Web - 一般横幅广告"
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       /zh-cn/web/original-banner/
lang:           "zh-cn"
---

# 总览
---
Vpon Mobile Web SDK 提供`一般横幅广告`，可让开发者将横幅广告嵌入行动网站中，透过精准投放的广告提升广告收益。


> **Note**：
>此广告仅支援<strong> `行动装置`</strong>，使用者透过 PC 浏览该网站则广告不会显示！

# 广告格式
---
Vpon Mobile Web SDK 支援以下`一般横幅广告格式` :


| 名称                |   Size(WxH)   |
| :----------------: | :------------:|
| Banner            |    320x50     |
| Medium Rectangle  |    300x250    |
| Large Rectangle   |    320x480    |

<!-- | Large Banner      |    320x100    | -->

# 嵌入广告程式码
---
在网页 <body> 内预放广告的位置加上以下程式码：

```html
  <body>
...
    <vpon vpon_ad_test="1"
          vpon_ad_licensy_key="Your First License Key for Banner"
          vpon_ad_format="320x50_mb"
          debug="true"></vpon>
...
    <vpon vpon_ad_test="1"
          vpon_ad_licensy_key="Your Second License Key for Banner"
          vpon_ad_format="300x250_mb"
          debug="true"></vpon>
...
    <vpon vpon_ad_test="1"
          vpon_ad_licensy_key="Your Third License Key for Banner"
          vpon_ad_format="320x50_mb"
          debug="true"></vpon>
...
    <script type="text/javascript"  src="//m.vpon.com/sdk/vpadn-sdk.js"> </script>
  </body>
```
> **Note**:
>
>* Vpon Web SDK 支援 `HTTPS`，在将 SDK 档案引入时请如如范例所示使用 `//m.vpon.com/sdk/vpadn-sdk.js` 让浏览器在载入页面时可依照当前页面自动判断并引用适当资源，每个页面只需引入一次，必须加在 </body> 前。
>
>* 同一网页最多嵌入 3 个广告版面 (如范例所示)，每个版面请用不同 License Key。
>
>* 存档后，重新读取网页，您就可以在有 \<vpon\> tag 的位置看到 `测试广告` 被拉取。
>
>* 如要将网站正式上线，请将 vpon_ad_test 的参数改为 `"0"` 以拉取正式广告。

## Callback {#callback}
---
Vpon Mobile Web SDK 提供没有广告回传时的 Callback Function，让您能在没有广告回传时，仍可以有效利用流量。

```html
<body>
...
  <vpon vpon_ad_test="0"
        vpon_ad_licensy_key="Your License Key For Banner"
        vpon_ad_format="320x50_mb"
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

## Advanced Setup
---

名称                  | 描述                              | 必要  | 范例
:--------------------:|:---------------------------------------:|:----------:|:------------------------:
vpon\_ad\_licensy\_key| 广告版位 ID                           | Y    |<font color="red">输入 Vpon License Key</font>
vpon\_ad\_format      | Format<br>(1)320x50\_mb <br>(2)300x250\_mb <br> (3)320x480\_mb | Y         | "320x50\_mb"
vpon\_ad\_test        | 是否拉取测试广告                    | N    | 1(是)/0(否)<br>预设为 "1"
debug                 | 是否在 console 显示 debug 资讯      | N    | true/false<br>预设为 false
openTab               | 是否开启新tab 显示 广告内容           | N    | true/false<br>预设为 true
is\_rotate             | 是否开启 Banner 自动更新           | N       | true/false<br>预设为 "false"
ad\_request\_callback | 没有广告回传时的 Callback Function  | N       | 请参考 [Callback]

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
            vpon_ad_licensy_key="Your License Key for Banner"
            vpon_ad_format="320x50_mb"
            debug="true"></vpon>
    </div>
    </br>
    <div>
      <vpon vpon_ad_test="1"
            vpon_ad_licensy_key="Your License Key for Banner"
            vpon_ad_format="300x250_mb"
            debug="true"></vpon>
    </div>
    <script type="text/javascript" src="//m.vpon.com/sdk/vpadn-sdk.js"> </script>
  </body>
```

> **Note**:
>
> 1. 若将 Vpon 广告嵌入在 iframe 内，请记得调整 iframe 到适当大小，以符合 Vpon 广告的长宽。
> 2. 以上的 License Key 为范例，请置换为您自己申请的 License Key 以防收益分润无法取得。

# 使用 Google Ad Manager 中介服务
---
本段专为 Google Ad Manager 使用者而设，主要说明 Google Ad Manager 搭配 Web API 的设定方式。

## 新增广告单元，并生成广告代码
在 [Google Ad Manager] 使用者介面中：

1. 新增广告单元
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

程式码片段请填入:

```html
<vpon vpon_ad_test="0"
       vpon_ad_licensy_key="Your License Key for Banner"
       vpon_ad_format="320x50_mb"
       debug="true"></vpon>
      <script type="text/javascript"  src="//m.vpon.com/sdk/vpadn-sdk.js"> </script>
```
> **Note**: vpon vpon_ad_test="1" 为开启测试广告， vpon vpon_ad_test="0"为拉取正式广告。

广告素材设定如下图所示，注意，请勿勾选`投放到 SafeFrame`：
<img src="{{site.imgurl}}/WebAdManager_15.png" alt="" class="width-600" />


<!-- #### 轮播型素材设定
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

<vpon vpon_ad_test="1" vpon_ad_licensy_key="Your License Key for Banner" vpon_ad_format="320x50_mb" debug="true" ad_request_callback="vponCallBackMethod" is_rotate="false"></vpon>

<script type="text/javascript" src="//m.vpon.com/sdk/vpadn-sdk.js">
</script>
```
> **Note**：
>
>1. your_ad_unit：放入另一组广告空间产生的广告代码，此广告代码的格式会例如这样: /78213298/WebMediation，且此代码被指向到欲轮播的下一家广告的广告订单项，在此订单项里上传欲轮播的素材，如: Adsense script。请避免再将无广告投递的素材包含进来，以防造成无穷回圈。
>2. [320, 50]： 请替换成欲展示的广告大小。
>3. your_licensy_key：请填入vpon申请的 License Key。

范例：
![DFP_WEB_CALLBACK]

欲了解更多 Passback 运行机制，请参考 [GAM tags](https://support.google.com/dfp_sb/answer/1693146?hl=en) -->

# FAQ
---

### 仍然看不到广告？
请确认以下项目：

* 请试着用行动装置上的浏览器开启网站。
* 先清除浏览器快取并删除 Cookie，然后重新连线到网站。

### 仍然无法解决？
请将 debug 模式打开，重新载入网站，将 "Vpadn-" 开头的讯息截取下来并且联系 [Vpon FAE]

[Callback]: {{site.baseurl}}/zh-cn/web/original-banner/#callback
[Vpon FAE]: mailto:fae@vpon.com
[Google Ad Manager]: https://admanager.google.com/

[新增指定目标_DFP]: {{site.imgurl}}/新增指定目标.png
[DFP_WEB_CALLBACK]: {{site.imgurl}}/DFP_WEB_CALLBACK.png