import "../index";

const ButtonStoryTemplate = args => {
  return `<web-button id="test-button" type=${args.type}>${args.label}</web-button>`;
};

export const Button = ButtonStoryTemplate.bind({});

Button.args = {
  label: "Label",
  type: "primary",
};

export default {
  title: "Web Button",
  argTypes: {
    type: {
      options: ["primary", "secondary"],
      control: { type: "radio" },
    },
  },
  parameters: {
    actions: {
      handles: ["mouseclick", "click #test-button"],
    },
  },
};
