package org.plotspark.plotsparkbackend.service;

import org.plotspark.plotsparkbackend.dto.PagedResponseDto;
import org.plotspark.plotsparkbackend.dto.genre.GenreRequestDto;
import org.plotspark.plotsparkbackend.dto.genre.GenreResponseDto;
import org.springframework.data.domain.Pageable;

public interface GenreService {

    GenreResponseDto createGenre(GenreRequestDto genreRequestDto);

    PagedResponseDto<GenreResponseDto> getAllGenres(Pageable pageable);
}
