---
layout: "ios"
title: "iOS - App Privacy Details"
lead: ""
description: "App Privacy Details on App Store"
keywords: 'Keywords for this page, in the meta data'
permalink: /zh-cn/ios/demo1/
lang: "zh-cn"
---
# 概览
---
根据 [App privacy details on the App Store]，Apple 要求开发商自 2020 年 12 月 8 日起，需要在 App 的产品介绍页中告知使用者关于 App 中会收集的资料。本文将说明目前 Vpon SDK 的资料收集及使用状况，您可以参考本文内容完成在 App Store Connect 上架所需填写的资料。

请注意，本文仅提供一般情况下Vpon SDK 所收集及使用的资料状况，实际的资料收集及使用状况，应视您在串接Vpon SDK 时，是否有进行其它自定义串接(例如[自定义广告请求参数]) 来调整。

# 数据收集及使用状况
---

## 联系信息
---

| <b>Data Type</b> | <b>Description</b> | <b>Vpon SDK Collect</b> | <b>Data Usage</b> |
| 姓名 | 例如名字或姓氏 | N | |
| 电子邮件地址 | 包括但不限于哈希电子邮件地址 | N | |
| 电话号码 | 包括但不限于哈希电话号码 | N | |
| 实际地址 | 例如家庭地址、实际地址或邮寄地址 | N | |
| 其他用户联系信息 | 任何其他可用于在 app 之外与用户联系的信息 | N | |

## 健康与健身
---

| <b>Data Type</b> | <b>Description</b> | <b>Vpon SDK Collect</b> | <b>Data Usage</b> |
| 健康 | 健康和医疗数据，包括但不限于来自临床健康记录 API、HealthKit API、MovementDisorder API 的数据，或与健康有关的人体试验的数据，或用户提供的任何其他健康或医疗数据 | N | |
| 健身 | 健身和锻炼数据，包括但不限于运动与健身 API | N | |

## 财务信息
---

| <b>Data Type</b> | <b>Description</b> | <b>Vpon SDK Collect</b> | <b>Data Usage</b> |
| 付款信息 | 例如付款方式、付款卡号或银行帐号。如果您 app 使用的付款服务要求用户在 app 外输入付款信息，并不会被作为开发者的您访问相关信息，那么这些信息就不会被收集而无需披露 | N | |
| 信用信息 | 例如信用评分 | N | |
| 其他财务信息 | 例如薪资、收入、资产、债务或任何其他财务信息 | N | |

## 位置
---

<table>
    <tr>
        <td><b>Data Type</b></td> 
        <td><b>Description</b></td>
        <td><b>Vpon SDK Collect</b></td>
        <td><b>Data Usage</b></td> 
   </tr>
    <tr>
        <td >精确位置</td>
        <td >描述用户位置或设备位置的信息，位置分辨率大于或等于三个或以上小数的经纬度</td>
        <td >Y</td>
        <td rowspan="2"><b>Third-Party Advertising</b> <br> <br>当 App 启用定位服务且用户同意提供该项授权时，Vpon SDK 可能会收集精确或粗略位置的资讯</td>
    </tr>
    <tr>
        <td >粗略位置</td> 
        <td >描述用户位置或设备位置的信息，位置分辨率低于三个或以上小数的经纬度，例如“大致定位服务”</td>
        <td >Y</td> 
    </tr>
</table>

## 敏感信息
---

| <b>Data Type</b> | <b>Description</b> | <b>Vpon SDK Collect</b> | <b>Data Usage</b> |
| 敏感信息 | 例如人种或民族数据、性取向、怀孕或分娩信息、残疾、宗教或哲学信仰、工会会员身份、政治见解、基因信息或生物特征数据 | N | |

## 联系人
---

| <b>Data Type</b> | <b>Description</b> | <b>Vpon SDK Collect</b> | <b>Data Usage</b> |
| 联系人 | 例如用户的电话、地址簿或社交图谱中的联系人列表 | N | |

## 用户内容
---

| <b>Data Type</b> | <b>Description</b> | <b>Vpon SDK Collect</b> | <b>Data Usage</b> |
| 电子邮件或短信 | 包括主题行、发件人、收件人以及电子邮件或信息的内容 | N | |
| 照片或视频 | 用户的照片或视频 | Y | <b>Third-Party Advertising</b> <br> <br> 当需要提供多元位广告体验 (例如 VR) 时，Vpon SDK 可能会要求用户授权提供相机及照片的存取权 |
| 音频数据 | 用户的语音或声音录音 | N | |
| 游戏内容 | 例如游戏内用户生成的内容 | N | |
| 客户支持 | 用户在请求客户支持期间生成的数据 | N | |
| 其他用户内容 | 用户生成的任何其他内容 | N | |

## 浏览历史记录
---

| <b>Data Type</b> | <b>Description</b> | <b>Vpon SDK Collect</b> | <b>Data Usage</b> |
| 浏览历史记录 | 用户查看过的不属于 app 组成部分的内容 (例如网站) 的相关信息 | N | |

## 搜索历史记录
---

| <b>Data Type</b> | <b>Description</b> | <b>Vpon SDK Collect</b> | <b>Data Usage</b> |
| 搜索历史记录 | 在 app 中执行的搜索相关信息 | N | |

## 标识符
---

| <b>Data Type</b> | <b>Description</b> | <b>Vpon SDK Collect</b> | <b>Data Usage</b> |
| 用户 ID | 例如用户名、句柄、帐户 ID、分配的用户 ID、客户编号、或其他可用于识别特定用户或帐户的用户级或帐户级 ID | N | |
| 设备 ID | 例如设备的广告标识符或其他设备级 ID | Y | <b>Third-Party Advertising</b> <br> <br>当用户提供授权时，Vpon SDK 会收集装置识别码，包含 IDFA, IDFV 及 Vpon 识别码 |

## 购买项目
---

| <b>Data Type</b> | <b>Description</b> | <b>Vpon SDK Collect</b> | <b>Data Usage</b> |
| 购买历史记录 | 帐户或个人的购买项目或购买倾向 | N | |

## 使用数据
---

| <b>Data Type</b> | <b>Description</b> | <b>Vpon SDK Collect</b> | <b>Data Usage</b> |
| 产品交互 | 例如 app 启动、轻点、点按、滚动信息、音乐收听数据、视频观看数据、游戏中存储的位置、视频或歌曲，或其他有关用户与 app 交互的信息 | N | |
| 广告数据 | 例如与用户看过的广告有关的信息 | Y | <b>Third-Party Advertising</b> <br> <br>Vpon SDK 可能会收集广告及广告互动资料，包含浏览及点击等互动 |
| 其他使用数据 | 与 app 中的用户活动有关的任何其他数据 | N | |

## 诊断
---

| <b>Data Type</b> | <b>Description</b> | <b>Vpon SDK Collect</b> | <b>Data Usage</b> |
| 崩溃数据 | 例如崩溃日志 | N | |
| 性能数据 | 例如启动时间、挂起率或能耗 | N | |
| 其他诊断数据 | 出于衡量与 app 相关的技术诊断目的而收集的任何其他数据 | N | |

## 其他数据
---

| <b>Data Type</b> | <b>Description</b> | <b>Vpon SDK Collect</b> | <b>Data Usage</b> |
| 其他数据类型 | 未提及的任何其他数据类型 | Y | <b>Third-Party Advertising</b> <br> <br>Vpon SDK 可能会收集使用者的装置型号及网路连线状况的资料 |


[App privacy details on the App Store]: https://developer.apple.com/app-store/app-privacy-details/
[自定义广告请求参数]: https://wiki.vpon.com/zh-cn/ios/advanced/#custreq