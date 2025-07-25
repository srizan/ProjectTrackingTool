import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProject, updateProject, deleteProject } from '../services/api';

interface Project {
  id: string;
  description: string;
  name: string;
  owner: string;
  status: string;
  startDate: string;
  endDate: string;
}

const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [orgProject, setOrgProject] = useState<Project | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState<Project>({
    id: '',
    name: '',
    description: '',
    owner: '',
    status: '',
    startDate: '',
    endDate: '',
  });

  useEffect(() => {
    const fetchProject = async () => {
      if (id) {
        const data = await getProject(id);
       
        
        const formattedData = {
          ...data,
          startDate: data.startDate ? new Date(data.startDate).toISOString().split('T')[0] : '',
          endDate: data.endDate ? new Date(data.endDate).toISOString().split('T')[0] : '',
        };

        setOrgProject( {
          ...data,
          startDate: data.startDate ? new Date(data.startDate).toISOString().split('T')[0] : '',
          endDate: data.endDate ? new Date(data.endDate).toISOString().split('T')[0] : '',
        });

        setProject(formattedData);
        setFormData(formattedData);
      }
    };
    fetchProject();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const startDate = new Date(formData.startDate);
    const endDate = new Date(formData.endDate);   

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (project && formData) {

        const updatedData = {
        ...formData,
        startDate: formData.startDate ? new Date(formData.startDate).toISOString() : '',
        endDate: formData.endDate ? new Date(formData.endDate).toISOString() : '',
      };

      const response = await updateProject(project.id, updatedData);
        if ((response as unknown).errorText) {
            setError(response?.errorText);
           return;
        }
      setIsEditing(false);
      setError("");
      setProject(updatedData); // Update the displayed project
      setOrgProject({
        ...formData,
        startDate: formData.startDate ? new Date(formData.startDate).toISOString() : '',
        endDate: formData.endDate ? new Date(formData.endDate).toISOString() : '',
      });
    }
  };

  const handleDelete = async () => {
    if (project && window.confirm('Are you sure you want to delete this project?')) {
      try {
      await deleteProject(project.id);
      navigate('/');
    } catch (error) {
        console.error('Failed to delete project:', error);
        alert('Failed to delete project. Please try again later.');
    }
    }
  };

  if (!project) return <div className="container mx-auto p-4">Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h3 className="text-2xl font-bold mb-4">Project Details</h3>
      {isEditing ? (
        <div className="space-y-4">          
          <input
            className="border p-2 w-full"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Project Name"
          />
          <input
            className="border p-2 w-full"
            name="owner"
            value={formData.owner}
            onChange={handleInputChange}
            placeholder="Owner"
          />
          <select
            className="border p-2 w-full"
            name="status"
            value={formData.status}
            onChange={handleInputChange}
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
           
          />
          <input
            className="border p-2 w-full"
            name="endDate"
            type="date"
            
            value={formData.endDate}
            onChange={handleInputChange}
            
          />
          <div className="space-x-2">
            <button
              className="bg-blue-500 text-blue p-2"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              className="bg-gray-500 text-blue p-2"
              onClick={() => {
                    setError("");
                    setFormData(orgProject!);
                    return setIsEditing(false);
              }}
            >
              Cancel
            </button>
          </div>
          <div>                
                {error && <p className="text-red-500">{error}</p>}
            </div>
        </div>
      ) : (
        <div className="space-y-4">
            <div className=" rounded-md text-left">
                <p ><strong>Name:</strong> {project.name}</p>
                <p ><strong>Description:</strong> {project.description}</p>
                <p ><strong>Owner:</strong> {project.owner}</p>
                <p ><strong>Status:</strong> {project.status}</p>
                <p ><strong>Start Date:</strong> {new Date(project.startDate).toLocaleDateString()}</p>
                <p ><strong>End Date:</strong> {new Date(project.endDate).toLocaleDateString()}</p>
            </div>
          <div className="space-x-2">
            <button
              className="bg-blue-500 text-blue p-2"
              onClick={() => {
                setError("");
                  return setIsEditing(true);
              }}
            >
              Edit
            </button>
            <button
              className="bg-red-500 text-red p-2"
              onClick={handleDelete}
            >
              Delete
            </button>
            <button
              className="bg-gray-500 text-blue p-2"
              onClick={() => navigate('/')}
            >
              Back
            </button>
           
          </div>
           
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;