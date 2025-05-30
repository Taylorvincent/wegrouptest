import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { usersApi, User, EditUserArgs } from '../../../services/usersApi';
import UserForm from './UserForm';
import { useLocalStorage } from '../../../utils/useLocalStorage';
import { DeleteConfirmationModal } from '../../../components/DeleteConfirmationModal';
import { Button } from '../../../components/Button';
import { Card, CardHeader, CardBody } from '../../../components/Card';
import { Badge } from '../../../components/Badge';
import { TableHeader } from '../../../components/TableHeader';
import { Icons } from '../../../components/Icons';

type SortField = 'name' | 'role';
type SortOrder = 'asc' | 'desc';

const queryKey = ['users'];

const UsersOverview = () => {
  const queryClient = useQueryClient();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deletingUser, setDeletingUser] = useState<User | null>(null);
  const [sortField, setSortField] = useLocalStorage<SortField>('sortField', 'name');
  const [sortOrder, setSortOrder] = useLocalStorage<SortOrder>('sortOrder', 'asc');

  const { data: users = [], isLoading } = useQuery({
    queryKey,
    queryFn: usersApi.getAll,
  });

  const createMutation = useMutation({
    mutationFn: (newUser: EditUserArgs) => usersApi.create(newUser),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      setIsCreateModalOpen(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, user }: { id: number; user: EditUserArgs }) => usersApi.update(id, user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      setEditingUser(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => usersApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      setDeletingUser(null);
    },
  });

  /**
   * Toggles the sort order between 'asc' and 'desc' if the same field is selected,
   * otherwise sets the sort order to 'asc' for a new field.
   */
  const handleSort = (field: SortField) => {
    const newOrder = field === sortField && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(newOrder);
  };

  const sortedUsers = [...users].sort((a, b) => {
    const modifier = sortOrder === 'asc' ? 1 : -1;
    return a[sortField].localeCompare(b[sortField]) * modifier;
  });

  if (isLoading) {
    return (
      <div className="min-h-[200px] flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Users Overview</h1>
          <Button variant="primary" onClick={() => setIsCreateModalOpen(true)}>
            <span className="flex items-center gap-2">
              <Icons.Plus className="h-4 w-4" />
              Add User
            </span>
          </Button>
        </div>
      </CardHeader>

      <CardBody>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-50/50">
                <TableHeader
                  onClick={() => handleSort('name')}
                  sortActive={sortField === 'name'}
                  sortDirection={sortOrder}
                >
                  Name
                </TableHeader>
                <TableHeader>Email</TableHeader>
                <TableHeader
                  onClick={() => handleSort('role')}
                  sortActive={sortField === 'role'}
                  sortDirection={sortOrder}
                >
                  Role
                </TableHeader>
                <TableHeader>Actions</TableHeader>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sortedUsers.map(user => (
                <tr key={user.id} className="hover:bg-gray-50/50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link
                      to={`/users/${user.id}`}
                      className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
                    >
                      {user.name}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant="primary">{user.role}</Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => setEditingUser(user)}
                        className="text-indigo-600 hover:text-indigo-900 transition-colors duration-200 flex items-center gap-1"
                      >
                        <Icons.Edit className="h-4 w-4" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => setDeletingUser(user)}
                        className="text-red-600 hover:text-red-900 transition-colors duration-200 flex items-center gap-1"
                      >
                        <Icons.Delete className="h-4 w-4" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardBody>

      {(isCreateModalOpen || editingUser) && (
        <UserForm
          /** Key to ensure resetting state when rendering */
          key={editingUser?.id}
          user={editingUser}
          onSubmit={userData => {
            if (editingUser) {
              updateMutation.mutate({ id: editingUser.id, user: userData });
            } else {
              createMutation.mutate(userData);
            }
          }}
          onClose={() => {
            setIsCreateModalOpen(false);
            setEditingUser(null);
          }}
          isSubmitting={editingUser ? updateMutation.isPending : createMutation.isPending}
        />
      )}

      {deletingUser && (
        <DeleteConfirmationModal
          title="Delete User"
          message={`Are you sure you want to delete ${deletingUser.name}? This action cannot be undone.`}
          onConfirm={() => deleteMutation.mutate(deletingUser.id)}
          onClose={() => {
            setDeletingUser(null);
            deleteMutation.reset();
          }}
          isDeleting={deleteMutation.isPending}
          error={deleteMutation.error}
        />
      )}
    </Card>
  );
};

export default UsersOverview;
