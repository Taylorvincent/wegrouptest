import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { usersApi } from '../../services/usersApi';
import { Icons } from '../../components/Icons';
import { Card, CardBody } from '../../components/Card';
import { InfoCard } from '../../components/InfoCard';
import { ProfileHeader } from '../../components/ProfileHeader';
import { StatusMessage } from '../../components/StatusMessage';

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
    return <StatusMessage>Loading...</StatusMessage>;
  }

  if (error) {
    return (
      <StatusMessage variant="error">Error loading user details. Please try again.</StatusMessage>
    );
  }

  if (!user) {
    return <StatusMessage>User not found.</StatusMessage>;
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
          <ProfileHeader name={user.name} role={user.role} profilePicture={user.profilePicture} />

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InfoCard icon={<Icons.Email className="w-5 h-5" />} label="Email">
              {user.email}
            </InfoCard>

            <InfoCard icon={<Icons.IdBadge className="w-5 h-5" />} label="User ID">
              #{user.id}
            </InfoCard>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default UserDetail;
