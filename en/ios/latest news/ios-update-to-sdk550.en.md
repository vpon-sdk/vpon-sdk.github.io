---
layout:         "ios"
title:          "iOS - Update To SDK v5.5.0 "
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       ios/latest-news/ios-update-to-sdk550
lang:            "en"

---

## SDK Initialization

#### Objective-C

```objc
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {

    // Using Vpon SDK v550 below
    VpadnAdConfiguration *config = [VpadnAdConfiguration sharedInstance];
    config.logLevel = VpadnLogLevelDefault;
    [config initializeSdk];

    return YES;

    // Using Vpon SDK v550 and above
    VpadnAdConfiguration *config = VpadnAdConfiguration.shared;
    config.logLevel = VpadnLogLevelDefaultLevel;
    [config initializeSdk];

    return YES;
}
```

#### Swift

```swift
 func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions:      
    [UIApplicationLaunchOptionsKey: Any]?) -> Bool {

        // Using Vpon SDK v550 below
        let config = VpadnAdConfiguration.sharedInstance()
        config.logLevel = .default
        config.initializeSdk()

        return true

        // Using Vpon SDK v550 and above
        let config = VpadnAdConfiguration.shared
        config.logLevel = .defaultLevel
        config.initializeSdk()

        return true
    }
```

## Banner Ad

### Initialize VpadnBanner Object

#### Objective-C

```objc
// Using Vpon SDK v550 below
_vpadnBanner = [[VpadnBanner alloc] initWithLicenseKey:@"License Key" adSize: VpadnAdSizeBanner];
// initWithLicenseKey: Vpon License Key to get ad, please replace with your own one
// adSize: The Banner Ad size that will be displayed


// Using Vpon SDK v550 and above
_vpadnBanner = [[VpadnBanner alloc]initWithLicenseKey:@"License Key" adSize:VpadnAdSize.banner];
```

#### Swift

``` swift
//Vpon SDK initialization before v550
vpadnBanner = VpadnBanner.init(licenseKey: "License Key", adSize: VpadnAdSizeBanner)
// licenseKey: Vpon License Key to get ad, please replace with your own one
// adSize: The Banner Ad size that will be displayed


// Using Vpon SDK v550 and above
vpadnBanner = VpadnBanner(licenseKey: "License Key", adSize: .banner())
```

### Set Up VpadnAdRequest and Send Ad Request

#### Objective-C

No code change.

#### Swift

```swift
// Using Vpon SDK v550 below
let request = VpadnAdRequest.init()
request.setAutoRefresh(true)
// Only available for Banner Ad, will auto refresh ad if set YES
request.setTestDevices([ASIdentifierManager.shared().advertisingIdentifier.uuidString])
// Set your test device's IDFA here if you're trying to get Vpon test ad
vpadnBanner.load(request)
// start to load ad

// Using Vpon SDK v550 and above
let request = VpadnAdRequest()
request.autoRefresh = true
vpadnBanner.loadRequest(request)
```

### Set Up Delegate Protocol

#### Objective-C

No code change.

#### Swift

```swift
// Using Vpon SDK v550 below
extension VponSdkBannerViewController : VpadnBannerDelegate {

    func onVpadnAdLoaded(_ banner: VpadnBanner) {
      // Invoked if receive Banner Ad successfully

      self.loadBannerView.addSubview(banner.getVpadnAdView())
      // Add ad view to your layout
    }
}

// Using Vpon SDK v550 and above
extension VponSdkBannerViewController : VpadnBannerDelegate {
    func onVpadnAdLoaded(_ banner: VpadnBanner) {
      // Invoked if receive Banner Ad successfully
      if let adView = banner.getVpadnAdView() {
            self.loadBannerView.addSubview(adView)            
        }
    }
}
```

## Interstitial Ad

### Initialize VpadnInterstitial Object

#### Objective-C

No code change.

#### Swift

```swift
// Using Vpon SDK v550 below
vpadnInterstitial = VpadnInterstitial.init(licenseKey:"License Key")
// licenseKey: Vpon License Key to get ad, please replace with your own one

// Using Vpon SDK v550 and above
vpadnInterstitial = VpadnInterstitial(licenseKey:"License Key")
```

### Set Up VpadnAdRequest and Send Ad Request

#### Objective-C

No code change


#### Swift

```swift
// Using Vpon SDK v550 below
let request = VpadnAdRequest.init()
vpadnInterstitial.load(request)
// start to load ad

// Using Vpon SDK v550 and above
let request = VpadnAdRequest()
vpadnInterstitial.loadRequest(request)
```

### Show Interstitial Ad

#### Objective-C

```objc
// Using Vpon SDK v550 below
- (void) onVpadnInterstitialAdReceived:(UIView *)bannerView {
    [self.vpadnInterstitial showFromRootViewController:self];
}

// Using Vpon SDK v550 and above
- (void) onVpadnInterstitialLoaded:(VpadnInterstitial *)interstitial {
    [self.vpadnInterstitial showFromRootViewController:self];
}
```

#### Swift

```swift
// Using Vpon SDK v550 below
func onVpadnInterstitialAdReceived(_ bannerView: UIView!) {
    vpadnInterstitial.show(fromRootViewController: self)
}

// Using Vpon SDK v550 and above
func onVpadnInterstitialLoaded(_ interstitial: VpadnInterstitial) {
    vpadnInterstitial.showFromRootViewController(self)
}
```

## Native Ad

### Initialize VpadnNativeAd Object

#### Objective-C

```objc
// Using Vpon SDK v550 below
_nativeAd = [[VpadnNativeAd alloc] initWithLicenseKey:@"License Key"];
// initWithLicenseKey: Vpon License Key to get ad, please replace with your own one

_nativeAd.delegate = self;

// Using Vpon SDK v550 and above
```

#### Swift

```swift
// Using Vpon SDK v550 below
vpadnNative = VpadnNativeAd.init(licenseKey: "License Key")
// initWithLicenseKey: Vpon License Key to get ad, please replace with your own one

vpadnNative.delegate = self

// Using Vpon SDK v550 and above
vpadnNative = VpadnNativeAd(licenseKey: "License Key")
```


### Set Up VpadnAdRequest and Send Ad Request

#### Objective-C

No code change.

#### Swift

```swift
// Using Vpon SDK v550 below
let request = VpadnAdRequest.init()
vpadnNative.load(request())
// start to load ad

// Using Vpon SDK v550 and above
let request = VpadnAdRequest()
vpadnNative.loadRequest(request)
```

### Set Up Custom Native Ad Layout

#### Objective-C

No code change.

#### Swift

```swift
// Using Vpon SDK v550 below
func setNativeAd() {
        adIcon.image = nil
            
        vpadnNative.icon.loadAsync { (image) in
            self.adIcon.image = image
        }
    }

// Using Vpon SDK v550 and above
func setNativeAd() {
        adIcon.image = nil
        vpadnNative.icon.loadImageAsync(withBlock: { image in
            self.adIcon.image = image
        })
    }
```


### Set Up Delegate Protocol

#### Objective-C

```objc
// Using Vpon SDK v550 below
- (void) mediaViewDidFailed:(VpadnMediaView *)mediaView error:(NSError *)error {
    // Invoked if the media creatives load fail
}

// Using Vpon SDK v550 and above
- (void)mediaViewDidFail:(VpadnMediaView *)mediaView error:(NSError *)error {
}
```


#### Swift

```swift
// Using Vpon SDK v550 below
extension VponSdkNativeViewController: VpadnNativeAdDelegate, VpadnMediaViewDelegate {
    func mediaViewDidFailed(_ mediaView: VpadnMediaView, error: Error) {
        // Invoked if the media creatives load fail  
    }
}

// Using Vpon SDK v550 and above
extension VponSdkNativeViewController: VpadnNativeAdDelegate, VpadnMediaViewDelegate {
    func mediaViewDidFail(_ mediaView: VpadnMediaView, error: Error) {
        // Invoked if the media creatives load fail  
    }
}
```