

const css = ($root, cssObj) => Object.assign($root.style, cssObj)

//设置一个动画函数对象
const Animation = {
  //先对当前效果进行假设!
  //为了实现图片从左到右,或从右到左,需要拿到两个dom节点,然后设置移动方向,在设置动画
  //函数需要设置参数,根据需求设置from和to,方向这三个参数
  slide($from, $to, direction) {
    $from.style = ''
    $to.style = ''
    console.log('slide', arguments)
    css($from, {
      transform: `translateX(0)`,
      zIndex: 10
    })
    css($to, {
      transform: `translateX(${direction === 'right' ? '-' : ''}100%)`,
      zIndex: 10
    })
    setTimeout(() => {
      css($from, {
        transform: `translateX(${direction === 'left' ? '-' : ''}100%)`,
        transition: `all 0.3s`
      })
      css($to, {
        transform: `translateX(0)`,
        transition: `all 0.3s`
      }
      )
    }
    )
  },

  fade($from, $to) {
    $from.style = ''
    $to.style = ''
    css($from, {
      opacity: 1,
      zIndex: 10
    })
    css($to, {
      opacity: 0,
      zIndex: 9
    })
    setTimeout(() => {
      css($from, {
        opacity: 0,
        zIndex: 10,
        transition: `all 0.3s`
      })
      css($to, {
        opacity: 1,
        zIndex: 9,
        transition: `all 0.3s`
      })
    }
    )
    setTimeout(() => {
      css($from, {
        opacity: 0,
        zIndex: 0
      })
      css($to, {
        opacity: 1,
        zIndex: 10
      }, 300)
    })
  },

  zoom($from, $to) {
    $from.style = ''
    $to.style = ''
    css($from, {
      opacity: 1,
      transform: `scale(1)`,
      zIndex: 10
    })
    css($to, {
      transform: `scale(10)`,
      opacity: 0,
      zIndex: 9
    })
    setTimeout(() => {
      css($from, {
        transform: `scale(10)`,
        opacity: 0,
        zIndex: 10,
        transition: `all 0.3s`
      })
      css($to, {
        transform: `scale(1)`,
        opacity: 1,
        zIndex: 9,
        transition: `all 0.3s`
      })
    }
    )
    setTimeout(() => {
      css($from, {
        zIndex: 9
      })
      css($to, {
        zIndex: 10
      }, 300)
    })
  }
}

class Carousel {
  constructor($root, animation) {
    this.$root = $root
    this.$pre = $root.querySelector('.arrow-pre')
    this.$next = $root.querySelector('.arrow-next')
    this.$$indicators = $root.querySelectorAll('.indicators > li')
    this.$$panels = $root.querySelectorAll('.panels > a')
    //把动画函数传递进来.参数animation是Animation.slide,因此属性animation是个函数
    this.animation = animation//是个函数
    this.bind()
  }

  bind() {
    let self = this

    this.$pre.onclick = function () {
      //点击上一页按钮,图片把这一页变成上一页.
      let fromIndex = self.getIndex()
      let toIndex = self.getPreIndex()
      self.setPage(fromIndex, toIndex, 'right')
      self.setIndicator(toIndex)//把指示器显示变成上一页的数字下标的位置
    }

    this.$next.onclick = function () {
      let fromIndex = self.getIndex()
      let toIndex = self.getNextIndex()
      self.setPage(fromIndex, toIndex, 'left')
      self.setIndicator(toIndex)
    }

    this.$$indicators.forEach($Indicator => {
      $Indicator.onclick = function (e) {
        let fromIndex = self.getIndex()//点击目标指示器,获得之前状态图片所在页数
        let toIndex = [...self.$$indicators].indexOf(e.target)//目标的页数
        self.setIndicator(toIndex)
        let direction = fromIndex > toIndex ? 'right' : 'left'
        self.setPage(fromIndex, toIndex, direction)
      }
    })

  }

  getIndex() {
    return [...this.$$indicators].indexOf(this.$root.querySelector('.indicators .active'))
  }

  getPreIndex() {
    return (this.getIndex() - 1 + [...this.$$indicators].length) % [...this.$$indicators].length
  }

  getNextIndex() {
    return (this.getIndex() + 1) % [...this.$$indicators].length
  }

  setPage(fromIndex, toIndex, direction) {
    console.log('setPage', arguments)
    //假设已经写好了一个动画,直接调用
    this.animation(this.$$panels[fromIndex], this.$$panels[toIndex], direction)
  }
  setIndicator(index) {
    this.$$indicators.forEach($indicator => $indicator.classList.remove('active'))
    this.$$indicators[index].classList.add('active')
  }
  setAnimation(animation) {
    this.animation = animation
  }
}

let $carousel = document.querySelector('.carousel')

let carousel = new Carousel($carousel, Animation.slide)


document.querySelector('#animation-select').onchange = function () {
  carousel.setAnimation(Animation[this.value])
  console.log(Animation[this.value])//select的value
}