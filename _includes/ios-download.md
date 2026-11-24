## SDK (Swift Package Manager)
---

| SDK | Distribution | Minimum iOS | Repository |
|:---:|:------------:|:-----------:|:----------:|
| Vpon iOS SDK ({{site.i_version}}) | Swift Package Manager | iOS 16.0+ | [VpadnSDK-iOS-SPM][2] |
| Vpon iOS SDK (5.8.0) | SPM (Exact `5.8.0`) / CocoaPods (final) | iOS 12.0+ | [VpadnSDK-iOS-SPM][2] |


## AdMob / Google Ad Manager Adapter (Swift Package Manager)
---

| Adapter Version | Minimum iOS | VpadnSDK | Google Mobile Ads SDK | Distribution / Notes |
|:---------------:|:-----------:|:--------:|:---------------------:|:--------------------|
| [3.0.0][4] | iOS 16.0+ | 5.8.x (≥ 5.8.2) | 12.x – 13.x | Swift Package Manager (Recommended for iOS 16+) |
| [2.2.1][4] | iOS 12.0+ | 5.8.0 | 12.x | Swift Package Manager (For apps supporting iOS 12–15) |
| 2.2.0 | iOS 12.0+ | ≥ 5.7.6 | 12.x | Final version on CocoaPods. SPM users should upgrade to `2.2.1` or `3.0.0`. |


## Sample Code Download
---

| Framework     | AdMob         | Google Ad Manager |
|:-------------:|:-------------:|:-----------------:|
| [download][7] | [download][8] | [download][9]     |


[2]: https://github.com/vpon-sdk/VpadnSDK-iOS-SPM
[4]: https://github.com/vpon-sdk/AdMobMediationAdapterVpadn-iOS-SPM
[7]: https://github.com/vpon-sdk/Vpon-mobile-ios-examples/tree/master/FrameworkExample
[8]: https://github.com/vpon-sdk/Vpon-mobile-ios-examples/tree/master/Mediation/AdMobExample
[9]: https://github.com/vpon-sdk/Vpon-mobile-ios-examples/tree/master/Mediation/DFPExample