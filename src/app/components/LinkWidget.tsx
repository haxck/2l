export default function Link() {
  return (
    <a href="http://echo.haxck.com" target="_blank" rel="noopener noreferrer">
      <div className="active:scale-90 words dark:bg-slate-800  bg-slate-100 opacity-90 rounded-xl mt-1 border border-gray-600/10 shadow-xl shadow-gray-400/10 transition-all duration-300 dark:shadow-black/0  bg-blue-100/20 py-12 px-5 relative">
        <p className="text-lg font-semibold dark:text-slate-400">Echo</p>
        <p className="dark:text-slate-400">科技时代的书信</p>
        <p className="text-sm text-gray-500">echo.haxck.com</p>
        <div className="inline-block rounded-lg p-1 pointer-events-auto absolute top-3 right-3 bg-slate-400 dark:bg-slate-600">
          <svg
            width="20"
            height="20"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.25403 1.46875C2.83987 1.46875 2.5041 1.80446 2.50403 2.21862C2.50396 2.63289 2.83977 2.96875 3.25403 2.96875H5.94325L1.47358 7.43842C1.18068 7.73131 1.18068 8.20619 1.47358 8.49908C1.76647 8.79197 2.24134 8.79197 2.53424 8.49908L7.00299 4.03033L7.00314 6.71982C7.00316 7.13345 7.34024 7.46875 7.75387 7.46875C8.16752 7.46875 8.50108 7.13342 8.50108 6.71978V2.21875C8.50108 1.80454 8.16529 1.46875 7.75108 1.46875H3.25403Z"
              fill="white"
            ></path>
          </svg>
        </div>
      </div>
    </a>
  )
} 