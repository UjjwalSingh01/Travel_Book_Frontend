'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { FiTrash2, FiUploadCloud } from 'react-icons/fi'

// export interface ExploredPage {
//   title: string;
//   description: string;
//   tips?: string;
//   images: File[];  // or FileList
// }

interface PageDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (formData: FormData) => void
}

export const ExploredPageModal = ({ isOpen, onClose, onSave }: PageDetailsModalProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tips, setTips] = useState("");
  const [images, setImages] = useState<FileList | null>(null);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    setImages(files);

    const previews = Array.from(files).map((file) => URL.createObjectURL(file));
    setPreviewUrls(previews);
  };

  const handleRemoveImage = (index: number) => {
    const updatedPreviews = previewUrls.filter((_, i) => i !== index);
    const updatedFiles = Array.from(images || []).filter((_, i) => i !== index);
    setPreviewUrls(updatedPreviews);
  
    const newFileList = new DataTransfer();
    updatedFiles.forEach(file => newFileList.items.add(file));
    setImages(newFileList.files);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('tips', tips);
    if (images) {
      Array.from(images).forEach((file) => {
        formData.append('images', file);
      });
    }
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
    {/* <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl"> */}
        <h2 className="text-2xl font-bold mb-4">Edit Page Details</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Upload Images</label>

            {/* Custom File Input */}
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
              <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
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

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded-lg h-32"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Travel Tips</label>
            <textarea
              value={tips}
              onChange={(e) => setTips(e.target.value)}
              className="w-full p-2 border rounded-lg h-32"
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      {/* </div>
    </div> */}
    </motion.div>
    </motion.div>
  );
};