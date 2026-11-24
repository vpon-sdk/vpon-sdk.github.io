---
layout:         "ios"
title:          "iOS - 取得 IDFA（App Tracking Transparency）"
lead:           ""
description:    "透過 Apple App Tracking Transparency (ATT) 框架請求使用者授權以取得 IDFA。"
keywords:       "iOS, IDFA, ATT, App Tracking Transparency, Vpon SDK"
permalink:      /zh-tw/ios/idfa/
lang:           "zh-tw"
---

# 概覽
---
依據 Apple 的 [App Store 使用者隱私權與資料使用規範]，iOS App 必須透過 [App Tracking Transparency (ATT) 框架]向使用者請求授權，才能取得裝置的 IDFA（廣告識別碼）。

> **Note：** 若未取得使用者授權，系統將回傳全零的 IDFA，可能會影響廣告投放精準度與整體廣告收益。

# Step 1：在 `Info.plist` 加入用途說明
---
請先在專案的 `Info.plist` 中加入 `NSUserTrackingUsageDescription`，向使用者清楚說明請求此權限的用途：

```xml
<key>NSUserTrackingUsageDescription</key>
<string>這項資料將用於為您提供更符合興趣的個人化廣告。</string>
```

> **Tip：** 建議在文案中清楚說明資料用途（例如提供個人化廣告），讓使用者理解授權原因，有助於提升同意率。

# Step 2：請求追蹤授權
---
呼叫 `ATTrackingManager.requestTrackingAuthorization` 顯示系統授權視窗：

### Objective-C

```objc
@import AppTrackingTransparency;

[ATTrackingManager requestTrackingAuthorizationWithCompletionHandler:^(ATTrackingManagerAuthorizationStatus status) {
    // 使用者完成授權選擇後，再開始載入廣告
}];
```

### Swift

```swift
import AppTrackingTransparency

ATTrackingManager.requestTrackingAuthorization { status in
    // 使用者完成授權選擇後，再開始載入廣告
}
```

## 實作建議
---
* **在 App 進入前景啟用狀態後呼叫**：請於 `sceneDidBecomeActive` 或 `applicationDidBecomeActive` 之後再請求授權，避免系統未彈出授權視窗。
* **於首次廣告請求前完成授權詢問**：建議在發出第一筆廣告請求前先顯示 ATT 視窗，確保 Vpon SDK 能取得正確的 IDFA 狀態。

[App Store 使用者隱私權與資料使用規範]: https://developer.apple.com/app-store/user-privacy-and-data-use/
[App Tracking Transparency (ATT) 框架]: https://developer.apple.com/documentation/apptrackingtransparency
