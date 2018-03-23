export function composeComponent(connectFunc, ServerInput) {
  return (wrappers = []) => {
    let ComposedEl = ServerInput
    for (let wrapper of wrappers) {
      ComposedEl = wrapper(ComposedEl)
    }
    return connectFunc(ComposedEl)
  }
}
