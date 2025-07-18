import { useRef, useState } from 'react';
import './App.css';
import QRCode from 'react-qr-code';
import { toPng } from 'html-to-image';

function App() {
  const [link, setLink] = useState('');
  const [error, setError] = useState('');
  const [valid, setValid] = useState(false);
  const qrRef = useRef(null);

  // Validate URL
  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  };

  //  Download QR as PNG
  const handleDownload = () => {
    if (qrRef.current === null) return;
    toPng(qrRef.current).then((dataUrl) => {
      const link = document.createElement('a');
      link.download = 'qr-code.png';
      link.href = dataUrl;
      link.click();
    });
  };

  //  Handle Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValidUrl(link)) {
      setValid(true);
      setError('');
    } else {
      setValid(false);
      setError('❌ Please enter a valid URL (e.g., https://...)');
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2">
          <div className="text-gray-600 mt-8 gap-3 flex flex-col px-12">
            <p>Step 1 : Type or paste your link in the box below</p>
            <p>Step 2 : Click “Generate” to see your QR Code</p>
            <p>Step 3 : Download or share the QR to use it anywhere</p>
          </div>

          <div>
            <form
             
              className="mt-12 flex flex-col lg:flex-row gap-4 bg-[#c6eefc] mx-8 px-8 py-12 rounded-2xl"
            >
              <input
                value={link}
                onChange={(e) => {
                  setLink(e.target.value);
                  if (error) setError('');
                }}
                className="bg-[#c6eefc] outline-none pl-6 pr-16 py-2 placeholder:text-[#29969c] text-[#29969c] rounded-full border border-[#8fcee4]"
                placeholder="Paste your link here ..."
                autoFocus
                type="text"
              />
              <button
                onClick={handleSubmit}
                className="bg-green-600 px-4 py-2 rounded-full text-center text-white font-semibold cursor-pointer"
              >
                Generate
              </button>
            </form>

            {/* 🔴 Show error if invalid link */}
            {error && (
              <p className="text-red-500 text-sm mt-2 mx-12">{error}</p>
            )}
          </div>
        </div>

        <div className="flex w-full">
          <div className="flex flex-col justify-center items-center bg-[#f1fbff] w-full my-8 py-8 mx-16 rounded-xl">
            {/*  Show default QR if not valid */}
            {!valid && (
              <div className="flex flex-col justify-center items-center gap-2">
                <img src="/frame.png" className="w-60" alt="QR" />
                <h1>QR : Mithlesh Portfolio</h1>
                <a
                  href="/frame.png"
                  download="Mithlesh-QR"
                  className="bg-blue-600 px-4 py-2 rounded-full text-white cursor-pointer flex items-center gap-2"
                >
                  Download QR <i className="ri-download-2-line"></i>
                </a>
              </div>
            )}

            {/*  Show generated QR if valid link */}
            {valid &&  (
              <div className="flex flex-col justify-center items-center gap-4">
                <div id="qr-code" ref={qrRef} className="bg-white p-4 rounded-lg">
                  <QRCode value={link} size={200} />
                </div>
                <h1 className="text-lg font-semibold text-blue-600 mt-2">Your QR Code</h1>
                <button
                  onClick={handleDownload}
                  className="bg-blue-600 px-4 py-2 rounded-full text-white cursor-pointer flex items-center gap-2"
                >
                  Download QR <i className="ri-download-2-line"></i>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
