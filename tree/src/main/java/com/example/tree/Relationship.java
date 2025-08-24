package com.example.tree;

import java.util.*;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Relationship {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "from_id")
    private Member from;

    @ManyToOne
    @JoinColumn(name = "to_id")
    private Member to;
    
    private String type;

    public Relationship() {
    }

    public Relationship(Integer id, Member from, Member to, String type) {
        this.id = id;
        this.from = from;
        this.to = to;
        this.type = type;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Member getFrom() {
        return from;
    }

    public void setFrom(Member from) {
        this.from = from;
    }

    public Member getTo() {
        return to;
    }

    public void setTo(Member to) {
        this.to = to;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }    

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        Relationship that = (Relationship) o;

        return Objects.equals(id, that.id)
        && Objects.equals(from, that.from)
        && Objects.equals(to, that.to)
        && Objects.equals(type, that.type);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, from, to, type);
    }

}
