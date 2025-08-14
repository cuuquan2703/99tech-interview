interface HistoryStatusProps {
  title: string;
  content: string;  
}

function HistoryStatus({ title, content }: HistoryStatusProps) {
  return (
    <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
      <div className="text-gray-400 text-sm font-medium">{title}</div>
      <div className="text-2xl font-bold text-white">{content}</div>
    </div>
  )
}

export default HistoryStatus