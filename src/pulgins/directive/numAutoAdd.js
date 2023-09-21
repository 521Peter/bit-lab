// totalTime：每次动画执行总时间，默认为700毫秒
// many：是否执行多次动画，默认为true
export default function(totalTime = 700, many = true) {
  function animateNumber(el, finalNum, startTime) {
    const currentTime = Date.now();
    const runTime = currentTime - startTime; // 运行时间
    const progress = Math.min(runTime / totalTime, 1); // 动画进度
    el.innerHTML = Math.floor(finalNum * progress); // 当前页面显示的数字
    if (runTime < totalTime) {
      requestAnimationFrame(() => animateNumber(el, finalNum, startTime));
    }
    if (el.innerHTML === finalNum) el.finished = true;
  }

  return {
    // 当被绑定的元素插入到 DOM 时调用
    inserted: function(el, binding) {
      // 设置元素与视口相交90%时触发回调函数
      const options = { threshold: [0.9] };
      el.finished = true;
      binding.observer = new IntersectionObserver(callback, options);
      function callback(entries) {
        // 如果设置了动画只执行一次，且动画执行过
        if (!many && binding.executed) binding.observer.unobserve(el);
        // 目标元素与视口有重合的部分了
        if (entries[0].isIntersecting && el.finished) {
          animateNumber(el, el.innerHTML, new Date());
          // finished为false表示还有上一次动画还没有结束
          el.finished = false;
          // executed表示动画执行过一次
          binding.executed = true;
        }
      }
      // 观察el元素
      binding.observer.observe(el);
    },
    // 自定义绑定的组件销毁时，解除观察
    unbind: function(el, binding) {
      binding.observer.unobserve(el);
    }
  };
}
