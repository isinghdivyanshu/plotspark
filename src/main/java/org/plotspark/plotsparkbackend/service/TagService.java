package org.plotspark.plotsparkbackend.service;

import org.plotspark.plotsparkbackend.dto.PagedResponseDto;
import org.plotspark.plotsparkbackend.dto.tag.TagRequestDto;
import org.plotspark.plotsparkbackend.dto.tag.TagResponseDto;
import org.springframework.data.domain.Pageable;

public interface TagService {

    TagResponseDto createTag(TagRequestDto tagRequestDto);

    PagedResponseDto<TagResponseDto> getAllTags(Pageable pageable);
}
