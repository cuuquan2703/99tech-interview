interface HeaderProps {
  currentPage: 'swap' | 'rates' | 'history';
  onPageChange: (page: 'swap' | 'rates' | 'history') => void;
}

function Header({ currentPage, onPageChange }: HeaderProps) {
  return (
    <div className="bg-transparent backdrop-blur-sm w-full">
      <div className="max-w-7xl mx-auto ">
        <div className="flex gap-32 py-4 items-center justify-center ">
          <div
            onClick={() => onPageChange('swap')}
            className={`cursor-pointer text-xl font-medium transition-colors ${
              currentPage === 'swap' 
                ? 'text-green-400' 
                : 'text-gray-400 hover:text-green-400'
            }`}
          >
            Swap
          </div>
          <div 
            onClick={() => onPageChange('rates')}
            className={`cursor-pointer text-xl font-medium transition-colors ${
              currentPage === 'rates' 
                ? 'text-green-400' 
                : 'text-gray-400 hover:text-green-400'
            }`}
          >
            Rates
          </div>
          <div 
            onClick={() => onPageChange('history')}
            className={`cursor-pointer text-xl font-medium transition-colors ${
              currentPage === 'history' 
                ? 'text-green-400' 
                : 'text-gray-400 hover:text-green-400'
            }`}
          >
            History
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
