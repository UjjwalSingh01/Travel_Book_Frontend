import { motion } from "framer-motion";
import Link from "next/link";

interface BookCardProps {
  id: string;
  title: string;
  status: "Explored" | "Planning";
  image: string;
  visibility?: "Public" | "Private";
  addedBy?: string;
}

const BookCard: React.FC<BookCardProps> = ({
  id,
  title,
  image,
  status,
  visibility,
  addedBy,
}) => {
  return (
    <Link
      href={status === "Explored" ? `/bookdescription/${id}` : `/bookplanning/${id}`}
      className="block"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative group w-full max-w-[270px] sm:max-w-[300px] md:max-w-[320px] aspect-[3/4] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl cursor-pointer transition-all mx-auto"
      >
        {/* Image */}
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
        </motion.div>

        {/* Overlay Content */}
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 z-10">
          <div className="flex flex-col gap-1 md:gap-2">
            {/* Status Badge */}
            {visibility && (
              <motion.span
                className="self-start px-3 py-1 rounded-full text-xs md:text-sm font-medium"
                style={{
                  backgroundColor: status === "Explored" ? "#4CAF50" : "#2196F3",
                  color: "white",
                }}
                whileHover={{ scale: 1.05 }}
              >
                {status}
              </motion.span>
            )}

            {/* Title */}
            <motion.h3
              className="text-lg md:text-xl font-bold text-white drop-shadow-md leading-tight"
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              {title}
            </motion.h3>

            {/* Added By (optional) */}
            {addedBy && (
              <p className="text-xs md:text-sm text-gray-300 font-medium">
                Added by: {addedBy}
              </p>
            )}
          </div>
        </div>

        {/* Hover Border Effect */}
        <motion.div
          className="absolute inset-0 border-2 border-transparent rounded-xl"
          whileHover={{
            borderColor: "rgba(96, 165, 250, 0.4)",
            transition: { duration: 0.3 },
          }}
        />
      </motion.div>
    </Link>
  );
};

export default BookCard;