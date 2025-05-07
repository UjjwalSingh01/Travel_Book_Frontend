// AddToBookModal.tsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import Alert from '@/common_components/Alert';
import Loading from '@/common_components/Loading';


interface AddToBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  itineraryId: string | null;
}

interface Book {
  id: string;
  title: string;
  status: 'Planning' | 'Explored';
  pages: Page[];
}

interface Page {
  id: string;
  title: string;
  selected?: boolean;
}

// Dummy Data
const dummyBooks: Book[] = [
  {
    id: 'b1',
    title: 'European Adventure Plan',
    status: 'Planning',
    pages: [
      { id: 'p1', title: 'Paris Itinerary' },
      { id: 'p2', title: 'Rome Plans' }
    ]
  },
  {
    id: 'b2',
    title: 'Asia Exploration',
    status: 'Planning',
    pages: [
      { id: 'p3', title: 'Tokyo Guide' },
      { id: 'p4', title: 'Bali Schedule' }
    ]
  }
];

export const AddToBookModal = ({ isOpen, onClose, itineraryId }: AddToBookModalProps) => {
  const [books, setBooks] = useState<Book[]>(dummyBooks);
  const [newBookTitle, setNewBookTitle] = useState('');
  const [newPageTitle, setNewPageTitle] = useState('');
  const [selectedBook, setSelectedBook] = useState<string>('');
  const [selectedPage, setSelectedPage] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertType, setAlertType] = useState<'success' | 'error' | 'info' | 'warning'>('info');
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const fetchData = async() => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/book/getBookWithPages`, {
          withCredentials: true,
        });

        if(response.data.success){
          setBooks(response.data.data);
          setMessage(response.data.message);
          setAlertType('success');
          setShowAlert(true);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Sign-Up error:", error.response?.data);
          setMessage(error.response?.data?.message);
        } else {
          console.error("Unexpected error:", error);
          setMessage("An unexpected error occurred.");
        }
        setAlertType("error");
        setShowAlert(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [isOpen]);

  const handlePageSelect = (pageId: string) => {
    setSelectedPage(pageId)
  };

  const handleCreateBook = async () => {
    if (!newBookTitle.trim()) {
      setMessage('Book title is required');
      setAlertType('warning');
      setShowAlert(true);
      return;
    }

    try {
      setIsLoading(true);

      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/book/createBook`,
        { title: newBookTitle },
        { withCredentials: true }
      );
      
      if(response.data.success){
        setBooks(prev => [...prev, response.data.data]);
        setNewBookTitle('');
        setMessage(response.data.message);
        setAlertType('success');
        setShowAlert(true);
      }

    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Sign-Up error:", error.response?.data);
        setMessage(error.response?.data?.message);
      } else {
        console.error("Unexpected error:", error);
        setMessage("An unexpected error occurred.");
      }
      setAlertType("error");
      setShowAlert(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreatePage = async () => {
    if (!selectedBook) {
      setMessage('Please select a book first');
      setAlertType('warning');
      setShowAlert(true);
      return;
    }

    if (!newPageTitle.trim()) {
      setMessage('Page title is required');
      setAlertType('warning');
      setShowAlert(true);
      return;
    }

    try {
      setIsLoading(true);
      
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/book/${selectedBook}/addPageToBook`, 
        { title: newPageTitle },
        { withCredentials: true }
      )

      if(response.data.success){
        setBooks(prev => prev.map(book => 
          book.id === selectedBook 
            ? { ...book, pages: [...book.pages, response.data.data] } 
            : book
        ));
        setNewPageTitle('');
        setMessage('Page created successfully');
        setAlertType('success');
        setShowAlert(true);
      }
      
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Sign-Up error:", error.response?.data);
        setMessage(error.response?.data?.message);
      } else {
        console.error("Unexpected error:", error);
        setMessage("An unexpected error occurred.");
      }
      setAlertType("error");
      setShowAlert(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!itineraryId || !selectedPage) {
      setMessage('Please select a page to add the itinerary');
      setAlertType('warning');
      setShowAlert(true);
      return;
    }


    try {
      setIsLoading(true);

      // Simulated API calls
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/page/${selectedPage}/addItinerariesToPage`, 
        { itineraryId }
      )

      if(response.data.succes){
        setMessage('Itinerary added to selected page');
        setAlertType('success');
        setShowAlert(true);
        setTimeout(onClose, 2000);
      }

    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Sign-Up error:", error.response?.data);
        setMessage(error.response?.data?.message);
      } else {
        console.error("Unexpected error:", error);
        setMessage("An unexpected error occurred.");
      }
      setAlertType("error");
      setShowAlert(true);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-xl p-6 w-full max-w-xl"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Add to Travel Book</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {showAlert && (
          <Alert
            message={message}
            type={alertType}
            onClose={() => setShowAlert(false)}
          />
        )}

        {isLoading ? (
          <Loading />
        ) : (
          <div className="space-y-6">
            {/* Existing Books & Pages */}
            <div className="max-h-96 overflow-y-auto space-y-4">
              {books.map(book => (
                <div key={book.id} className="border rounded-lg p-4">
                  <h3 className="font-semibold text-lg mb-2">{book.title}</h3>
                  <div className="space-y-2">
                    {book.pages.map(page => (
                      <label
                        key={page.id}
                        className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={page.selected || false}
                          onChange={() => handlePageSelect(page.id)}
                          className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                        />
                        <span className="flex-1">{page.title}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Create New Section */}
            <div className="space-y-4">
              <div className="border-t pt-4">
                <h3 className="font-semibold mb-3">Create New</h3>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="New Book Title"
                    value={newBookTitle}
                    onChange={(e) => setNewBookTitle(e.target.value)}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={handleCreateBook}
                    className="w-full py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"
                  >
                    + Create New Book
                  </button>

                  <select
                    value={selectedBook}
                    onChange={(e) => setSelectedBook(e.target.value)}
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="">Select Book for New Page</option>
                    {books.map(book => (
                      <option key={book.id} value={book.id}>{book.title}</option>
                    ))}
                  </select>

                  <input
                    type="text"
                    placeholder="New Page Title"
                    value={newPageTitle}
                    onChange={(e) => setNewPageTitle(e.target.value)}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={handleCreatePage}
                    className="w-full py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"
                  >
                    + Add Page to Selected Book
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={handleSave}
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Save Changes
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};