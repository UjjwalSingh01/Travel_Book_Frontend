// AddItineraryModal.tsx
import Alert from "@/common_components/Alert";
import Loading from "@/common_components/Loading";
import axios from "axios";
import { motion } from "framer-motion";
import { useState } from "react";
import { FiTrash2, FiUploadCloud } from "react-icons/fi";

interface AddItineraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPage: string | null;
}

const AddNewItineraryModal = ({ isOpen, onClose, selectedPage }: AddItineraryModalProps) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Attraction",
    latitude: "",
    longitude: "",
    tips: "",
    rating: 0,
    experience: {
      comment: "",
      upVotes: 0,
    }
  });
  const [images, setImages] = useState<FileList | null>(null);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertType, setAlertType] = useState<'success' | 'error' | 'info' | 'warning'>('info');
  const [message, setMessage] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    setImages(files);
    const previews = Array.from(files).map(file => URL.createObjectURL(file));
    setPreviewUrls(previews);
  };

  const handleRemoveImage = (index: number) => {
    const updatedPreviews = previewUrls.filter((_, i) => i !== index);
    const updatedFiles = Array.from(images || []).filter((_, i) => i !== index);

    const newFileList = new DataTransfer();
    updatedFiles.forEach(file => newFileList.items.add(file));
    setImages(newFileList.files);
    setPreviewUrls(updatedPreviews);
  };

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      const form = new FormData();

      form.append("title", formData.title);
      form.append("description", formData.description);
      form.append("category", formData.category);
      form.append("latitude", formData.latitude.toString());
      form.append("longitude", formData.longitude.toString());
      form.append("tips", formData.tips);
      form.append("rating", formData.rating.toString());
      form.append("experienceComment", formData.experience.comment);

      if (images) {
        Array.from(images).forEach((file) => {
          form.append("images", file);
        });
      }

      console.log(form);
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/itinerary/${selectedPage}/addNewItinerary`, form, {
        withCredentials: true
      })

      if (response.data.success) {
        // setBook(response.data.data);
        setMessage(response.data.message);
        setAlertType('success');
        setShowAlert(true);
        setTimeout(() => {
          onClose();
        }, 1500)
      }

    } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error('Backend error:', error.response?.data);
          setMessage(error.response?.data?.message);
        } else {
          console.error('Unexpected error:', error);
          setMessage('An unexpected error occurred');
        }
        setAlertType('error');
        setShowAlert(true);
      } finally {
        setIsLoading(false);
      }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden max-h-[80vh] overflow-y-auto"
      >
        {(showAlert) && (
          <Alert
            message={message}
            type={alertType}
            onClose={() => {
              setShowAlert(false)
            }}
          />
        )}

        {isLoading && (
          <Loading />
        )}

        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
          <h2 className="text-2xl font-bold text-white">Create New Itinerary</h2>
          <p className="text-blue-100 mt-1">Fill in the details for your new destination</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Title *</label>
              <input
                required
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Eiffel Tower Visit"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Category *</label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Restaurant">Restaurant</option>
                <option value="Hotel">Hotel</option>
                <option value="Attraction">Attraction</option>
                <option value="Activity">Activity</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 h-32"
              placeholder="Describe the itinerary..."
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Latitude *</label>
              <input
                required
                type="number"
                step="any"
                value={formData.latitude}
                onChange={(e) => setFormData({...formData, latitude: e.target.value})}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="48.8584"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Longitude *</label>
              <input
                required
                type="number"
                step="any"
                value={formData.longitude}
                onChange={(e) => setFormData({...formData, longitude: e.target.value})}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="2.2945"
              />
            </div>
          </div>

          <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Upload Images</label>
            <div className="relative border border-dashed border-gray-400 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 transition">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <div className="flex flex-col items-center text-gray-600">
                <FiUploadCloud size={32} />
                <p className="mt-2 text-sm">Click or drag to upload</p>
              </div>
            </div>
            {previewUrls.length > 0 && (
              <div className="mt-4 grid grid-cols-3 gap-4">
                {previewUrls.map((url, index) => (
                  <div key={index} className="relative group rounded overflow-hidden border">
                    <img
                      src={url}
                      alt={`preview-${index}`}
                      className="object-cover h-20 w-full rounded group-hover:opacity-75 transition"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-1 right-1 bg-white rounded-full p-1 text-red-500 shadow-md hover:bg-red-100"
                      title="Remove"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>


          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Travel Tips
              <span className="text-gray-400 ml-1">(optional)</span>
            </label>
            <textarea
              value={formData.tips}
              onChange={(e) => setFormData({...formData, tips: e.target.value})}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 h-24"
              placeholder="Share your pro tips..."
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Rating *</label>
            <input
              required
              type="number"
              min={0}
              max={5}
              step={0.1}
              value={formData.rating}
              onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) })}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="0 - 5"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Experience Comment</label>
            <textarea
              value={formData.experience.comment}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  experience: {
                    ...formData.experience,
                    comment: e.target.value,
                  },
                })
              }
              rows={3} // You can change this based on how big you want the textarea
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>


          <div className="flex justify-end gap-3 border-t pt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 bg-gray-100 text-gray-600 hover:bg-gray-50 rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium transition-colors flex items-center gap-2"
            >
              Create Itinerary
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default AddNewItineraryModal;