class Collapse  {
  constructor($container){
    this.$container=$container
    this.$$items = $container.querySelectorAll('.item')


    this.bindEvent()
  }
  bindEvent(){
    let self = this
    this.$$items.forEach(a=> {
      a.onclick = function(){
        self.$$items.forEach(a =>a.classList.remove('active'))
        a.classList.add('active')
        
      } 
    });
  }
}

new Collapse(document.querySelector('.collapse'))