// 元素在可视区域内才开始执行动画的指令
export default {
  // el是绑定指令的dom节点，binding是记录所有与指令相关的对象
  inserted: function(el, binding) {
    const options = { threshold: [0] };
    function callback(entries) {
      if (entries[0].isIntersecting) {
        // 新增类名
        el.classList.add(binding.value);
        observer.unobserve(el);
      }
    }
    const observer = new IntersectionObserver(callback, options);
    observer.observe(el);
  },
  // 自定义绑定的组件销毁时
  unbind: function() {}
};
