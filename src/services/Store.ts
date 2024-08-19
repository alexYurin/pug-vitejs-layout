export default class Store<TState extends Record<string, any>> {
  private state: TState | Partial<TState>

  constructor(initialState: TState | Partial<TState> = {}) {
    this.state = initialState
  }

  public setState(newState: TState | Partial<TState>) {
    Object.entries(newState).forEach(([stateKey, stateValue]) => {
      const key = stateKey as keyof (TState | Partial<TState>)

      this.state[key] = stateValue
    })
  }

  public getState() {
    return this.state
  }
}
