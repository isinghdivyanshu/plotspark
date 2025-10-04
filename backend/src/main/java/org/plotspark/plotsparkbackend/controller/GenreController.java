package org.plotspark.plotsparkbackend.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.plotspark.plotsparkbackend.dto.PagedResponseDto;
import org.plotspark.plotsparkbackend.dto.genre.GenreRequestDto;
import org.plotspark.plotsparkbackend.dto.genre.GenreResponseDto;
import org.plotspark.plotsparkbackend.service.GenreService;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/genres")
@RequiredArgsConstructor
public class GenreController {

    private final GenreService genreService;

    // createGenre
    @PostMapping
    public ResponseEntity<GenreResponseDto> createGenre(@Valid @RequestBody GenreRequestDto genreRequestDto) {
        GenreResponseDto genreResponseDto = genreService.createGenre(genreRequestDto);

        return new ResponseEntity<>(genreResponseDto, HttpStatus.CREATED);
    }

    // getAllGenres
    @GetMapping
    public ResponseEntity<PagedResponseDto<GenreResponseDto>> getAllGenres(@PageableDefault(size = 10, sort = "name") Pageable pageable) {
        PagedResponseDto<GenreResponseDto> responseDtos = genreService.getAllGenres(pageable);

        return new ResponseEntity<>(responseDtos, HttpStatus.OK);
    }
}
