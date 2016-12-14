package com.qsndyr;

import android.app.Application;
import android.util.Log;

import com.facebook.react.ReactApplication;
import cn.jpush.reactnativejpush.JPushPackage;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.imagepicker.ImagePickerPackage;      // 图片上传
import com.lwansbrough.RCTCamera.RCTCameraPackage;  
import com.eguma.barcodescanner.BarcodeScannerPackage;
import com.theweflex.react.WeChatPackage;       // Add this line before public class MainActivity

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private boolean SHUTDOWN_TOAST = false;
  private boolean SHUTDOWN_LOG = false;

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

    @Override
    protected boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
          new ImagePickerPackage(), // 图片上传
          new RCTCameraPackage(),
          new BarcodeScannerPackage(),
          new JPushPackage(SHUTDOWN_TOAST, SHUTDOWN_LOG),
          new WeChatPackage()      // Add this line
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }





}
