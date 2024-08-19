export type EventCallback = (...args: unknown[]) => void

export type Listener<TEventType extends string> = {
  [key in TEventType]?: EventCallback[]
}

export default class EventBus {
  private listeners: Listener<string> = {}

  private isListener(callback: unknown): callback is Listener<string> {
    return typeof callback === 'function'
  }

  public isFoundEvent<TCurrentEvent>(event: TCurrentEvent) {
    return Array.isArray(this.listeners[event])
  }

  public on(event: string, callback?: EventCallback) {
    if (this.isListener(callback)) {
      this.listeners[event] = [...(this.listeners[event] || []), callback]
    }
  }

  public off(event: string, callback?: EventCallback) {
    if (!this.isListener(callback)) {
      throw new Event(`Not found callback for event: ${event}`)
    }

    if (this.isFoundEvent(event)) {
      this.listeners[event] = this.listeners[event]?.filter(
        listener => listener !== callback,
      )
    } else {
      throw new Event(`Not found event: ${event}`)
    }
  }

  public emit(event: string, ...args: unknown[]) {
    if (this.isFoundEvent(event)) {
      this.listeners[event]?.forEach(listener => listener(...args))
    }
  }
}
