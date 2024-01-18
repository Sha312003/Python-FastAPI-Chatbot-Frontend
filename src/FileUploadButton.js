import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Modal from 'react-modal';
import upload_icon from './upload_icon.png'
import './FileUploadButton.css'

const FileUploadButton = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    const uploadedFile = acceptedFiles[0];
    setFile(uploadedFile);
    setFileName(uploadedFile.name);
  }, []);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const uploadFile = async (event) => {
    event.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch('https://chatbotify-y83w.onrender.com/upload_csv/', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          console.log('File uploaded successfully');
          closeModal(); // Close the modal after successful upload
        } else {
          console.error('Error uploading file:', response.statusText);
        }
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    } else {
      console.warn('No file selected');
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className='dropzoneContainerStyle'>
      <button onClick={openModal} className='uploadButton'><img src={upload_icon} alt="Upload Icon" className='upload-icon' /></button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="File Upload Modal"
        style={modalStyle}
        ariaHideApp={false}
      >
        <div {...getRootProps()} className='dropzoneStyle'>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p className='para'>Drop the file here ...</p>
          ) : (
            <p className='para'>Drag 'n' drop a file here, or click to select a file</p>
          )}
        </div>
        {fileName && <p>File Name: {fileName}</p>}
        <div className='buttons'>
        <button onClick={uploadFile} className='submit-cancel'>Submit</button>
        <button onClick={closeModal} className='submit-cancel'>Cancel</button>
        </div>
      </Modal>
    </div>
  );
};


const modalStyle = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    width: '500px',
    height: '550px',
    margin: 'auto',
    padding: '20px',
    borderRadius: '4px',
  },
};

export default FileUploadButton;
