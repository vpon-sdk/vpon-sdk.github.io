---
layout:         "default"
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
>此广告仅支援<strong> `行动装置 `</strong>，使用者透过 PC 浏览该网站则广告不会显示！




# 嵌入广告程式码
---
在行动网页的 <body> 中填入 \<vpon\> tag，与横幅广告不同点在于当 \<vpon\> tag 中的属性 `vpon_ad_format` 为 `mi`时，会去请求插页式广告呈现。

在网页 <body> 内预放广告的位置加上以下程式码：

```html
<html>
  <head><meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
  </head>
  <body>
    <h1>The Test Page</h1>

    <div>
      <vpon vpon_ad_test="1"
            vpon_ad_licensy_key="Your Interstitial ID"
            vpon_ad_format="mi"
            debug="true"></vpon>
    </div>
    <script type="text/javascript" src="//m.vpon.com/sdk/vpadn-sdk.js"> </script>
  </body>
```
> **Note**:

>* Vpon Web SDK 支援 `HTTP` & `HTTPS`，在将 SDK 档案引入时请如上使用 `//m.vpon.com/sdk/vpadn-sdk.js` 让浏览器在载入页面时可依照当前页面自动判断并引用适当资源。
>
>* 同一网页最多嵌入 1 个插页广告 (如上例)。
>
>* JavaScript 只需要放置一个，并且必须加在 </body>前。
>
>* 完成存档后，重新读取网页，您就可以在有 \<vpon\> tag 的位置看到 `测试广告` 被拉取。(如要上线请改成不拉取测试广告 vpon_ad_test="0")
>
>* 以上的 License Key 为范例，请置换为您自己申请的 License Key 以防收益分润无法取得。
>
>* 倘若嵌入在 iframe 内，必须确保该 iframe 是满版的盖在网页上，包含宽高皆为 100 % 等等，以及点击关闭时需处理将该 iframe 收起等事宜。


<br>

## Advanced Setup
---

名称                  |        描述                      | 必要  |  范例
:--------------------:|:---------------------------------------:|:----------:|:------------------------:
vpon\_ad\_licensy\_key| 版位 ID                               |  Y         |<font color="red">输入 Vpon License Key</font>
vpon\_ad\_format      | 广告版行：320x50\_mb, 300x250\_mb            |   Y       |     "mi"
vpon\_ad\_test        |   是否拉取测试广告                        | N          |   1(是)/0(否)，预设为(是)
vpon\_ad\_isBottom    |   是否为置底横幅广告                        | N          |   true/false，预设为 false
debug                 | 是否在 console 显示 debug 资讯          |  N         |   true/false，预设为 false
openTab               |是否开启新tab 显示 广告内容                 |N           |  true/false，预设为 true


<br>


# 结果
---
<img src="{{site.imgurl}}/Web-Interstitial-1.png" alt="" class="width-300"/>




# 使用 DFP 中介服务
---
本段专为 DFP 使用者而设，主要说明 DoubleClick 联播网搭配 Web API 的方式。

DoubleClick for Publishers : <https://www.google.com/dfp/>

## DFP 产生广告代码
---
1. 点选 “广告空间”
2. 点选 “新增广告单元”
3. 选择 Out-of-page 为广告大小
4. 点选 “产生广告代码”
5. 选择 “Google发布商广告代码”
6. 勾选 “启用单一请求”、“启用同步要求”、“非页内广告”
7. 将产生的“文件标头”放在网页的 HEAD 元素中，将“文件内文”放在您要显示这个广告单元的网页内文中。

<img src="{{site.imgurl}}/DFP_IS_01.png" alt="" class="width-600" />
<img src="{{site.imgurl}}/DFP_IS_02.png" alt="" class="width-600" />
<img src="{{site.imgurl}}/DFP_IS_03.png" alt="" class="width-600" />
<img src="{{site.imgurl}}/DFP_IS_04.png" alt="" class="width-600" />

## 设定委刊单、委刊项及广告素材
---
如要透过“DFP 广告管理系统标准版”放送新的广告活动，请先建立新委刊单。建好委刊单后，您还必须建立委刊项、新增广告素材以及核准委刊单，委刊单广告才能放送。针对保留的委刊项类型 (赞助和标准)，在委刊单获得核准以前，DFP 不会保留广告空间。

### 建立委刊单
若要在执行广告空间预测之前建立委刊单，请按照下列指示进行：

1. 在“DFP 广告管理系统标准版”帐户中，按一下 `委刊单` 标签。
2. 按一下 `新增委刊单`。
3. 在适当栏位中输入您的委刊单资讯。不可与联播网中其他的委刊单名称重复。
4. 输入委刊项资讯。
5. 按一下 `检查广告空间`，确认委刊单拥有足够的曝光供应量。
6. 按一下 `储存`。建好委刊单之后，您必须先予以核准，委刊项才能放送。

### 委刊项资讯
如何建立委刊项：

1. 在 DFP 广告管理系统标准版帐户中，按一下 `委刊单` 标签。
2. 建立新委刊单，或按一下表格中的现有委刊单。
3. 按一下 `新增委刊项`
4. 输入委刊项名称，不得与联播网中其他委刊项的名称重复。
5. 输入您想要上传广告素材的广告空间大小。
6. (选用程序) 输入任何有助于委刊项投放作业的相关注释。
7. 输入委刊项类型、日期、数量和费用。
8. (选用程序) 在 `调整放送` 下方进行放送设定。
9. 选取您的目标广告空间。
10. (选用程序) 输入其他指定条件，指定特定目标对象。 如果您未将委刊项指定给任何广告单元或刊登位置，系统会将委刊项设成在全联播网随机放送。这表示委刊项可在您网站上的任何广告单元中放送
11. 按一下 `储存`

### 上传广告素材
1. 按一下要新增广告素材的委刊项。您也可以视需求建立新委刊项。
2. 按一下 [新增广告素材]。所有与委刊项相关联的广告素材和广告单元尺寸，都会列在左栏中。您可以将广告素材上传至清单中任何大小的广告单元。
3. 您可以将多个广告素材拖曳到委刊项，或一次只加入一个广告素材

#### 只加入一个广告素材
选取广告素材类型: 选取`所有`中的`第三方`
<img src="{{site.imgurl}}/DFP_IS_05.png" alt="" class="width-600" />

#### 基本广告素材设定
程式码片段请填入:

```html
<vpon vpon_ad_test="1"
       vpon_ad_licensy_key="Your license Key"
       vpon_ad_format="mi"
       debug="true"></vpon>
<script type="text/javascript"  src="//m.vpon.com/sdk/vpadn-sdk.js"> </script>
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
>* 请勿勾选 “放送到 Safeframe”。
>

范例：
<img src="{{site.imgurl}}/DFP_IS_06.png" alt="" class="width-600" />

# FAQ
---

## 仍然看不到广告？
---
请确认以下项目：

* 请试着用行动装置上的浏览器开启网站。

* 先清除浏览器快取并删除 Cookie，然后重新连线到网站。

## 仍然无法解决？
请将 debug 模式打开，重新连线网站，将 "Vpadn-" 开头的讯息截取下来并且联系 [Vpon FAE]

[Vpon FAE]: mailto:fae@vpon.com
