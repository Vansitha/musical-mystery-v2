import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Fragment, useState } from "react";

export default function Modal({
  heading,
  body,
  btnText,
  btnHandler,
  btnHoverColor,
}) {
  let [isOpen, setIsOpen] = useState(true);

  function closeModal() {
    setIsOpen(false);
  }

  function handleBtnClick() {
    if (btnHandler != undefined) {
      btnHandler();
    }
    closeModal();
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black/60' />
          </Transition.Child>
          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title
                    as='h3'
                    className='text-2xl font-bold leading-6 mb-5 text-gray'
                  >
                    {heading}
                    <XMarkIcon
                      className='h-6 w-6 inline-block float-right cursor-pointer'
                      onClick={closeModal}
                    />
                  </Dialog.Title>
                  <div className='mt-3'>
                    <p className='text-gray font-medium'>{body}</p>
                  </div>
                  <div className='mt-5'>
                    <button
                      type='button'
                      className={`inline-flex justify-center rounded-md border border-transparent bg-black px-4 py-2 font-medium text-white hover:bg-${btnHoverColor} focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2`}
                      onClick={handleBtnClick}
                    >
                      {btnText}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
