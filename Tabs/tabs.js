class Tabs {
  constructor($tabs) {
    this.$tabs = $tabs
    this.$$items = $tabs.querySelectorAll('.tabs-items')
    this.$$son = $tabs.querySelectorAll('.tabs-son')
    this.$line = $tabs.querySelector('.line')

    this.init()
    this.bind()
  }
  init() {
    this.$line.style.width = this.$$items[0].offsetWidth + 'px'
  }

  bind() {
    this.$$items.forEach(a => {
      let self = this
      a.onclick = function () {
        self.$$items.forEach(a => a.classList.remove('active'))
        this.classList.add('active')
        self.$line.style.width = this.offsetWidth + 'px'
        self.$line.style.transform = `translateX(${this.offsetLeft}px)`

        let index = Array.from(self.$$items).indexOf(this)
        self.$$son.forEach(a => a.classList.remove('active'))
        self.$$son[index].classList.add('active')

      }
    })

  }

}
new Tabs(document.querySelector('.tabs'))
new Tabs(document.querySelector('.tabs2'))