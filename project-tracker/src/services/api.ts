import { fetchWithBaseUrl } from "../utility/fetch";

export const getProjects = async () => {
  return fetchWithBaseUrl('/api/Projects');
}

export const getProject = async (id: string) => {
  return fetchWithBaseUrl(`/api/Projects/${id}`);
};

export const createProject = async (project: any) => {
 return fetchWithBaseUrl('/api/Projects', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(project),
  });
};

export const updateProject = async (id: string, project: any) => {
 return fetchWithBaseUrl(`/api/Projects/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',    
    },
    body: JSON.stringify(project),
    });
};