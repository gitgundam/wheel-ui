class Message {
  constructor({ type = 'success', text = '' }) {
    this.type = type
    this.text = text

    this.render()
    this.bind()
  }
  render() {
    let $div = document.createElement('div')
    this.$message = $div
    $div.classList.add('message')
    $div.classList.add(this.type)
    let $icon = document.createElement('span')
    $icon.classList.add('iconfont')
    $icon.classList.add('icon-' + this.type)
    $div.appendChild($icon)
    let $text = document.createTextNode(this.text)
    $div.appendChild($text)
    document.body.appendChild($div)
  }
  bind() {
    setTimeout(() => this.show())
    setTimeout(() => this.destroy(), 3000)
  }

  show() {
    this.$message.classList.add('show')
  }
  destroy() {
    this.$message.classList.remove('show')
    setTimeout(() => this.$message.parentElement.removeChild(this.$message), 4000)
  }
}

document.querySelector('#btn-success').onclick = function () {
  new Message({ type: 'success', text: '成功' })
}

document.querySelector('#btn-warning').onclick = function () {
  new Message({ type: 'warning', text: '警告' })
}

document.querySelector('#btn-info').onclick = function () {
  new Message({ type: 'info', text: '消息' })
}

document.querySelector('#btn-error').onclick = function () {
  new Message({ type: 'error', text: '错误' })
}