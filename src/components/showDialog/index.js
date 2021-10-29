import vue from 'vue'
import model from './model'

const ModelComp = vue.extend(model)

let modelInstance = null

const showModel = (data) => {
  if (modelInstance) return
  modelInstance = new ModelComp({
    propsData: {
      url: data.url
    }
  }).$mount()
  document.body.appendChild(modelInstance.$el)
}

export default showModel
