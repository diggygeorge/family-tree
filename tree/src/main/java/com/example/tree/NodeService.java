package com.example.tree;

import java.util.*;

import org.springframework.stereotype.Service;

@Service
public class NodeService {
    
    private final NodeRepository NodeRepository;

    public NodeService(NodeRepository NodeRepository) {
        this.NodeRepository = NodeRepository;
    }

    public List<Node> getNodes() {
        return NodeRepository.findAll();
    }

    public void saveNode(Node Node) {
        NodeRepository.save(Node);
    }

    public void addNode(Node Node) {
        NodeRepository.save(Node);
    }

    public void addChild(Integer id) {

        Node node = NodeRepository.getReferenceById(id);
        Node child = new Node();

        node.addRelationship(child);
        String newName = "Connection to " + node.getTitle();
        child.setTitle(newName);
        saveNode(child);         
        saveNode(node);
    }

    public void addConnection(Integer id, Integer other) {

        Node from = NodeRepository.getReferenceById(id);
        Node to = NodeRepository.getReferenceById(other);

        if (!from.hasRelationship(to)) {
            System.out.println("From does not have a connection with to");
            from.addRelationship(to);
            saveNode(from);
            saveNode(to);
        }
    }

    public void removeConnection(Integer id, Integer other) {

        Node from = NodeRepository.getReferenceById(id);
        Node to = NodeRepository.getReferenceById(other);

        for (Relationship r : new ArrayList<Relationship>(from.getRelationships())) {
            if (r.getTo().getId() == to.getId()) {
                from.removeRelationship(r);
                break;
            }
        }

        saveNode(from);
        saveNode(to);
    }

    public void deleteNode(Integer id) {
        // delete all relationships mentioning it first, then if there are Nodes 
        // with no more relationships, delete them entirely.  then delete Node itself

        Node Node = NodeRepository.getReferenceById(id);

        for (Relationship r : new ArrayList<Relationship>(Node.getRelationships())) {
            Node receiving_Node = r.getTo();
            Node.removeRelationship(r);
            for (Relationship r2 : new ArrayList<Relationship>(receiving_Node.getRelationships())) {
                if (r2.getTo().equals(Node)) {
                    receiving_Node.removeRelationship(r2);
                    if (receiving_Node.getRelationships().isEmpty()) {
                        NodeRepository.delete(receiving_Node);
                    }
                }
            }
        }
        NodeRepository.delete(Node);
    }

}
