import { useState, useEffect } from 'react';
import {getProjects} from '../services/api';

const ProjectList = () => {
    const [projects, setProjects] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const data = await getProjects();
                setProjects(data);
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };

        fetchProjects();
    }, []);

    const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (!statusFilter || project.status === statusFilter)
  );

    return (
       <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Projects</h1>
      <div className="mb-4">
        <input
          className="border p-2 mr-2"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="border p-2"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All</option>
          <option value="Planned">Planned</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <button
          className="bg-blue-500 text-blue p-2 ml-2"
          onClick={() => window.location.href = '/add-project'}
        >
          Add Project
        </button>
      </div>
    <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="py-2 px-4 text-left text-gray-600 font-semibold">Name</th>
              <th className="py-2 px-4 text-left text-gray-600 font-semibold">Owner</th>
              <th className="py-2 px-4 text-left text-gray-600 font-semibold">Status</th>
              <th className="py-2 px-4 text-left text-gray-600 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.map((project) => (
              <tr key={project.id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">
                  <a
                    href={`/project/${project.id}`}
                    className="text-blue-500 hover:underline"
                  >
                    {project.name}
                  </a>
                </td>
                <td className="py-2 px-4">{project.owner}</td>
                <td className="py-2 px-4">
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      project.status === 'Planned'
                        ? 'bg-yellow-100 text-yellow-800'
                        : project.status === 'In Progress'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {project.status}
                  </span>
                </td>
                <td className="py-2 px-4">
                  <a
                    href={`/project/${project.id}`}
                    className="text-indigo-500 hover:underline mr-2"
                  >
                    View
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {filteredProjects.length === 0 && (
        <p className="text-gray-500 mt-4">No projects found.</p>
      )}
    </div>
    );
}

export default ProjectList;