import { useQuery } from "@tanstack/react-query";

export default function ActivityLogs() {
  const { data: logs, isLoading } = useQuery({
    queryKey: ['/api/logs'],
    enabled: false // Disable until backend is implemented
  });

  if (isLoading) {
    return <div className="p-6">Loading activity logs...</div>;
  }

  return (
    <div className="p-6">
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Activity Logs</h3>
          <p className="mt-1 text-sm text-gray-600">
            System activity and audit trails
          </p>
        </div>
        <div className="p-6">
          <p className="text-gray-500">
            Activity logs will appear here once the backend is configured.
          </p>
        </div>
      </div>
    </div>
  );
}