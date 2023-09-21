// totalTime：每次动画执行总时间，默认为700毫秒
// many：是否执行多次动画，默认为true
export default {
  // 当被绑定的元素插入到 DOM 时调用
  inserted: function (el) {
    function callback(entries) { 
      if (entries[0].isIntersecting) { 
        const data_src = el.getAttribute('data-src')
        el.setAttribute('src', data_src)
        observer.unobserve(el)
      }
    }
    // rootMargin用于设置视口的大小，默认是"0px 0px 0px 0px"
    const options = {rootMargin:'0px 0px 80px 0px'}
    const observer = new IntersectionObserver(callback, options)
    observer.observe(el)
  },
  // 自定义绑定的组件销毁时 
  unbind: function() {
  }
};
