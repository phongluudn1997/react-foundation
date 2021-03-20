import * as React from "react";
import { Dialog } from "@reach/dialog";
import { CircleButton } from "./lib";

const ModalContext = React.createContext();
const Modal = (props) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return <ModalContext.Provider value={{ isOpen, setIsOpen }} {...props} />;
};
const ModalDismissButton = ({ children }) => {
  const { setIsOpen } = React.useContext(ModalContext);
  return React.cloneElement(children, { onClick: () => setIsOpen(false) });
};

const ModalOpenButton = ({ children }) => {
  const { setIsOpen } = React.useContext(ModalContext);
  return React.cloneElement(children, { onClick: () => setIsOpen(true) });
};

const ModalContent = ({ children }) => {
  const { isOpen, setIsOpen } = React.useContext(ModalContext);
  return (
    <Dialog
      aria-label="modal"
      isOpen={isOpen}
      onDismiss={() => setIsOpen(false)}
      className="max-w-lg rounded-lg p-12"
    >
      <div className="flex justify-end">
        <ModalDismissButton>
          <CircleButton>×</CircleButton>
        </ModalDismissButton>
      </div>
      {children}
    </Dialog>
  );
};

export { Modal, ModalDismissButton, ModalOpenButton, ModalContent };
