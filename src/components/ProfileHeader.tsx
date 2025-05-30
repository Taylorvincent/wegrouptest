import { Avatar } from './Avatar';
import { Badge } from './Badge';

interface ProfileHeaderProps {
  name: string;
  role: string;
  profilePicture?: string | null;
}

export const ProfileHeader = ({ name, role, profilePicture }: ProfileHeaderProps) => {
  return (
    <div className="flex flex-col items-center -mt-16 mb-6">
      <div className="ring-4 ring-white rounded-full shadow-lg">
        <Avatar src={profilePicture} alt={name} size="xl" />
      </div>
      <h1 className="mt-4 text-2xl font-bold text-gray-900">{name}</h1>
      <Badge variant="primary" className="mt-2">
        {role}
      </Badge>
    </div>
  );
};
