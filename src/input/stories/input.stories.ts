import '../index';

const InputStoryTemplate = (args) => {
  return `<web-input id="test-input" error="${args.error}" label="${args.label}" value="${args.value}"/>`;
};

export const Input = InputStoryTemplate.bind({});

Input.args = {
  label: 'Label',
  value: 'value',
  error: '',
};

export default {
  title: 'Web Input',
  argTypes: {},
};
