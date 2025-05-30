import { useState } from 'react';
import { User, EditUserArgs } from '../../../services/usersApi';
import { Modal } from '../../../components/Modal';
import { Button } from '../../../components/Button';
import { FormInput } from '../../../components/FormInput';
import { Select } from '../../../components/Select';

interface UserFormProps {
  user: User | null;
  onSubmit: (data: EditUserArgs) => void;
  onClose: () => void;
  isSubmitting?: boolean;
}

const roleOptions = [
  { value: 'Admin', label: 'Admin' },
  { value: 'User', label: 'User' },
];

const UserForm = ({ user, onSubmit, onClose, isSubmitting = false }: UserFormProps) => {
  const [formData, setFormData] = useState<EditUserArgs>(
    user ?? { name: '', email: '', role: 'User' }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Modal title={user ? 'Edit User' : 'Create User'} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <FormInput
          id="name"
          label="Name"
          type="text"
          value={formData.name}
          onChange={e => setFormData({ ...formData, name: e.target.value })}
          required
          disabled={isSubmitting}
        />
        <FormInput
          id="email"
          label="Email"
          type="email"
          value={formData.email}
          onChange={e => setFormData({ ...formData, email: e.target.value })}
          required
          disabled={isSubmitting}
        />
        <Select
          id="role"
          label="Role"
          value={formData.role}
          onChange={e => setFormData({ ...formData, role: e.target.value })}
          options={roleOptions}
          required
          disabled={isSubmitting}
        />
        <div className="mt-5 flex justify-end gap-2">
          <Button type="button" variant="secondary" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" isLoading={isSubmitting} disabled={isSubmitting}>
            {user ? 'Save Changes' : 'Create User'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default UserForm;
