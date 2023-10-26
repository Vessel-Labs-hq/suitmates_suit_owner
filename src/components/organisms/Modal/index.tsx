import React, { createContext, forwardRef, useContext, useEffect, useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { cn } from "@/utils";
import { Title } from "@the_human_cipher/components-library";

type Func = (style: { isScrolled: boolean }) => string;
type ClassName = Func | string;

type ModalRef = React.RefObject<HTMLDivElement>;

interface ModalContextValue {
  isScrolled: boolean;
  enableBottomSheet: boolean;
  ref: null | ModalRef;
}

const ModalContext = createContext<ModalContextValue>({
  isScrolled: false,
  enableBottomSheet: false,
  ref: null,
});

interface ContentProps extends Omit<Dialog.DialogContentProps, "asChild"> {
  overlayStyles?: string;
  enableBottomSheet?: true;
}

const assertClassName = (func?: ClassName): Func => {
  if (!func) return () => "";

  if (typeof func === "string") return () => func;

  return func;
};

const Content = (props: ContentProps) => {
  const { children, overlayStyles, className, enableBottomSheet = true, ...rest } = props;

  const elementRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleHeaderScroll = () => {
    if (elementRef.current) {
      const { scrollTop } = elementRef.current;

      setIsScrolled(scrollTop > 0);
    }
  };

  useEffect(() => {
    if (elementRef.current) {
      const headerElement = elementRef.current;

      headerElement.addEventListener("scroll", handleHeaderScroll);
    }
  }, [elementRef]);

  return (
    <ModalContext.Provider value={{ enableBottomSheet, isScrolled, ref: elementRef }}>
      <Dialog.Portal>
        <Dialog.Overlay
          className={cn(
            "data-[state=open]:animate-overlayShow fixed inset-0 z-[10] bg-suite-dark bg-opacity-50",
            overlayStyles
          )}
        />
        <Dialog.Content
          className={cn(
            "data-[state=open]:animate-contentShow fixed left-1/2 top-1/2 z-[100] max-h-[80vh] w-[90vw] md:max-h-[85vh]",
            "-translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white py-6 focus:outline-none md:py-8 [&>*]:px-6 md:[&>*]:px-8",
            enableBottomSheet &&
              "max-md:bottom-0 max-md:top-auto max-md:w-full max-md:-translate-y-0 max-md:rounded-none",
            enableBottomSheet && " max-md:data-[state=open]:animate-slideUp max-md:rounded-t-3xl",
            enableBottomSheet && "max-md:pb-0",
            "flex flex-col",
            className
          )}
          {...rest}
        >
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </ModalContext.Provider>
  );
};

type RenderChildren = (props: { ref: ModalRef | null }) => React.ReactNode;

interface ModalBodyProps {
  className?: ClassName;
  children: React.ReactNode | RenderChildren;
}

const ModalBody = forwardRef<HTMLDivElement, ModalBodyProps>((props) => {
  const { children, className } = props;

  const { isScrolled, ref } = useContext(ModalContext);

  const func = assertClassName(className);

  return (
    <div
      ref={ref}
      className={cn(
        "overflow-y-scroll scroll-smooth py-4",
        isScrolled && "pb-20",
        className && func({ isScrolled })
      )}
    >
      {typeof children === "function" ? children({ ref }) : children}
    </div>
  );
});

ModalBody.displayName = "ModalBody";

interface Props {
  title: string;
  titleStyles?: string;
  hideClose?: true;
  className?: ClassName;
}
const ModalTitle = (props: Props) => {
  const { title, className, hideClose, titleStyles } = props;

  const { isScrolled } = useContext(ModalContext);

  const func = assertClassName(className);

  return (
    <div
      className={cn(
        "flex w-full items-start justify-between pb-5",
        isScrolled && "border-b border-b-black/[0.15]",
        className && func({ isScrolled })
      )}
    >
      <Dialog.Title asChild>
        <Title weight="bold" level={4} className={cn("text-base md:text-lg", titleStyles)}>
          {title}
        </Title>
      </Dialog.Title>
      {!hideClose && (
        <Dialog.Close asChild>
          <button type="button" className={cn("text-sm")}>
            x close
          </button>
        </Dialog.Close>
      )}
    </div>
  );
};

/**
 * Anatomy of the component
 * ```tsx
 * <Modal>
 *   <Modal.Body>
 *     <Modal.Title/>
 *     <Modal.Content/>
 *   </Modal.Body>
 * </Modal>
 * ```
 */
const Modal = (props: Dialog.DialogProps) => {
  return <Dialog.Root {...props} />;
};

Modal.Body = Content;
Modal.Content = ModalBody;
Modal.Title = ModalTitle;
Modal.Close = Dialog.Close;
Modal.Trigger = Dialog.Trigger;

export default Modal;
