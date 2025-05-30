import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { usersApi } from '../../services/usersApi';
import { Avatar } from '../../components/Avatar';

const UserDetail = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['user', id],
    queryFn: () => usersApi.getById(Number(id)),
    enabled: !!id,
  });

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-red-600">Error loading user details. Please try again.</div>
    );
  }

  if (!user) {
    return <div className="text-center">User not found.</div>;
  }

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-900">User Details</h1>
          <Link to="/" className="text-blue-600 hover:text-blue-900">
            Back to Overview
          </Link>
        </div>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          <Avatar src={user.profilePicture} alt={user.name} size="xl" />
          <dl className="flex-1 grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Name</dt>
              <dd className="mt-1 text-sm text-gray-900">{user.name}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Email</dt>
              <dd className="mt-1 text-sm text-gray-900">{user.email}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Role</dt>
              <dd className="mt-1 text-sm text-gray-900">{user.role}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">User ID</dt>
              <dd className="mt-1 text-sm text-gray-900">#{user.id}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
