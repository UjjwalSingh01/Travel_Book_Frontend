import React, { useEffect } from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import { AiOutlineCheckCircle, AiOutlineInfoCircle, AiOutlineWarning } from 'react-icons/ai';
import { BiErrorCircle } from 'react-icons/bi';
import { motion, AnimatePresence } from 'framer-motion';

interface AlertProps {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  onClose: () => void;
}

const alertStyles = {
  success: {
    bg: 'bg-green-50',
    border: 'border-green-400',
    text: 'text-green-800',
    subtext: 'text-green-700',
    icon: <AiOutlineCheckCircle size={22} className="text-green-600" />,
  },
  error: {
    bg: 'bg-red-50',
    border: 'border-red-400',
    text: 'text-red-800',
    subtext: 'text-red-700',
    icon: <BiErrorCircle size={22} className="text-red-600" />,
  },
  info: {
    bg: 'bg-blue-50',
    border: 'border-blue-400',
    text: 'text-blue-800',
    subtext: 'text-blue-700',
    icon: <AiOutlineInfoCircle size={22} className="text-blue-600" />,
  },
  warning: {
    bg: 'bg-yellow-50',
    border: 'border-yellow-400',
    text: 'text-yellow-800',
    subtext: 'text-yellow-700',
    icon: <AiOutlineWarning size={22} className="text-yellow-600" />,
  },
};

const Alert: React.FC<AlertProps> = ({ message, type, onClose }) => {
  const styles = alertStyles[type];

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 100 }}
        transition={{ type: 'spring', stiffness: 100, damping: 15 }}
        className={`fixed bottom-4 right-4 z-50 p-4 rounded-lg shadow-lg border-l-4 ${styles.bg} ${styles.border}`}
        style={{ maxWidth: '320px' }}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="pt-1">{styles.icon}</div>
          <div className="flex-1">
            <p className={`font-semibold text-lg ${styles.text}`}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </p>
            <p className={`mt-1 text-sm ${styles.subtext}`}>{message}</p>
          </div>
          <button
            onClick={onClose}
            className={`hover:opacity-75 transition-opacity focus:outline-none ${styles.text}`}
            aria-label="Close alert"
          >
            <MdOutlineCancel size={22} />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Alert;
