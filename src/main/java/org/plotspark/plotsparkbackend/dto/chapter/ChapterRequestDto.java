package org.plotspark.plotsparkbackend.dto.chapter;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ChapterRequestDto {
    @NotBlank(message = "Chapter title cannot be blank")
    @Size(min = 3, max = 40)
    private String title;

    @NotBlank(message = "Chapter content cannot be blank")
    private String content;
}
