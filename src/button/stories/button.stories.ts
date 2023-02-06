import "../index";

const ButtonStoryTemplate = args => {
  return `<web-button type=${args.type}>${args.label}</web-button>`;
};

export const PrimaryButton = ButtonStoryTemplate.bind({});
PrimaryButton.args = {
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
};
