declare global {
  interface Element {
    attributeChangedCallback?: Function;
  }
}

export function registerComponent(name: string) {
  return function (target: CustomElementConstructor) {
    window.customElements.define(name, target);
    Object.defineProperty(target, '__registeredComponent', {
      value: true,
      writable: false,
      enumerable: false,
    });
  };
}

export function registerAttribute(name: string): PropertyDecorator {
  return function target(target, propertyKey) {
    if (target instanceof Element) {
      Object.defineProperty(target, 'attributeChangedCallback', {
        configurable: true,
        value: new Proxy(target.attributeChangedCallback || new Function(), {
          apply(applyTarget, thisArg, argumentsList) {
            if (argumentsList[0] === name) {
              if (thisArg.__renderFunction) {
                thisArg.__renderFunction();
              }
            }
            return applyTarget(...argumentsList);
          },
        }),
      });
      Object.defineProperty(target, propertyKey, {
        get() {
          return (this as HTMLElement).getAttribute(name);
        },
      });
    } else {
      throw new TypeError(
        "Can't use registerAttribute on non registered component"
      );
    }
  };
}

export function registerRenderFunction(): PropertyDecorator {
  return function (target, key) {
    Object.defineProperty(target, '__renderFunction', {
      value: target[key as keyof typeof target],
      writable: false,
      enumerable: false,
      configurable: false,
    });
  };
}
