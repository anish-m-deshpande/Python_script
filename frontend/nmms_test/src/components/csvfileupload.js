import React, { useState } from 'react';

function FileUpload() {
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (file) {
            const formData = new FormData();
            formData.append('csvFile', file);
            fetch('http://localhost:3007/file/upload', {
                method: 'POST',
                body: formData,
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                // Handle response from backend
            })
            .catch(error => {
                console.error('Error:', error);
                // Handle error
            });
        }
    };

    return (
        <div className="flex justify-center mt-10">
            <form onSubmit={handleSubmit} className="w-96 border rounded-lg p-6">
                <h2 className="text-2xl mb-4">Upload CSV File</h2>
                <input
                    type="file"
                    onChange={handleFileChange}
                    className="border rounded-lg p-2 w-full mb-4"
                    accept='.csv'
                />
                <button
                    type="submit"
                    className={`bg-blue-500 text-white font-bold py-2 px-4 rounded ${file ? '' : 'opacity-50 cursor-not-allowed'}`}
                    disabled={!file}
                >
                    Upload
                </button>
            </form>
        </div>
    );
}

export default FileUpload;
