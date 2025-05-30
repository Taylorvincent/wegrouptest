import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { usersApi } from '../../services/usersApi';
import { Avatar } from '../../components/Avatar';
import { Badge } from '../../components/Badge';
import { Icons } from '../../components/Icons';
import { Card, CardBody } from '../../components/Card';

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
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center text-red-600">
          Error loading user details. Please try again.
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-gray-500">User not found.</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link
          to="/"
          className="text-gray-600 hover:text-gray-900 flex items-center gap-2 transition-colors duration-200"
        >
          <Icons.ArrowLeft className="w-5 h-5" />
          Back to Overview
        </Link>
      </div>

      <Card>
        {/* Gradient Background Header */}
        <div className="h-32 bg-gradient-to-r from-blue-500 to-blue-600 rounded-t-2xl" />

        <CardBody className="px-6 pb-6">
          {/* Avatar Section */}
          <div className="flex flex-col items-center -mt-16 mb-6">
            <div className="ring-4 ring-white rounded-full shadow-lg">
              <Avatar src={user.profilePicture} alt={user.name} size="xl" />
            </div>
            <h1 className="mt-4 text-2xl font-bold text-gray-900">{user.name}</h1>
            <Badge variant="primary" className="mt-2">
              {user.role}
            </Badge>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Email Section */}
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <Icons.Email className="w-5 h-5 text-gray-500" />
                <span className="text-sm font-medium text-gray-600">Email</span>
              </div>
              <p className="text-gray-900">{user.email}</p>
            </div>

            {/* ID Section */}
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <Icons.IdBadge className="w-5 h-5 text-gray-500" />
                <span className="text-sm font-medium text-gray-600">User ID</span>
              </div>
              <p className="text-gray-900">#{user.id}</p>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default UserDetail;
