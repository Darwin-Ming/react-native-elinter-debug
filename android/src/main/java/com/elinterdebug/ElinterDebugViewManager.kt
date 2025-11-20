package com.elinterdebug

import android.graphics.Color
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewManagerDelegate
import com.facebook.react.uimanager.annotations.ReactProp
import com.facebook.react.viewmanagers.ElinterDebugViewManagerInterface
import com.facebook.react.viewmanagers.ElinterDebugViewManagerDelegate

@ReactModule(name = ElinterDebugViewManager.NAME)
class ElinterDebugViewManager : SimpleViewManager<ElinterDebugView>(),
  ElinterDebugViewManagerInterface<ElinterDebugView> {
  private val mDelegate: ViewManagerDelegate<ElinterDebugView>

  init {
    mDelegate = ElinterDebugViewManagerDelegate(this)
  }

  override fun getDelegate(): ViewManagerDelegate<ElinterDebugView>? {
    return mDelegate
  }

  override fun getName(): String {
    return NAME
  }

  public override fun createViewInstance(context: ThemedReactContext): ElinterDebugView {
    return ElinterDebugView(context)
  }

  @ReactProp(name = "color")
  override fun setColor(view: ElinterDebugView?, color: String?) {
    view?.setBackgroundColor(Color.parseColor(color))
  }

  companion object {
    const val NAME = "ElinterDebugView"
  }
}
