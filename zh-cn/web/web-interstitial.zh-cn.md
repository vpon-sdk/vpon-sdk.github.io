---
layout:         "web"
title:          "Web - 插页广告"
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       /zh-cn/web/interstitial/
lang:           "zh-cn"
---

# 总览
---
Vpon Mobile Web SDK 提供`插页广告`，插页式广告是互动式多媒体 HTML5 或“网路应用程式”，在应用程式的正常转换点显示 (例如启动、影片播放前或游戏关卡载入时)。网路应用程式使用上就像在应用程式内浏览一样，只有简单的关闭按钮，而没有任何导览列，因为导览配置就包含在内容本身。

> **Note**:
>此广告仅支援<strong>`行动装置`</strong>，使用者透过 PC 浏览该网站则广告不会显示！

# 嵌入广告程式码
---
在行动网页的 <body> 中填入 \<vpon\> tag，与横幅广告不同点在于当 \<vpon\> tag 中的属性 `vpon_ad_format` 为 `mi`时，会请求插页式广告。

在网页 <body> 内预放广告的位置加上以下程式码：

```html
  <body>
...
      <vpon vpon_ad_test="1"
            vpon_ad_licensy_key="License Key"
            vpon_ad_format="mi"
            debug="true"></vpon>
...
    <script type="text/javascript" src="//m.vpon.com/sdk/vpadn-sdk.js"> </script>
...
  </body>
```

> **Note**:
>
>* Vpon Web SDK 支援 `HTTP` & `HTTPS`，在将 SDK 档案引入时请如如范例所示使用 `//m.vpon.com/sdk/vpadn-sdk.js` 让浏览器在载入页面时可依照当前页面自动判断并引用适当资源，每个页面只需引入一次，必须加在 </body> 前。
>
>* 同一网页最多嵌入 1 个插页广告 (如范例所示)，每个版面请用不同 License Key。
>
>* 倘若嵌入在 iframe 内，必须确保该 iframe 是满版的盖在网页上，包含宽高皆为 100 % 等等，以及点击关闭时需处理将该 iframe 收起等事宜。
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
        vpon_ad_licensy_key="License Key"
        vpon_ad_format="mi"
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

名称                  |        描述                      | 必要  |  范例
:--------------------:|:---------------------------------------:|:----------:|:------------------------:
vpon\_ad\_licensy\_key| 广告版位 ID                                 | Y          | <font color="red">输入 Vpon License Key</font>
vpon\_ad\_format      | 插页广告格式<br>mi                       | Y          | "mi"
vpon\_ad\_test        | 是否拉取测试广告                          | N          | 1(是)/0(否)，预设为 "1"
debug                 | 是否在 console 显示 debug 资讯            | N          | true/false，预设为 "false"
openTab               | 是否开启新tab 显示 广告内容                | N          | true/false，预设为 "true"
ad\_request\_callback | 没有广告回传时的 Callback Function        | N          | 请参考 [Callback]

# 结果
---
<img src="{{site.imgurl}}/Web-Interstitial-1.png" alt="" class="width-300"/>

# 使用 Google Ad Manager 中介服务
---
本段专为 Google Ad Manager 使用者而设，主要说明 Google Ad Manager 搭配 Web API 的设定方式。

## Google Ad Manager 生成广告代码
---
1. 新增广告单元
2. 在广告单元中，选择 `1x1` 为广告大小，并完成名称等设定后储存
3. 生成 “产生广告代码”

新增广告单元后，选择广告单元，并点击「生成代码」
<img src="{{site.imgurl}}/WebAdManager_31.png" alt="" class="width-600" />
选取代码类型为「Google 发布商代码」
<img src="{{site.imgurl}}/WebAdManager_11.png" alt="" class="width-600" />
选择「启用单一请求」
<img src="{{site.imgurl}}/WebAdManager_12.png" alt="" class="width-600" />
请将产生的代码结果中的「文档标头」放在网站的 <head> 中、将「文档正文」放在网站的 <body> 中
<img src="{{site.imgurl}}/WebAdManager_17.png" alt="" class="width-600" />

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
5. 请选择广告空间大小为 `1x1`
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
选取广告素材类型: 选取`所有`中的`自定义`
<img src="{{site.imgurl}}/WebAdManager_32.png" alt="" class="width-600" />

#### 基本广告素材设定
程式码片段请填入:

```html
<script>
  var vponTag = document.createElement('vpon')
  vponTag.setAttribute('vpon_ad_test', '0')
  vponTag.setAttribute('vpon_ad_licensy_key', 'License Key')
  vponTag.setAttribute('vpon_ad_format', 'mi')
  vponTag.setAttribute('debug', 'true')
  vponTag.setAttribute('ad_request_callback', 'vponCallBackMethod')
  window.top.document.body.appendChild(vponTag)
  var vponWebSDK = document.createElement('script')
  vponWebSDK.type = 'text/javascript'
  vponWebSDK.src = '//m.vpon.com/sdk/vpadn-sdk.js'
  window.top.document.body.appendChild(vponWebSDK)
  var up = window.parent;
  var s = up.document.createElement('script');
  s.type = 'text/javascript'
  up.vponCallBackMethod = function (adStatus){
  console.log('adStatus:'+adStatus);
  if(adStatus!= 0) {
    // 没有广告回传，执行其它操作
    console.log('no vpon ad');
    }
  }
  up.document.head.appendChild(s)
</script>
<script>
//%%CLICK_URL_UNESC%%
//%%VIEW_URL_UNESC%%
</script>
```

> **Note**:
>
>* vpon_ad_test="1" 为开启测试广告， vpon_ad_test="0"为拉取正式广告。
>
>* 请记得加入 `//%%CLICK_URL_UNESC%%` 与 `//%%VIEW_URL_UNESC%%`
>
>* 请勿勾选 “投放到 Safeframe”。
>

广告素材设定如下图所示，注意，请勿勾选`投放到 SafeFrame`：
<img src="{{site.imgurl}}/WebAdManager_33.png" alt="" class="width-600" />

# FAQ
---

### 仍然看不到广告？
请确认以下项目：

* 请试着用行动装置上的浏览器开启网站。
* 先清除浏览器快取并删除 Cookie，然后重新连线到网站。

### 仍然无法解决？
请将 debug 模式打开，重新连线网站，将 "Vpadn-" 开头的讯息截取下来并且联系 [Vpon FAE]

[Callback]: {{site.baseurl}}/zh-cn/web/interstitial/#callback
[Vpon FAE]: mailto:fae@vpon.com

[新增指定目标_DFP]: {{site.imgurl}}/新增指定目標.png