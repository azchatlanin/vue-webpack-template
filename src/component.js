export default (text = 'Hello word!') => {
  const element = document.createElement('div')
  element.innerHTML = '<p>'+ text + '</p>'
  return element
}