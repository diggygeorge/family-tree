'use server'

export const getMembers = async () => {
try {
    const response = await fetch('http://localhost:8080/api/members',{
        method: 'GET',
      })
    if (!response.ok) {
        throw new Error('Failed to fetch members')
    }
    return response.json()
} catch (error) {
    console.error('Error fetching getMembers:', error)
    throw error
}
}

export const saveMember = async (parentId: number | null, personName: string, treeName: string, update: boolean, isRoot: boolean, birthDate?: string, deathDate?: string, prefix?: string, sex?: string, id?: number) => {
try {
    let data = {
  "parentId": parentId,
  "treeName": treeName,
  "personName": personName,
  "id": id,
  "isRoot": isRoot,
  "birthDate": birthDate,
  "deathDate": deathDate,
  "prefix": prefix,
  "sex": sex
}

    const response = await fetch('http://localhost:8080/api/members', {
        method: update ? 'PUT' : 'POST',
        headers: {
                    'Content-Type': "application/json"
                 },
        body: JSON.stringify(data)
      })
      if (!response.ok) {
        console.error("Error:", response.status, response.statusText)
    }
    const text = await response.text()
    const result = text ? JSON.parse(text) : null
    return result
} catch (error) {
    console.error('Error adding member:', error)
    throw error
}
}

export const deleteMember = async (id: number) => {
try {
    const response = await fetch(`http://localhost:8080/api/delete-member/${id}`, {
        method: 'DELETE',
      })
    if (!response.ok) {
            throw new Error('Failed to delete member')
        }
    else {
        const text = await response.text()
        const result = text ? JSON.parse(text) : null
        return result
    }}
catch (error) {
    console.error('Error deleting member:', error)
    throw error
}
}