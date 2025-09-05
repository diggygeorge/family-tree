'use server'
import type { Relationship } from "@/app/page"

export const getNodes = async () => {
try {
    const response = await fetch('http://localhost:8080/api/nodes',{
        method: 'GET',
      })
    if (!response.ok) {
        throw new Error('Failed to fetch nodes')
    }
    return response.json()
} catch (error) {
    console.error('Error fetching getNodes:', error)
    throw error
}
}

export const getRelationships = async () => {
try {
    const response = await fetch('http://localhost:8080/api/relationships',{
        method: 'GET',
      })
    if (!response.ok) {
        throw new Error('Failed to fetch relationships')
    }
    return response.json()
} catch (error) {
    console.error('Error fetching getRelationships:', error)
    throw error
}
}

export const addChild = async (id: number) => {
    if (!id) {
        throw new Error("ID cannot be null!")
    }
    try {
        const response = await fetch(`http://localhost:8080/api/nodes/${id}child`, {
            method: 'POST',
            headers: {
                'Content-type': "application/json"
            },
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

export const saveNode = async (relationships: Relationship[], title: string, description: string, update: boolean, id?: number) => {
try {
    let data = {
  "relationships": relationships,
  "treeName": title,
  "personName": description,
  "id": id,
}

    const response = await fetch('http://localhost:8080/api/nodes', {
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

export const deleteNode = async (id: number) => {
    if (!id) {
        throw new Error("ID cannot be null!")
    }
try {
    const response = await fetch(`http://localhost:8080/api/nodes/delete/${id}`, {
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

export const addConnection = async (id: number | null, other: number | null) => {
    if (!id || !other) {
        throw new Error("ID cannot be null!")
    }
    try {
        const response = await fetch(`http://localhost:8080/api/nodes/${id}/connect/${other}`, {
            method: 'PUT'
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

export const deleteConnection = async (id: number | null, other: number | null) => {
    if (!id || !other) {
        throw new Error("ID cannot be null!")
    }

    try {
        const response = await fetch(`http://localhost:8080/api/nodes/delete/${id}/connect/${other}`, {
            method: 'DELETE'
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