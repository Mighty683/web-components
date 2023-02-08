import { describe, it, afterEach, expect, vi } from 'vitest';

describe('web-button', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });
  it('should create web-button element', () => {
    //given
    //when
    document.body.innerHTML = '<web-button>Label</web-button>';
    //then
    expect(document.getElementsByTagName('web-button')).toHaveLength(1);
  });
  it('should react to clicks', () => {
    //given
    document.body.innerHTML = '<web-button>Label</web-button>';
    const clickCallback = vi.fn();
    //when
    let webButton = document.getElementsByTagName('web-button')?.item(0);
    webButton?.addEventListener('click', clickCallback);
    webButton?.dispatchEvent(new MouseEvent('click'));
    //then
    expect(clickCallback).toHaveBeenCalled();
  });
});
