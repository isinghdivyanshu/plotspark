package org.plotspark.plotsparkbackend.service.impl;

import lombok.RequiredArgsConstructor;
import org.plotspark.plotsparkbackend.dto.PagedResponseDto;
import org.plotspark.plotsparkbackend.dto.tag.TagRequestDto;
import org.plotspark.plotsparkbackend.dto.tag.TagResponseDto;
import org.plotspark.plotsparkbackend.entity.Tag;
import org.plotspark.plotsparkbackend.exception.ApiException;
import org.plotspark.plotsparkbackend.repository.TagRepository;
import org.plotspark.plotsparkbackend.service.TagService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TagServiceImpl implements TagService {

    private final TagRepository tagRepository;
    private static final Logger logger = LoggerFactory.getLogger(TagServiceImpl.class);

    // create new tag
    @Override
    public TagResponseDto createTag(TagRequestDto tagRequestDto) {
        logger.info("Creating tag with name {}", tagRequestDto.getName());

        if(tagRepository.existsByName(tagRequestDto.getName())) {
            throw new ApiException(HttpStatus.CONFLICT, "Tag already exists");
        }

        Tag newTag = new Tag();
        newTag.setName(tagRequestDto.getName());

        tagRepository.save(newTag);

        logger.info("Tag created with name {}", tagRequestDto.getName());
        return mapToDto(newTag);
    }

    // get all tags
    @Override
    public PagedResponseDto<TagResponseDto> getAllTags(Pageable pageable) {
        logger.info("Retrieving all tags");

        Page<Tag> pagedTags = tagRepository.findAll(pageable);

        List<TagResponseDto> tagResponseDtos = pagedTags.getContent().stream().map(this::mapToDto).toList();

        logger.info("All tags retrieved");
        return new PagedResponseDto<>(
                tagResponseDtos,
                pagedTags.getNumber(),
                pagedTags.getSize(),
                pagedTags.getTotalElements(),
                pagedTags.getTotalPages(),
                pagedTags.isLast()
        );
    }

    private TagResponseDto mapToDto(Tag tag) {
        TagResponseDto tagResponseDto = new TagResponseDto();
        tagResponseDto.setId(tag.getId());
        tagResponseDto.setName(tag.getName());

        return tagResponseDto;
    }
}
