import { motion } from "framer-motion";

export default function AnimatedComponent() {
  return (
    <motion.div
      whileHover={{ scale: 1.0 }}
      animate={{ scale: 0.5 }}
      style={{ background: "var(--red)", scale: ".5" }}
    >
      Hello
    </motion.div>
  );
}
