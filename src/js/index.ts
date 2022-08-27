import * as ModuleComponents from './components'
import './modules'

interface IComponents {
  [id: string]: () => void
}

document.addEventListener('DOMContentLoaded', function (): void {
  const Components: IComponents = ModuleComponents

  Object.keys(Components).forEach(ComponentName => {
    const Component = Components[ComponentName]

    if (typeof Component === 'function') {
      Component()
    }
  })
})
