'use server'

export const getMembers = async () => {
try {
    const response = await fetch('http://localhost:8080/api/members',{
        method: 'GET',
      });
    if (!response.ok) {
        throw new Error('Failed to fetch members');
    }
    return response.json();
} catch (error) {
    console.error('Error fetching getMembers:', error);
    throw error;
}
}

export const addMember = async () => {
try {
    const response = await fetch('http://localhost:8080/api/members', {
        method: 'POST',
      });
    if (!response.ok) {
        throw new Error('Failed to add member');
    }
    return response.json();
} catch (error) {
    console.error('Error adding member:', error);
    throw error;
}
}