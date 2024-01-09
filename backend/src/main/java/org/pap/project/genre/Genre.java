package org.pap.project.genre;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "genre")
@Getter
@Setter
@NoArgsConstructor
@Data
public class Genre {
    @Id
    private String name;

    public Genre(String name) {
        this.name = name;
    }
}
