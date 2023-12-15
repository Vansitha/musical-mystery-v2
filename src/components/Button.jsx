import { motion } from "framer-motion";
import Spinner from "./Spinner";

export default function Button({ text, callback, styles, isDisabled }) {
  const motionProps = {
    whileHover: isDisabled ? {} : { scale: 1.1 },
    whileTap: isDisabled ? {} : { scale: 0.9 },
  };

  if (isDisabled) {
    return (
      <button
        disabled={isDisabled}
        className={`flex justify-center h-12 w-80 bg-jade rounded-xl  hover:bg-jade ${styles}`}
      >
        <Spinner size='md' />
      </button>
    );
  }

  return (
    <motion.button
      disabled={isDisabled}
      {...motionProps}
      // className={`p-3 px-24  bg-jade rounded-xl hover:bg-jade ${styles}`}
      className={`h-12 w-80 bg-jade rounded-xl hover:bg-jade ${styles}`}
      onClick={callback}
    >
      <span className='text-white font-bold text-xl'>{text}</span>
    </motion.button>
  );
}
