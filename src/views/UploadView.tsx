import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

interface MockFile {
  name: string;
  icon: string;
  progress: number;
  status: 'uploading' | 'done' | 'pending';
}

const MOCK_FILES: MockFile[] = [
  { name: 'Q3_Financial_Audit_Final.pdf', icon: 'description', progress: 85, status: 'uploading' },
  { name: 'Brand_Guidelines_Assets.zip', icon: 'image',       progress: 42, status: 'uploading' },
  { name: 'Client_Contracts_2023.zip',   icon: 'folder_zip',  progress: 0,  status: 'pending'  },
];

export default function UploadView() {
  const navigate = useNavigate();
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [globalProgress, setGlobalProgress] = useState(65);
  const [files, setFiles] = useState<MockFile[]>(MOCK_FILES);

  const startUpload = useCallback(() => {
    setIsUploading(true);
    // Simulate progress ticking up
    let prog = 65;
    const interval = setInterval(() => {
      prog += 5;
      setGlobalProgress(Math.min(prog, 100));
      setFiles(prev => prev.map((f, i) => {
        if (i === 0) return { ...f, progress: Math.min(f.progress + 3, 100), status: f.progress >= 97 ? 'done' : 'uploading' };
        if (i === 1) return { ...f, progress: Math.min(f.progress + 7, 100), status: f.progress >= 93 ? 'done' : 'uploading' };
        if (i === 2 && prog > 80) return { ...f, progress: Math.min(f.progress + 10, 100), status: f.progress >= 90 ? 'done' : 'uploading' };
        return f;
      }));
      if (prog >= 100) {
        clearInterval(interval);
        setTimeout(() => navigate('/processing'), 600);
      }
    }, 300);
  }, [navigate]);

  return (
    <div className="flex-1 p-lg flex flex-col gap-md h-full relative overflow-hidden">
      {/* Page Header */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="font-headline text-headline-md text-on-surface">Upload Documents</h2>
          <p className="font-body text-body-md text-on-surface-variant mt-1">Select or drag and drop files to secure storage.</p>
        </div>
      </div>

      {/* Dropzone */}
      <div
        onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={e => { e.preventDefault(); setIsDragging(false); startUpload(); }}
        className={`flex-1 bg-surface border-2 border-dashed rounded-xl flex flex-col items-center justify-center gap-4 text-center p-xl transition-colors ${
          isDragging ? 'border-primary bg-primary-fixed/10' : 'border-outline-variant'
        }`}
      >
        <div className="h-16 w-16 rounded-full bg-surface-container flex items-center justify-center text-primary mb-2">
          <span className="material-symbols-outlined text-[32px]">cloud_upload</span>
        </div>
        <div>
          <p className="font-headline text-headline-sm text-on-surface">Drag &amp; drop files here</p>
          <p className="font-body text-body-md text-on-surface-variant mt-1 max-w-sm mx-auto">
            Supported formats: PDF, DOCX, JPG, PNG, ZIP. Maximum file size 500MB.
          </p>
        </div>
        <button
          onClick={startUpload}
          className="mt-4 px-6 py-2 bg-white border border-outline rounded-lg font-body text-label-md text-on-surface hover:bg-surface-container-lowest transition-colors shadow-sm"
        >
          Browse Files
        </button>
      </div>

      {/* Upload Progress Modal Overlay */}
      {isUploading && (
        <div className="absolute inset-0 z-50 bg-inverse-surface/30 backdrop-blur-[2px] flex items-center justify-center p-lg">
          <div className="bg-surface-container-lowest w-full max-w-md rounded-xl shadow-[0_10px_25px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col transform transition-all duration-300 scale-100 opacity-100">
            {/* Modal Header */}
            <div className="p-lg pb-md">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="font-headline text-headline-sm text-on-surface">Uploading files...</h3>
                  <p className="font-body text-label-md text-secondary mt-1">2 of 3 files completing</p>
                </div>
                <button
                  aria-label="Cancel Upload"
                  onClick={() => setIsUploading(false)}
                  className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-surface-container text-on-surface-variant transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>
              {/* Global Progress Bar */}
              <div className="w-full bg-surface-container-high rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-primary h-full rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${globalProgress}%` }}
                />
              </div>
            </div>

            {/* File List */}
            <div className="flex flex-col px-lg pb-lg">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center gap-md h-[56px] border-b border-surface-container-highest last:border-0 group"
                >
                  <div className={`shrink-0 ${file.status === 'pending' ? 'text-outline-variant' : 'text-secondary'}`}>
                    <span className="material-symbols-outlined">{file.icon}</span>
                  </div>
                  <div className={`flex-1 min-w-0 flex flex-col justify-center ${file.status === 'pending' ? 'opacity-60' : ''}`}>
                    <div className="flex justify-between items-baseline mb-1">
                      <span className="font-body text-label-md text-on-surface truncate pr-2">{file.name}</span>
                      <span className="font-body text-label-sm text-on-surface-variant shrink-0">
                        {file.status === 'pending' ? 'Pending' : `${file.progress}%`}
                      </span>
                    </div>
                    <div className="w-full bg-surface-container-high rounded-full h-1 overflow-hidden">
                      <div
                        className="bg-primary h-full rounded-full transition-all duration-300"
                        style={{ width: `${file.progress}%` }}
                      />
                    </div>
                  </div>
                  <button className="opacity-0 group-hover:opacity-100 transition-opacity text-on-surface-variant hover:text-error shrink-0 p-1">
                    <span className="material-symbols-outlined text-[18px]">cancel</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
