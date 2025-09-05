package com.example.tree;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class RelationshipService {
    private final RelationshipRepository relationshipRepository;

    public RelationshipService(RelationshipRepository relationshipRepository) {
        this.relationshipRepository = relationshipRepository;
    }

    public List<Relationship> getRelationships() {
        return relationshipRepository.findAll();
    }
}
