package com.example.tree;

import java.util.*;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Member {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToMany(mappedBy="from")
    private List<Relationship> relationships = new ArrayList<>();

    private boolean isRoot;
    private String personName;
    private String treeName;
    private String birthDate;
    private String deathDate;
    private String prefix;
    private String sex;

    public Member() {
    }

    public Member(Integer id, ArrayList<Relationship> relationships, boolean isRoot, String personName, String treeName, String birthDate, String deathDate, String prefix, String sex) {
        this.id = id;
        this.relationships = relationships;
        this.isRoot = isRoot;
        this.personName = personName;
        this.treeName = treeName;
        this.birthDate = birthDate;
        this.deathDate = deathDate;
        this.prefix = prefix;
        this.sex = sex;
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

    public void addRelationship(Member other, String type) {
        Relationship r1 = new Relationship();
        r1.setFrom(this);
        r1.setTo(other);
        r1.setType(type);

        Relationship r2 = new Relationship();
        r2.setFrom(other);
        r2.setTo(this);

        switch (type) {

            case "PARENT":
                r2.setType("CHILD");
            case "CHILD":
                r2.setType("PARENT");
            default:
                r2.setType(type);
                break;
        }
    }

    public void removeRelationship(Relationship r) {
        relationships.remove(r);
    }

    public boolean getIsRoot() {
        return isRoot;
    }

    public void setIsRoot(boolean isRoot) {
        this.isRoot = isRoot;
    }

    public String getPersonName() {
        return personName;
    }

    public void setPersonName(String person_name) {
        this.personName = person_name;
    }

    public String getTreeName() {
        return treeName;
    }

    public void setTreeName(String tree_name) {
        this.treeName = tree_name;
    }

    public String getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(String birthDate) {
        this.birthDate = birthDate;
    }

    public String getDeathDate() {
        return deathDate;
    }

    public void setDeathDate(String deathDate) {
        this.deathDate = deathDate;
    }

    public String getPrefix() {
        return prefix;
    }

    public void setPrefix(String prefix) {
        this.prefix = prefix;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public boolean isMarried() {
        for (Relationship relationship : relationships) {
            if (relationship.getType() == "SPOUSE") {
                return true;
            }
        }
        return false;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        Member that = (Member) o;

        return Objects.equals(id, that.id)
        && Objects.equals(relationships, that.relationships)
        && Objects.equals(isRoot, that.isRoot)
        && Objects.equals(personName, that.personName)
        && Objects.equals(treeName, that.treeName)
        && Objects.equals(birthDate, that.birthDate)
        && Objects.equals(deathDate, that.deathDate)
        && Objects.equals(prefix, that.prefix)
        && Objects.equals(sex, that.sex);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, relationships, isRoot, personName, treeName, birthDate, deathDate, prefix, sex);
    }

}
