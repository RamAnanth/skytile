'use client';

interface GenerateButtonProps {
  onClick: () => void;
  isLoading: boolean;
  disabled?: boolean;
}

export default function GenerateButton({ onClick, isLoading, disabled }: GenerateButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`
        w-full py-3 px-6 rounded-xl font-medium text-white transition-all
        ${disabled || isLoading
          ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
          : 'bg-cyan-600 hover:bg-cyan-500 active:bg-cyan-700'
        }
      `}
    >
      {isLoading ? (
        <span className="flex items-center justify-center gap-2">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          Generating...
        </span>
      ) : (
        <span className="flex items-center justify-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
            <path fillRule="evenodd" d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 0 1 .75.75c0 5.056-2.383 9.555-6.084 12.436-3.118 2.424-4.845 2.246-5.345 2.194a3.75 3.75 0 1 1-3.29-3.29c.052.5.23 2.227-2.194 5.345C2.718 22.117 1.5 22.5 1.5 22.5a.75.75 0 0 1-.75-.75c0-5.055 2.383-9.555 6.084-12.436 3.118-2.424 4.845-2.246 5.345-2.194a3.75 3.75 0 0 1 3.29 3.29c-.052-.5-.23-2.227 2.194-5.345A15.245 15.245 0 0 0 9.315 7.584Z" clipRule="evenodd" />
          </svg>
          Generate Scene
        </span>
      )}
    </button>
  );
}
