// components/GoogleAuthButton.tsx
import { FcGoogle } from "react-icons/fc";

export default function GoogleAuthButton({ label = "Continue with Google" }: { label?: string }) {
  const handleGoogle = () => {
    // Replace with your backend endpoint URL:
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google/login`;
  };
  return (
    <button
      className="flex items-center justify-center w-[80%] mt-2 py-3 rounded-full border border-gray-300 hover:bg-gray-50 transition"
      onClick={handleGoogle}
      type="button"
    >
      <FcGoogle className="mr-2 text-2xl" />
      <span className="font-montserrat font-medium">{label}</span>
    </button>
  );
}
