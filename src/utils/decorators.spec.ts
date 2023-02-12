import { describe, it, expect, vi, afterEach } from 'vitest';
import {
  registerComponent,
  registerAttribute,
  registerRenderFunction,
} from './decorators';

describe('decorators', () => {
  let renderSpy = vi.fn();
  @registerComponent('test-component')
  class TestComponent extends HTMLElement {
    static get observedAttributes() {
      return ['test-property'];
    }
    @registerAttribute('test-property')
    public testProperty?: string;

    @registerRenderFunction()
    public renderMethod() {
      renderSpy();
    }
  }
  afterEach(() => {
    renderSpy.mockReset();
  });
  describe('decorators synergy', () => {
    it('should call renderMethod', () => {
      //given
      //when
      document.body.innerHTML =
        '<test-component id="test" test-property="test-value" />';
      //then
      expect(renderSpy).toHaveBeenCalledTimes(1);
    });

    it('should pass attribute to field', () => {
      //given
      //when
      document.body.innerHTML =
        '<test-component id="test" test-property="test-value" />';
      //then
      expect(
        (document.getElementById('test') as TestComponent)?.testProperty
      ).toBe('test-value');
    });

    it('should change field with attribute', () => {
      //given
      document.body.innerHTML =
        '<test-component id="test" test-property="test-value" />';
      let testComponentElement = document.getElementById(
        'test'
      ) as TestComponent;
      //when
      testComponentElement.setAttribute('test-property', 'changed-test-value');
      //then
      expect(
        (document.getElementById('test') as TestComponent)?.testProperty
      ).toBe('changed-test-value');
    });

    it('should change field with attribute', async () => {
      //given
      document.body.innerHTML =
        '<test-component id="test" test-property="test-value" />';
      let testComponentElement = document.getElementById(
        'test'
      ) as TestComponent;
      //when
      testComponentElement.setAttribute('test-property', 'changed-test-value');
      //then
      expect(renderSpy).toHaveBeenCalledTimes(2);
    });
  });
});
