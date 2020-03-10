---
layout:         "android"
title:          "Android - Out-stream 影音廣告"
lead:           "Android - Out-stream"
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       /zh-tw/android/outstream/
lang:           "zh-tw"
---
# 概要
--------
Vpon Out-stream 影音廣告提供串流外的影音廣告服務，透過將影音廣告嵌入應用程式內容之間，以原生方式呈現廣告，同時預設為靜音播放，基於使用者體驗的考量，不影響使用者的閱讀狀態。

# 完成串接準備
---
在開始串接廣告之前，請確認您已經完成以下準備：

1. 將 Vpon SDK 導入您的專案中，若您尚未完成，請先參考[串接說明]完成相關設定
2. 聯繫 [Vpon PDMKT Team] 完成帳號設定，並取得您的 License Key

# 開始撰寫 Out-stream 影音廣告
---
Vpon Out-stream 影音串流廣告提供 3 種串流外的影音廣告形式，分別為：

1. [ScrollView]
2. [ListView]
3. [RecyclerView]

請依您的需求選擇 Out-stream 影音廣告的形式。

## 在 ScrollView 中展示 Out-stream 影音廣告 {#scrollview}
---
在應用程式中的 ScrollView 建立 Out-stream 影音廣告需要執行以下步驟：

1. 匯入 com.vpon.ads.*
2. 宣告 VpadnInReadAd
3. 建立廣告呈現的 Layout
4. 建立 VpadnInReadAd 物件，並指定 License Key
5. 拉取廣告
6. 實作影音廣告行為 Event
7. 實作 VpadnAdListener

請參考以下範例，完成 Out-stream 影音廣告設定：

### Import Vpon SDK 並宣告 VpadnInReadAd

```java
import com.vpadn.ads.*;

public class MainActivity extends Activity {

    // 宣告 VpadnInReadAd
    private VpadnInReadAd inReadAd;

    // 請將 License Key 換成 Vpon PDMKT Team 提供您的 License Key
    private String licenseKey = "License Key" ;
    ...
}
```

### 建立廣告呈現的 Layout

請依照您的應用程式設計，在 ScrollView 中加入欲顯示廣告的位置，或參考以下範例完成設計：

```xml
<TextView
        android:id="@+id/hello"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toTopOf="parent"/>
    <ScrollView
        android:id="@+id/scrollView"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        app:layout_constraintTop_toBottomOf="@+id/hello"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintBottom_toBottomOf="parent">
        <LinearLayout
            android:id="@+id/content_container"
            android:orientation="vertical"
            android:layout_width="match_parent"
            android:layout_height="wrap_content">
            <TextView
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:text="@string/news"/>
            <!-- 加入廣告 Container -->
            <FrameLayout
                android:id="@+id/adContent"
                android:layout_width="match_parent"
                android:layout_height="wrap_content"/>
            <TextView
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:text="@string/news"/>
        </LinearLayout>

    </ScrollView>
```

### 建立 VpadnInReadAd，並指定 License Key

```java
public class MainActivity extends Activity {
    protected void onCreate(Bundle savedInstanceState) {
        ...
        // 建立 VpadnInReadAd，並指定 License Key
        inReadAd = new VpadnInReadAd(getActivity(), license Key);

        // 建立廣告請求
        VpadnAdRequest adRequest = new VpadnAdRequest();
        adRequest.setAdContainer(frameLayout);

        inReadAd.setAdListener(new MyAdListener());

        // 拉取廣告
        inReadAd.loadAd(adRequest);
        ...
    }
}
```

## 在 ListView 中展示 Out-stream 影音廣告 {#listview}
---
在應用程式中的 ListView 建立 Out-stream 影音廣告需要執行以下步驟：

1. 匯入 com.vpon.ads.*
2. 宣告 VpadnInReadAd
3. 實作 ListView Adapter 
4. 建立 VpadnInReadAd 物件，並指定 License Key
5. 拉取廣告
6. 實作影音廣告行為 Event
7. 實作 VpadnAdListener

請參考以下範例，將 Out-stream 影音廣告加到您的 ListView 中：

### Import Vpon SDK 並宣告 VpadnInReadAd

```java
import com.vpadn.ads.*;
import com.vpon.vpon_inread.fragment.adapter.MyListAdapter;

public class MainActivity extends Activity {

    // 宣告 VpadnInReadAd
    private VpadnInReadAd inReadAd;

    // 請將 License Key 換成 Vpon PDMKT Team 提供您的 License Key
    private String licenseKey = "License Key" ;

    // 請替換成欲顯示廣告的位置
    public static final int AD_POSITION = 15;
    ...
}
```

### 實作 ListView Adapter
欲在 ListView 上展示 Out-stream 影音廣告，請務必參考以下說明實作 ListView Adapter：

```java
// ListAdapter 需要繼承 BaseAdpater
public class MyListAdapter extends BaseAdapter {
    private static final String LT = "MyListAdapter";

    static class ViewHolder {
        public TextView title;
        }

    @Override
    public int getCount() { return 50; }

    @Override
    public Object getItem(int position) { return position; }

    @Override
    public long getItemId(int position) { return position; }

    @Override
    public View getView(int position, View convertView, ViewGroup viewGroup) {
        ViewHolder holder;
        if (convertView == null && viewGroup.getContext() != null) {
            convertView = LayoutInflater.from(viewGroup.getContext())
                    .inflate(R.layout.list_item, viewGroup, false);
            holder = new ViewHolder();
            holder.title = convertView.findViewById(R.id.item_label);
            convertView.setTag(holder);
        } else {
            holder = (ViewHolder) convertView.getTag();
        }

        Log.d(LT, "viewHolder is null ? "+(holder == null));
        if(position == BaseFragment.AD_POSITION -1){
            holder.title.setText("AD shows below");
        }else if(position == BaseFragment.AD_POSITION){
            holder.title.setText("AD shows above");
        }else{
            holder.title.setText("Hello Vpon(" + (position + 1) + ")");
        }
        Log.d(LT, "convertView.LayoutParam is null ? "+(convertView.getLayoutParams() == null));
        convertView.setBackgroundColor(Color.YELLOW);
        convertView.getLayoutParams().height = 100;
        convertView.setLayoutParams(convertView.getLayoutParams());
        return convertView;
    }
}
```

### 建立 VpadnInReadAd，並指定 License Key
```java
public class MainActivity extends Activity {

    protected void onCreate(Bundle savedInstanceState) {
        ...
        // 設置 ListView
        ListView listView = view.findViewById(R.id.listView);
        MyListAdapter adapter = new MyListAdapter();
        listView.setAdapter(adapter);

        // 建立 VpadnInReadAd，並指定 License Key
        inReadAd = new VpadnInReadAd(getActivity(), license Key);

        //建立廣告請求
        VpadnAdRequest adRequest = new VpadnAdRequest();
        adRequest.setAdContainer(listView);
        adRequest.setAdPosition(AD_POSITION);

        inReadAd.setAdListener(new MyAdListener());

        // 拉取廣告
        inReadAd.loadAd(adRequest);
        ...
    }
}
```


## 在 RecyclerView 中展示 Out-stream 影音廣告 {#recyclerview}
---
在應用程式中的 RecyclerView 建立 Out-stream 影音廣告需要執行以下步驟：

1. 匯入 com.vpon.ads.*
2. 宣告 VpadnInReadAd
3. 實作 RecyclerView Adapter 
4. 建立 VpadnInReadAd 物件，並指定 License Key
5. 拉取廣告
6. 實作影音廣告行為 Event
7. 實作 VpadnAdListener

請參考以下範例，將 Out-stream 影音廣告加到您的 RecyclerView 中：

### Import Vpon SDK 並宣告 VpadnInReadAd

```java
import com.vpadn.ads.*;
import com.vpon.vpon_inread.fragment.adapter.MyRecyclerAdapter;

public class MainActivity extends Activity {

    // 宣告 VpadnInReadAd
    private VpadnInReadAd inReadAd;

    // 請將 License Key 換成 Vpon PDMKT Team 提供您的 License Key
    private String licenseKey = "License Key" ;

    // 請替換成欲顯示廣告的位置
    public static final int AD_POSITION = 15;
    ...
}
```

### 實作 RecyclerView Adapter
欲在 RecyclerView 上展示 Out-stream 影音廣告，請務必使用 `com.vpon.adapter.AbsRecyclerAdapter` 替換掉 android.support.v7.widget.RecyclerView.Adapter，並參考以下說明實作 RecyclerView Adapter：

```java
import com.vpon.adapter.AbsRecyclerAdapter;

// 請使用 com.vpon.adapter.AbsRecyclerAdapter 替換掉 android.support.v7.widget.RecyclerView.Adapter 
// Recycler 需要繼承 AbsRecyclerAdapter
public class MyRecyclerAdapter extends AbsRecyclerAdapter<MyRecyclerAdapter.ViewHolder> {
    private List<String> letters;

    public MyRecyclerAdapter(List<String> letters) {
        this.letters = letters;
    }

    class ViewHolder extends RecyclerView.ViewHolder {
        TextView textView;
        ViewHolder(@NonNull View convertView) {
            super(convertView);
            textView = convertView.findViewById(R.id.item_label);
        }
    }

    @Override
    protected void bindWrapViewHolder(@NonNull ViewHolder viewHolder, int position) {
        TextView tv = viewHolder.textView;

        if(position == BaseFragment.AD_POSITION -1){
            tv.setText("AD shows below");
        }else if(position == BaseFragment.AD_POSITION){
            tv.setText("AD shows above");
        }else{
            tv.setText(letters.get(position));
        }
    }

    @Override
    protected ViewHolder onWrapViewHolder(@NonNull ViewGroup viewGroup, int viewType) {
        View v = LayoutInflater.from(viewGroup.getContext()).inflate(R.layout.list_item, viewGroup, false);
        return new ViewHolder(v);
    }

    @Override
    protected int getWrapItemCount() {
        return letters.size();
    }
}
```
請參考以下 RecyclerView.Adapter 及 AbsRecyclerAdapter 提供覆寫方法對照表進行實作：

| RecyclerView.Adapter    | `AbsRecyclerAdapter`        |
| :----------------------:|:---------------------------:|
| onCreateViewHolder      | onWrapViewHolder            |
| onBindViewHolder        | bindWrapViewHolder          |
| getItemViewType         | getWrapItemViewType         |
| notifyItemRemoved       | wrapNotifyItemRemoved       |
| notifyItemChanged       | wrapNotifyItemChanged       |
| notifyItemRangeRemoved  | wrapNotifyItemRangeRemoved  |
| notifyItemRangeInserted | wrapNotifyItemRangeInserted |
| notifyItemRangeChanged  | wrapNotifyItemRangeChanged  |
| notifyItemMoved         | wrapNotifyItemMoved         |
| notifyItemInserted      | wrapNotifyItemInserted      |



### 建立 VpadnInReadAd，並指定 License Key
```java
public class MainActivity extends Activity {
    ...
    protected void onCreate(Bundle savedInstanceState) {
        ...
        // 設置 RecyclerView
        RecyclerView mRecyclerView = view.findViewById(R.id.recyclerView);
        mRecyclerView.setHasFixedSize(true);
        RecyclerView.LayoutManager mLayoutManager = new StaggeredGridLayoutManager(1, StaggeredGridLayoutManager.VERTICAL);
        mRecyclerView.setLayoutManager(mLayoutManager);
        List<String> letterList = new ArrayList<>(Arrays.asList(letters));

        MyRecyclerAdapter mAdapter = new MyRecyclerAdapter(letterList);
        mRecyclerView.setAdapter(mAdapter);

        // 建立 VpadnInReadAd，並指定 License Key
        inReadAd = new VpadnInReadAd(getActivity(), license Key);

        //建立廣告請求
        VpadnAdRequest adRequest = new VpadnAdRequest();
        adRequest.setAdContainer(recyclerView);
        adRequest.setAdPosition(AD_POSITION);

        inReadAd.setAdListener(new MyAdListener());

        // 拉取廣告
        inReadAd.loadAd(adRequest);
        ...
    }
}
```

# 實作影音廣告行為 Event
---
請在顯示廣告的 Activity 或 Fragment 中加入以下程式碼以提昇廣告呈現體驗：

```java
public class MainActivity extends Activity {
    ...
    @Override
    public void onResume() {
        super.onResume();
        android.util.Log.v("Vpon","onResume invoked!!");
        if(inReadAd != null){
            inReadAd.resume();
        }else{
            android.util.Log.v("Vpon", "inReadAd is null");
        }
    }
    
    @Override
    public void onPause() {
        android.util.Log.v("Vpon","onPause invoked!!");
        if(inReadAd != null){
            inReadAd.pause();
        }else{
            android.util.Log.v("Vpon", "inReadAd is null");
        }
        super.onPause();
    }
    
    @Override
    public void onDestroy() {
        android.util.Log.v("Vpon","onDestroy invoked!!");
        if(inReadAd != null){
            inReadAd.destroy();
        }else{
            android.util.Log.v("Vpon", "inReadAd is null");
        }
        super.onDestroy();
    }
}
```

# 實作 VpadnAdListener
---
完成廣告初始化後，請實作以下事件監聽廣告請求及顯示的狀態：

```java
public class MainActivity extends Activity {
    ...
    @Override
    public void onVpadnReceiveAd(VpadnAd ad) {
        Log.v("Vpon","onVpadnReceiveAd invoked!!");
    }
 
    @Override
    public void onVpadnFailedToReceiveAd(VpadnAd ad, VpadnAdRequest.VpadnErrorCode errorCode) {
        Log.v("Vpon","onVpadnFailedToReceiveAd invoked!!");
    }
 
    @Override
    public void onVpadnPresentScreen(VpadnAd ad) {
        Log.v("Vpon","onVpadnPresentScreen invoked!!");
    }
 
    @Override
    public void onVpadnDismissScreen(VpadnAd ad) {
        Log.v("Vpon","onVpadnDismissScreen invoked!!");
    }
 
    @Override
    public void onVpadnLeaveApplication(VpadnAd ad) {
        Log.v("Vpon","onVpadnLeaveApplication invoked!!");
    }
}
```


# Tips
---

### Sample Code
如果您想看到完整的串接實例，請參考我們的 [Sample Code]

### 其它廣告形式
如果您想了解其它廣告形式的串接，請參考以下內容：

* [橫幅廣告](../banner)
* [插頁廣告](../interstitial)
* [原生廣告](../native)
* [中介服務](../mediation)
* [進階設定](../advanced)

[串接說明]: ../integration-guide/
[Vpon PDMKT Team]: mailto:partner.service@vpon.com
[ScrollView]: {{site.baseurl}}/zh-tw/android/outstream/#scrollview
[ListView]: {{site.baseurl}}/zh-tw/android/outstream/#listview
[RecyclerView]:  {{site.baseurl}}/zh-tw/android/outstream/#recyclerview
[Sample Code]: ../download/