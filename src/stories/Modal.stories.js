import React from "react";
import { Modal, ModalContent, ModalOpenButton } from "../components/modal";

const TestModal = () => {
  return (
    <Modal>
      <ModalOpenButton>
        <button>Open</button>
      </ModalOpenButton>
      <ModalContent>Tesssssss</ModalContent>
    </Modal>
  );
};

export default {
  title: "Modal",
  component: TestModal,
};

const Template = (args) => <TestModal {...args} />;

export const FirstStory = Template.bind({});

FirstStory.args = {};
