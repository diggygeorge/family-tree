package com.example.tree;

import java.util.*;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@JsonIdentityInfo(
    generator = ObjectIdGenerators.PropertyGenerator.class,
    property = "id"
)
@Entity
public class Node {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToMany(mappedBy="from", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Relationship> relationships = new ArrayList<>();

    private String title;
    private String description;

    public Node() {
    }

    public Node(Integer id, ArrayList<Relationship> relationships, String title, String description) {
        this.id = id;
        this.relationships = relationships;
        this.title = title;
        this.description = description;
        // this.image = image (later on)
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public List<Relationship> getRelationships() {
        return relationships;
    }

    public void addRelationship(Node other) {
        Relationship r1 = new Relationship();
        r1.setFrom(this);
        r1.setTo(other);

       this.relationships.add(r1);
    }

    public void removeRelationship(Relationship r) {
        relationships.remove(r);
    }

    public boolean hasRelationship(Node other) {
        Node receiving_node = other;
        for (Relationship r : new ArrayList<Relationship>(relationships)) {
            if (r.getTo().getId() == receiving_node.getId()) {
                System.out.println("Has relationship");
                return true;
            }
            else {
            System.out.println("No relationship");
            }
        }
        return false;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        Node that = (Node) o;

        return Objects.equals(id, that.id)
        && Objects.equals(relationships, that.relationships)
        && Objects.equals(title, that.title)
        && Objects.equals(description, that.description);
        
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, relationships, title, description);
    }

}
