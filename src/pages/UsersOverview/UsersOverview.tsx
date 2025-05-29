import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { usersApi, User, EditUserArgs } from '../../services/usersApi';
import UserForm from './UserForm';
import { useLocalStorage } from '../../utils/useLocalStorage';
import { DeleteConfirmationModal } from '../../components/DeleteConfirmationModal';

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
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-900">Users Overview</h1>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Add User
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('name')}
              >
                Name {sortField === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Email
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('role')}
              >
                Role {sortField === 'role' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedUsers.map(user => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link to={`/users/${user.id}`} className="text-blue-600 hover:text-blue-900">
                    {user.name}
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => setEditingUser(user)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setDeletingUser(user)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
          onClose={() => setDeletingUser(null)}
          isDeleting={deleteMutation.isPending}
        />
      )}
    </div>
  );
};

export default UsersOverview;
