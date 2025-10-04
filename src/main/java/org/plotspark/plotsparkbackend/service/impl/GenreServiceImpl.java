package org.plotspark.plotsparkbackend.service.impl;

import lombok.RequiredArgsConstructor;
import org.plotspark.plotsparkbackend.dto.PagedResponseDto;
import org.plotspark.plotsparkbackend.dto.genre.GenreRequestDto;
import org.plotspark.plotsparkbackend.dto.genre.GenreResponseDto;
import org.plotspark.plotsparkbackend.entity.Genre;
import org.plotspark.plotsparkbackend.exception.ApiException;
import org.plotspark.plotsparkbackend.repository.GenreRepository;
import org.plotspark.plotsparkbackend.service.GenreService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GenreServiceImpl implements GenreService {

    private final GenreRepository genreRepository;
    private static final Logger logger = LoggerFactory.getLogger(GenreServiceImpl.class);

    // createGenre
    @Override
    public GenreResponseDto createGenre(GenreRequestDto genreRequestDto) {
        logger.info("Creating genre with name: {}", genreRequestDto.getName());

        if(genreRepository.existsByName(genreRequestDto.getName())) {
            throw new ApiException(HttpStatus.CONFLICT, "Genre already exists");
        }

        Genre newGenre = new Genre();
        newGenre.setName(genreRequestDto.getName());

        genreRepository.save(newGenre);

        logger.info("Created genre with name: {}", genreRequestDto.getName());
        return mapToDto(newGenre);
    }

    // getAllGenres
    @Override
    public PagedResponseDto<GenreResponseDto> getAllGenres(Pageable pageable) {
        logger.info("Getting all genres");

        Page<Genre> pagedGenres = genreRepository.findAll(pageable);

        List<GenreResponseDto> genreDtos = pagedGenres.getContent().stream().map(this::mapToDto).toList();

        logger.info("Found {} genres", genreDtos.size());
        return new PagedResponseDto<>(
                genreDtos,
                pagedGenres.getNumber(),
                pagedGenres.getSize(),
                pagedGenres.getTotalElements(),
                pagedGenres.getTotalPages(),
                pagedGenres.isLast()
                );
    }

    private GenreResponseDto mapToDto(Genre genre) {
        GenreResponseDto genreResponseDto = new GenreResponseDto();
        genreResponseDto.setId(genre.getId());
        genreResponseDto.setName(genre.getName());

        return genreResponseDto;
    }
}
