package org.plotspark.plotsparkbackend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "stories")
public class Story {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(length = 1500)
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // different values for cascade -> PERSIST|MERGE|REMOVE|REFRESH
    @OneToMany(mappedBy = "story", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Chapter> chapters = new ArrayList<>();

    @ManyToMany(fetch = FetchType.LAZY)
    // because it is a manyToMany relation we need a new joinTable
    @JoinTable(name = "story_genres", joinColumns = @JoinColumn(name = "story_id"),  inverseJoinColumns = @JoinColumn(name = "genre_id"))
    private Set<Genre> genres;
}
