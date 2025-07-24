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
    body: JSON.stringify(project),
  });
};

export const updateProject = async (id: string, project: any) => {
 return fetchWithBaseUrl(`/api/Projects/${id}`, {
    method: 'PUT',
    body: JSON.stringify(project),
});
};

export const deleteProject = async (id: string) => {
  return fetchWithBaseUrl(`/api/Projects/${id}`, {
    method: 'DELETE',
  });
};