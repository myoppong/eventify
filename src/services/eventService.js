import api from "./api";

// Use Authorization header with JWT token
export const getOrganizerEvents = (token) => {
  return api.get('/organizer/my-events/overview', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};

export const deleteEvent = (id, token) => {
  return api.delete(`/organizer/my-events/overview/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};
