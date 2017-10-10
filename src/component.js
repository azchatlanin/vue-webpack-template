import style from './assets/styles.styl'

export default (text = 'Hello word!') => {
  const element = document.createElement('div')
  element.innerHTML = '<p>'+ text + '</p>'
  element.className = style.greenClass
  return element
}