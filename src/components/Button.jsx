import { motion } from "framer-motion";

export default function Button({ text, callback, styles }) {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={`p-3 px-24 bg-jade rounded-xl hover:bg-jade ${styles}`}
      onClick={callback}
    >
      <span className='text-white font-bold text-xl'>{text}</span>
    </motion.button>
  );
}
