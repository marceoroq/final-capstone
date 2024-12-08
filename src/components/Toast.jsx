import { useEffect } from 'react';

const toastTypes = {
  success: {
    bgColor: 'bg-[#41cf56]',
    icon: '✓',
  },
  error: {
    bgColor: 'bg-red-500',
    icon: '✕',
  },
};

const Toast = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const { bgColor, icon } = toastTypes[type];

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 flex items-center gap-3 rounded-lg ${bgColor} animate-slideIn px-6 py-4 text-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.16)]`}
      role="alert"
    >
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/25 text-sm font-bold">
        {icon}
      </span>
      <p className="font-medium">{message}</p>
      <button
        onClick={onClose}
        className="ml-4 rounded-full p-1 hover:bg-white/25"
        aria-label="Close notification"
      >
        ✕
      </button>
    </div>
  );
};

export default Toast;
