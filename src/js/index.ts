import * as Modules from './modules'
import './modules'

interface IModules {
  [id: string]: () => void
}

document.addEventListener('DOMContentLoaded', function (): void {
  const ModulesCollection: IModules = Modules

  Object.keys(ModulesCollection).forEach(ModuleName => {
    const ModuleHandler = ModulesCollection[ModuleName]

    if (typeof ModuleHandler === 'function') {
      ModuleHandler()
    }
  })
})
