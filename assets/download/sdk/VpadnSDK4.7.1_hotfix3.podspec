#
# Be sure to run `pod lib lint VpadnSDK.podspec' to ensure this is a
# valid spec before submitting.
#
# Any lines starting with a # are optional, but their use is encouraged
# To learn more about a Podspec see http://guides.cocoapods.org/syntax/podspec.html
#

Pod::Spec.new do |s|
  s.name             = 'VpadnSDK'
  s.version          = '4.7.1'
  s.summary          = 'Mobile app monetization SDK provided by Vpon.'

# This description is used to generate tags and improve search results.
#   * Think: What does it do? Why did you write it? What is the focus?
#   * Try to keep it short, snappy and to the point.
#   * Write the description between the DESC delimiters below.
#   * Finally, don't worry about the indent, CocoaPods strips it!

  s.description      = <<-DESC
The VpadnSDK provides a large set of advertising formats which helds the solution for developers to maximize their monetization on Android & iOS platforms.

SDK Document: http://vpon-sdk.github.io/ios/ 
                       DESC

  s.homepage         = 'http://www.vpon.com'
  # s.screenshots     = 'www.example.com/screenshots_1', 'www.example.com/screenshots_2'
  # s.license         = { :type => 'MIT', :file => 'LICENSE' }
  s.license          = 'Custom'
  s.author           = 'Vpon Inc'
  s.authors          = 'Vpon Inc.'
  s.source           = {http: 'http://vpon-sdk.github.io/assets/download/sdk/VpadnSDKiOS-4.7.1_hotfix3.zip'}
  # s.social_media_url = 'https://www.facebook.com/VponInc'

  s.ios.deployment_target = '7.0'
  s.ios.preserve_paths = 'VpadnSDKiOS-4.7.1_hotfix3'
  s.ios.vendored_frameworks = 'VpadnSDKiOS-4.7.1_hotfix3/VpadnSDKAdKit.framework'
  s.ios.weak_frameworks = 'AdSupport'
  s.compiler_flags = '-ObjC'
  s.requires_arc = true
  # s.source_files = 'VpadnSDK/Classes/**/*'
  
  # s.resource_bundles = {
  #   'VpadnSDK' => ['VpadnSDK/Assets/*.png']
  # }

  # s.public_header_files = 'Pod/Classes/**/*.h'
  # s.frameworks = 'UIKit', 'MapKit'
  # s.dependency 'AFNetworking', '~> 2.3'
end
