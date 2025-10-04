package org.plotspark.plotsparkbackend.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.plotspark.plotsparkbackend.dto.PagedResponseDto;
import org.plotspark.plotsparkbackend.dto.tag.TagRequestDto;
import org.plotspark.plotsparkbackend.dto.tag.TagResponseDto;
import org.plotspark.plotsparkbackend.service.TagService;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/tags")
public class TagController {

    private final TagService tagService;

    @PostMapping
    public ResponseEntity<TagResponseDto> createTag(@Valid @RequestBody TagRequestDto tagRequestDto) {
        TagResponseDto tagResponseDto = tagService.createTag(tagRequestDto);

        return new ResponseEntity<>(tagResponseDto, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<PagedResponseDto<TagResponseDto>> getAllTags(@PageableDefault(sort = "name") Pageable pageable) {
        PagedResponseDto<TagResponseDto> responseDto = tagService.getAllTags(pageable);

        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }
}
