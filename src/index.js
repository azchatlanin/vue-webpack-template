import component from './component'
import './assets/styles.styl'

console.log('process.env.NODE_ENV = ', process.env.NODE_ENV)
document.body.appendChild(component())