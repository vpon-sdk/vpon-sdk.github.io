---
layout:         "default"
title:          "Web - 置底横幅广告"
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       /zh-cn/web/adhesion-banner/
lang:           "zh-cn"
---

# 总览
---
Vpon Mobile Web SDK 提供`置底横幅广告`，让横幅广告可黏着于行动装置的荧幕下方，让我们精准投放的广告更能让使用者观看，以提升广告收益。<br>

> **Note**:
>此广告仅支援<strong> `行动装置 `</strong>，使用者透过 PC 浏览该网站则广告不会显示！
<br>

# 广告格式
---
现在的 Vpon Mobile Web SDK 支援以下`置底广告格式`:<br>



| 名称             |    Size(WxH)  |
| :---------------- | :------------:|
| Banner            |    320x50     |

<br>

# 嵌入广告程式码
---
与一般 Web Banner 相似，同样在行动网页的 <body> 中填入 \<vpon\> tag，唯一不同点在于当 \<vpon\> tag 中包含了 `vpon_ad_isBottom` 的属性且其为 true 时，可自动将该广告黏着于行动装置的荧幕下方。

在网页 <body> 内预放广告的位置加上以下程式码：

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
            vpon_ad_licensy_key="your_first_vpon_banner_id"
            vpon_ad_format="320x50_mb"
            vpon_ad_isBottom="true"
            debug="true"></vpon>
    </div>
    <script type="text/javascript" src="//m.vpon.com/sdk/vpadn-sdk.js"> </script>
  </body>
```
> **Note**:

>* Vpon Web SDK 支援 `HTTP` & `HTTPS`，在将 SDK 档案引入时请如上使用 `//m.vpon.com/sdk/vpadn-sdk.js` 让浏览器在载入页面时可依照当前页面自动判断并引用适当资源。
>
>* 同一网页最多嵌入 1 个置底广告版面 (如上例)。包含置底广告与一般横幅广告，同一网页最多嵌入 3 个广告版面 (如上例)，每个版面请用不同版位 ID。
>
>* JavaScript 只需要放置一个，并且必须加在 </body>前。
>
>* 完成存档后，重新读取网页，您就可以在有 \<vpon\> tag 的位置看到 `测试广告` 被拉取。(如要上线请改成不拉取测试广告 vpon_ad_test="0")
>
>* Adhesion Ad 倘若嵌入在 iframe 内，将会失去自动黏着于行动装置的荧幕下方的功能。
>
>* 以上的 License Key 为范例，请置换为您自己申请的 License Key 以防收益分润无法取得。


<br>

## Advanced Setup
---

名称                  |        描述                      | 必要  |  范例
:--------------------:|:---------------------------------------:|:----------:|:------------------------:
vpon\_ad\_licensy\_key| 版位 ID                               |  Y         |<font color="red">输入 Vpon License Key</font>
vpon\_ad\_format      | 广告版行：320x50\_mb, 300x250\_mb            |   Y       |     "320x50\_mb"
vpon\_ad\_test        |   是否拉取测试广告                        | N          |   1(是)/0(否)，预设为(是)
vpon\_ad\_isBottom    |   是否为置底横幅广告                        | N          |   true/false，预设为 false
debug                 | 是否在 console 显示 debug 资讯          |  N         |   true/false，预设为 false
openTab               |是否开启新tab 显示 广告内容                 |N           |  true/false，预设为 true


<br>

# 结果
---
<img src="{{site.imgurl}}/Adhesion-Banner-1.png" alt="" class="width-300"/>


# FAQ
---

## 仍然看不到广告？
请确认以下项目：

* 请试着用行动装置上的浏览器开启网站。

* 先清除浏览器快取并删除 Cookie，然后重新连线到网站。

## 仍然无法解决？
请将 debug 模式打开，重新连线网站，将 "Vpadn-" 开头的讯息截取下来并且联系 [Vpon FAE]

[Vpon FAE]: mailto:fae@vpon.com