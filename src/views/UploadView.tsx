import { useState, useCallback, useRef } from 'react';
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

const QR_CODE_URL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBf6EoH5Ab-oohTKe8vc8w3D6krF-ye0Q3Q7Sz7xL7lkQOKH_iLPS8nvwPJOyJQUTFg-PCl9i9fCZmyYNNpv6mV7RqDKpYPVgTYIudRnToTOuVFVobm64orcReKZ2BAVuEOtukTN8_i8BoQD_0Wospelu4PmPFM7Mrh_sJq3GIHcpceFbViFaZKjoStJoFa-rRjjI9dIrVd6T7408inOL_D6vroXRg6OxSzNjYpPMz1XPRrd7ToKh5xj0bytrW2orZf2aJEsZEdPotX';

export default function UploadView() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [globalProgress, setGlobalProgress] = useState(65);
  const [files, setFiles] = useState<MockFile[]>(MOCK_FILES);

  const startUpload = useCallback(() => {
    setIsUploading(true);
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

  const handleFileSelect = () => {
    startUpload();
  };

  return (
    <div className="flex-1 overflow-y-auto p-xl relative">
      <div className="max-w-container-max mx-auto w-full flex flex-col">
        {/* Page Header */}
        <div className="mb-lg">
          <h2 className="font-headline text-headline-lg text-on-surface mb-xs">Upload Documents</h2>
          <p className="font-body text-body-md text-on-surface-variant">Securely add files to your digital archive.</p>
        </div>

        {/* 2-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg flex-1">
          {/* Dropzone */}
          <div className="lg:col-span-8 flex flex-col">
            <div
              onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={e => { e.preventDefault(); setIsDragging(false); startUpload(); }}
              onClick={() => fileInputRef.current?.click()}
              className={`flex-1 border-2 border-dashed rounded-xl bg-surface-container-lowest flex flex-col items-center justify-center p-xl gap-lg transition-all duration-200 cursor-pointer relative min-h-[400px] ${
                isDragging
                  ? 'border-primary bg-primary-fixed/10 shadow-[0px_10px_25px_rgba(0,0,0,0.04)]'
                  : 'border-outline-variant/60 hover:border-primary hover:bg-surface hover:shadow-[0px_10px_25px_rgba(0,0,0,0.04)]'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".png,.jpg,.jpeg,.pdf,.docx,.zip"
                className="sr-only"
                onChange={handleFileSelect}
              />
              <div className={`w-24 h-24 rounded-full bg-surface-container flex items-center justify-center transition-all duration-300 ${
                isDragging ? 'bg-primary-container scale-105' : 'group-hover:bg-primary-container'
              }`}>
                <span className={`material-symbols-outlined text-[48px] transition-colors ${
                  isDragging ? 'text-on-primary-container' : 'text-primary'
                }`}>
                  cloud_upload
                </span>
              </div>
              <div className="text-center flex flex-col gap-sm">
                <h3 className="font-headline text-headline-sm text-on-surface">Drag &amp; drop files here</h3>
                <p className="font-body text-body-md text-on-surface-variant">or click to browse your computer</p>
              </div>
              <div className="mt-md flex flex-col items-center gap-md">
                <div className="bg-surface px-md py-sm rounded-full border border-outline-variant/30 shadow-[0px_4px_12px_rgba(0,0,0,0.02)]">
                  <span className="font-body text-label-sm text-on-surface-variant uppercase tracking-wider">
                    PNG, JPG, JPEG, PDF, DOCX, ZIP
                  </span>
                </div>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                  className="bg-primary text-on-primary font-body text-label-md px-xl py-sm rounded-lg hover:bg-primary-container transition-colors shadow-[0px_4px_12px_rgba(0,90,113,0.15)]"
                >
                  Select Files
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar: QR + Guidelines */}
          <div className="lg:col-span-4 flex flex-col gap-lg">
            <div className="bg-surface-container-lowest rounded-xl p-lg shadow-[0px_4px_12px_rgba(0,0,0,0.03)] border border-outline-variant/20 flex flex-col items-center text-center">
              <div className="w-full flex items-center justify-between mb-lg">
                <h3 className="font-headline text-headline-sm text-on-surface">Upload via Mobile</h3>
                <span className="material-symbols-outlined text-outline">phone_iphone</span>
              </div>
              <div className="bg-surface-container-lowest p-sm rounded-lg border border-outline-variant/30 mb-md">
                <img
                  src={QR_CODE_URL}
                  alt="QR Code for mobile upload"
                  className="w-32 h-32 object-contain"
                />
              </div>
              <p className="font-body text-body-md text-on-surface-variant mb-md">
                Scan this QR code with your phone&apos;s camera to instantly transfer photos to this secure vault.
              </p>
              <div className="flex items-center gap-xs text-primary font-body text-label-md bg-primary-container/10 px-md py-xs rounded-full">
                <span className="material-symbols-outlined text-[16px]">lock</span>
                End-to-end encrypted
              </div>
            </div>

            <div className="bg-surface-container-lowest rounded-xl p-lg shadow-[0px_4px_12px_rgba(0,0,0,0.03)] border border-outline-variant/20 flex-1">
              <h3 className="font-body text-label-md text-on-surface-variant uppercase tracking-wider mb-md">
                Upload Guidelines
              </h3>
              <ul className="flex flex-col gap-md font-body text-body-md text-on-surface">
                <li className="flex items-start gap-sm">
                  <span className="material-symbols-outlined text-outline text-[20px] mt-xs shrink-0">check_circle</span>
                  <span>Maximum file size is 25MB per image.</span>
                </li>
                <li className="flex items-start gap-sm">
                  <span className="material-symbols-outlined text-outline text-[20px] mt-xs shrink-0">check_circle</span>
                  <span>Images will be automatically organized by date captured.</span>
                </li>
                <li className="flex items-start gap-sm">
                  <span className="material-symbols-outlined text-outline text-[20px] mt-xs shrink-0">info</span>
                  <span>Need to upload PDFs? Use the Document type during manual entry.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Upload Progress Modal Overlay */}
      {isUploading && (
        <div className="absolute inset-0 z-50 bg-inverse-surface/30 backdrop-blur-[2px] flex items-center justify-center p-lg">
          <div className="bg-surface-container-lowest w-full max-w-md rounded-xl shadow-[0_10px_25px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col">
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
              <div className="w-full bg-surface-container-high rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-primary h-full rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${globalProgress}%` }}
                />
              </div>
            </div>

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
