'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { FiTrash2, FiUploadCloud } from 'react-icons/fi';

// export interface ExploredBook {
//   title: string;
//   description: string,
//   tags: string[],
//   imageUrl: string,
//   visibility: string,
//   status: string,
// }

interface BookDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (formData: FormData) => void
}

export const ExploredBookModal = ({ isOpen, onClose, onSave }: BookDetailsModalProps) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [tags, setTags] = useState("");
  const [visibility, setVisibility] = useState<'Public' | 'Private'>('Public')
  const [status, setStatus] = useState<'Planning' | 'Explored'>('Planning')
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setImage(file)
    setPreviewUrl(URL.createObjectURL(file))
  }

  const handleRemoveImage = () => {
    setImage(null)
    setPreviewUrl(null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('title', title)
    formData.append('description', description)
    formData.append('visibility', visibility)
    formData.append('status', status)

    // Convert tags input to array
    const tagsArray = tags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);
    formData.append('tags', JSON.stringify(tagsArray));
    
    if (image) formData.append('image', image);

    onSave(formData)
    onClose()
  }


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
    
    {/* <div className="fixed inset-0 bg-opacity/50 flex items-center justify-center p-4"> */}
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-4">Edit Book Details</h2>
        
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
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded-lg h-32"
            />
          </div>

            <div>
              <label className="block text-sm font-medium mb-1">Tags (comma separated)</label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full p-2 border rounded-lg"
              />
            </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Upload Images</label>

            <div className="relative border border-dashed border-gray-400 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 transition">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <div className="flex flex-col items-center text-gray-600">
                <FiUploadCloud size={32} />
                <p className="mt-2 text-sm">Click or drag to upload</p>
              </div>
            </div>

              {previewUrl && (
                <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                    <div className="relative group rounded overflow-hidden border">
                      <img
                        src={previewUrl}
                        alt={`preview-${previewUrl}`}
                        className="object-cover h-20 w-full rounded group-hover:opacity-75 transition"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage()}
                        className="absolute top-1 right-1 bg-white rounded-full p-1 text-red-500 shadow-md hover:bg-red-100"
                        title="Remove"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                </div>
              )}

            </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Visibility</label>
              <select
                value={visibility}
                onChange={(e) => setVisibility(e.target.value as 'Public' | 'Private')}
                className="w-full p-2 border rounded-lg"
              >
                <option value="Public">Public</option>
                <option value="Private">Private</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as 'Planning' | 'Explored')}
                className="w-full p-2 border rounded-lg"
              >
                <option value="Planning">Planning</option>
                <option value="Explored">Explored</option>
              </select>
            </div>
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
      </div>
    {/* </div> */}
    </motion.div>
    </motion.div>
  );
};