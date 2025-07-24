import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProject } from '../services/api';

interface Project {
  name: string;
  description: string;
  owner: string;
  status: string;
  startDate: string;
  endDate: string;
}

const AddProject: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Project>({
    name: '',
    description: '',
    owner: '',
    status: 'Planned',
    startDate: '',
    endDate: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createProject(formData);
    navigate('/');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add New Project</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="border p-2 w-full"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Project Name"
          required
        />
         <input
          className="border p-2 w-full"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Project Description"
          required
        />
        <input
          className="border p-2 w-full"
          name="owner"
          value={formData.owner}
          onChange={handleInputChange}
          placeholder="Owner"
          required
        />
        <select
          className="border p-2 w-full"
          name="status"
          value={formData.status}
          onChange={handleInputChange}
          required
        >
          <option value="Planned">Planned</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <input
          className="border p-2 w-full"
          name="startDate"
          type="date"
          value={formData.startDate}
          onChange={handleInputChange}
          required
        />
        <input
          className="border p-2 w-full"
          name="endDate"
          type="date"
          value={formData.endDate}
          onChange={handleInputChange}
          required
        />
        <div className="space-x-2">
          <button
            type="submit"
            className="bg-green-500 text-blue p-2"
          >
            Create Project
          </button>
          <button
            type="button"
            className="bg-gray-500 text-blue p-2"
            onClick={() => navigate('/')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProject;